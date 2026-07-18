'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

// Full-bleed hero slider for the top of the blog page, matching the
// original site's featured-article slider (one large image at a time,
// category tags + title overlaid, prev/next arrows, dot indicators).
export default function FeaturedSlider({ posts }) {
  const [index, setIndex] = useState(0);
  const count = posts.length;

  const go = useCallback(
    (i) => setIndex(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => go(index + 1), 6000);
    return () => clearInterval(id);
  }, [index, count, go]);

  if (!count) return null;
  const post = posts[index];

  return (
    <div className="relative h-[380px] md:h-[480px] w-full overflow-hidden bg-ink group">
      {posts.map((p, i) => (
        <Link
          key={p.id}
          href={`/blog/${p.id}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={p.imageAlt || p.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-panel" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-3xl">
            <div className="flex gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wide bg-gold text-ink px-3 py-1 rounded">
                {p.category}
              </span>
            </div>
            <h2 className="text-white font-extrabold text-2xl md:text-4xl leading-tight mb-2">{p.title}</h2>
            <p className="hidden md:block text-white/70 text-sm leading-relaxed line-clamp-2">{p.excerpt}</p>
          </div>
        </Link>
      ))}

      {count > 1 && (
        <>
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="absolute z-20 left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            ‹
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute z-20 right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            ›
          </button>
          <div className="absolute z-20 bottom-4 right-6 flex gap-2">
            {posts.map((p, i) => (
              <button
                key={p.id}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition ${i === index ? 'bg-gold w-6' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
