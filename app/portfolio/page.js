import Link from 'next/link';
import { getPortfolio } from '@/lib/wp';

export const metadata = {
  title: 'Portfolio — TE Sivann',
  description: 'Career highlights, education milestones, and life events.',
};

const gradients = ['from-panel to-ink', 'from-gold/30 to-panel'];

export default async function PortfolioIndex() {
  const items = await getPortfolio(100);
  return (
    <main className="min-h-screen bg-bg1">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link href="/#portfolio" className="text-sm font-bold text-ink hover:text-gold transition">← Back to home</Link>
        <h1 className="font-extrabold text-3xl mt-4 mb-10">PORTFOLIO</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <Link
              key={p.id}
              href={`/portfolio/${p.id}`}
              className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition block"
            >
              <div className={`h-40 bg-gradient-to-br ${gradients[i % 2]} flex items-center justify-center text-white/50 text-xs font-bold uppercase tracking-wide`}>
                {p.category}
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-1">{new Date(p.date).getFullYear()}</p>
                <p className="font-bold leading-snug">{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
