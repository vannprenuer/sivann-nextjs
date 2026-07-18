import Link from 'next/link';
import { getRecentPosts, getSiteInfo, getCategories } from '@/lib/wp';
import { footerAbout, footerLinks } from '@/lib/content';

const socialIcons = {
  Facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  ),
  RSS: (
    <path d="M6.18 17.82a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 4.44v3.6c7.73 0 13.96 6.23 13.96 13.96h3.6C21.56 12.6 13.4 4.44 4 4.44zm0 7.13v3.6c3.8 0 6.83 3.03 6.83 6.83h3.6c0-5.77-4.66-10.43-10.43-10.43z" />
  ),
  YouTube: (
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
  ),
  Instagram: (
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.5.01-4.73.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.96-.2-1.48-.34-1.83a3.03 3.03 0 0 0-.74-1.13 3.03 3.03 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34-1.23-.06-1.58-.07-4.73-.07zm0 4.59a5.45 5.45 0 1 1 0 10.9 5.45 5.45 0 0 1 0-10.9zm0 1.8a3.65 3.65 0 1 0 0 7.3 3.65 3.65 0 0 0 0-7.3zm5.66-1.99a1.27 1.27 0 1 1-2.55 0 1.27 1.27 0 0 1 2.55 0z" />
  ),
  LinkedIn: (
    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
  ),
  Telegram: (
    <path d="M21.94 4.5 18.6 20.3c-.25 1.12-.9 1.4-1.83.87l-5.06-3.73-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.15 9.38-8.47c.41-.36-.09-.56-.63-.2L6.05 13.3l-5.05-1.58c-1.1-.34-1.12-1.1.23-1.63L20.6 3.4c.92-.34 1.72.2 1.34 1.1z" />
  ),
};

export default async function SiteFooter() {
  const site = getSiteInfo();
  const posts = await getRecentPosts(3);
  const categories = await getCategories();

  return (
    <footer className="bg-panel text-gray-300 pt-16 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">{footerAbout.heading}</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">{footerAbout.text}</p>
          <Link href={footerAbout.viewMoreHref} className="text-xs font-bold uppercase tracking-wide text-gold hover:underline">
            View More &gt;
          </Link>

          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mt-6 mb-3">Follow Us</p>
          <div className="flex flex-wrap gap-3">
            {[
              ['Facebook', site.social.facebook],
              ['RSS', site.social.rss],
              ['YouTube', site.social.youtube],
              ['Instagram', site.social.instagram],
              ['LinkedIn', site.social.linkedin],
              ['Telegram', site.social.telegram],
            ]
              .filter(([, href]) => href)
              .map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-ink transition"
                  title={label}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    {socialIcons[label]}
                  </svg>
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
          <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Blog Features</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c.name} className="text-xs bg-white/10 px-3 py-1.5 rounded-full uppercase tracking-wide font-bold">
                {c.name} ({c.count})
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2 text-sm mb-6">
            {footerLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-gray-400 hover:text-gold transition"
              >
                › {l.label}
              </Link>
            ))}
          </div>
          <div className="w-full h-28 rounded-lg bg-gradient-to-br from-purple via-ink to-panel" />
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
