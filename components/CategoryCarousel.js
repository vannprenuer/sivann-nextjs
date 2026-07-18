'use client';
import { useRef } from 'react';
import Link from 'next/link';

// Horizontal carousel of full cards (image + date badge, title, excerpt,
// read more) used for the Business & Marketing section of the blog page --
// matches the original site's Owl Carousel row for that category.
export default function CategoryCarousel({ heading, categorySlug, posts }) {
  const trackRef = useRef(null);

  function scrollBy(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  }

  if (!posts?.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-extrabold text-lg uppercase tracking-wide">{heading}</h2>
        {categorySlug && (
          <Link href={`/blog?category=${categorySlug}`} className="text-xs font-bold uppercase tracking-wide text-purple hover:underline">
            View All +
          </Link>
        )}
      </div>

      <div className="relative group">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {posts.map((p) => {
            const d = new Date(p.date);
            return (
              <Link key={p.id} href={`/blog/${p.id}`} className="flex-shrink-0 w-72 snap-start block group/card">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.imageAlt || p.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-bg1" />
                  )}
                  <div className="absolute top-2 right-2 bg-white rounded shadow px-2 py-1 text-center leading-none">
                    <p className="text-sm font-extrabold text-ink">{d.getDate().toString().padStart(2, '0')}</p>
                    <p className="text-[10px] uppercase font-bold text-gold">{d.toLocaleDateString('en-US', { month: 'short' })}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="font-bold text-sm leading-snug mb-2 group-hover/card:text-purple transition line-clamp-2">{p.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">{p.excerpt}</p>
                  <span className="text-xs font-bold uppercase tracking-wide text-purple">Read More +</span>
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
              className="hidden md:flex absolute z-10 left-0 top-16 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              ‹
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="hidden md:flex absolute z-10 right-0 top-16 -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-white shadow border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              ›
            </button>
          </>
        )}
      </div>
    </section>
  );
}
