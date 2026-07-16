import FloatingNav from '@/components/FloatingNav';
import HeroAbout from '@/components/HeroAbout';
import Experience from '@/components/Experience';
import EducationSkills from '@/components/EducationSkills';
import Portfolio from '@/components/Portfolio';
import QuoteCarousel from '@/components/QuoteCarousel';
import Blog from '@/components/Blog';
import ContactFooter from '@/components/ContactFooter';
import { getQuotes } from '@/lib/wp';

export default function Home() {
  const quotes = getQuotes();
  return (
    <main id="top">
      <FloatingNav />
      <HeroAbout />
      <Experience />
      <EducationSkills />
      <Portfolio />
      <QuoteCarousel quotes={quotes} />
      <Blog />
      <ContactFooter />
    </main>
  );
}
