/**
 * About — tentang saya (sederhana, jelas, tanpa overclaim)
 */
import { MapPin, Code2, Megaphone, CheckCircle2 } from 'lucide-react';
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
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[390px] py-5 px-4 sm:px-0">
              {/* Foto utama */}
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl aspect-[4/5] bg-surface">
                <img
                  src={gungdePhoto}
                  alt="Gungde Mayun, web developer dan praktisi pemasaran digital"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-2 text-white backdrop-blur-md">
                  <MapPin size={12} className="text-gold" />
                  <span className="text-xs">{CONTACT.locationShort}</span>
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

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-text leading-[1.15] mb-5">
              <span className="text-text dark:text-white">Web Developer</span>
              <br />
              <span className="gradient-gold-text">{isId ? 'Pemasaran Digital' : 'Digital Marketing'}</span>
            </h2>

            <div className="space-y-4 text-base sm:text-[1.0625rem] text-muted leading-relaxed max-w-2xl mb-8">
              <p>{isId ? 'Saya web developer dari Batubulan, Bali. Saya mengerjakan website dan aplikasi web, serta menerima pekerjaan pemasaran digital sesuai kebutuhan proyek.' : 'I am a web developer based in Batubulan, Bali. I work on websites and web applications, and take on digital marketing work based on project needs.'}</p>
              <p className="text-sm sm:text-base text-muted/90">{isId ? 'Ruang lingkup, materi, dan target pekerjaan dibahas terlebih dahulu agar ekspektasi setiap proyek jelas.' : 'Project scope, materials, and goals are discussed up front so expectations are clear.'}</p>
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
                      <Code2 size={18} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-text dark:text-white tracking-wide mb-1">
                        {isId ? 'Pengembangan Web' : 'Web Development'}
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {isId
                          ? 'Website dan aplikasi web sesuai kebutuhan serta ruang lingkup proyek.'
                          : 'Websites and web applications based on the agreed project scope.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative p-5 rounded-xl bg-surface/80 dark:bg-[#0D0F15] border border-border dark:border-gold/20 hover:border-gold/50 transition-all duration-300 group">
                  <span className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-gold pointer-events-none" />
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                      <Megaphone size={18} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-text dark:text-white tracking-wide mb-1">
                        {isId ? 'Pemasaran Digital' : 'Digital Marketing'}
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {isId
                          ? 'Dukungan pemasaran digital berdasarkan kebutuhan dan ruang lingkup yang disepakati.'
                          : 'Digital marketing support based on the agreed needs and project scope.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted pt-1">
                <CheckCircle2 size={14} className="text-gold shrink-0" />
                <span>
                  {isId
                    ? 'Hasil pemasaran bergantung pada banyak faktor dan tidak dapat dijamin.'
                    : 'Marketing outcomes depend on many factors and cannot be guaranteed.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
