import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FeaturedSlider from '@/components/FeaturedSlider';
import PostCarousel from '@/components/PostCarousel';
import TagDirectory from '@/components/TagDirectory';
import CategoryFeature, { TagCloud, SideList } from '@/components/CategoryFeature';
import CategoryCarousel from '@/components/CategoryCarousel';
import {
  getRecentPosts,
  getCategories,
  getPortfolioCategories,
  getTags,
  getPostsByCategory,
  getPostsByTag,
  getPopularPosts,
} from '@/lib/wp';

export const metadata = {
  title: 'Blog — TE Sivann',
  description: 'The Art of Non-ostentatious: articles on management, marketing, and self-improvement.',
};

// Filtered view shown when arriving via a category/tag tag-cloud link
// (?category=slug or ?tag=slug) -- a simple list rather than the full
// magazine-style homepage.
function FilteredBlog({ label, value, posts }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="blog" />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-extrabold text-2xl">
            {label}: <span className="text-purple">{value}</span>
          </h1>
          <Link href="/blog" className="text-xs font-bold uppercase tracking-wide text-gray-400 hover:text-purple transition">
            Clear filter ×
          </Link>
        </div>
        {posts.length === 0 && <p className="text-gray-400">No posts found.</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p) => (
            <Link key={p.id} href={`/blog/${p.id}`} className="block group">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.imageAlt || p.title} className="w-full h-40 object-cover rounded-lg mb-3" loading="lazy" />
              ) : (
                <div className="w-full h-40 bg-bg1 rounded-lg mb-3" />
              )}
              <p className="text-xs text-gold font-bold uppercase tracking-wide mb-1">
                {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <h2 className="font-bold text-base leading-snug group-hover:text-purple transition line-clamp-2">{p.title}</h2>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default async function BlogIndex({ searchParams }) {
  const categoryFilter = searchParams?.category;
  const tagFilter = searchParams?.tag;

  if (categoryFilter) {
    const posts = await getPostsByCategory(categoryFilter, 60);
    const label = posts[0]?.category || categoryFilter.replace(/-/g, ' ');
    return <FilteredBlog label="Category" value={label} posts={posts} />;
  }
  if (tagFilter) {
    const posts = await getPostsByTag(tagFilter, 60);
    return <FilteredBlog label="Tag" value={tagFilter.replace(/-/g, ' ')} posts={posts} />;
  }

  const [
    posts,
    categories,
    portfolioCategories,
    tags,
    selfImprovement,
    businessMarketing,
    careerDevelopment,
    foodOfThoughts,
    popular,
  ] = await Promise.all([
    getRecentPosts(100),
    getCategories(),
    getPortfolioCategories(),
    getTags(40),
    getPostsByCategory('self-improvement', 6),
    getPostsByCategory('business-marketing', 8),
    getPostsByCategory('career-development', 9),
    getPostsByCategory('food-of-thoughts', 4),
    getPopularPosts(5),
  ]);

  const featuredSlides = posts.slice(0, 3);
  const carouselPosts = posts.slice(3, 11).length ? posts.slice(3, 11) : posts.slice(0, 8);
  const recent = posts.slice(0, 6);
  const allTags = [...new Set(posts.map((p) => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="blog" />

      <main className="flex-1">
        <FeaturedSlider posts={featuredSlides} />
        <PostCarousel posts={carouselPosts} />

        <TagDirectory portfolioCategories={portfolioCategories} categories={categories} />

        {selfImprovement.length > 0 && (
          <CategoryFeature
            heading="Self Improvement"
            categorySlug="self-improvement"
            mainPost={selfImprovement[0]}
            sidePosts={selfImprovement.slice(1)}
            extra={<TagCloud tags={tags} />}
            extraHeading="Tags"
          />
        )}

        <CategoryCarousel heading="Business & Marketing" categorySlug="business-marketing" posts={businessMarketing} />

        {careerDevelopment.length > 0 && (
          <CategoryFeature
            heading="Career Development"
            categorySlug="career-development"
            mainPost={careerDevelopment[0]}
            sidePosts={careerDevelopment.slice(1)}
            sideColumns={2}
            overlayTitle
          />
        )}

        {foodOfThoughts.length > 0 && (
          <CategoryFeature
            heading="Food of Thoughts"
            categorySlug="food-of-thoughts"
            mainPost={foodOfThoughts[0]}
            sidePosts={foodOfThoughts.slice(1)}
            extra={<SideList posts={popular} />}
            extraHeading="Popular"
          />
        )}

        <div className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-100 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <h2 className="font-extrabold text-lg uppercase tracking-wide -mb-4">Latest Articles</h2>
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

            {allTags.length > 0 && (
              <div>
                <h3 className="font-extrabold text-sm uppercase tracking-wide mb-5 pb-3 border-b-2 border-gold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((t) => (
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
