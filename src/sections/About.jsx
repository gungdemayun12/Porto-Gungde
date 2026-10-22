/**
 * About — tentang saya (sederhana, jelas, tanpa overclaim)
 */
import { MapPin, Code2, Zap, CheckCircle2 } from 'lucide-react';
import gungdePhoto from '../assets/gungde.jpeg';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { CONTACT } from '../data/contact';
import Button from '../components/ui/Button';

export default function About() {
  const { lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });
  const isId = lang === 'id';

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden bg-bg/80 dark:bg-[#07080B]"
      aria-label="About"
      ref={ref}
    >
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[430px] pt-8 pb-12 sm:pb-16 px-4 sm:px-0">
              <div
                className="absolute top-2 left-0 sm:-left-6 w-28 sm:w-36 h-40 sm:h-52 rounded-xl
                bg-gradient-to-br from-[#E5C378] via-[#C2952E] to-[#8C6512] opacity-80 sm:opacity-90
                shadow-2xl -z-10 transform -rotate-2"
                aria-hidden="true"
              />

              <div
                className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-36 sm:w-44 h-36 sm:h-44
                border-r-2 border-b-2 border-gold/45 rounded-br-2xl -z-10 pointer-events-none"
                aria-hidden="true"
              >
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gold rounded-full -translate-x-[-4px] -translate-y-[-4px]" />
              </div>

              {/* Foto utama */}
              <div className="relative rounded-2xl overflow-hidden border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] aspect-[3/4] bg-[#0E1017]">
                <img
                  src={gungdePhoto}
                  alt="Gungde — Web Developer"
                  className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/30 text-white text-[11px] font-mono">
                  <MapPin size={12} className="text-gold" />
                  <span>{CONTACT.locationShort}</span>
                </div>
              </div>

              {/* Stempel berputar */}
              <div
                className="absolute -top-4 -right-4 sm:-top-7 sm:-right-7 z-20 w-28 h-28 sm:w-36 sm:h-36 group"
                title="Gungdev Web Developer"
              >
                <div className="absolute inset-0 rounded-full bg-gold/20 blur-md group-hover:bg-gold/35 transition-colors duration-500" />
                <div className="relative w-full h-full animate-spin-chakra">
                  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xl">
                    <circle cx="80" cy="80" r="76" fill="#090A0E" stroke="#C2952E" strokeWidth="2" />
                    <circle
                      cx="80"
                      cy="80"
                      r="71"
                      fill="none"
                      stroke="#E5C378"
                      strokeWidth="1"
                      strokeDasharray="2 3"
                      opacity="0.6"
                    />
                    <defs>
                      <path
                        id="chakraCirclePath"
                        d="M 80, 80 m -56, 0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0"
                      />
                    </defs>
                    <text
                      fill="#ECC880"
                      fontSize="11"
                      fontFamily="'Space Mono', monospace"
                      fontWeight="bold"
                      letterSpacing="2.4px"
                    >
                      <textPath href="#chakraCirclePath" startOffset="0%">
                        • GUNGDEV WEB DEVELOPER • GUNGDEV
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#08090D] border border-gold/60 flex items-center justify-center shadow-inner pointer-events-none">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 sm:w-7 sm:h-7 text-gold"
                  >
                    <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
                  </svg>
                </div>
              </div>

              {/* Foto kedua (overlay) — foto yang sama */}
              <div
                className="absolute -bottom-4 -left-3 sm:-bottom-8 sm:-left-6 z-10 w-36 sm:w-48 aspect-[3/4]
                p-1.5 sm:p-2 bg-[#08090D] border-2 border-gold/60 rounded-xl shadow-[0_25px_50px_rgba(0,0,0,0.7)]
                hover:border-gold hover:scale-105 transition-all duration-500 group"
              >
                <span className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-gold pointer-events-none" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-gold pointer-events-none" />
                <span className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-gold pointer-events-none" />
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-gold pointer-events-none" />

                <div className="relative w-full h-full rounded-lg overflow-hidden bg-black/40">
                  <img
                    src={gungdePhoto}
                    alt="Gungde — Web Developer"
                    className="w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <p className="font-heading text-xs font-bold text-white tracking-wider">
                      GUNGDE MAYUN
                    </p>
                    <p className="font-mono text-[9px] text-gold uppercase tracking-wider">
                      Web Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-gradient-to-r from-gold to-transparent" />
              <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-gold uppercase font-bold">
                {isId ? 'TENTANG SAYA' : 'ABOUT ME'}
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-text leading-[1.12] mb-6">
              <span className="gradient-gold-text">GUNGDEV</span>
              <br />
              <span className="text-text dark:text-white">Web Developer</span>
            </h2>

            <div className="space-y-4 font-mono text-sm sm:text-base text-muted dark:text-stone-300 leading-relaxed max-w-2xl mb-8">
              <p>
                {isId
                  ? 'Saya web developer dari Batubulan, Bali. Saya membantu membuat website yang rapi, responsif, dan mudah dipakai — dari landing page hingga situs bisnis yang lebih lengkap.'
                  : 'I\'m a web developer based in Batubulan, Bali. I help build clean, responsive websites that are easy to use — from landing pages to fuller business sites.'}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                {isId
                  ? 'Fokus saya sederhana: memahami kebutuhanmu, lalu mengerjakannya dengan kode yang jelas dan hasil yang bisa dipakai.'
                  : 'My focus is simple: understand what you need, then build it with clear code and practical results.'}
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="shine-sweep flex items-center gap-2.5 text-xs sm:text-sm px-6 py-3.5 group"
                >
                  <span>{isId ? 'Hubungi Saya' : 'Get in Touch'}</span>
                </Button>

                <Button
                  variant="outline"
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2.5 text-xs sm:text-sm px-6 py-3.5"
                >
                  <Code2 size={16} className="text-gold" />
                  <span>{isId ? 'Lihat Proyek' : 'View Projects'}</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="relative p-5 rounded-xl bg-surface/80 dark:bg-[#0D0F15] border border-border dark:border-gold/20 hover:border-gold/50 transition-all duration-300 group">
                  <span className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-gold pointer-events-none" />
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-text dark:text-white tracking-wide mb-1">
                        {isId ? 'Website yang Ringan' : 'Clean & Practical'}
                      </h4>
                      <p className="font-mono text-xs text-muted dark:text-stone-400 leading-relaxed">
                        {isId
                          ? 'Dibuat agar cepat dibuka, nyaman di HP, dan mudah dikelola.'
                          : 'Built to load well, feel comfortable on mobile, and stay easy to maintain.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative p-5 rounded-xl bg-surface/80 dark:bg-[#0D0F15] border border-border dark:border-gold/20 hover:border-gold/50 transition-all duration-300 group">
                  <span className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-gold pointer-events-none" />
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-text dark:text-white tracking-wide mb-1">
                        {isId ? 'Komunikasi Langsung' : 'Direct Communication'}
                      </h4>
                      <p className="font-mono text-xs text-muted dark:text-stone-400 leading-relaxed">
                        {isId
                          ? 'Diskusi langsung dengan saya, update jelas, tanpa proses yang berbelit.'
                          : 'Talk directly with me — clear updates, no agency layers in between.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted dark:text-stone-400 pt-1">
                <CheckCircle2 size={14} className="text-gold shrink-0" />
                <span>
                  {isId
                    ? 'Terbuka untuk proyek website freelance & kolaborasi kecil hingga menengah.'
                    : 'Open for freelance website projects and small-to-medium collaborations.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
