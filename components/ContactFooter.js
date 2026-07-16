import { getSiteInfo } from '@/lib/wp';
import ContactForm from './ContactForm';

export default function ContactFooter() {
  const site = getSiteInfo();
  return (
    <>
      <section id="say-hello" className="scroll-mt-20 grid md:grid-cols-2">
        <div className="bg-gold px-6 md:px-16 py-16 flex flex-col justify-center">
          <h2 className="font-extrabold text-2xl mb-6 text-ink">SAY HELLO</h2>
          <ContactForm />
        </div>
        <div className="bg-ink px-6 md:px-16 py-16 flex flex-col justify-center gap-6">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Email</p>
            <p className="text-white text-xl font-light">{site.email}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Phone | Telegram | WeChat | Line</p>
            <p className="text-white text-xl font-light">{site.phone}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">Follow Me</p>
            <div className="flex gap-3 text-white text-sm">
              <a href={site.social.facebook} className="hover:text-gold transition">Facebook</a>
              <a href={site.social.instagram} className="hover:text-gold transition">Instagram</a>
              <a href={site.social.linkedin} className="hover:text-gold transition">LinkedIn</a>
              <a href={site.social.twitter} className="hover:text-gold transition">Twitter</a>
              <a href={site.social.youtube} className="hover:text-gold transition">YouTube</a>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-ink border-t border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} TE Sivann · sivann.com
        </div>
      </footer>
    </>
  );
}
