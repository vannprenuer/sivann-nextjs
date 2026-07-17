import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageBanner from '@/components/PageBanner';
import { getPostById, getRecentPosts } from '@/lib/wp';

export async function generateMetadata({ params }) {
  const post = await getPostById(params.id);
  if (!post) return { title: 'Post not found — TE Sivann' };
  return {
    title: `${post.title} — TE Sivann`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostById(params.id);
  if (!post) notFound();
  const recent = (await getRecentPosts(6)).filter((p) => String(p.id) !== String(post.id)).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="blog" />
      <PageBanner title={post.title} crumb="Blog" />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12 w-full">
        <article className="lg:col-span-2">
          <Link href="/blog" className="text-sm font-bold text-purple hover:underline">← Back to blog</Link>
          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.imageAlt || post.title} className="w-full max-h-96 object-cover rounded-lg mt-6" />
          )}
          <p className="text-xs text-gold font-bold uppercase tracking-wide mt-6 mb-2">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            {' · '}{post.category}
          </p>
          <h1 className="font-extrabold text-3xl md:text-4xl mb-8 leading-tight">{post.title}</h1>
          <div
            className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-a:text-purple prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <aside>
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
        </aside>
      </main>

      <SiteFooter />
    </div>
  );
}
