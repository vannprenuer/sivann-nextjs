import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageBanner from '@/components/PageBanner';
import ContactForm from '@/components/ContactForm';
import { getContactPage, getSiteInfo } from '@/lib/wp';

export const metadata = {
  title: 'Contact — TE Sivann',
  description: 'Get in touch with TE Sivann.',
};

export default function ContactPage() {
  const page = getContactPage();
  const site = getSiteInfo();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader active="contact" />
      <PageBanner title="Contact" subtitle={page.eyebrow} />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 w-full">
        <div>
          <p className="text-gray-500 leading-relaxed mb-8">{page.intro}</p>
          <ContactForm showSubject />
        </div>

        <div>
          <h3 className="font-extrabold text-lg uppercase tracking-wide mb-6">My Contact Info</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-purple text-white flex items-center justify-center flex-shrink-0">📞</span>
              <p className="text-ink"><span className="font-bold">Phone:</span> {site.phone}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-purple text-white flex items-center justify-center flex-shrink-0">✉</span>
              <p className="text-ink"><span className="font-bold">Email:</span> {site.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-purple text-white flex items-center justify-center flex-shrink-0">🏠</span>
              <p className="text-ink"><span className="font-bold">Address:</span> {site.address}</p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
