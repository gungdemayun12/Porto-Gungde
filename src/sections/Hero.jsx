/**
 * Hero — editorial hero section
 * Full dual-mode visibility (light + dark), clean dual button pair.
 */
import { lazy, Suspense } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLang } from '../hooks/useLang';

const HeroLanyard = lazy(() => import('../components/lanyard/HeroLanyard'));

function LanyardFallback() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[380px] animate-pulse">
      <div className="w-56 h-80 rounded-2xl border border-border" style={{ background: 'var(--color-surface)' }} />
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const isId = lang === 'id';

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden pt-24 pb-10 sm:pt-32 sm:pb-16 lg:min-h-[92vh] lg:pb-20"
      aria-label="Hero"
    >
      <div className="container-main relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 lg:gap-8 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-7 text-center lg:text-left order-2 lg:order-1">

            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border shadow-2xs"
              style={{
                borderColor: 'rgba(179,130,38,0.35)',
                background: 'var(--color-bg)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="h-2 w-2 rounded-full dot-pulse" style={{ background: 'var(--color-gold)' }} />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold"
                style={{ color: 'var(--color-gold-text)' }}
              >
                {t.hero.badge}
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="leading-[1.08]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                letterSpacing: '-0.04em',
                color: 'var(--color-text)',
              }}
            >
              {isId ? (
                <>
                  Website &{' '}
                  <em
                    className="gradient-gold-text"
                    style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}
                  >
                    pemasaran digital
                  </em>
                </>
              ) : (
                <>
                  Websites &{' '}
                  <em
                    className="gradient-gold-text"
                    style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}
                  >
                    digital marketing
                  </em>
                </>
              )}
            </h1>

            {/* Sub-copy */}
            <p
              className="max-w-lg mx-auto lg:mx-0 leading-relaxed text-base sm:text-[1.0625rem]"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
            >
              {t.hero.description}
            </p>

            {/* Dual CTA buttons — solid theme gold + theme gold outline */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
              <Button
                variant="primary"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fa-solid fa-layer-group text-sm" aria-hidden="true" />
                <span>{t.hero.cta}</span>
              </Button>

              <Button
                variant="outline"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fa-solid fa-paper-plane text-sm" aria-hidden="true" />
                <span>{t.hero.ctaSecondary}</span>
              </Button>
            </div>

          </div>

          {/* ── RIGHT: 3D Lanyard ── */}
          <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 w-full">
            <div className="relative isolate w-full min-h-[380px]">
              <Suspense fallback={<LanyardFallback />}>
                <HeroLanyard />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 hidden md:flex items-center gap-3">
          <span className="h-px w-10" style={{ background: 'var(--color-gold)' }} />
          <span
            className="text-[11px] font-mono tracking-[0.2em] uppercase font-medium"
            style={{ color: 'var(--color-muted)' }}
          >
            {t.hero.scrollDown}
          </span>
          <ChevronDown size={14} className="scroll-indicator" style={{ color: 'var(--color-gold)' }} />
        </div>
      </div>
    </section>
  );
}