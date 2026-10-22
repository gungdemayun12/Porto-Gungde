/**
 * Hero — seksi hero utama (Luxury & Minimalist Edition)
 * Singkat, padat, berkelas dengan integrasi 3D Lanyard interaktif dari React Bits.
 */
import { lazy, Suspense } from 'react';
import { ArrowUpRight, Sparkles, MessageCircle, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import GlowCursor from '../components/ui/GlowCursor';
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
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500/50 dot-pulse" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-gold-text font-medium">
                Web Developer
              </span>
            </div>

            {/* Headline Utama Singkat & Mewah */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-normal leading-[1.08] text-text tracking-tight">
              {lang === 'id' ? (
                <>
                  Membuat Website yang{' '}
                  <span className="gradient-gold-text italic font-serif">Rapi & Bermanfaat</span>
                </>
              ) : (
                <>
                  Building Websites that are{' '}
                  <span className="gradient-gold-text italic font-serif">Clean & Useful</span>
                </>
              )}
            </h1>

            {/* Deskripsi Singkat (1-2 kalimat saja) */}
            <p className="text-muted text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              {lang === 'id'
                ? 'Saya membantu membuat website untuk bisnis dan personal — tampilan bersih, responsif di HP, dan mudah digunakan.'
                : 'I help build websites for businesses and personal brands — clean look, mobile-friendly, and easy to use.'}
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
                <Sparkles size={16} className="text-stone-900 group-hover:rotate-12 transition-transform duration-300" />
                <span>{t.hero.cta}</span>
                <ArrowUpRight size={16} className="text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
            <GlowCursor color="#d4af37" secondaryColor="#fff1a8" intensity={1.1} clickBurst quality="low" maxDevicePixelRatio={1.5}>
              <Suspense fallback={<LanyardFallback />}>
                <HeroLanyard />
              </Suspense>
            </GlowCursor>
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
