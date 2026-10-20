/**
 * Stack — seksi tech stack dengan logo loop dan grid kategori
 * Menampilkan ikon teknologi yang digunakan.
 */
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import SectionTitle from '../components/ui/SectionTitle';
import { stackData } from '../data/stack';
import {
  SiReact, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiLaravel, SiPhp, SiMysql, SiPostman,
  SiWordpress, SiElementor, SiWoocommerce,
  SiGit, SiLinux, SiN8N, SiGoogleads, SiGooglesearchconsole,
} from 'react-icons/si';

// Mapping nama ikon ke komponen
const iconMap = {
  SiReact, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiCss3: SiCss,
  SiLaravel, SiPhp, SiMysql, SiPostman,
  SiWordpress, SiElementor, SiWoocommerce,
  SiGit, SiLinux,
  SiN8N,
  SiGoogleads,
  SiGooglesearchconsole,
};

/**
 * LogoItem — satu ikon teknologi dengan label
 */
function LogoItem({ tech }) {
  const IconComponent = iconMap[tech.icon];

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface border border-border
      hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group">
      <div className="w-12 h-12 flex items-center justify-center text-muted group-hover:text-gold-text transition-colors">
        {IconComponent ? (
          <IconComponent size={28} style={{ color: tech.color }} />
        ) : (
          <span className="text-sm font-mono">{tech.name}</span>
        )}
      </div>
      <span className="text-xs font-mono text-muted group-hover:text-text transition-colors">
        {tech.name}
      </span>
    </div>
  );
}

/**
 * LogoMarquee — baris logo yang bergerak (marquee)
 */
function LogoMarquee({ items, direction = 'left', speed = 30 }) {
  // Duplikat items untuk efek loop tak terbatas
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative py-2">
      <div
        className={`flex gap-4 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{
          width: 'max-content',
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border
              whitespace-nowrap"
          >
            {iconMap[tech.icon] ? (
              (() => {
                const Icon = iconMap[tech.icon];
                return <Icon size={18} style={{ color: tech.color }} />;
              })()
            ) : null}
            <span className="text-sm font-mono text-muted">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const { t } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });

  // Gabungkan semua tech untuk marquee
  const row1 = [...stackData.frontend, ...stackData.backend];
  const row2 = [...stackData.cms, ...stackData.tools];

  const categoryNames = {
    frontend: t.stack.categories.frontend,
    backend: t.stack.categories.backend,
    cms: t.stack.categories.cms,
    tools: t.stack.categories.tools,
  };

  return (
    <section id="stack" className="section-padding bg-surface/30" aria-label="Tech Stack" ref={ref}>
      <div className="container-main">
        <SectionTitle
          title={t.stack.sectionTitle}
          subtitle={t.stack.sectionSubtitle}
        />

        {/* Logo marquee — 2 baris berlawanan arah */}
        <div className="mb-12 lg:mb-16 -mx-4 lg:-mx-8">
          <LogoMarquee items={row1} direction="left" speed={35} />
          <LogoMarquee items={row2} direction="right" speed={40} />
        </div>

        {/* Grid kategori */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
          transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {Object.entries(stackData).map(([category, techs]) => (
            <div key={category}>
              <h3 className="font-heading font-semibold text-text mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {categoryNames[category]}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {techs.map((tech) => (
                  <LogoItem key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS untuk animasi marquee */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left, .animate-marquee-right {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
