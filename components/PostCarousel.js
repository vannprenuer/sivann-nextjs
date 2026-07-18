'use client';
import { useRef } from 'react';
import Link from 'next/link';

// Horizontally scrolling row of post cards with a date badge, used just
// below the hero slider on the blog page (matches the original site's
// "more recent articles" carousel row).
export default function PostCarousel({ posts }) {
  const trackRef = useRef(null);

  function scrollBy(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  }

  if (!posts.length) return null;

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-10 group">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {posts.map((p) => {
          const d = new Date(p.date);
          return (
            <Link
              key={p.id}
              href={`/blog/${p.id}`}
              className="relative flex-shrink-0 w-64 snap-start rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition block"
            >
              <div className="relative h-36">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.imageAlt || p.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-bg1" />
                )}
                <div className="absolute top-2 right-2 bg-white rounded shadow px-2 py-1 text-center leading-none">
                  <p className="text-sm font-extrabold text-ink">{d.getDate().toString().padStart(2, '0')}</p>
                  <p className="text-[10px] uppercase font-bold text-gold">{d.toLocaleDateString('en-US', { month: 'short' })}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-gold mb-1">{p.category}</p>
                <p className="font-bold text-sm leading-snug line-clamp-2">{p.title}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {posts.length > 3 && (
        <>
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="hidden md:flex absolute z-10 left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="hidden md:flex absolute z-10 right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-white shadow border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
