/**
 * MobileMenu — drawer navigasi mobile yang halus & elegan
 * Dual-mode visibility terjaga 100%, Font Awesome icons, responsive.
 */
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { useLang } from '../../hooks/useLang';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CONTACT, whatsappLink } from '../../data/contact';
import Button from '../ui/Button';
import LangToggle from '../ui/LangToggle';
import ThemeToggle from '../ui/ThemeToggle';

/* Soft luxury curve — silky, no bounce */
const EASE = [0.16, 1, 0.3, 1];
const EASE_OUT = [0.22, 1, 0.36, 1];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.38, ease: EASE_OUT, delay: 0.04 },
  },
};

const panelVariants = {
  hidden: { x: '102%', opacity: 0.5 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.48, ease: EASE },
  },
  exit: {
    x: '102%',
    opacity: 0.5,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, delay: 0.32 },
  },
};

export default function MobileMenu({
  isOpen,
  onClose,
  sections,
  navLabels,
  activeSection,
  scrollTo,
}) {
  const { t, lang } = useLang();
  const prefersReduced = useReducedMotion();
  const isId = lang === 'id';

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleNavClick = (id) => {
    onClose();
    window.setTimeout(() => scrollTo(id), prefersReduced ? 0 : 360);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="menu-backdrop"
            variants={prefersReduced ? undefined : backdropVariants}
            initial={prefersReduced ? false : 'hidden'}
            animate="visible"
            exit="exit"
            transition={prefersReduced ? { duration: 0.01 } : undefined}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            key="menu-panel"
            variants={prefersReduced ? undefined : panelVariants}
            initial={prefersReduced ? false : 'hidden'}
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed top-0 right-0 bottom-0 z-[101] w-full sm:w-[360px] max-w-[88vw]
              bg-bg/98 dark:bg-[#070B09]/98 backdrop-blur-2xl
              border-l border-border
              shadow-[-20px_0_50px_rgba(0,0,0,0.25)]
              flex flex-col will-change-transform"
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full
                bg-gold/10 blur-3xl"
              aria-hidden="true"
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 sm:px-7 pt-6 pb-5
              border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo/gungdev-logo-gd-emerald.png"
                  alt="Gungde"
                  className="brand-logo h-10 w-10 shrink-0 object-contain"
                />
                <div>
                  <span className="font-heading font-semibold text-[15px] text-text tracking-wide">
                    GUNGDEV<span className="text-gold font-serif">.</span>
                  </span>
                  <span className="block text-[10px] text-muted tracking-wide -mt-0.5 font-medium">
                    {t.hero.role}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full border border-border bg-surface
                  flex items-center justify-center text-text
                  hover:text-gold-text hover:border-gold hover:bg-gold/10
                  transition-all duration-300 ease-out
                  cursor-pointer active:scale-95 shadow-xs"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Nav links */}
            <motion.nav
              className="relative z-10 flex-1 min-h-0 flex flex-col justify-center px-5 sm:px-6 py-6 gap-1 overflow-y-auto"
              variants={prefersReduced ? undefined : listVariants}
              initial="hidden"
              animate="visible"
              aria-label="Sections"
            >
              <div className="px-3.5 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-gold-text font-semibold">
                  {isId ? 'Navigasi' : 'Navigation'}
                </span>
              </div>

              {sections.map((id, index) => {
                const isActive = activeSection === id;
                const number = String(index + 1).padStart(2, '0');

                return (
                  <motion.button
                    key={id}
                    type="button"
                    variants={prefersReduced ? undefined : itemVariants}
                    onClick={() => handleNavClick(id)}
                    className={`group flex items-center justify-between w-full py-3.5 px-3.5 rounded-xl
                      text-left cursor-pointer
                      transition-all duration-300 ease-out
                      ${
                        isActive
                          ? 'bg-gold/15 border border-gold/40 text-text font-semibold'
                          : 'border border-transparent text-muted hover:text-text hover:bg-gold/10'
                      }`}
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span
                        className={`font-mono text-[11px] font-semibold tracking-wider transition-colors duration-300 ${
                          isActive ? 'text-gold-text' : 'text-muted group-hover:text-gold-text'
                        }`}
                      >
                        {number}
                      </span>
                      <span
                        className={`font-heading text-[1.25rem] sm:text-[1.35rem] tracking-wide
                          transition-colors duration-300 ${
                          isActive ? 'text-gold-text font-bold' : 'font-medium'
                        }`}
                      >
                        {navLabels[id]}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className={`text-gold transition-all duration-300 ease-out ${
                        isActive
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </motion.nav>

            {/* Footer */}
            <motion.div
              className="relative z-10 px-6 sm:px-7 pb-7 pt-5 border-t border-border space-y-4"
              variants={prefersReduced ? undefined : footerVariants}
              initial="hidden"
              animate="visible"
            >
              <Button
                variant="primary"
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 text-xs flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-paper-plane text-xs" aria-hidden="true" />
                <span>{t.nav.hireMe}</span>
              </Button>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <LangToggle />
                <ThemeToggle showLabel />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <a
                  href={whatsappLink(
                    isId
                      ? 'Halo Gungde, saya tertarik bekerja sama dengan Anda.'
                      : "Hi Gungde, I'm interested in working with you."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono font-medium text-muted
                    hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
                >
                  <i className="fa-brands fa-whatsapp text-sm text-emerald-500" aria-hidden="true" />
                  <span>{CONTACT.whatsappDisplay}</span>
                </a>

                <div className="flex items-center gap-2">
                  {[
                    { href: CONTACT.github, label: 'GitHub', icon: 'fa-brands fa-github' },
                    { href: CONTACT.instagram, label: 'Instagram', icon: 'fa-brands fa-instagram' },
                  ].map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-8 h-8 rounded-full border border-border bg-surface
                        flex items-center justify-center text-text
                        hover:text-gold-text hover:border-gold hover:bg-gold/10 transition-all duration-300"
                    >
                      <i className={`${icon} text-xs`} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
                <i className="fa-solid fa-location-dot text-xs text-gold" aria-hidden="true" />
                <span>{CONTACT.locationShort}</span>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}