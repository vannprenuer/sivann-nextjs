import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageBanner from '@/components/PageBanner';
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
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="portfolio" />
      <PageBanner title={item.title} crumb="Portfolio" />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <Link href="/portfolio" className="text-sm font-bold text-purple hover:underline">← Back to portfolio</Link>
        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.imageAlt || item.title} className="w-full max-h-96 object-cover rounded-lg mt-6" />
        )}
        <p className="text-xs text-gold font-bold uppercase tracking-wide mt-6 mb-2">
          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          {' · '}{item.category}
        </p>
        <h1 className="font-extrabold text-3xl md:text-4xl mb-8 leading-tight">{item.title}</h1>
        <div
          className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-a:text-purple prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
