/**
 * Hero — luxury editorial hero section
 * Lapisan atmosfer emas, tipografi editorial, stage 3D untuk lanyard,
 * dan stat strip. Lanyard React (Three.js) tetap dipertahankan apa adanya.
 */
import { lazy, Suspense } from 'react';
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLang } from '../hooks/useLang';
import './Hero.css';

const HeroLanyard = lazy(() => import('../components/lanyard/HeroLanyard'));

function LanyardFallback() {
  return (
    <div className="hero-lanyard-skeleton" aria-hidden="true">
      <span className="hero-lanyard-skeleton__hook" />
      <span className="hero-lanyard-skeleton__strap" />
      <span className="hero-lanyard-skeleton__card" />
    </div>
  );
}

const STATS = [
  { value: '3+', label: { en: 'Years Experience', id: 'Tahun Pengalaman' } },
  { value: '10+', label: { en: 'Projects Delivered', id: 'Proyek Selesai' } },
  { value: '100%', label: { en: 'Responsive Builds', id: 'Build Responsif' } },
];

export default function Hero() {
  const { t, lang } = useLang();
  const isId = lang === 'id';

  return (
    <section id="hero" className="hero-section" aria-label="Hero">
      {/* ── Atmosfer latar ── */}
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-aurora hero-aurora--gold" />
        <span className="hero-aurora hero-aurora--amber" />
        <span className="hero-grid" />
        <span className="hero-topline" />
      </div>

      <div className="container-main relative z-10 w-full">
        <div className="hero-layout">
          {/* ── KIRI: Copy ── */}
          <div className="hero-copy">
            {/* Badge status */}
            <div
              className="hero-badge-row hero-reveal"
              style={{ animationDelay: '80ms' }}
            >
              <span className="hero-badge">
                <span className="hero-badge__dot" aria-hidden="true" />
                <span className="hero-badge__main">{t.hero.badge}</span>
                <span className="hero-badge__shine" aria-hidden="true" />
              </span>
            </div>

            {/* Sapaan */}
            <p
              className="hero-kicker hero-reveal"
              style={{ animationDelay: '160ms' }}
            >
              <span className="hero-kicker__rule" aria-hidden="true" />
              {t.hero.greeting}{' '}
              <span className="hero-kicker__name">{t.hero.name}</span>
            </p>

            {/* Headline */}
            <h1
              className="hero-title hero-reveal"
              style={{ animationDelay: '240ms' }}
            >
              {isId ? (
                <>
                  <span className="hero-title__line">Website &amp;</span>
                  <span className="hero-title__line hero-title__line--accent">
                    <em>pemasaran digital</em>
                  </span>
                </>
              ) : (
                <>
                  <span className="hero-title__line">Websites &amp;</span>
                  <span className="hero-title__line hero-title__line--accent">
                    <em>digital marketing</em>
                  </span>
                </>
              )}
            </h1>

            {/* Deskripsi */}
            <p
              className="hero-desc hero-reveal"
              style={{ animationDelay: '320ms' }}
            >
              {t.hero.description}
            </p>

            {/* CTA */}
            <div
              className="hero-actions hero-reveal"
              style={{ animationDelay: '400ms' }}
            >
              <Button
                variant="primary"
                href="#projects"
                className="hero-cta hero-cta--primary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fa-solid fa-layer-group text-sm" aria-hidden="true" />
                <span>{t.hero.cta}</span>
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.2}
                  className="hero-cta__arrow"
                  aria-hidden="true"
                />
              </Button>

              <Button
                variant="outline"
                href="#contact"
                className="hero-cta hero-cta--outline"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fa-solid fa-paper-plane text-sm" aria-hidden="true" />
                <span>{t.hero.ctaSecondary}</span>
              </Button>
            </div>

            {/* Stat strip */}
            <div
              className="hero-stats hero-reveal"
              style={{ animationDelay: '480ms' }}
            >
              {STATS.map((stat) => (
                <div className="hero-stat" key={stat.value}>
                  <span className="hero-stat__value">{stat.value}</span>
                  <span className="hero-stat__label">
                    {isId ? stat.label.id : stat.label.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── KANAN: Stage 3D Lanyard ── */}
          <div className="hero-visual">
            <div className="hero-stage">
              {/* Dekorasi panggung */}
              <div className="hero-stage__decor" aria-hidden="true">
                <span className="hero-stage__glow" />
                <span className="hero-stage__orbit hero-stage__orbit--outer" />
                <span className="hero-stage__orbit hero-stage__orbit--inner" />
                <span className="hero-stage__arch">
                  <span className="hero-stage__arch-glow" />
                  <span className="hero-stage__apex" />
                </span>
                <span className="hero-stage__corner hero-stage__corner--tl" />
                <span className="hero-stage__corner hero-stage__corner--tr" />
                <span className="hero-stage__corner hero-stage__corner--bl" />
                <span className="hero-stage__corner hero-stage__corner--br" />
              </div>

              <span className="hero-stage__meta hero-stage__meta--tl">
                <Sparkles size={11} strokeWidth={2} aria-hidden="true" />
                Interactive 3D
              </span>

              {/* Lanyard asli — jangan diubah */}
              <div className="hero-stage__lanyard">
                <Suspense fallback={<LanyardFallback />}>
                  <HeroLanyard />
                </Suspense>

                <span className="hero-stage__meta hero-stage__meta--br">
                  <span className="hero-stage__meta-dot" aria-hidden="true" />
                  Bali · Indonesia
                </span>
              </div>

              {/* Nameplate ala galeri */}
              <div className="hero-stage__caption">
                <span className="hero-stage__caption-name">Portfolio · 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll__track">
            <span className="hero-scroll__thumb" />
          </span>
          <span className="hero-scroll__label">{t.hero.scrollDown}</span>
          <ChevronDown size={13} strokeWidth={2.2} className="hero-scroll__chevron" />
        </div>
      </div>
    </section>
  );
}
