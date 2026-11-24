/**
 * Projects — dual-mode safe project cards with popup modal.
 * Font Awesome icons, CSS vars for all colors.
 * Mobile app projects get a bespoke product preview + APK download CTA.
 */
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SectionTitle from '../components/ui/SectionTitle';
import ProjectModal from '../components/ui/ProjectModal';
import MobileAppPreview from '../components/ui/MobileAppPreview';
import ProjectPoster from '../components/ui/ProjectPoster';
import { DownloadButton } from '../components/ui/AppDownload';
import { useLang } from '../hooks/useLang';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { projectsData, projectCategories, categoryLabel, appAccentVars } from '../data/projects';

const CATEGORY_ICONS = {
  All: 'fa-solid fa-layer-group',
  Web: 'fa-solid fa-globe',
  'Mobile App': 'fa-solid fa-mobile-screen-button',
  'Private System': 'fa-solid fa-lock',
};

function ProjectCard({ project, lang, onClick, index }) {
  const title = project.title[lang] || project.title.en;
  const summary = project.summary[lang] || project.summary.en;
  const isApp = Boolean(project.mobileApp);
  const canDownload = isApp && Boolean(project.downloadUrl);
  const accentStyle = isApp ? appAccentVars(project) : undefined;

  return (
    <article
      className={`project-card project-card--${isApp ? 'app' : 'site'} group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer`}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        animationDelay: `${index * 60}ms`,
        ...accentStyle,
      }}
      onClick={onClick}
    >
      {/* Thumbnail / app preview / editorial poster */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {isApp ? (
          <MobileAppPreview variant="card" theme={project.appTheme} appName={project.name} icon={project.icon} />
        ) : (
          <ProjectPoster project={project} />
        )}

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide shadow-sm"
            style={{
              background: 'rgba(7,11,9,0.82)',
              color: isApp ? 'var(--app-accent-text, #C9F7DD)' : '#C9F7DD',
              border: isApp
                ? '1px solid var(--app-accent-border, rgba(253,82,15,0.55))'
                : '1px solid rgba(79,209,154,0.38)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {isApp ? (
              <>
                <i className="fa-solid fa-mobile-screen-button text-[8px]" style={{ color: 'var(--app-accent, #FF8A5B)' }} aria-hidden="true" />
                {categoryLabel('Mobile App', lang)}
              </>
            ) : project.privateSystem ? (
              <><i className="fa-solid fa-lock text-[8px]" aria-hidden="true" />{lang === 'id' ? 'Privat' : 'Private'}</>
            ) : (
              <><i className="fa-solid fa-globe text-[8px]" aria-hidden="true" />Web</>
            )}
          </span>
        </div>

        {/* Year + gallery count + APK — top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {isApp && (
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono font-bold shadow-sm"
              style={{
                background: 'rgba(var(--app-accent-rgb, 199,67,11), 0.92)',
                color: '#FFF3EC',
                border: '1px solid rgba(255,255,255,0.34)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <i className="fa-brands fa-android text-[9px]" aria-hidden="true" />
              APK
            </span>
          )}
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
        </div>

        {/* (Live indicator moved to the top-right cluster) */}
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
              color: isApp ? 'var(--app-accent-text)' : 'var(--color-gold)',
            }}
          >
            <i className={`${isApp ? 'fa-solid fa-mobile-screen-button' : 'fa-solid fa-arrow-up-right-from-square'} text-[10px]`} aria-hidden="true" />
          </div>
        </div>

        {/* Summary */}
        <p
          className="text-xs sm:text-[0.8125rem] leading-relaxed flex-1 line-clamp-3"
          style={{ color: 'var(--color-muted)' }}
        >
          {summary}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-2 mt-3.5 pt-3.5"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {canDownload ? (
            <DownloadButton
              project={project}
              compact
              className="shrink-0"
              onClick={(event) => event.stopPropagation()}
            />
          ) : (
            <span
              className="flex items-center gap-2 text-[10px] font-mono font-semibold min-w-0"
              style={{ color: 'var(--color-gold-text)' }}
            >
              <i className="fa-solid fa-list-check text-[9px] shrink-0" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
              <span className="truncate">
                {project.results?.[lang]?.length || 0} {lang === 'id' ? 'fitur utama' : 'key highlights'}
              </span>
            </span>
          )}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClick();
            }}
            className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold cursor-pointer shrink-0 transition-colors duration-200 hover:text-gold"
            style={{ color: 'var(--color-muted)', background: 'transparent', border: 0, padding: 0 }}
            aria-label={`${lang === 'id' ? 'Lihat detail' : 'View details'}: ${title}`}
          >
            {lang === 'id' ? 'Lihat detail' : 'View details'}
            <i className="fa-solid fa-chevron-right text-[8px]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const titleRef = useScrollReveal();
  const filterRef = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const gridRef = useScrollReveal({ threshold: 0.01, rootMargin: '0px 0px -30px 0px' });
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
              ? 'Website, sistem web, dan aplikasi mobile dari proyek yang pernah saya kerjakan.'
              : 'Websites, web systems, and mobile apps from projects I have shipped.'}
          />
        </div>

        {/* Filter tabs */}
        <div ref={filterRef} className="sr-fade-up flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => {
            const isActive = activeFilter === cat;
            const iconClass = CATEGORY_ICONS[cat] || 'fa-solid fa-folder';
            const count = cat === 'All' ? projectsData.length : projectsData.filter((p) => p.category === cat).length;
            const isAppTab = cat === 'Mobile App';
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-[2px] text-[11px] sm:text-xs font-mono font-semibold tracking-wide transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? 'var(--color-gold)' : 'var(--color-surface)',
                  color: isActive ? 'var(--color-on-accent)' : 'var(--color-text)',
                  border: isActive ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border)',
                  boxShadow: isActive ? '0 4px 14px -4px color-mix(in srgb, var(--color-gold) 50%, transparent)' : '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <i
                  className={`${iconClass} text-xs`}
                  style={{ color: !isActive && isAppTab ? 'var(--app-accent-text)' : undefined }}
                  aria-hidden="true"
                />
                <span>{categoryLabel(cat, lang)}</span>
                <span
                  className="inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-[2px] text-[9px] font-bold"
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
