/**
 * Experience — clean 2-column timeline, fully dual-mode safe.
 * Font Awesome icons, high contrast text, matched dual button CTA.
 */
import { MapPin } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { experienceData } from '../data/experience';

const EDUCATION = [
  {
    year: '2024 — Present',
    yearId: '2024 — Sekarang',
    institution: {
      en: 'Institut Bisnis dan Teknologi Indonesia (INSTIKI)',
      id: 'Institut Bisnis dan Teknologi Indonesia (INSTIKI)',
    },
    field: { en: 'Information Technology', id: 'Teknologi Informasi' },
    description: {
      en: 'Currently pursuing higher education in Information Technology, building a broader understanding of computing and how technology can be applied to solve practical problems.',
      id: 'Sedang menempuh pendidikan tinggi di bidang Teknologi Informasi untuk memperluas pemahaman tentang komputasi dan penerapan teknologi dalam menyelesaikan kebutuhan nyata.',
    },
    location: 'Indonesia',
  },
  {
    year: '2021 — 2024',
    yearId: '2021 — 2024',
    institution: { en: 'SMA Dwijendra Denpasar', id: 'SMA Dwijendra Denpasar' },
    field: { en: 'Senior High School', id: 'Sekolah Menengah Atas' },
    description: {
      en: 'Completed senior high school at SMA Dwijendra Denpasar, continuing general education and developing the learning foundation for further study.',
      id: 'Menyelesaikan pendidikan SMA di SMA Dwijendra Denpasar, melanjutkan pendidikan umum dan membangun dasar pembelajaran untuk studi berikutnya.',
    },
    location: 'Denpasar, Bali',
  },
  {
    year: '2018 — 2021',
    yearId: '2018 — 2021',
    institution: { en: 'SMP Negeri 5 Sukawati', id: 'SMP Negeri 5 Sukawati' },
    field: { en: 'Junior High School', id: 'Sekolah Menengah Pertama' },
    description: {
      en: 'Completed junior high school at SMP Negeri 5 Sukawati, establishing the foundation for continued education.',
      id: 'Menyelesaikan pendidikan SMP di SMP Negeri 5 Sukawati sebagai dasar untuk melanjutkan pendidikan ke jenjang berikutnya.',
    },
    location: 'Sukawati, Bali',
  },
];

const LEARNING_SKILLS = [
  { name: 'Next.js', icon: 'fa-solid fa-code' },
  { name: 'Laravel', icon: 'fa-brands fa-laravel' },
  { name: 'PostgreSQL', icon: 'fa-solid fa-database' },
  { name: 'Figma', icon: 'fa-brands fa-figma' },
  { name: 'TypeScript', icon: 'fa-brands fa-js' },
];

function TimelineDot({ animated = false }) {
  return (
    <div
      className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-2xs"
      style={{
        borderColor: animated ? 'var(--color-gold)' : 'var(--color-border)',
        background: 'var(--color-bg)',
      }}
    >
      <div
        className={`w-2 h-2 rounded-full ${animated ? 'dot-pulse' : ''}`}
        style={{ background: 'var(--color-gold)' }}
      />
    </div>
  );
}

function TimelineCard({ children }) {
  return (
    <div
      className="rounded-xl border p-4 sm:p-5 transition-all duration-300 shadow-2xs hover:border-gold"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      {children}
    </div>
  );
}

