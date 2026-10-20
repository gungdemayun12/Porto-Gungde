/**
 * Experience — timeline vertikal pengalaman kerja
 */
import { Briefcase } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { experienceData } from '../data/experience';

export default function Experience() {
  const { t, lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });

  return (
    <section id="experience" className="section-padding bg-surface/30" aria-label="Experience" ref={ref}>
      <div className="container-main">
        <SectionTitle
          label="CAREER & TRACK RECORD"
          title={t.experience.sectionTitle}
          subtitle={t.experience.sectionSubtitle}
        />

        {/* Timeline vertikal */}
        <div className={`max-w-3xl mx-auto transition-all duration-700
          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {experienceData.map((exp, i) => {
            const position = exp.position[lang] || exp.position.en;
            const description = exp.description[lang] || exp.description.en;
            const year = lang === 'id' ? exp.yearId : exp.year;

            return (
              <div key={i} className="flex gap-6 group" style={{ transitionDelay: `${i * 100}ms` }}>
                {/* Garis timeline + dot */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center
                    group-hover:bg-gold/20 group-hover:border-gold/50 transition-all duration-300">
                    <Briefcase size={16} className="text-gold" />
                  </div>
                  {i < experienceData.length - 1 && (
                    <div className="w-px flex-1 bg-border group-hover:bg-gold/30 transition-colors duration-300" />
                  )}
                </div>

                {/* Konten */}
                <div className="pb-10">
                  <span className="font-mono text-xs text-gold-text mb-1 block">{year}</span>
                  <h3 className="font-heading font-semibold text-text text-lg">{position}</h3>
                  <p className="text-gold-text font-medium text-sm mb-2">{exp.company}</p>
                  <p className="text-muted text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
