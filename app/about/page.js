import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageBanner from '@/components/PageBanner';
import { getAbout, getSiteInfo } from '@/lib/wp';

export const metadata = {
  title: 'About Us — TE Sivann',
  description: 'A closer look at TE Sivann — blogger, content writer, consultant, coach, and designer.',
};

export default function AboutPage() {
  const about = getAbout();
  const site = getSiteInfo();
  const page = about.page;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="about" />
      <PageBanner title="About Us" subtitle={page.family.text.split('\n\n')[0]} />

      <main className="flex-1">
        {/* Roles + quote */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">I am a</p>
          <h1 className="font-extrabold text-2xl md:text-3xl leading-snug mb-6">
            {page.roles.join(' · ')}
            <br />
            in Professional Career
          </h1>
          <p className="text-gray-500 italic max-w-2xl mx-auto">{page.quote}</p>
        </section>

        {/* Three feature cards */}
        <section className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-10">
          {page.cards.map((c) => (
            <div key={c.title}>
              <h3 className="font-extrabold text-sm uppercase tracking-wide mb-3">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </section>

        {/* Stats bar */}
        <section className="bg-purple">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {page.stats.map((s) => (
              <div key={s.label}>
                <p className="text-white font-extrabold text-3xl md:text-4xl">{s.value}</p>
                <p className="text-white/70 text-xs font-bold uppercase tracking-wide mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Welcome text */}
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="font-extrabold text-2xl mb-6">Welcome to my site SIVANN-DOT-COM</h2>
          {page.welcome.split('\n\n').map((p, i) => (
            <p key={i} className="text-gray-500 leading-relaxed mb-4">{p}</p>
          ))}
        </section>

        {/* Family */}
        <section className="bg-bg1">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h2 className="font-extrabold text-2xl mb-6">{page.family.heading}</h2>
            {page.family.text.split('\n\n').map((p, i) => (
              <p key={i} className="text-gray-500 leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        </section>

        {/* Freelance projects */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-extrabold text-2xl mb-2 text-center">{page.freelance.heading}</h2>
          {page.freelance.text.split('\n\n').map((p, i) => (
            <p key={i} className="text-gray-500 leading-relaxed mb-4 text-center max-w-2xl mx-auto">{p}</p>
          ))}
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {page.freelance.quotes.map((q, i) => (
              <blockquote key={i} className="border-l-4 border-gold pl-6 py-2">
                <p className="text-ink leading-relaxed mb-3">&ldquo;{q}&rdquo;</p>
                <footer className="text-sm text-gray-400">
                  <span className="font-bold text-ink">{site.name}</span> · Katy Studio
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
