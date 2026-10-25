/**
 * Services — ringkasan layanan web dan pemasaran digital
 */
import { Code2, Globe, Megaphone, PanelsTopLeft, Workflow } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { servicesData } from '../data/services';

// Mapping ikon
const iconMap = {
  Globe,
  Code2,
  Megaphone,
  PanelsTopLeft,
  Workflow,
};

export default function Services() {
  const { t, lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });

  return (
    <section id="services" className="section-padding bg-surface/30" aria-label="Services" ref={ref}>
      <div className="container-main">
        <SectionTitle
          title={t.services.sectionTitle}
          subtitle={t.services.sectionSubtitle}
        />

        <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6
          transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {servicesData.map((service, i) => {
            const Icon = iconMap[service.icon];
            const title = service.title[lang] || service.title.en;
            const description = service.description[lang] || service.description.en;

            return (
              <div
                key={service.id}
                className="group p-5 sm:p-6 rounded-[var(--radius-card)] bg-bg border border-border card-shadow
                  hover:border-gold/40 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Ikon */}
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4
                  group-hover:bg-gold/20 transition-colors duration-300">
                  {Icon && <Icon size={21} strokeWidth={1.7} className="text-gold" />}
                </div>

                {/* Judul */}
                <h3 className="font-heading font-semibold text-text text-lg mb-3 group-hover:text-gold-text
                  transition-colors duration-300">
                  {title}
                </h3>

                {/* Deskripsi */}
                <p className="text-muted text-[0.9375rem] leading-relaxed">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
