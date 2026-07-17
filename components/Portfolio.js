import Link from 'next/link';
import { getPortfolio } from '@/lib/wp';

const gradients = [
  'from-panel to-ink',
  'from-gold/30 to-panel',
];

export default async function Portfolio() {
  const items = await getPortfolio(9);
  return (
    <section id="portfolio" className="scroll-mt-20 bg-bg1 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-extrabold text-3xl">PORTFOLIO</h2>
          <Link href="/portfolio" className="text-sm font-bold text-ink hover:text-gold transition hidden sm:block">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <Link
              key={p.id}
              href={`/portfolio/${p.id}`}
              className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition block"
            >
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.imageAlt || p.title} className="w-full h-40 object-cover" loading="lazy" />
              ) : (
                <div className={`h-40 bg-gradient-to-br ${gradients[i % 2]} flex items-center justify-center text-white/50 text-xs font-bold uppercase tracking-wide`}>
                  {p.category}
                </div>
              )}
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-1">{new Date(p.date).getFullYear()}</p>
                <p className="font-bold leading-snug">{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
