/**
 * Process — tahapan kerja dalam kartu ringan yang responsif.
 */
import { ClipboardCheck, Code2, PanelsTopLeft, Search } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import './Process.css';

const stepIcons = [Search, PanelsTopLeft, Code2, ClipboardCheck];

export default function Process() {
  const { t } = useLang();
  const { ref, isInView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -8% 0px',
  });

  return (
    <section
      id="process"
      className="process-section section-padding"
      aria-label={t.process.sectionTitle}
      ref={ref}
    >
      <div className="container-main">
        <SectionTitle
          label={t.process.label}
          title={t.process.sectionTitle}
          subtitle={t.process.sectionSubtitle}
        />

        <div className={`process-grid${isInView ? ' process-grid--visible' : ''}`}>
          {t.process.steps.map((step, index) => {
            const Icon = stepIcons[index] || Code2;

            return (
              <article
                key={step.title}
                className="process-card"
                style={{ '--process-delay': `${index * 90}ms` }}
              >
                <div className="process-card__top">
                  <span className="process-card__number">
                    <span>STEP</span>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="process-card__icon" aria-hidden="true">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                </div>

                <h3 className="process-card__title">{step.title}</h3>
                <p className="process-card__description">{step.description}</p>

                <div className="process-card__footer" aria-hidden="true">
                  <span />
                  <span className="process-card__footer-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
