/**
 * Projects — dual-mode safe project cards with popup modal.
 * Font Awesome icons, CSS vars for all colors.
 */
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SectionTitle from '../components/ui/SectionTitle';
import ProjectModal from '../components/ui/ProjectModal';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { projectsData, projectCategories } from '../data/projects';

const CATEGORY_ICONS = {
  All: 'fa-solid fa-layer-group',
  Website: 'fa-solid fa-globe',
  App: 'fa-solid fa-mobile-screen-button',
};

function ProjectCard({ project, lang, onClick }) {
  const title = project.title[lang] || project.title.en;
  const summary = project.summary[lang] || project.summary.en;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-md"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${lang === 'id' ? 'Buka detail proyek' : 'Open project details'}: ${title}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-gold)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-[16/9] overflow-hidden"
        style={{ background: 'var(--color-border)' }}
      >
        {project.video ? (
          <video
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            src={project.video}
            muted playsInline preload="none"
            poster={project.thumbnail || undefined}
          />
        ) : project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={`${title} preview`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy" decoding="async"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--color-border) 0%, var(--color-surface) 100%)' }}
          >
            <span
              className="text-4xl"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-gold)' }}
            >
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide shadow-sm"
            style={{
              background: 'rgba(14,12,9,0.78)',
              color: '#F0D277',
              border: '1px solid rgba(216,170,66,0.35)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <i className="fa-solid fa-tag text-[9px]" aria-hidden="true" />
            {project.displayCategory || project.category}
          </span>
          {project.privateSystem && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide shadow-sm"
              style={{
                background: 'rgba(14,12,9,0.78)',
                color: '#F0D277',
                border: '1px solid rgba(216,170,66,0.35)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <i className="fa-solid fa-lock text-[9px]" aria-hidden="true" />
              {lang === 'id' ? 'Sistem Privat' : 'Private System'}
            </span>
          )}
        </div>

      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="text-base sm:text-lg leading-snug font-semibold transition-colors duration-300"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {title}
          </h3>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-2xs"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
            }}
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true" />
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed flex-1" style={{ color: 'var(--color-muted)' }}>
          {summary}
        </p>
      </div>
    </article>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });
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
      ref={ref}
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-main">
        <SectionTitle
          label={lang === 'id' ? 'PORTOFOLIO' : 'PORTFOLIO'}
          title={lang === 'id' ? 'Proyek yang pernah saya kerjakan.' : 'Selected projects.'}
          subtitle={lang === 'id'
            ? 'Beberapa website dan aplikasi web dari proyek yang pernah saya kerjakan.'
            : 'A selection of websites and web applications from my work.'}
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {projectCategories.map((cat) => {
            const isActive = activeFilter === cat;
            const iconClass = CATEGORY_ICONS[cat] || 'fa-solid fa-folder';
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-2xs"
                style={{
                  background: isActive ? 'var(--color-gold)' : 'var(--color-surface)',
                  color: isActive ? '#0A0907' : 'var(--color-text)',
                  border: isActive ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border)',
                }}
              >
                <i className={`${iconClass} text-xs`} aria-hidden="true" />
                <span>{cat === 'All' ? (lang === 'id' ? 'Semua' : 'All') : cat}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {filteredProjects.map((project, i) => (
            <div
              key={project.slug}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <ProjectCard
                project={project}
                lang={lang}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        <p
          className="mt-10 text-center text-xs font-mono font-medium tracking-wider flex items-center justify-center gap-2"
          style={{ color: 'var(--color-muted)' }}
        >
          <i className="fa-solid fa-arrow-pointer text-xs" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
          <span>{lang === 'id' ? 'Klik kartu mana saja untuk melihat detail proyek lengkap' : 'Click any card to explore full project details'}</span>
        </p>
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