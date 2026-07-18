// Thin wrapper around the WordPress REST API.
//
// Set NEXT_PUBLIC_WP_API_URL (e.g. https://cms.sivann.com/wp-json) in
// .env.local / Vercel env vars once the WordPress backend is live, and
// these functions switch from the local seed data (lib/content.js) to
// real, live content automatically. No component code needs to change.

import * as seed from './content';

const API_BASE = process.env.NEXT_PUBLIC_WP_API_URL;

async function safeFetch(path) {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('WP API fetch failed, falling back to seed content:', e.message);
    return null;
  }
}

// WordPress's REST API returns title/excerpt text with HTML entities already
// applied (e.g. "Sales &amp; Marketing"). Since these are rendered as plain
// JSX text (not dangerouslySetInnerHTML), decode the common entities here so
// they display correctly instead of showing the literal "&amp;" etc.
function decodeHtmlEntities(str) {
  if (!str) return str;
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&#8217;': '’',
    '&#8216;': '‘',
    '&#8220;': '“',
    '&#8221;': '”',
    '&#8211;': '–',
    '&#8212;': '—',
    '&hellip;': '…',
  };
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;|&nbsp;|&hellip;/g, (m) => entities[m] ?? m);
}

// Keeps homepage/list excerpts short and consistent regardless of how long
// the raw WordPress excerpt happens to be (some posts have no manual excerpt
// set, so WP falls back to auto-generating one from the full post body,
// which can run to several paragraphs for image-only/Khmer posts).
function truncate(str, maxLen = 140) {
  if (!str) return str;
  if (str.length <= maxLen) return str;
  const cut = str.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLen).trim()}…`;
}

function featuredImage(p) {
  return p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;
}

function featuredImageAlt(p) {
  return p._embedded?.['wp:featuredmedia']?.[0]?.alt_text || p.title?.rendered || '';
}

function mapPost(p) {
  const rawExcerpt = decodeHtmlEntities(p.excerpt.rendered.replace(/<[^>]+>/g, '').trim());
  return {
    id: p.id,
    title: decodeHtmlEntities(p.title.rendered),
    date: p.date,
    excerpt: truncate(rawExcerpt, 140),
    content: p.content.rendered,
    category: decodeHtmlEntities(p._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Article'),
    image: featuredImage(p),
    imageAlt: featuredImageAlt(p),
  };
}

function mapPortfolio(p) {
  return {
    id: p.id,
    title: decodeHtmlEntities(p.title.rendered),
    date: p.date,
    description: decodeHtmlEntities(p.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() ?? ''),
    content: p.content.rendered,
    category: decodeHtmlEntities(p._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Portfolio'),
    image: featuredImage(p),
    imageAlt: featuredImageAlt(p),
  };
}

export async function getRecentPosts(count = 6) {
  const live = await safeFetch(`/wp/v2/posts?per_page=${count}&_embed`);
  if (live) return live.map(mapPost);
  return seed.posts.slice(0, count);
}

export async function getPostById(id) {
  const live = await safeFetch(`/wp/v2/posts/${id}?_embed`);
  if (live) return mapPost(live);
  return seed.posts.find((p) => String(p.id) === String(id)) ?? null;
}

export async function getPortfolio(count = 9) {
  // 'portfolio' is a custom post type registered by the Porto theme.
  // It needs `show_in_rest => true` added to its registration to be
  // queryable at /wp/v2/portfolio once the backend is live.
  const live = await safeFetch(`/wp/v2/portfolio?per_page=${count}&_embed`);
  if (live) return live.map(mapPortfolio);
  return seed.portfolio.slice(0, count);
}

export async function getPortfolioById(id) {
  const live = await safeFetch(`/wp/v2/portfolio/${id}?_embed`);
  if (live) return mapPortfolio(live);
  return seed.portfolio.find((p) => String(p.id) === String(id)) ?? null;
}

function mapExperience(p) {
  // These fields are exposed two ways (see the mu-plugin): as a REST
  // "meta" object (register_post_meta) and, more reliably across
  // hosts/plugin combos, as top-level fields (register_rest_field).
  // Check both, preferring the top-level value.
  const meta = p.meta || {};
  return {
    heading: decodeHtmlEntities(p.title?.rendered ?? ''),
    company: decodeHtmlEntities(p.company ?? meta.company ?? ''),
    location: p.location ?? meta.location ?? '',
    from: p.date_from ?? meta.date_from ?? '',
    to: p.date_to ?? meta.date_to ?? '',
    duration: p.duration ?? meta.duration ?? '',
    description: p.content?.rendered ?? '',
  };
}

function mapEducation(p) {
  const meta = p.meta || {};
  return {
    school: decodeHtmlEntities(p.title?.rendered ?? ''),
    degree: decodeHtmlEntities(p.degree ?? meta.degree ?? ''),
    years: p.years ?? meta.years ?? '',
  };
}

export function getSiteInfo() {
  return seed.siteInfo;
}
export function getAbout() {
  return seed.about;
}
export async function getExperience() {
  // 'experience' is a custom post type registered by the headless-integration
  // mu-plugin (see wordpress-mu-plugin/headless-integration.php) - each entry
  // is a normal WordPress post with a few extra fields (company, dates, etc.)
  const live = await safeFetch(`/wp/v2/experience?per_page=20&orderby=menu_order&order=asc`);
  if (live && live.length) return live.map(mapExperience);
  return seed.experience;
}
export async function getEducation() {
  const live = await safeFetch(`/wp/v2/education?per_page=20&orderby=menu_order&order=asc`);
  if (live && live.length) return live.map(mapEducation);
  return seed.education;
}
export function getSkills() {
  return seed.skills;
}
export function getLanguages() {
  return seed.languages;
}
export function getQuotes() {
  return seed.quotes;
}
export function getWelcomeNotes() {
  return seed.welcomeNotes;
}
export function getPhilosophy() {
  return seed.philosophy;
}
export function getContactPage() {
  return seed.contactPage;
}

// Blog categories with real post counts, used by the "Blog Features"
// footer widget and the Categories tag directory (matches the original
// site's tag-cloud-with-counts).
export async function getCategories() {
  const live = await safeFetch(`/wp/v2/categories?per_page=100&orderby=count&order=desc`);
  if (live) {
    return live
      .filter((c) => c.count > 0 && c.name.toLowerCase() !== 'uncategorized')
      .map((c) => ({ id: c.id, name: decodeHtmlEntities(c.name), slug: c.slug, count: c.count }));
  }
  // Fallback: derive counts from the seed posts (used until
  // NEXT_PUBLIC_WP_API_URL is configured).
  const counts = {};
  for (const p of seed.posts) {
    if (!p.category) continue;
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), count }))
    .sort((a, b) => b.count - a.count);
}

// Portfolio categories (Activities/Career/Journey/Leisure/Life Events),
// used by the Portfolio tag directory on the blog page.
export async function getPortfolioCategories() {
  const live = await safeFetch(`/wp/v2/portfolio_cat?per_page=50&orderby=count&order=desc`);
  if (live) {
    return live
      .filter((c) => c.count > 0)
      .map((c) => ({ id: c.id, name: decodeHtmlEntities(c.name), slug: c.slug, count: c.count }));
  }
  return [
    { name: 'Activities', slug: 'activities' },
    { name: 'Career', slug: 'career' },
    { name: 'Journey', slug: 'journey' },
    { name: 'Leisure', slug: 'leisure' },
    { name: 'Life Events', slug: 'life-events' },
  ];
}

// Post tags with real counts, used by the "Tags" cloud widget on category
// sections of the blog page.
export async function getTags(count = 100) {
  const live = await safeFetch(`/wp/v2/tags?per_page=${count}&orderby=count&order=desc`);
  if (live) {
    return live
      .filter((t) => t.count > 0)
      .map((t) => ({ id: t.id, name: decodeHtmlEntities(t.name), slug: t.slug, count: t.count }));
  }
  return [];
}

async function getCategoryBySlug(slug) {
  const live = await safeFetch(`/wp/v2/categories?slug=${encodeURIComponent(slug)}`);
  return live && live.length ? live[0] : null;
}

async function getTagBySlug(slug) {
  const live = await safeFetch(`/wp/v2/tags?slug=${encodeURIComponent(slug)}`);
  return live && live.length ? live[0] : null;
}

// Posts filtered to a single category, used by the per-category blog page
// sections (Self Improvement, Business & Marketing, Career Development,
// Food of Thoughts) as well as the ?category= filtered blog view.
export async function getPostsByCategory(slug, count = 8) {
  if (!slug) return [];
  const cat = await getCategoryBySlug(slug);
  if (cat) {
    const live = await safeFetch(`/wp/v2/posts?categories=${cat.id}&per_page=${count}&_embed`);
    if (live) return live.map(mapPost);
  }
  // Fallback: best-effort match against seed post categories.
  const needle = slug.replace(/-/g, ' ');
  return seed.posts
    .filter((p) => p.category && p.category.toLowerCase().includes(needle.split(' ')[0]))
    .slice(0, count);
}

// Posts filtered to a single tag, used by the ?tag= filtered blog view.
export async function getPostsByTag(slug, count = 20) {
  if (!slug) return [];
  const tag = await getTagBySlug(slug);
  if (tag) {
    const live = await safeFetch(`/wp/v2/posts?tags=${tag.id}&per_page=${count}&_embed`);
    if (live) return live.map(mapPost);
  }
  return [];
}

// Best-effort "Popular" list. WordPress doesn't expose view counts over the
// core REST API without a dedicated plugin endpoint (none is installed on
// cms.sivann.com), so this approximates popularity via comment activity,
// falling back gracefully to recent posts.
export async function getPopularPosts(count = 5) {
  const live = await safeFetch(`/wp/v2/posts?per_page=${count}&orderby=comment_count&order=desc&_embed`);
  if (live) return live.map(mapPost);
  return seed.posts.slice(0, count);
}
