/**
 * ProjectDetail — halaman detail proyek (/projects/:slug)
 * Hero preview, meta info terstruktur, overview,
 * hasil & ruang lingkup, galeri interaktif dengan lightbox, serta navigasi prev/next.
 */
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lock,
  User,
  Calendar,
  Layers,
  Globe,
  CheckCircle2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useLang } from '../hooks/useLang';
import { projectsData } from '../data/projects';
import Button from '../components/ui/Button';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const isId = lang === 'id';

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [prevSlug, setPrevSlug] = useState(slug);

  if (prevSlug !== slug) {
    setPrevSlug(slug);
    setLightboxIndex(null);
  }

  // Cari proyek berdasarkan slug (dengan fallback alias slug lama jika ada)
  const projectIndex = projectsData.findIndex(
    (p) => p.slug === slug || (slug === 'ubud-digital-photography' && p.slug === 'ubud-digital-creative')
  );
  const project = projectsData[projectIndex];

  // Scroll ke atas saat pindah halaman
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Keyboard navigation untuk lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const gallery = project?.gallery?.length ? project.gallery : [project?.thumbnail].filter(Boolean);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, project]);

  // Jika proyek tidak ditemukan, redirect ke 404
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
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
  const gallery = project.gallery?.length ? project.gallery : [project.thumbnail].filter(Boolean);

  return (
    <main className="pt-24 pb-20">
      <div className="container-main">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate('/#projects')}
          className="inline-flex items-center gap-2 text-muted hover:text-gold-text transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.projects.backToProjects}</span>
        </button>

        {/* Header proyek */}
        <div className="mb-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            {project.privateSystem ? (
              <span
                className="font-mono text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5"
                style={{
                  background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
                  color: 'var(--color-gold-text)',
                  borderColor: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
                }}
              >
                <Lock size={12} />
                <span>{isId ? 'Sistem Privat' : 'Private System'}</span>
              </span>
            ) : (
              <span
                className="font-mono text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5"
                style={{
                  background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
                  color: 'var(--color-gold-text)',
                  borderColor: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
                }}
              >
                <Globe size={12} />
                <span>Web</span>
              </span>
            )}

            <span
              className="font-mono text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5"
              style={{
                background: 'var(--color-surface)',
                color: 'var(--color-muted)',
                borderColor: 'var(--color-border)',
              }}
            >
              <Calendar size={12} />
              <span>{project.year || 2025}</span>
            </span>
          </div>

          <h1
            className="text-fluid-h1 font-bold leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {title}
          </h1>

          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-3xl">
            {summary}
          </p>
        </div>

        {/* Hero preview (Video or Image) */}
        <div
          className="relative aspect-video rounded-2xl overflow-hidden border border-border mb-12 shadow-sm group"
          style={{ background: 'var(--color-surface)' }}
        >
          {project.video ? (
            <video
              src={project.video}
              controls
              muted
              playsInline
              preload="metadata"
              poster={project.thumbnail || undefined}
              className="w-full h-full object-cover"
            />
          ) : project.thumbnail ? (
            <div className="relative w-full h-full cursor-pointer" onClick={() => setLightboxIndex(0)}>
              <img
                src={project.thumbnail}
                alt={`${title} preview`}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono font-medium flex items-center gap-2">
                  <Maximize2 size={14} />
                  {isId ? 'Perbesar Gambar' : 'Click to Expand'}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-heading text-4xl text-gold/30">{title.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Meta Info Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <div className="p-4 rounded-xl border border-border bg-surface flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold/10 text-gold shrink-0">
              <User size={18} />
            </div>
            <div>
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">{t.projects.role}</span>
              <span className="text-sm font-semibold text-text">
                {project.role?.[lang] || project.role || 'Full-Stack Developer'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold/10 text-gold shrink-0">
              <Layers size={18} />
            </div>
            <div>
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">{isId ? 'Kategori' : 'Category'}</span>
              <span className="text-sm font-semibold text-text truncate max-w-[140px] block">
                {project.privateSystem ? (isId ? 'Sistem Privat' : 'Private System') : 'Web'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold/10 text-gold shrink-0">
              <Calendar size={18} />
            </div>
            <div>
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">{t.projects.year}</span>
              <span className="text-sm font-semibold text-text">{project.year || 2025}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold/10 text-gold shrink-0">
              {project.privateSystem ? <Lock size={18} /> : <Globe size={18} />}
            </div>
            <div>
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">{isId ? 'Status Akses' : 'Access'}</span>
              <span className="text-sm font-semibold text-text">
                {project.privateSystem ? (isId ? 'Sistem Privat' : 'Private System') : (isId ? 'Website Publik' : 'Public Web')}
              </span>
            </div>
          </div>
        </div>

        {/* Overview Box */}
        <div className="p-6 lg:p-8 rounded-2xl bg-surface border border-border mb-8 shadow-2xs">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-gold-text">
            <i className="fa-solid fa-circle-info text-xs" aria-hidden="true" />
            <span>{t.projects.overview}</span>
          </div>
          <div className="text-muted text-base leading-relaxed space-y-4 whitespace-pre-line">
            {detail}
          </div>
        </div>

        {/* Results & Key Features Box */}
        {results?.length > 0 && (
          <div className="p-6 lg:p-8 rounded-2xl bg-surface border border-border mb-12 shadow-2xs">
            <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-gold-text">
              <CheckCircle2 size={16} />
              <span>{t.projects.keyFeatures || t.projects.results}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((result, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-border/70 bg-bg/50">
                  <CheckCircle2 size={18} className="mt-0.5 text-gold shrink-0" />
                  <span className="text-sm sm:text-base text-text leading-snug">{result}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Galeri Tangkapan Layar */}
        {gallery.length > 1 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading font-semibold text-text text-xl sm:text-2xl mb-1">
                  {t.projects.gallery || (isId ? 'Galeri Tangkapan Layar' : 'Screenshot Gallery')}
                </h2>
                <p className="text-muted text-xs sm:text-sm font-mono">
                  {isId ? `Total ${gallery.length} tangkapan layar antarmuka sistem` : `Total ${gallery.length} system interface screenshots`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {gallery.map((image, index) => (
                <div
                  key={image + index}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-surface cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={image}
                    alt={`${title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-mono font-medium flex items-center gap-1.5">
                      <Maximize2 size={12} />
                      {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Link eksternal action bar */}
        <div className="flex flex-wrap items-center gap-4 mb-16 pt-6 border-t border-border">
          {project.privateSystem ? (
            <span className="btn-outline flex items-center gap-2 opacity-80 cursor-default">
              <Lock size={16} />
              <span>{isId ? 'Sistem Internal Privat' : 'Private Internal System'}</span>
            </span>
          ) : project.liveUrl && project.liveUrl !== '#' ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink size={16} />
              <span>{t.projects.visitSite}</span>
            </a>
          ) : null}

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <FaGithub size={16} />
              <span>{t.projects.viewCode}</span>
            </a>
          )}

          <Button
            variant="outline"
            onClick={() => navigate('/#projects')}
          >
            <ArrowLeft size={16} />
            <span>{t.projects.backToProjects}</span>
          </Button>
        </div>

        {/* Navigasi prev/next */}
        <div className="flex items-center justify-between border-t border-border pt-8">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="flex items-center gap-3 text-muted hover:text-gold-text transition-colors group"
            >
              <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">{t.projects.prevProject}</span>
                <span className="text-sm font-medium text-text group-hover:text-gold-text transition-colors">
                  {prevProject.title[lang] || prevProject.title.en}
                </span>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="flex items-center gap-3 text-muted hover:text-gold-text transition-colors group text-right ml-auto"
            >
              <div>
                <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">{t.projects.nextProject}</span>
                <span className="text-sm font-medium text-text group-hover:text-gold-text transition-colors">
                  {nextProject.title[lang] || nextProject.title.en}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors">
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>

          {/* Navigation buttons */}
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-[var(--color-on-accent)] text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-[var(--color-on-accent)] text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image & Counter */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[lightboxIndex]}
              alt={`${title} screenshot full`}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <div className="mt-3 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs font-mono text-gold">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')} — {title}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
