/**
 * Projects — Seksi Proyek Unggulan dengan Pop-Up Modal Interaktif & Galeri Slider
 * Klik pada kartu proyek akan membuka Modal Pop-up mewah berisi galeri foto yang dapat digeser.
 */
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ArrowUpRight, Layers } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import ProjectModal from '../components/ui/ProjectModal';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { projectsData, projectCategories } from '../data/projects';

/**
 * ProjectCard — kartu proyek dengan ringkasan dan informasi teknologi
 */
function ProjectCard({ project, lang, onClick }) {
  const title = project.title[lang] || project.title.en;
  const summary = project.summary[lang] || project.summary.en;

  return (
    <div
      className="group relative rounded-[26px] bg-surface/70 dark:bg-[#121319]/80 border border-border/80 hover:border-gold/50
        shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-2xl hover:shadow-gold/10
        transition-all duration-500 flex flex-col overflow-hidden cursor-pointer h-full"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${lang === 'id' ? 'Buka detail proyek' : 'Open project details'}: ${title}`}
    >
      {/* Mockup Top Browser Bar */}
      <div className="px-4 py-2.5 bg-surface/90 dark:bg-[#161720] border-b border-border/70 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-[11px] font-mono text-muted/70 tracking-wider truncate max-w-[170px]">
          gungde.dev/work/{project.slug}
        </div>
        <div className="w-3" />
      </div>

      {/* Lightweight preview: video hanya dimuat saat kartu terlihat, tanpa autoplay. */}
      <div className="relative aspect-[16/8] overflow-hidden bg-gradient-to-br from-gold/[0.08] via-transparent to-transparent border-b border-border/60">
        {project.video ? (
          <video
            className="w-full h-full object-cover"
            src={project.video}
            muted
            playsInline
            preload="none"
            poster={project.thumbnail || undefined}
          />
        ) : project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={`${project.name} project preview`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
      </div>
      <div className="px-4 sm:px-6 py-5 bg-gradient-to-br from-gold/[0.08] via-transparent to-transparent border-b border-border/60">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] text-xs font-sans font-medium bg-gold/10 border border-gold/30 text-gold">
            <Layers size={13} />
            {project.category}
          </span>
          <span className="font-sans text-sm text-muted">{project.year}</span>
        </div>
      </div>

      {/* Konten & Informasi Proyek */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-normal text-text dark:text-white group-hover:text-gold transition-colors duration-300 leading-snug">
              {title}
            </h3>
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-stone-950 transition-all duration-300 shrink-0">
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          <p className="text-muted dark:text-stone-300 text-sm leading-relaxed line-clamp-3 mb-0">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter proyek
  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding relative overflow-hidden" aria-label="Projects" ref={ref}>
      <div className="container-main">
        <SectionTitle
          label={lang === 'id' ? 'PORTOFOLIO' : 'PORTFOLIO'}
          title={lang === 'id' ? 'Proyek yang pernah saya kerjakan.' : 'Selected projects.'}
          subtitle={lang === 'id'
            ? 'Beberapa website dan aplikasi web dari proyek yang pernah saya kerjakan.'
            : 'A selection of websites and web applications from my work.'
          }
        />

        {/* Filter Kategori */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`relative overflow-hidden px-4 py-2 rounded-[3px] text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'gradient-gold text-stone-950 font-bold shadow-md shadow-gold/20 shine-sweep'
                  : 'bg-surface/70 text-muted border border-border hover:border-gold/40 hover:text-gold-text'
              }`}
            >
              {cat === 'All' ? (lang === 'id' ? 'Semua Proyek' : 'All Works') : cat}
            </button>
          ))}
        </div>

        {/* Grid Proyek */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredProjects.map((project, i) => (
            <div
              key={project.slug}
              style={{ transitionDelay: `${i * 90}ms` }}
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
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.slug || selectedProject.id || selectedProject.title?.en}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
