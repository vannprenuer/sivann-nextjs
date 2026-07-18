import Link from 'next/link';

function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Small thumb + date + title list item, reused for the side list and the
// "Popular" widget.
export function PostListItem({ post }) {
  return (
    <Link href={`/blog/${post.id}`} className="flex gap-3 group">
      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.image} alt={post.imageAlt || post.title} className="w-16 h-16 rounded object-cover flex-shrink-0" loading="lazy" />
      ) : (
        <div className="w-16 h-16 rounded bg-bg1 flex-shrink-0" />
      )}
      <div className="min-w-0">
        <p className="text-xs text-gray-400 mb-1">{fmtDate(post.date)}</p>
        <p className="text-sm font-semibold text-ink group-hover:text-purple transition leading-snug line-clamp-2">{post.title}</p>
      </div>
    </Link>
  );
}

export function SideList({ posts, columns = 1 }) {
  if (!posts?.length) return null;
  return (
    <div className={`grid gap-5 ${columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
      {posts.map((p) => (
        <PostListItem key={p.id} post={p} />
      ))}
    </div>
  );
}

export function TagCloud({ tags }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Link
          key={t.slug}
          href={`/blog?tag=${t.slug}`}
          className="text-xs bg-ink text-white px-3 py-1.5 rounded-full uppercase tracking-wide font-bold hover:bg-purple transition"
        >
          {t.name}
        </Link>
      ))}
    </div>
  );
}

// A "main featured post + side content" block used for the Self Improvement,
// Career Development, and Food of Thoughts sections of the blog page —
// matches the original Porto-theme layout for these category widgets.
//
// - overlayTitle=false: title + excerpt shown below the image (Self
//   Improvement / Food of Thoughts style)
// - overlayTitle=true: title overlaid on the image itself (Career
//   Development style)
// - sideColumns=2 + no `extra`: side list splits into two columns spanning
//   the remaining width (Career Development style)
// - `extra` + `extraHeading`: a third column (Tags cloud or Popular list)
export default function CategoryFeature({
  heading,
  categorySlug,
  mainPost,
  sidePosts = [],
  sideColumns = 1,
  overlayTitle = false,
  extra,
  extraHeading,
}) {
  if (!mainPost) return null;
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-extrabold text-lg uppercase tracking-wide">{heading}</h2>
        {categorySlug && (
          <Link href={`/blog?category=${categorySlug}`} className="text-xs font-bold uppercase tracking-wide text-purple hover:underline">
            View All +
          </Link>
        )}
      </div>

      <div className={`grid gap-10 ${extra ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
        <Link href={`/blog/${mainPost.id}`} className="block group">
          <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-bg1">
            {mainPost.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mainPost.image}
                alt={mainPost.imageAlt || mainPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            ) : null}
            {overlayTitle && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <h3 className="absolute bottom-0 left-0 right-0 p-5 text-white font-bold text-lg leading-snug">{mainPost.title}</h3>
              </>
            )}
          </div>
          {!overlayTitle && (
            <div className="mt-4">
              <h3 className="font-bold text-xl mb-2 leading-snug group-hover:text-purple transition">{mainPost.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{mainPost.excerpt}</p>
            </div>
          )}
        </Link>

        <SideList posts={sidePosts} columns={extra ? 1 : sideColumns} />

        {extra && (
          <div>
            {extraHeading && (
              <h3 className="font-extrabold text-sm uppercase tracking-wide mb-5 pb-3 border-b-2 border-gold">{extraHeading}</h3>
            )}
            {extra}
          </div>
        )}
      </div>
    </section>
  );
}
