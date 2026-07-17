import Link from 'next/link';
import { getRecentPosts, getSiteInfo } from '@/lib/wp';

// Matches the original site's 4-column widget footer + copyright bar,
// used on every page except the homepage (which has its own contact section).
export default async function SiteFooter() {
  const site = getSiteInfo();
  const posts = await getRecentPosts(3);
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];

  return (
    <footer className="bg-panel text-gray-300 pt-16 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">TE Sivann</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">{site.tagline}</p>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Follow Us</p>
          <div className="flex gap-3">
            {[
              ['Facebook', site.social.facebook],
              ['Instagram', site.social.instagram],
              ['LinkedIn', site.social.linkedin],
              ['Twitter', site.social.twitter],
              ['YouTube', site.social.youtube],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs hover:bg-gold hover:text-ink transition"
                title={label}
              >
                {label[0]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Recent Posts</h3>
          <div className="space-y-4">
            {posts.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`} className="flex gap-3 group">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.imageAlt || p.title} className="w-14 h-14 rounded object-cover flex-shrink-0" loading="lazy" />
                ) : (
                  <div className="w-14 h-14 rounded bg-white/10 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-sm text-gray-300 group-hover:text-gold transition leading-snug line-clamp-2">{p.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {(categories.length ? categories : ['Marketing', 'Self-Improvement', 'Management']).map((c) => (
              <span key={c} className="text-xs bg-white/10 px-3 py-1.5 rounded-full uppercase tracking-wide font-bold">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/welcome-notes" className="text-gray-400 hover:text-gold transition">→ Welcome Notes</Link>
            <Link href="/philosophy" className="text-gray-400 hover:text-gold transition">→ Philosophy</Link>
            <Link href="/portfolio" className="text-gray-400 hover:text-gold transition">→ Portfolio</Link>
            <Link href="/about" className="text-gray-400 hover:text-gold transition">→ About</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gold transition">→ Blog</Link>
            <Link href="/contact" className="text-gray-400 hover:text-gold transition">→ Contact</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>SIVANN.COM © Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link href="/welcome-notes" className="hover:text-gold transition">Welcome Notes</Link>
          <Link href="/" className="hover:text-gold transition">Profile</Link>
          <Link href="/about" className="hover:text-gold transition">About Us</Link>
          <Link href="/contact" className="hover:text-gold transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
