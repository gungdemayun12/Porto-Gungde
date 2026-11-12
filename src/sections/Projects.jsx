/**
 * Projects — dual-mode safe project cards with popup modal.
 * Font Awesome icons, CSS vars for all colors.
 */
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SectionTitle from '../components/ui/SectionTitle';
import ProjectModal from '../components/ui/ProjectModal';
import { useLang } from '../hooks/useLang';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { projectsData, projectCategories } from '../data/projects';

const CATEGORY_ICONS = {
  All: 'fa-solid fa-layer-group',
  Web: 'fa-solid fa-globe',
  'Private System': 'fa-solid fa-lock',
};

/* Year badge accent colors */
const YEAR_COLOR = {
  2026: { bg: 'rgba(15,107,74,0.90)', border: 'rgba(79,209,154,0.5)', text: '#C9F7DD' },
  2025: { bg: 'rgba(7,11,9,0.80)',   border: 'rgba(79,209,154,0.30)', text: '#A9C4B5' },
};

function ProjectCard({ project, lang, onClick, index }) {
  const title = project.title[lang] || project.title.en;
  const summary = project.summary[lang] || project.summary.en;
  const yearColors = YEAR_COLOR[project.year] || YEAR_COLOR[2025];

  return (
    <article
      className="project-card group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        animationDelay: `${index * 60}ms`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${lang === 'id' ? 'Buka detail proyek' : 'Open project details'}: ${title}`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {project.video ? (
          <video
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            src={project.video}
            muted playsInline preload="none"
            poster={project.thumbnail || undefined}
          />
        ) : project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={`${title} preview`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            loading="lazy" decoding="async"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--color-border) 0%, var(--color-surface) 100%)' }}
          >
            <span
              className="text-5xl font-bold"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
            >
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }}
        />

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide shadow-sm"
            style={{
              background: 'rgba(7,11,9,0.82)',
              color: '#C9F7DD',
              border: '1px solid rgba(79,209,154,0.38)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {project.privateSystem
              ? <><i className="fa-solid fa-lock text-[8px]" aria-hidden="true" />{lang === 'id' ? 'Privat' : 'Private'}</>
              : <><i className="fa-solid fa-globe text-[8px]" aria-hidden="true" />Web</>
            }
          </span>
        </div>

        {/* Year + Gallery count — top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {project.gallery?.length > 1 && (
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono font-semibold shadow-sm"
              style={{
                background: 'rgba(7,11,9,0.82)',
                color: '#C9F7DD',
                border: '1px solid rgba(79,209,154,0.28)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <i className="fa-regular fa-images text-[9px]" aria-hidden="true" />
              <span>{project.gallery.length}</span>
            </span>
          )}
          <span
            className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-mono font-bold"
            style={{
              background: yearColors.bg,
              color: yearColors.text,
              border: `1px solid ${yearColors.border}`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Live indicator — bottom left (only public with liveUrl) */}
        {!project.privateSystem && project.liveUrl && project.liveUrl !== '#' && (
          <div className="absolute bottom-3 left-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold"
              style={{
                background: 'rgba(7,11,9,0.82)',
                color: '#4ade80',
                border: '1px solid rgba(74,222,128,0.35)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
              {lang === 'id' ? 'Aktif' : 'Live'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3
            className="text-sm sm:text-base leading-snug font-bold flex-1 min-w-0 transition-colors duration-300 group-hover:text-gold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {title}
          </h3>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:border-gold"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-gold)',
            }}
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" />
          </div>
        </div>

        {/* Summary */}
        <p
          className="text-xs sm:text-[0.8125rem] leading-relaxed flex-1 line-clamp-3"
          style={{ color: 'var(--color-muted)' }}
        >
          {summary}
        </p>

        {/* Footer — results count */}
        {project.results?.[lang]?.length > 0 && (
          <div
            className="flex items-center gap-2 mt-3.5 pt-3.5 text-[10px] font-mono font-semibold"
            style={{
              borderTop: '1px solid var(--color-border)',
              color: 'var(--color-gold-text)',
            }}
          >
            <i className="fa-solid fa-list-check text-[9px]" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
            <span>{project.results[lang].length} {lang === 'id' ? 'fitur utama' : 'key highlights'}</span>
            <span className="ml-auto flex items-center gap-1" style={{ color: 'var(--color-muted)' }}>
              {lang === 'id' ? 'Lihat detail' : 'View details'}
              <i className="fa-solid fa-chevron-right text-[8px]" aria-hidden="true" />
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const titleRef = useScrollReveal();
  const filterRef = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const gridRef = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      aria-label="Projects"
    >
      <div className="container-main">
        <div ref={titleRef} className="sr-fade-up">
          <SectionTitle
            label={lang === 'id' ? 'PORTOFOLIO' : 'PORTFOLIO'}
            title={lang === 'id' ? 'Proyek yang pernah saya kerjakan.' : 'Selected projects.'}
            subtitle={lang === 'id'
              ? 'Beberapa website dan aplikasi web dari proyek yang pernah saya kerjakan.'
              : 'A selection of websites and web applications from my work.'}
          />
        </div>

        {/* Filter tabs */}
        <div ref={filterRef} className="sr-fade-up flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => {
            const isActive = activeFilter === cat;
            const iconClass = CATEGORY_ICONS[cat] || 'fa-solid fa-folder';
            const count = cat === 'All' ? projectsData.length : projectsData.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wide transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? 'var(--color-gold)' : 'var(--color-surface)',
                  color: isActive ? 'var(--color-on-accent)' : 'var(--color-text)',
                  border: isActive ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border)',
                  boxShadow: isActive ? '0 4px 14px -4px color-mix(in srgb, var(--color-gold) 50%, transparent)' : '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <i className={`${iconClass} text-xs`} aria-hidden="true" />
                <span>
                  {cat === 'All'
                    ? (lang === 'id' ? 'Semua' : 'All')
                    : cat === 'Private System'
                    ? (lang === 'id' ? 'Sistem Privat' : 'Private System')
                    : 'Web'}
                </span>
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'color-mix(in srgb, var(--color-gold) 12%, var(--color-bg))',
                    color: isActive ? 'var(--color-on-accent)' : 'var(--color-gold-text)',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="sr-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              lang={lang}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Bottom hint */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p
            className="text-center text-xs font-mono font-medium tracking-wider flex items-center justify-center gap-2"
            style={{ color: 'var(--color-muted)' }}
          >
            <i className="fa-solid fa-hand-pointer text-xs" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
            <span>{lang === 'id' ? 'Klik kartu mana saja untuk melihat detail proyek lengkap' : 'Click any card to explore full project details'}</span>
          </p>
          <span
            className="hidden sm:inline h-px w-1"
            style={{ background: 'var(--color-border)' }}
          />
          <p
            className="text-center text-xs font-mono font-medium flex items-center justify-center gap-1.5"
            style={{ color: 'var(--color-gold-text)' }}
          >
            <i className="fa-solid fa-layer-group text-[10px]" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
            <span>{filteredProjects.length} {lang === 'id' ? 'proyek ditampilkan' : 'projects shown'}</span>
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.slug || selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}