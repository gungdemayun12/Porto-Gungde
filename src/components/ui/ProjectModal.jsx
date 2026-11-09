/**
 * ProjectModal — detail proyek dengan open/close yang halus
 * Dual-mode visibility terjaga, Font Awesome icons, dual button action bar.
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLang } from '../../hooks/useLang';
import Button from './Button';

const EASE = [0.22, 1, 0.36, 1];

export default function ProjectModal({ project, onClose }) {
  const { t, lang } = useLang();
  const navigate = useNavigate();
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
  const gallery = project.gallery?.length ? project.gallery : [project.thumbnail].filter(Boolean);

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
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.85 }}
        className="relative z-10 w-full max-w-4xl max-h-[92vh] rounded-[22px]
          flex flex-col overflow-hidden will-change-transform"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid color-mix(in srgb, var(--color-gold) 30%, var(--color-border))',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px color-mix(in srgb, var(--color-gold) 12%, transparent) inset',
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0"
          style={{ background: 'var(--color-bg)' }}
        >
          <div className="flex items-center gap-2.5 flex-wrap">
            {project.privateSystem ? (
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                style={{
                  background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
                  color: 'var(--color-gold-text)',
                  border: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)',
                }}
              >
                <i className="fa-solid fa-lock text-[10px] mr-1.5" aria-hidden="true" />
                {isId ? 'Sistem Privat' : 'Private System'}
              </span>
            ) : (
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                style={{
                  background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
                  color: 'var(--color-gold-text)',
                  border: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)',
                }}
              >
                <i className="fa-solid fa-globe text-[10px] mr-1.5" aria-hidden="true" />
                Web
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-gold)';
              e.currentTarget.style.color = 'var(--color-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
          <div>
            <h2
              className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide leading-snug mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              {title}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: 'var(--color-muted)' }}>
              {summary}
            </p>
          </div>

          {/* Media gallery */}
          <div className="space-y-3">
            <div
              className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border group shadow-sm"
              style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
            >
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
              ) : gallery.length > 0 ? (
                <img
                  src={gallery[activeImageIndex]}
                  alt={`${title} Preview ${activeImageIndex + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gold/40">
                  {title.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label={isId ? 'Gambar sebelumnya' : 'Previous image'}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                      bg-black/60 border border-white/20 text-white flex items-center justify-center
                      hover:bg-gold hover:text-[var(--color-on-accent)] hover:border-gold transition-colors duration-200 cursor-pointer shadow-md"
                  >
                    <i className="fa-solid fa-chevron-left text-sm" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label={isId ? 'Gambar berikutnya' : 'Next image'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                      bg-black/60 border border-white/20 text-white flex items-center justify-center
                      hover:bg-gold hover:text-[var(--color-on-accent)] hover:border-gold transition-colors duration-200 cursor-pointer shadow-md"
                  >
                    <i className="fa-solid fa-chevron-right text-sm" aria-hidden="true" />
                  </button>
                </>
              )}

              {gallery.length > 0 && (
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-gold font-semibold">
                  {String(activeImageIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                </div>
              )}
            </div>

            {/* Thumbnail carousel strip */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className="relative w-20 sm:w-24 aspect-[16/10] rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer"
                    style={{
                      borderColor: activeImageIndex === idx ? 'var(--color-gold)' : 'var(--color-border)',
                      opacity: activeImageIndex === idx ? 1 : 0.6,
                      transform: activeImageIndex === idx ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project description box */}
          <div
            className="rounded-2xl border p-5 sm:p-6 shadow-2xs"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg)',
            }}
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] font-semibold" style={{ color: 'var(--color-gold-text)' }}>
              <i className="fa-solid fa-circle-info text-xs" aria-hidden="true" />
              <span>{isId ? 'Detail Proyek' : 'Project Detail'}</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-text)' }}>
              {detail}
            </p>
          </div>

          {/* Results / Key Highlights */}
          {project.results?.[lang]?.length > 0 && (
            <div
              className="rounded-2xl border p-5 sm:p-6 shadow-2xs"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-bg)',
              }}
            >
              <div className="mb-3.5 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] font-semibold" style={{ color: 'var(--color-gold-text)' }}>
                <i className="fa-solid fa-list-check text-xs" aria-hidden="true" />
                <span>{t.projects.keyFeatures || (isId ? 'Fitur Utama & Lingkup Kerja' : 'Key Highlights & Scope')}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.results[lang].map((res, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm" style={{ color: 'var(--color-muted)' }}>
                    <i className="fa-solid fa-circle-check text-xs mt-1 shrink-0" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Action bar / Footer */}
        <div
          className="px-6 py-4 border-t border-border flex flex-wrap items-center justify-between gap-3 shrink-0"
          style={{ background: 'var(--color-bg)' }}
        >
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              onClick={onClose}
            >
              <i className="fa-solid fa-xmark text-xs" aria-hidden="true" />
              <span>{isId ? 'Tutup' : 'Close'}</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                onClose();
                navigate(`/projects/${project.slug}`);
              }}
            >
              <i className="fa-solid fa-file-lines text-xs" aria-hidden="true" />
              <span>{t.projects.viewFullPage || (isId ? 'Halaman Lengkap' : 'Full Page')}</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {project.privateSystem ? (
              <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg border flex items-center gap-1.5" style={{ color: 'var(--color-muted)', borderColor: 'var(--color-border)' }}>
                <i className="fa-solid fa-lock text-xs" aria-hidden="true" />
                <span>{isId ? 'Sistem privat' : 'Private system'}</span>
              </span>
            ) : project.liveUrl && project.liveUrl !== '#' ? (
              <Button
                variant="primary"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{isId ? 'Kunjungi Situs' : 'Visit Live Site'}</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true" />
              </Button>
            ) : (
              <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg border flex items-center gap-1.5" style={{ color: 'var(--color-muted)', borderColor: 'var(--color-border)' }}>
                <i className="fa-solid fa-lock text-xs" aria-hidden="true" />
                <span>{isId ? 'Sistem privat' : 'Private system'}</span>
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}