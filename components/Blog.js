import Link from 'next/link';
import { getRecentPosts } from '@/lib/wp';

export default async function Blog() {
  const posts = await getRecentPosts(6);
  return (
    <section id="blog" className="scroll-mt-20 bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-extrabold text-3xl">MY BLOG: THE ART OF NON-OSTENTATIOUS</h2>
          <Link href="/blog" className="text-sm font-bold text-purple hover:brightness-90 transition hidden sm:block">
            View Blog →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.id}`}
              className="block border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.imageAlt || p.title} className="w-full h-40 object-cover" loading="lazy" />
              )}
              <div className="p-6">
                <p className="text-xs text-gold font-bold uppercase tracking-wide mb-2">
                  {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {' · '}{p.category}
                </p>
                <h3 className="font-bold text-lg mb-2 leading-snug line-clamp-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="inline-block border-2 border-purple text-purple font-bold text-xs uppercase tracking-wide px-6 py-3 rounded hover:bg-purple hover:text-white transition">
            View Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
