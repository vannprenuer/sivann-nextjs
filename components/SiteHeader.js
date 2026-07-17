'use client';
import { useState } from 'react';
import Link from 'next/link';

const items = [
  { href: '/', label: 'Welcome Notes', key: 'home' },
  { href: '/#about-me', label: 'Philosophy', key: 'philosophy' },
  { href: '/', label: 'Profile', key: 'profile' },
  { href: '/portfolio', label: 'Portfolio', key: 'portfolio' },
  { href: '/about', label: 'About', key: 'about' },
  { href: '/blog', label: 'Blog', key: 'blog' },
  { href: '/#say-hello', label: 'Contact', key: 'contact' },
];

// Classic top navigation bar matching the original site's header — used on
// every page except the homepage (which keeps the floating icon nav).
export default function SiteHeader({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-lg tracking-wide text-ink">
          TE<span className="text-gold">Sivann</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {items.map((it) => (
            <Link
              key={it.key}
              href={it.href}
              className={`text-sm font-semibold transition ${
                active === it.key ? 'text-purple' : 'text-ink hover:text-purple'
              }`}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-ink"
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {items.map((it) => (
            <Link
              key={it.key}
              href={it.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold ${active === it.key ? 'text-purple' : 'text-ink'}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
