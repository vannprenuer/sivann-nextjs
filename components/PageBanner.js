import Link from 'next/link';

// The colored breadcrumb + title banner the original site shows at the top
// of every inner page (About, Blog, Portfolio, single posts, etc).
export default function PageBanner({ title, crumb, subtitle }) {
  return (
    <div className="bg-ink py-14 md:py-20 text-center px-6">
      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2 text-white/40">/</span>
        <span className="text-white/70">{crumb ?? title}</span>
      </p>
      <h1 className="font-extrabold text-3xl md:text-4xl text-white">{title}</h1>
      {subtitle && <p className="text-white/60 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
