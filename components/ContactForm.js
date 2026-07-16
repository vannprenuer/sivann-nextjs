'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="max-w-md bg-white/70 border border-ink/10 rounded px-4 py-6 text-sm text-ink font-semibold">
        Thanks — your message has been sent. I'll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        required
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full bg-white/70 border border-ink/10 rounded px-4 py-3 text-sm focus:outline-none focus:bg-white"
      />
      <input
        type="email"
        required
        placeholder="Your email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full bg-white/70 border border-ink/10 rounded px-4 py-3 text-sm focus:outline-none focus:bg-white"
      />
      <textarea
        required
        placeholder="Message"
        rows="4"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full bg-white/70 border border-ink/10 rounded px-4 py-3 text-sm focus:outline-none focus:bg-white"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-ink text-white font-bold text-xs uppercase tracking-wide px-6 py-3 rounded hover:brightness-125 transition disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-xs font-semibold">Something went wrong — please try again in a moment.</p>
      )}
    </form>
  );
}
