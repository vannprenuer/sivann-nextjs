import { getExperience } from '@/lib/wp';

export default function Experience() {
  const items = getExperience();
  return (
    <section id="experience" className="scroll-mt-20 bg-bg1 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-extrabold text-3xl mb-10">EXPERIENCE</h2>
        <div className="space-y-10 border-l-2 border-ink/10 pl-8">
          {items.map((exp, i) => (
            <div key={exp.heading} className="relative">
              <span className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 border-bg1 ${i === 0 ? 'bg-gold' : 'bg-ink'}`} />
              <p className="text-xs text-gray-500 font-semibold mb-1">
                {exp.from.toUpperCase()} — {exp.to.toUpperCase()} &nbsp;{exp.duration}
              </p>
              <h3 className="font-bold text-lg">{exp.heading}</h3>
              <p className="text-sm text-gray-500 mb-2">{exp.company} · {exp.location}</p>
              <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
