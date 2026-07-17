import { getEducation, getSkills, getLanguages } from '@/lib/wp';

export default async function EducationSkills() {
  const education = await getEducation();
  const skills = getSkills();
  const languages = getLanguages();

  return (
    <>
      <section id="education" className="scroll-mt-20 bg-bg2 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-extrabold text-3xl mb-10">EDUCATION</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {education.map((ed) => (
              <div key={ed.school} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center text-gold text-sm mb-4">🎓</div>
                <p className="font-bold mb-1 leading-snug">{ed.school}</p>
                <p className="text-sm text-gray-500 mb-2">{ed.degree}</p>
                <p className="text-gold text-sm font-bold">{ed.years}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-20 bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-extrabold text-3xl mb-8">SKILLS &amp; LANGUAGE</h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {skills.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs font-bold text-ink mb-1.5">
                    <span>{s.label}</span>
                    <span>{s.value}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-1.5 bg-ink rounded-full" style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Languages</h4>
            <ul className="space-y-3 text-sm">
              {languages.map((l) => (
                <li key={l.label} className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-semibold text-ink">{l.label}</span>
                  <span className="text-gray-500">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
