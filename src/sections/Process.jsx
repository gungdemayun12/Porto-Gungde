/**
 * Process — timeline 4 langkah proses kerja
 * Garis emas yang "terisi" sesuai progres scroll.
 */
import { useState, useEffect, useRef } from 'react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { useLang } from '../hooks/useLang';

// Ikon per langkah
const stepIcons = [Search, PenTool, Code, Rocket];

export default function Process() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Hitung progres scroll untuk mengisi garis emas
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Mulai mengisi ketika section masuk viewport
      const start = rect.top - windowHeight;
      const end = rect.bottom;
      const total = end - start;
      const current = -start;

      const pct = Math.max(0, Math.min(1, current / total));
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="process" className="section-padding" aria-label="Process" ref={sectionRef}>
      <div className="container-main">
        <SectionTitle
          label="WORKFLOW & METHODOLOGY"
          title={t.process.sectionTitle}
          subtitle={t.process.sectionSubtitle}
        />

        {/* Timeline horizontal di desktop, vertikal di mobile */}
        <div className="relative">
          {/* Desktop: horizontal */}
          <div className="hidden lg:block">
            {/* Garis background */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
            {/* Garis progres emas */}
            <div
              className="absolute top-8 left-0 h-0.5 gradient-gold transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />

            <div className="grid grid-cols-4 gap-8 relative">
              {t.process.steps.map((step, i) => {
                const Icon = stepIcons[i];
                const isActive = progress >= (i + 0.5) / 4;

                return (
                  <div key={i} className="text-center pt-16">
                    {/* Dot pada garis */}
                    <div className={`absolute top-5 w-6 h-6 rounded-full border-2 flex items-center justify-center
                      transition-all duration-500
                      ${isActive
                        ? 'bg-gold border-gold scale-110'
                        : 'bg-bg border-border'}`}
                      style={{ left: `calc(${(i / 3) * 100}% - 12px + ${i === 0 ? 12 : i === 3 ? -12 : 0}px)` }}
                    >
                      <div className={`w-2 h-2 rounded-full transition-colors duration-500
                        ${isActive ? 'bg-white' : 'bg-muted'}`} />
                    </div>

                    {/* Ikon */}
                    <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center
                      transition-all duration-500
                      ${isActive ? 'bg-gold/15 text-gold' : 'bg-surface text-muted'}`}>
                      <Icon size={24} />
                    </div>

                    {/* Step number */}
                    <span className="font-mono text-xs text-gold-text mb-2 block">0{i + 1}</span>

                    {/* Judul */}
                    <h3 className={`font-heading font-semibold text-lg mb-2 transition-colors duration-500
                      ${isActive ? 'text-text' : 'text-muted'}`}>
                      {step.title}
                    </h3>

                    {/* Deskripsi */}
                    <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: vertikal */}
          <div className="lg:hidden space-y-8">
            {t.process.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i} className="flex gap-4">
                  {/* Garis vertikal + dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-gold" />
                    </div>
                    {i < 3 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>

                  {/* Konten */}
                  <div className="pb-4">
                    <span className="font-mono text-xs text-gold-text">0{i + 1}</span>
                    <h3 className="font-heading font-semibold text-text text-lg mb-1">{step.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
