import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageBanner from '@/components/PageBanner';
import { getWelcomeNotes } from '@/lib/wp';

export const metadata = {
  title: 'Welcome Notes — TE Sivann',
  description: 'A personal welcome note from TE Sivann, publisher and author of sivann.com.',
};

export default function WelcomeNotesPage() {
  const notes = getWelcomeNotes();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="welcome-notes" />
      <PageBanner title="Welcome Notes" subtitle={notes.eyebrow} />

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-gray-500 italic text-lg mb-2">{notes.quote}</p>
          <p className="text-xs font-bold uppercase tracking-widest text-gold">— {notes.quoteAuthor}</p>
        </section>

        <section className="max-w-3xl mx-auto px-6 pb-16">
          {notes.body.split('\n\n').map((p, i) => (
            <p key={i} className="text-gray-500 leading-relaxed mb-4">{p}</p>
          ))}
        </section>

        <section className="bg-purple">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {notes.stats.map((s) => (
              <div key={s.label}>
                <p className="text-white font-extrabold text-3xl md:text-4xl">{s.value}</p>
                <p className="text-white/70 text-xs font-bold uppercase tracking-wide mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-extrabold text-2xl mb-10 text-center">More From Sivann.com</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {notes.cards.map((c) => (
              <div key={c.title}>
                <h3 className="font-extrabold text-sm uppercase tracking-wide mb-3">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-bg1">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h2 className="font-extrabold text-2xl mb-4">{notes.cta.heading}</h2>
            <p className="text-gray-500 leading-relaxed mb-8">{notes.cta.text}</p>
            <a
              href="/blog"
              className="inline-block bg-ink text-white font-bold text-xs uppercase tracking-wide px-8 py-4 rounded hover:brightness-125 transition"
            >
              {notes.cta.button}
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
