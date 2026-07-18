import Link from 'next/link';

// The two side-by-side tag clouds near the top of the blog page --
// "Portfolio" categories and "Categories" (blog categories) -- matching
// the original site's widget row directly below the featured slider.
export default function TagDirectory({ portfolioCategories, categories }) {
  if (!portfolioCategories?.length && !categories?.length) return null;
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-[2fr_3fr] gap-10 border-t border-gray-100">
      {portfolioCategories?.length > 0 && (
        <div>
          <h3 className="font-extrabold text-sm uppercase tracking-wide mb-4">Portfolio</h3>
          <div className="flex flex-wrap gap-2">
            {portfolioCategories.map((c) => (
              <Link
                key={c.slug}
                href="/portfolio"
                className="text-xs bg-ink text-white px-3 py-1.5 rounded-full uppercase tracking-wide font-bold hover:bg-purple transition"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {categories?.length > 0 && (
        <div>
          <h3 className="font-extrabold text-sm uppercase tracking-wide mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog?category=${c.slug}`}
                className="text-xs bg-ink text-white px-3 py-1.5 rounded-full uppercase tracking-wide font-bold hover:bg-purple transition"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
