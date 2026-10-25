/**
 * ProjectModal — detail proyek dengan open/close yang halus
 */
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Calendar } from 'lucide-react';
import { useLang } from '../../hooks/useLang';

const EASE = [0.22, 1, 0.36, 1];

export default function ProjectModal({ project, onClose }) {
  const { lang } = useLang();
  const isId = lang === 'id';

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [onClose]);

  if (!project) return null;

  const title = project.title[lang] || project.title.en;
  const summary = project.summary[lang] || project.summary.en;
  const detail = project.detail?.[lang] || project.detail?.en || summary;
  const gallery = project.gallery?.length ? project.gallery : [project.thumbnail];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail Proyek: ${title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/35 dark:bg-black/70 backdrop-blur-md"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.85 }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-surface/98 dark:bg-[#0C0E14]/96 backdrop-blur-xl
          border border-border dark:border-white/[0.08] rounded-[22px]
          shadow-[0_24px_70px_rgba(0,0,0,0.2)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.55)]
          flex flex-col overflow-hidden will-change-transform"
      >
        <div className="px-6 py-4 border-b border-border dark:border-white/[0.06] flex items-center justify-between bg-bg/80 dark:bg-[#08090D]/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-gold/12 text-gold border border-gold/25">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted flex items-center gap-1">
              <Calendar size={13} className="text-gold/80" />
              {project.year}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full border border-border bg-surface
              flex items-center justify-center text-muted dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70
              hover:text-gold-text dark:hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
          >
            <X size={17} strokeWidth={1.75} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-text dark:text-white tracking-wide leading-snug mb-2">
              {title}
            </h2>
            <p className="font-mono text-sm text-muted leading-relaxed max-w-2xl">
              {summary}
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-surface dark:bg-black/50 border border-border dark:border-white/[0.06] group">
              {project.video ? (
                <video
                  src={project.video}
                  className="w-full h-full object-cover"
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster={project.thumbnail || undefined}
                />
              ) : (
                <img
                  src={gallery[activeImageIndex]}
                  alt={`${title} Preview ${activeImageIndex + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label={isId ? 'Gambar sebelumnya' : 'Previous image'}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                      bg-black/55 border border-white/15 text-white flex items-center justify-center
                      hover:bg-gold hover:text-stone-950 hover:border-gold transition-colors duration-300 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label={isId ? 'Gambar berikutnya' : 'Next image'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                      bg-black/55 border border-white/15 text-white flex items-center justify-center
                      hover:bg-gold hover:text-stone-950 hover:border-gold transition-colors duration-300 cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-gold">
                {String(activeImageIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-24 aspect-[16/10] rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-gold/70 opacity-100'
                        : 'border-white/10 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-bg/70 dark:border-white/[0.06] dark:bg-white/[0.02] p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-gold/80">
              <span>{isId ? 'Detail Proyek' : 'Project Detail'}</span>
            </div>
            <p className="font-mono text-xs sm:text-sm leading-relaxed text-text/80 dark:text-stone-300 whitespace-pre-line">
              {detail}
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border dark:border-white/[0.06] bg-bg/80 dark:bg-[#08090D]/80 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-border text-muted font-mono text-xs
              dark:border-white/10 dark:text-stone-400 hover:border-gold/40 hover:text-gold-text dark:hover:text-gold transition-colors cursor-pointer"
          >
            {isId ? 'Tutup' : 'Close'}
          </button>

          {project.liveUrl && project.liveUrl !== '#' ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-5 flex items-center gap-2"
            >
              <span>{isId ? 'Lihat Live' : 'Live Demo'}</span>
              <ExternalLink size={14} className="text-current" />
            </a>
          ) : (
            <span className="text-xs font-mono text-muted">
              {isId ? 'Sistem privat' : 'Private system'}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
