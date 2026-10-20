/**
 * Stats — baris 4 statistik dengan animasi CountUp
 * Menggunakan counter sederhana yang diaktifkan saat terlihat di viewport.
 */
import { useState, useEffect, useRef } from 'react';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * CountUpNumber — angka yang naik dari 0 ke target saat terlihat
 */
function CountUpNumber({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const hasAnimated = useRef(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Jika reduced motion, langsung tampilkan angka akhir
    if (prefersReduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(end);
      return;
    }

    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, prefersReduced]);

  return (
    <span ref={ref} className="text-5xl lg:text-6xl font-heading font-normal gradient-gold-text tabular-nums tracking-tight">
      {count}{suffix}
    </span>
  );
}

// Data statistik
const STATS_DATA = [
  { value: 3, suffix: '+', key: 'experience' },
  { value: 25, suffix: '+', key: 'projects' },
  { value: 15, suffix: '+', key: 'clients' },
  { value: 98, suffix: '%', key: 'satisfaction' },
];

export default function Stats() {
  const { t } = useLang();

  return (
    <section className="py-16 lg:py-20 border-y border-border bg-surface/50" aria-label="Statistics">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS_DATA.map((stat) => (
            <div key={stat.key} className="text-center">
              <CountUpNumber end={stat.value} suffix={stat.suffix} />
              <p className="text-muted text-sm font-medium mt-2">{t.stats[stat.key]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
