import { getSiteInfo, getAbout } from '@/lib/wp';

export default function HeroAbout() {
  const site = getSiteInfo();
  const about = getAbout();

  return (
    <section id="about-me" className="scroll-mt-20">
      {/* Parallax-style hero */}
      <div className="relative bg-ink pt-32 lg:pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-panel opacity-95" />
        <div className="absolute -right-40 -top-40 w-[36rem] h-[36rem] bg-gold/10 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-6 relative grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-gold/70 bg-gradient-to-br from-panel to-ink flex items-center justify-center">
              <span className="text-white/25 text-6xl font-bold">TS</span>
            </div>
          </div>
          <div className="md:col-span-8">
            <h1 className="text-gold font-extrabold text-5xl md:text-6xl tracking-tight mb-3">TE Sivann</h1>
            <p className="text-white text-lg mb-1">{site.location.toUpperCase()}</p>
            <p className="text-gray-300 mb-4">
              CONSULTANT &amp; COACH ON <span className="block sm:inline">DIGITAL | STARTUP | WEBSTIGY</span>
            </p>
            <p className="text-gray-400 mb-6">
              <span className="text-white font-semibold">PREVIOUS:</span> MARKETING MANAGER AT FORVAL
              &nbsp;·&nbsp;
              <span className="text-white font-semibold">EDUCATION:</span> MASTER IN BUSINESS MANAGEMENT
            </p>
          </div>
        </div>

        {/* 3-column info strip like the original about-me-links */}
        <div className="max-w-6xl mx-auto px-6 relative mt-10 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-t border-white/10 pt-8">
          <a href="#say-hello" className="text-center px-4 py-3 group">
            <p className="text-white group-hover:text-gold transition text-sm font-medium">Contact Information</p>
          </a>
          <a href="#say-hello" className="text-center px-4 py-3 group">
            <p className="text-white group-hover:text-gold transition text-sm font-medium">Send Message</p>
          </a>
          <a href={`mailto:${site.email}`} className="text-center px-4 py-3 group">
            <p className="text-white group-hover:text-gold transition text-sm font-medium">Download Resume</p>
          </a>
        </div>
      </div>

      {/* About details */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4">Personal Details</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-8">
              {about.personal.map((row) => (
                <div key={row.label}>
                  <span className="text-ink font-medium">{row.label}:</span>{' '}
                  <span className="text-gray-500">{row.value}</span>
                </div>
              ))}
              {about.contact.map((row) => (
                <div key={row.label}>
                  <span className="text-ink font-medium">{row.label}:</span>{' '}
                  <span className="text-gray-500">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-extrabold text-3xl mb-4">ABOUT ME</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{about.bio}</p>
            <a href="#say-hello" className="inline-block border border-ink text-ink text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded hover:bg-gold hover:border-gold hover:text-ink transition">
              View More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