export default function Experience() {
  const { lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });
  const isId = lang === 'id';

  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden"
      aria-label="Experience"
      ref={ref}
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-main">
        <SectionTitle
          label={isId ? 'RIWAYAT' : 'HISTORY'}
          title={isId ? 'Pengalaman & Pendidikan.' : 'Experience & Education.'}
          subtitle={isId
            ? 'Perjalanan karir profesional dan latar belakang pendidikan saya.'
            : 'My professional journey and educational foundation.'}
        />

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* ── WORK EXPERIENCE ── */}
          <div>
            {/* Column header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-2xs"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-gold)' }}
              >
                <i className="fa-solid fa-briefcase text-xs" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
              </div>
              <span
                className="text-xs font-mono uppercase tracking-[0.2em] font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {isId ? 'Pengalaman Kerja' : 'Work Experience'}
              </span>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-3 top-0 bottom-0 w-px"
                style={{ background: 'var(--color-border)' }}
              />

              <div className="space-y-0">
                {experienceData.map((item, i) => (
                  <div
                    key={i}
                    className="relative pl-9 pb-8 last:pb-0"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <TimelineDot />
                    <span
                      className="inline-block text-xs font-mono font-semibold mb-2"
                      style={{ color: 'var(--color-gold-text)' }}
                    >
                      {isId ? item.yearId : item.year}
                    </span>
                    <TimelineCard>
                      <h3
                        className="text-base font-semibold mb-1"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                      >
                        {item.position[lang] || item.position.en}
                      </h3>
                      <p
                        className="text-xs font-mono font-bold mb-3"
                        style={{ color: 'var(--color-gold-text)' }}
                      >
                        {item.company}
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                        {item.description[lang] || item.description.en}
                      </p>
                    </TimelineCard>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── EDUCATION ── */}
          <div>
            {/* Column header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-2xs"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-gold)' }}
              >
                <i className="fa-solid fa-graduation-cap text-xs" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
              </div>
              <span
                className="text-xs font-mono uppercase tracking-[0.2em] font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {isId ? 'Pendidikan' : 'Education'}
              </span>
            </div>

            <div className="relative">
              <div
                className="absolute left-3 top-0 bottom-0 w-px"
                style={{ background: 'var(--color-border)' }}
              />

              <div className="space-y-0">
                {EDUCATION.map((item, i) => (
                  <div key={i} className="relative pl-9 pb-8">
                    <TimelineDot />
                    <span
                      className="inline-block text-xs font-mono font-semibold mb-2"
                      style={{ color: 'var(--color-gold-text)' }}
                    >
                      {isId ? item.yearId : item.year}
                    </span>
                    <TimelineCard>
                      <h3
                        className="text-base font-semibold mb-1"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                      >
                        {item.institution[lang] || item.institution.en}
                      </h3>
                      <p
                        className="text-xs font-mono font-bold mb-3"
                        style={{ color: 'var(--color-gold-text)' }}
                      >
                        {item.field[lang] || item.field.en}
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: 'var(--color-muted)' }}>
                        {item.description[lang] || item.description.en}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} style={{ color: 'var(--color-gold)' }} />
                        <span
                          className="text-xs font-mono font-medium"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          {item.location}
                        </span>
                      </div>
                    </TimelineCard>
                  </div>
                ))}
              </div>

              {/* Currently learning */}
              <div className="relative pl-9">
                <TimelineDot animated />
                <span
                  className="inline-block text-xs font-mono font-semibold mb-2"
                  style={{ color: 'var(--color-gold-text)' }}
                >
                  {isId ? 'Saat ini' : 'Ongoing'}
                </span>
                <div
                  className="rounded-xl border p-4 sm:p-5 shadow-2xs"
                  style={{
                    borderColor: 'var(--color-gold)',
                    background: 'linear-gradient(135deg, rgba(179,130,38,0.08) 0%, var(--color-surface) 100%)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full dot-pulse" style={{ background: 'var(--color-gold)' }} />
                    <span
                      className="text-xs font-mono uppercase tracking-wider font-bold"
                      style={{ color: 'var(--color-gold-text)' }}
                    >
                      {isId ? 'Sedang Dipelajari & Dikembangkan' : 'Currently Learning & Refining'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {LEARNING_SKILLS.map(({ name, icon }) => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-lg border shadow-2xs"
                        style={{
                          background: 'var(--color-bg)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text)',
                        }}
                      >
                        <i className={`${icon} text-[11px]`} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA bottom — matched dual button pair */}
        <div
          className={`mt-14 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ borderTop: '1px solid var(--color-border)', transitionDelay: '400ms' }}
        >
          <div>
            <p
              className="text-lg font-bold mb-1"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              {isId ? 'Tertarik bekerja sama dengan saya?' : 'Interested in working together?'}
            </p>
            <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
              {isId ? 'Mari diskusikan ide dan kebutuhan proyek Anda.' : "Let's discuss your ideas and project requirements."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
            <Button
              variant="primary"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <i className="fa-solid fa-paper-plane text-sm" aria-hidden="true" />
              <span>{isId ? 'Hubungi Saya' : 'Get In Touch'}</span>
            </Button>

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
        </div>
      </div>
    </section>
  );
}