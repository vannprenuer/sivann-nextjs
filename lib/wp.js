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
// footer widget (matches the original site's tag-cloud-with-counts).
export async function getCategories() {
  const live = await safeFetch(`/wp/v2/categories?per_page=100&orderby=count&order=desc`);
  if (live) {
    return live
      .filter((c) => c.count > 0 && c.name.toLowerCase() !== 'uncategorized')
      .map((c) => ({ name: decodeHtmlEntities(c.name), count: c.count }));
  }
  // Fallback: derive counts from the seed posts (used until
  // NEXT_PUBLIC_WP_API_URL is configured).
  const counts = {};
  for (const p of seed.posts) {
    if (!p.category) continue;
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
