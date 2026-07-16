'use client';
import { useEffect, useState } from 'react';

export default function QuoteCarousel({ quotes }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % quotes.length), 5000);
    return () => clearInterval(t);
  }, [quotes.length]);

  const q = quotes[i];
  return (
    <section id="quote" className="scroll-mt-20 bg-gold py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-extrabold text-2xl md:text-3xl mb-8 text-ink">QUOTE OF THE DAY — MY DAY MY QUOTE</h2>
        <p className="font-serif italic text-2xl md:text-3xl text-ink mb-6 leading-snug min-h-[5rem]">
          &ldquo;{q.text}&rdquo;
        </p>
        <p className="font-bold text-ink/70 uppercase text-sm tracking-wide">— {q.author}</p>
        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`w-2.5 h-2.5 rounded-full transition ${idx === i ? 'bg-ink' : 'bg-ink/30'}`}
              aria-label={`Show quote ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
