/**
 * About — dual-mode safe, Font Awesome icons, matched dual button pair.
 */
import { MapPin, CheckCircle2 } from 'lucide-react';
import gungdePhoto from '../assets/gungde.jpeg';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CONTACT } from '../data/contact';
import Button from '../components/ui/Button';

const STAT_ITEMS = [
  { value: '10+', icon: 'fa-solid fa-briefcase', label: { en: 'Projects', id: 'Proyek' } },
  { value: '3+',  icon: 'fa-solid fa-award',     label: { en: 'Yrs. Exp', id: 'Thn. Pengalaman' } },
  { value: '100%',icon: 'fa-solid fa-mobile-screen-button', label: { en: 'Responsive', id: 'Responsif' } },
];

const SKILLS = [
  { icon: 'fa-brands fa-react',      label: 'React' },
  { icon: 'fa-brands fa-js',         label: 'JavaScript' },
  { icon: 'fa-solid fa-database',    label: 'MySQL' },
  { icon: 'fa-brands fa-laravel',    label: 'Laravel' },
  { icon: 'fa-brands fa-wordpress',  label: 'WordPress' },
  { icon: 'fa-brands fa-php',        label: 'PHP' },
  { icon: 'fa-brands fa-css3-alt',   label: 'Tailwind' },
  { icon: 'fa-solid fa-magnifying-glass', label: 'SEO' },
];

export default function About() {
  const { lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });
  const isId = lang === 'id';

  const titleRef = useScrollReveal();
  const photoRef = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const copyRef = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      aria-label="About"
      ref={ref}
    >
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Photo column ── */}
          <div ref={photoRef} className="sr-slide-left lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[350px]">
              {/* Decorative offset frame */}
              <div
                className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-2xl pointer-events-none"
                style={{
                  border: '1px solid color-mix(in srgb, var(--color-gold) 35%, transparent)',
                  background: 'color-mix(in srgb, var(--color-gold) 4%, var(--color-surface))',
                }}
              />
              {/* Corner decorations */}
              <span
                className="absolute -top-2 -left-2 w-4 h-4 pointer-events-none"
                style={{
                  borderTop: '2px solid var(--color-gold)',
                  borderLeft: '2px solid var(--color-gold)',
                  borderRadius: '2px 0 0 0',
                }}
              />
              <span
                className="absolute -bottom-2 -right-2 w-4 h-4 pointer-events-none"
                style={{
                  borderBottom: '2px solid var(--color-gold)',
                  borderRight: '2px solid var(--color-gold)',
                  borderRadius: '0 0 2px 0',
                }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                {/* Location badge */}
                <div
                  className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3.5 py-1.5"
                  style={{
                    background: 'rgba(7,11,9,0.80)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#fff',
                  }}
                >
                  <MapPin size={12} style={{ color: 'var(--color-gold)' }} />
                  <span className="text-[11px] font-mono font-medium">{CONTACT.locationShort}</span>
                </div>
              </div>

              {/* Stats row */}
              <div
                className="mt-4 grid grid-cols-3 rounded-xl overflow-hidden"
                style={{
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  boxShadow: '0 4px 14px -4px rgba(0,0,0,0.12)',
                }}
              >
                {STAT_ITEMS.map(({ value, icon, label }, i) => (
                  <div
                    key={value}
                    className="flex flex-col items-center py-3.5 px-2 text-center relative"
                    style={{
                      borderRight: i < STAT_ITEMS.length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    {/* Top accent line on first stat */}
                    {i === 0 && (
                      <span
                        className="absolute top-0 left-4 right-4 h-[1.5px] rounded-full"
                        style={{ background: 'var(--color-gold)', opacity: 0.6 }}
                      />
                    )}
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

              {/* Skills strip */}
              <div
                className="mt-3 flex flex-wrap gap-1.5 justify-center"
              >
                {SKILLS.map(({ icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold"
                    style={{
                      background: 'color-mix(in srgb, var(--color-gold) 8%, var(--color-surface))',
                      border: '1px solid color-mix(in srgb, var(--color-gold) 20%, var(--color-border))',
                      color: 'var(--color-muted)',
                    }}
                  >
                    <i className={`${icon} text-[9px]`} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Copy column ── */}
          <div ref={copyRef} className="sr-slide-right lg:col-span-7 flex flex-col justify-center">
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
              className="mb-5 leading-[1.08]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(1.85rem, 4vw, 2.85rem)',
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
              className="space-y-4 text-[0.9375rem] leading-relaxed max-w-xl mb-7"
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
                  tags: ['React', 'Laravel', 'MySQL'],
                },
                {
                  iconClass: 'fa-solid fa-bullhorn',
                  title: isId ? 'Pemasaran Digital' : 'Digital Marketing',
                  body: isId
                    ? 'Strategi pemasaran digital, optimasi SEO lokal, dan kampanye bertarget untuk menjangkau audiens tepat.'
                    : 'Digital marketing strategies, local SEO optimization, and targeted campaigns to reach the right audience.',
                  tags: ['SEO', 'Google Ads', 'Analytics'],
                },
              ].map(({ iconClass, title, body, tags }) => (
                <div
                  key={title}
                  className="relative p-5 rounded-xl border transition-all duration-300 group overflow-hidden"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-gold) 50%, var(--color-border))';
                    e.currentTarget.style.boxShadow = '0 8px 24px -8px color-mix(in srgb, var(--color-gold) 25%, transparent)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = '';
                  }}
                >
                  {/* Corner accent */}
                  <span
                    className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(90deg, var(--color-gold), transparent)' }}
                  />
                  <div className="flex items-start gap-3.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: 'color-mix(in srgb, var(--color-gold) 10%, transparent)',
                        border: '1px solid color-mix(in srgb, var(--color-gold) 28%, transparent)',
                        color: 'var(--color-gold)',
                      }}
                    >
                      <i className={`${iconClass} text-base`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-sm tracking-wide mb-1"
                        style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)' }}
                      >
                        {title}
                      </h4>
                      <p className="text-xs leading-relaxed mb-2.5" style={{ color: 'var(--color-muted)' }}>
                        {body}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold"
                            style={{
                              background: 'color-mix(in srgb, var(--color-gold) 8%, var(--color-bg))',
                              color: 'var(--color-gold-text)',
                              border: '1px solid color-mix(in srgb, var(--color-gold) 18%, transparent)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
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