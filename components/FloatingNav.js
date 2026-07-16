'use client';
import { useState } from 'react';

const items = [
  { href: '#about-me', label: 'About Me', icon: '☺' },
  { href: '#experience', label: 'Experience', icon: '💼' },
  { href: '#education', label: 'Education', icon: '🎓' },
  { href: '#skills', label: 'Skills', icon: '⚡' },
  { href: '#portfolio', label: 'Portfolio', icon: '🗂' },
  { href: '#quote', label: 'Quote of the Day', icon: '💬' },
  { href: '#blog', label: 'Blog', icon: '✎' },
  { href: '#say-hello', label: 'Say Hello', icon: '✉' },
];

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Desktop floating side nav */}
      <nav className="hidden lg:flex flex-col gap-1 fixed left-4 top-1/2 -translate-y-1/2 z-40">
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            title={it.label}
            className="group w-11 h-11 rounded-full bg-ink/90 hover:bg-gold flex items-center justify-center text-white hover:text-ink transition shadow-md"
          >
            <span className="text-base">{it.icon}</span>
            <span className="pointer-events-none absolute left-14 whitespace-nowrap bg-ink text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition">
              {it.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-ink/95 backdrop-blur flex items-center justify-between px-5 h-14 border-b border-white/5">
        <a href="#top" className="text-white font-bold tracking-wide">TE<span className="text-gold">Sivann</span></a>
        <button onClick={() => setOpen(!open)} className="text-white" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden fixed top-14 inset-x-0 z-40 bg-ink border-b border-white/5 px-5 py-4 flex flex-col gap-3">
          {items.map((it) => (
            <a key={it.href} href={it.href} onClick={() => setOpen(false)} className="text-gray-300 hover:text-gold text-sm">
              {it.icon} &nbsp; {it.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
