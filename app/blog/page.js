import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FeaturedSlider from '@/components/FeaturedSlider';
import PostCarousel from '@/components/PostCarousel';
import { getRecentPosts } from '@/lib/wp';

export const metadata = {
  title: 'Blog — TE Sivann',
  description: 'The Art of Non-ostentatious: articles on management, marketing, and self-improvement.',
};

export default async function BlogIndex() {
  const posts = await getRecentPosts(100);
  const featuredSlides = posts.slice(0, 3);
  const carouselPosts = (posts.slice(3, 11).length ? posts.slice(3, 11) : posts.slice(0, 8));
  const recent = posts.slice(0, 6);
  const tags = [...new Set(posts.map((p) => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="blog" />

      <main className="flex-1">
        <FeaturedSlider posts={featuredSlides} />
        <PostCarousel posts={carouselPosts} />

        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {posts.map((p) => (
              <article key={p.id} className="flex flex-col sm:flex-row gap-6 pb-12 border-b border-gray-100 last:border-0">
                <Link href={`/blog/${p.id}`} className="sm:w-56 flex-shrink-0 block">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.imageAlt || p.title} className="w-full h-40 sm:h-full object-cover rounded-lg" loading="lazy" />
                  ) : (
                    <div className="w-full h-40 sm:h-full bg-bg1 rounded-lg" />
                  )}
                </Link>
                <div>
                  <p className="text-xs text-gold font-bold uppercase tracking-wide mb-2">
                    {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {' · '}{p.category}
                  </p>
                  <Link href={`/blog/${p.id}`}>
                    <h2 className="font-bold text-xl mb-2 leading-snug hover:text-purple transition">{p.title}</h2>
                  </Link>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-3">{p.excerpt}</p>
                  <Link href={`/blog/${p.id}`} className="text-xs font-bold uppercase tracking-wide text-purple hover:underline">
                    Read More +
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-10">
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide mb-5 pb-3 border-b-2 border-gold">Recent Posts</h3>
              <div className="space-y-4">
                {recent.map((p) => (
                  <Link key={p.id} href={`/blog/${p.id}`} className="flex gap-3 group">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.imageAlt || p.title} className="w-16 h-16 rounded object-cover flex-shrink-0" loading="lazy" />
                    ) : (
                      <div className="w-16 h-16 rounded bg-bg1 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink group-hover:text-purple transition leading-snug line-clamp-2">{p.title}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {tags.length > 0 && (
              <div>
                <h3 className="font-extrabold text-sm uppercase tracking-wide mb-5 pb-3 border-b-2 border-gold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className="text-xs bg-ink text-white px-3 py-1.5 rounded-full uppercase tracking-wide font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
