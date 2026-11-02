/**
 * About — dual-mode safe, Font Awesome icons, matched dual button pair.
 */
import { MapPin, CheckCircle2 } from 'lucide-react';
import gungdePhoto from '../assets/gungde.jpeg';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { CONTACT } from '../data/contact';
import Button from '../components/ui/Button';

const STAT_ITEMS = [
  { value: '10+', icon: 'fa-solid fa-briefcase', label: { en: 'Projects', id: 'Proyek' } },
  { value: '3+',  icon: 'fa-solid fa-award',     label: { en: 'Yrs. Exp', id: 'Thn. Pengalaman' } },
  { value: '100%',icon: 'fa-solid fa-mobile-screen-button', label: { en: 'Responsive', id: 'Responsif' } },
];

export default function About() {
  const { lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });
  const isId = lang === 'id';

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      aria-label="About"
      ref={ref}
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-main relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* ── Photo column ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[370px]">
              {/* Decorative offset frame */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border pointer-events-none"
                style={{ borderColor: 'rgba(179,130,38,0.3)', background: 'var(--color-surface)' }}
              />
              {/* Photo */}
              <div
                className="relative rounded-2xl overflow-hidden border shadow-xl aspect-[4/5]"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
              >
                <img
                  src={gungdePhoto}
                  alt="Gungde Mayun, web developer dan digital marketing"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {/* Location badge */}
                <div
                  className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3.5 py-1.5"
                  style={{
                    background: 'rgba(14,12,9,0.75)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                  }}
                >
                  <MapPin size={13} style={{ color: 'var(--color-gold)' }} />
                  <span className="text-xs font-mono font-medium">{CONTACT.locationShort}</span>
                </div>
              </div>

              {/* Stats row */}
              <div
                className="mt-4 grid grid-cols-3 rounded-xl overflow-hidden shadow-2xs"
                style={{
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                }}
              >
                {STAT_ITEMS.map(({ value, icon, label }, i) => (
                  <div
                    key={value}
                    className="flex flex-col items-center py-3.5 px-2 text-center"
                    style={{
                      borderRight: i < STAT_ITEMS.length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <i className={`${icon} text-xs mb-1`} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                    <span
                      className="text-lg sm:text-xl font-bold leading-tight"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                    >
                      {value}
                    </span>
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider mt-0.5 font-semibold"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {label[lang] || label.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Copy column ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: 'var(--color-gold)' }} />
              <span
                className="font-mono text-[11px] tracking-[0.28em] uppercase font-semibold"
                style={{ color: 'var(--color-gold-text)' }}
              >
                {isId ? 'TENTANG SAYA' : 'ABOUT ME'}
              </span>
            </div>

            {/* Heading */}
            <h2
              className="mb-6 leading-[1.1]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '-0.035em',
                color: 'var(--color-text)',
              }}
            >
              Web Developer
              <br />
              <em
                className="gradient-gold-text"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}
              >
                {isId ? 'Pemasaran Digital' : 'Digital Marketing'}
              </em>
            </h2>

            {/* Body copy */}
            <div
              className="space-y-4 text-[0.9375rem] leading-relaxed max-w-xl mb-8"
              style={{ color: 'var(--color-muted)' }}
            >
              <p>
                {isId
                  ? 'Saya adalah web developer dari Bali yang berfokus membangun website modern, cepat, dan responsif, serta membantu kebutuhan pemasaran digital agar bisnis Anda berkembang.'
                  : 'I am a web developer based in Bali specializing in building modern, fast, and responsive websites, combined with digital marketing strategies that drive real results.'}
              </p>
              <p className="text-sm">
                {isId
                  ? 'Setiap proyek dikerjakan secara transparan — mulai dari penentuan ruang lingkup, struktur desain, hingga optimasi performa dan SEO.'
                  : 'Every project is handled with transparency — from scoping and architectural design to performance optimization and SEO.'}
              </p>
            </div>

            {/* Service cards with Font Awesome icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {[
                {
                  iconClass: 'fa-solid fa-code',
                  title: isId ? 'Pengembangan Web' : 'Web Development',
                  body: isId
                    ? 'Website modern, cepat, dan responsif dengan struktur rapi dan performa optimal.'
                    : 'Modern, fast, and responsive websites built with clean architecture and peak performance.',
                },
                {
                  iconClass: 'fa-solid fa-bullhorn',
                  title: isId ? 'Pemasaran Digital' : 'Digital Marketing',
                  body: isId
                    ? 'Strategi pemasaran digital, optimasi SEO lokal, dan kampanye bertarget untuk menjangkau audiens tepat.'
                    : 'Digital marketing strategies, local SEO optimization, and targeted campaigns to reach the right audience.',
                },
              ].map(({ iconClass, title, body }) => (
                <div
                  key={title}
                  className="relative p-5 rounded-xl border transition-all duration-300 hover:border-gold shadow-2xs group"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <span
                    className="absolute top-3 left-3 w-3 h-3 border-t border-l pointer-events-none"
                    style={{ borderColor: 'rgba(179,130,38,0.45)' }}
                  />
                  <div className="flex items-start gap-3.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: 'rgba(179,130,38,0.1)',
                        border: '1px solid rgba(179,130,38,0.28)',
                        color: 'var(--color-gold)',
                      }}
                    >
                      <i className={`${iconClass} text-base`} aria-hidden="true" />
                    </div>
                    <div>
                      <h4
                        className="text-sm tracking-wide mb-1"
                        style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)' }}
                      >
                        {title}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dual CTA row — identical height, padding, font */}
            <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center mb-5">
              {/* PRIMARY — gold fill */}
              <Button
                variant="primary"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fa-solid fa-paper-plane text-sm" aria-hidden="true" />
                <span>{isId ? 'Hubungi Saya' : 'Get in Touch'}</span>
              </Button>

              {/* OUTLINE — gold border */}
              <Button
                variant="outline"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fa-solid fa-layer-group text-sm" aria-hidden="true" />
                <span>{isId ? 'Lihat Proyek' : 'View Projects'}</span>
              </Button>
            </div>

            {/* Disclaimer / reassurance note */}
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              <span>
                {isId
                  ? 'Fokus pada hasil nyata, kepuasan klien, dan komunikasi yang transparan.'
                  : 'Committed to real results, client satisfaction, and transparent communication.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}