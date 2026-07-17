import Link from 'next/link';
import { notFound } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import { getPortfolioById } from '@/lib/wp';

export async function generateMetadata({ params }) {
  const item = await getPortfolioById(params.id);
  if (!item) return { title: 'Portfolio item not found — TE Sivann' };
  return {
    title: `${item.title} — TE Sivann Portfolio`,
    description: item.description,
  };
}

export default async function PortfolioItem({ params }) {
  const item = await getPortfolioById(params.id);
  if (!item) notFound();

  return (
    <main className="min-h-screen bg-white pt-14 lg:pt-0">
      <FloatingNav />
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt={item.imageAlt || item.title} className="w-full max-h-96 object-cover" />
      )}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/portfolio" className="text-sm font-bold text-ink hover:text-gold transition">← Back to portfolio</Link>
        <p className="text-xs text-gold font-bold uppercase tracking-wide mt-6 mb-2">
          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          {' · '}{item.category}
        </p>
        <h1 className="font-extrabold text-3xl md:text-4xl mb-8 leading-tight">{item.title}</h1>
        <div
          className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-a:text-purple prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </article>
    </main>
  );
}
