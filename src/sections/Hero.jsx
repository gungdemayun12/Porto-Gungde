/**
 * Hero — seksi hero utama (Luxury & Minimalist Edition)
 * Singkat, padat, berkelas dengan integrasi 3D Lanyard interaktif dari React Bits.
 */
import { lazy, Suspense } from 'react';
import { Sparkles, MessageCircle, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLang } from '../hooks/useLang';

// Lazy load HeroLanyard agar Three.js di-load secara asynchronous
const HeroLanyard = lazy(() => import('../components/lanyard/HeroLanyard'));

function LanyardFallback() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[380px] animate-pulse">
      <div className="w-56 h-80 rounded-2xl bg-surface/60 border border-gold/20" />
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex items-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16"
      aria-label="Hero"
    >
      {/* Background ambient luxury glow */}
      <div className="hero-glow" />

      <div className="container-main relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Kolom Kiri: Teks Ringkas, Mewah, & Padat */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left order-2 lg:order-1">
            {/* Badge Status — tenang, tidak ramai */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gold/[0.08] border border-gold/25 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-wider text-gold-text font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Headline Utama Singkat & Mewah */}
            <h1 className="text-[2.35rem] sm:text-5xl lg:text-[56px] font-heading font-normal leading-[1.12] text-text tracking-tight">
              {lang === 'id' ? (
                <>
                  Website &{' '}
                  <span className="gradient-gold-text italic font-serif">pemasaran digital</span>
                </>
              ) : (
                <>
                  Websites &{' '}
                  <span className="gradient-gold-text italic font-serif">digital marketing</span>
                </>
              )}
            </h1>

            {/* Deskripsi Singkat (1-2 kalimat saja) */}
            <p className="text-muted text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              {t.hero.description}
            </p>

            {/* Tombol Aksi */}
            <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start pt-2">
              <Button
                variant="primary"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group shadow-lg shadow-gold/20 shine-sweep"
              >
                <Sparkles size={16} className="text-current group-hover:rotate-12 transition-transform duration-300" />
                <span>{t.hero.cta}</span>
              </Button>

              <Button
                variant="outline"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group"
              >
                <MessageCircle size={16} className="text-gold group-hover:scale-110 transition-transform" />
                <span>{t.hero.ctaSecondary}</span>
              </Button>
            </div>
          </div>

          {/* Kolom Kanan: 3D Lanyard React Bits */}
          <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 w-full">
            <div className="relative isolate w-full min-h-[380px]">
              <Suspense fallback={<LanyardFallback />}>
                <HeroLanyard />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Indikator scroll elegan */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-muted text-[10px] font-mono tracking-widest uppercase">
          {t.hero.scrollDown}
        </span>
        <ChevronDown size={16} className="text-gold scroll-indicator" />
      </div>
    </section>
  );
}
