'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const gradients = ['from-panel to-ink', 'from-gold/30 to-panel', 'from-purple/40 to-ink'];

export default function PortfolioGrid({ items }) {
  const categories = useMemo(
    () => ['Show All', ...new Set(items.map((i) => i.category).filter(Boolean))],
    [items]
  );
  const [active, setActive] = useState('Show All');
  const filtered = active === 'Show All' ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6 mb-10 border-b border-gray-100 pb-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`text-xs font-bold uppercase tracking-wide pb-2 border-b-2 transition ${
              active === c ? 'text-purple border-purple' : 'text-gray-400 border-transparent hover:text-ink'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-1">
        {filtered.map((p, i) => (
          <Link
            key={p.id}
            href={`/portfolio/${p.id}`}
            className="group relative block h-56 overflow-hidden"
          >
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt={p.imageAlt || p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${gradients[i % gradients.length]}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-white/90 text-ink px-2 py-1 rounded">
              {p.category}
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-sm leading-snug">{p.title}</p>
              <p className="text-white/60 text-xs mt-1">{new Date(p.date).getFullYear()}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-16">No items in this category yet.</p>
      )}
    </div>
  );
}
