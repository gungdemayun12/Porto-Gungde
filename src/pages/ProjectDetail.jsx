/**
 * ProjectDetail — halaman detail proyek (/projects/:slug)
 * Hero gambar, meta, Problem/Constraints/Solution/Results, galeri, navigasi prev/next.
 */
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, User, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useLang } from '../hooks/useLang';
import { projectsData } from '../data/projects';
import Button from '../components/ui/Button';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();

  // Cari proyek berdasarkan slug
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex];

  // Scroll ke atas saat pindah halaman
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Jika proyek tidak ditemukan, redirect ke 404
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-fluid-h1 font-bold text-gold-text mb-4">404</h1>
          <p className="text-muted mb-8">{t.notFound.description}</p>
          <Button onClick={() => navigate('/')}>{t.notFound.backHome}</Button>
        </div>
      </div>
    );
  }

  // Navigasi prev/next
  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

  // Teks berdasarkan bahasa
  const title = project.title[lang] || project.title.en;
  const summary = project.summary[lang] || project.summary.en;
  const detail = project.detail[lang] || project.detail.en;
  const results = project.results[lang] || project.results.en;

  return (
    <main className="pt-20 pb-16">
      {/* Hero section */}
      <div className="container-main">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-muted hover:text-gold-text transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft size={18} />
          {t.projects.backToProjects}
        </button>

        {/* Header proyek */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs text-gold-text uppercase tracking-wider px-3 py-1 bg-gold/10 rounded-full">
              {project.category}
            </span>
            <span className="font-mono text-xs text-muted">{project.year}</span>
          </div>

          <h1 className="text-fluid-h1 font-bold text-text mb-4">{title}</h1>
          <p className="text-muted text-fluid-body max-w-3xl leading-relaxed">{summary}</p>
        </div>

        {/* Hero image */}
        <div className="aspect-video rounded-[var(--radius-card)] bg-gold/5 border border-border mb-12 overflow-hidden">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${title} preview`}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-heading text-gold/20 text-4xl">{project.category}</span>
            </div>
          )}
        </div>

        {project.gallery?.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {project.gallery.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`${title} screenshot ${index + 1}`}
                className="w-full aspect-[4/3] object-cover rounded-xl border border-border bg-surface"
                loading="lazy"
              />
            ))}
          </div>
        )}

        {/* Meta info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border">
            <Calendar size={18} className="text-gold shrink-0" />
            <div>
              <span className="text-xs text-muted block">{t.projects.year}</span>
              <span className="text-text font-medium">{project.year}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border">
            <User size={18} className="text-gold shrink-0" />
            <div>
              <span className="text-xs text-muted block">{t.projects.role}</span>
              <span className="text-text font-medium">Web Developer</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border">
            <Code size={18} className="text-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-muted block">{t.projects.techStack}</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-xs font-mono text-gold-text bg-gold/8 px-2 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 rounded-[var(--radius-card)] bg-surface border border-border mb-8">
          <h2 className="font-heading font-semibold text-text text-xl mb-4">
            {t.projects.overview}
          </h2>
          <p className="text-muted text-base leading-relaxed">{detail}</p>
        </div>

        <div className="p-6 lg:p-8 rounded-[var(--radius-card)] bg-surface border border-border mb-12">
          <h2 className="font-heading font-semibold text-text text-xl mb-6 flex items-center gap-2">
            {t.projects.results}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((result, i) => (
              <div key={i} className="flex items-start gap-3 text-muted">
                <Code size={16} className="mt-0.5 text-gold shrink-0" />
                <span className="text-sm sm:text-base">{result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Link eksternal */}
        <div className="flex flex-wrap gap-4 mb-16">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink size={16} />
              {t.projects.visitSite}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <FaGithub size={16} />
              {t.projects.viewCode}
            </a>
          )}
        </div>

        {/* Navigasi prev/next */}
        <div className="flex items-center justify-between border-t border-border pt-8">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="flex items-center gap-2 text-muted hover:text-gold-text transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-xs text-muted block">{t.projects.prevProject}</span>
                <span className="text-sm font-medium text-text">
                  {prevProject.title[lang] || prevProject.title.en}
                </span>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="flex items-center gap-2 text-muted hover:text-gold-text transition-colors group text-right"
            >
              <div>
                <span className="text-xs text-muted block">{t.projects.nextProject}</span>
                <span className="text-sm font-medium text-text">
                  {nextProject.title[lang] || nextProject.title.en}
                </span>
              </div>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </main>
  );
}
