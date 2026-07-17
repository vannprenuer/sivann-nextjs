import Link from 'next/link';
import FloatingNav from '@/components/FloatingNav';
import { getRecentPosts } from '@/lib/wp';

export const metadata = {
  title: 'Blog — TE Sivann',
  description: 'The Art of Non-ostentatious: articles on management, marketing, and self-improvement.',
};

export default async function BlogIndex() {
  const posts = await getRecentPosts(100);
  return (
    <main className="min-h-screen bg-white pt-14 lg:pt-0">
      <FloatingNav />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm font-bold text-purple hover:underline">← Back to home</Link>
        <h1 className="font-extrabold text-3xl mt-4 mb-10">MY BLOG: THE ART OF NON-OSTENTATIOUS</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.id}`}
              className="block border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.imageAlt || p.title} className="w-full h-48 object-cover" loading="lazy" />
              )}
              <div className="p-6">
                <p className="text-xs text-gold font-bold uppercase tracking-wide mb-2">
                  {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {' · '}{p.category}
                </p>
                <h2 className="font-bold text-lg mb-2 leading-snug">{p.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
