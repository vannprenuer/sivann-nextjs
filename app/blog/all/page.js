import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getPostsPaged } from '@/lib/wp';

export const metadata = {
  title: 'All Articles — TE Sivann',
  description: 'Full archive of articles from the Art of Non-ostentatious blog.',
};

const PER_PAGE = 20;

// Numbered pagination like 1 … 4 5 [6] 7 8 … 12, collapsing far-away pages.
function paginationRange(current, total) {
  const range = [];
  const delta = 1;
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    } else if (range[range.length - 1] !== '…') {
      range.push('…');
    }
  }
  return range;
}

function PageLink({ page, active, disabled, label }) {
  if (disabled) {
    return <span className="w-9 h-9 flex items-center justify-center text-xs text-gray-300 rounded">{label}</span>;
  }
  return (
    <Link
      href={page <= 1 ? '/blog/all' : `/blog/all?page=${page}`}
      className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded transition ${
        active ? 'bg-ink text-white' : 'text-ink hover:bg-bg1'
      }`}
    >
      {label}
    </Link>
  );
}

// The full article archive — every post, 20 per page, reached via "View
// All Articles" on the main /blog page so that page itself stays a
// bounded-length magazine layout instead of an ever-growing feed.
export default async function BlogArchive({ searchParams }) {
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const { posts, totalPages, total } = await getPostsPaged(page, PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="blog" />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-extrabold text-2xl">All Articles</h1>
          <Link href="/blog" className="text-xs font-bold uppercase tracking-wide text-gray-400 hover:text-purple transition">
            ← Back to Blog
          </Link>
        </div>
        <p className="text-sm text-gray-400 mb-10">
          {total} article{total === 1 ? '' : 's'} · Page {page} of {totalPages}
        </p>

        {posts.length === 0 && <p className="text-gray-400">No posts found.</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {posts.map((p) => (
            <Link key={p.id} href={`/blog/${p.id}`} className="block group">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.imageAlt || p.title} className="w-full h-32 object-cover rounded-lg mb-3" loading="lazy" />
              ) : (
                <div className="w-full h-32 bg-bg1 rounded-lg mb-3" />
              )}
              <p className="text-[11px] text-gold font-bold uppercase tracking-wide mb-1">
                {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <h2 className="font-bold text-sm leading-snug group-hover:text-purple transition line-clamp-2">{p.title}</h2>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-2 pt-8 border-t border-gray-100">
            <PageLink page={page - 1} disabled={page <= 1} label="‹ Prev" />
            {paginationRange(page, totalPages).map((p, i) =>
              p === '…' ? (
                <span key={`dots-${i}`} className="px-2 text-gray-300">
                  …
                </span>
              ) : (
                <PageLink key={p} page={p} active={p === page} label={String(p)} />
              )
            )}
            <PageLink page={page + 1} disabled={page >= totalPages} label="Next ›" />
          </nav>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
