import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageBanner from '@/components/PageBanner';
import PortfolioGrid from '@/components/PortfolioGrid';
import { getPortfolio } from '@/lib/wp';

export const metadata = {
  title: 'Portfolio — TE Sivann',
  description: 'Career highlights, education milestones, and life events.',
};

export default async function PortfolioIndex() {
  const items = await getPortfolio(100);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="portfolio" />
      <PageBanner title="Life Portfolios" crumb="Portfolio" />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
        <PortfolioGrid items={items} />
      </main>
      <SiteFooter />
    </div>
  );
}
