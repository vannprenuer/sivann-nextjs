import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageBanner from '@/components/PageBanner';
import { getPhilosophy } from '@/lib/wp';

export const metadata = {
  title: 'Philosophy — TE Sivann',
  description: 'The essence of philosophy and disciplines behind The Art of Non-ostentatious.',
};

export default function PhilosophyPage() {
  const p = getPhilosophy();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="philosophy" />
      <PageBanner title="Philosophy" subtitle={p.eyebrow} />

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-gray-500 italic text-lg">{p.intro}</p>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-8">
          {p.quotes.map((q) => (
            <blockquote key={q.author} className="border-l-4 border-gold pl-6 py-2">
              <p className="text-ink leading-relaxed mb-3">&ldquo;{q.text}&rdquo;</p>
              <footer className="text-sm text-gray-400 font-bold">{q.author}</footer>
            </blockquote>
          ))}
        </section>

        <section className="bg-bg1">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="font-extrabold text-2xl mb-8 text-center">The Essence of My Philosophy</h2>
            <div className="space-y-6">
              {p.essence.map((e, i) => (
                <div key={i} className="text-center">
                  <p className="text-gray-600 leading-relaxed">{e.en}</p>
                  {e.zh && <p className="text-gray-400 text-sm mt-1">{e.zh}</p>}
                  <p className="text-xs font-bold uppercase tracking-wide text-gold mt-2">TE Sivann</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="font-extrabold text-2xl mb-4">{p.disciplines.heading}</h2>
          <p className="text-gray-500 leading-relaxed mb-8">{p.disciplines.intro}</p>
          <ol className="inline-flex flex-col gap-3 text-left mx-auto">
            {p.disciplines.items.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-gold text-ink text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="font-semibold text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
