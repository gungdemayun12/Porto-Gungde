/**
 * MobileMenu — drawer navigasi mobile yang halus & elegan
 * Tween ease-out (bukan spring kaku) + stagger lembut.
 */
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUpRight, MapPin } from 'lucide-react';
import { FaWhatsapp, FaGithub, FaInstagram } from 'react-icons/fa6';
import { useLang } from '../../hooks/useLang';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CONTACT, whatsappLink } from '../../data/contact';

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
    transition: { type: 'spring', stiffness: 260, damping: 28, mass: 0.9 },
  },
  exit: {
    x: '102%',
    opacity: 0.5,
    transition: { duration: 0.38, ease: EASE_OUT },
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
          {/* Backdrop — direct child of AnimatePresence so exit can finish */}
          <motion.div
            key="menu-backdrop"
            variants={prefersReduced ? undefined : backdropVariants}
            initial={prefersReduced ? false : 'hidden'}
            animate="visible"
            exit="exit"
            transition={prefersReduced ? { duration: 0.01 } : undefined}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[6px]"
            style={{ WebkitBackdropFilter: 'blur(6px)' }}
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
              bg-[#0A0B0F]/92 backdrop-blur-2xl
              border-l border-white/[0.07]
              shadow-[-20px_0_50px_rgba(0,0,0,0.4)]
              flex flex-col will-change-transform"
            style={{ WebkitBackdropFilter: 'blur(28px)' }}
          >
            {/* Soft ambient glow — satu saja, tidak ramai */}
            <div
              className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full
                bg-gold/[0.06] blur-3xl"
              aria-hidden="true"
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 sm:px-7 pt-6 pb-5
              border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-dark p-px">
                  <div className="w-full h-full rounded-full bg-[#0A0B0F] flex items-center justify-center">
                    <span className="font-heading font-bold text-xs gradient-gold-text">G</span>
                  </div>
                </div>
                <div>
                  <span className="font-heading font-semibold text-[15px] text-white tracking-wide">
                    GUNGDE<span className="text-gold">.</span>
                  </span>
                  <span className="block font-mono text-[9px] text-white/35 uppercase tracking-[0.2em] -mt-0.5">
                    Web Developer
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03]
                  flex items-center justify-center text-white/60
                  hover:text-gold hover:border-gold/35 hover:bg-gold/[0.08]
                  transition-[color,border-color,background-color] duration-300 ease-out
                  cursor-pointer active:scale-[0.96]"
              >
                <X size={17} strokeWidth={1.75} />
              </button>
            </div>

            {/* Nav links */}
            <motion.nav
              className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-6 py-6 gap-0.5"
              variants={prefersReduced ? undefined : listVariants}
              initial="hidden"
              animate="visible"
              aria-label="Sections"
            >
              <div className="px-3.5 mb-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-gold/60">
                  {isId ? 'Navigasi' : 'Navigate'}
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
                      transition-[background-color,border-color,color] duration-300 ease-out
                      ${
                        isActive
                          ? 'bg-gold/[0.09] border border-gold/20 text-white'
                          : 'border border-transparent text-white/50 hover:text-white hover:bg-white/[0.035]'
                      }`}
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span
                        className={`font-mono text-[11px] tracking-wider transition-colors duration-300 ${
                          isActive ? 'text-gold' : 'text-white/20 group-hover:text-gold/55'
                        }`}
                      >
                        {number}
                      </span>
                      <span
                        className={`font-heading text-[1.3rem] sm:text-[1.45rem] tracking-wide
                          transition-colors duration-300 ${
                          isActive ? 'gradient-gold-text font-semibold' : 'font-medium'
                        }`}
                      >
                        {navLabels[id]}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.75}
                      className={`text-gold transition-[opacity,transform] duration-300 ease-out ${
                        isActive
                          ? 'opacity-70 translate-x-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </motion.nav>

            {/* Footer — minimal, satu CTA utama */}
            <motion.div
              className="relative z-10 px-6 sm:px-7 pb-7 pt-5 border-t border-white/[0.06] space-y-4"
              variants={prefersReduced ? undefined : footerVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="btn-primary shine-sweep w-full py-3 text-xs"
              >
                {t.nav.hireMe}
              </button>

              <div className="flex items-center justify-between gap-3">
                <a
                  href={whatsappLink(
                    isId
                      ? 'Halo Gungde, saya tertarik bekerja sama dengan Anda.'
                      : "Hi Gungde, I'm interested in working with you."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] font-mono text-white/40
                    hover:text-emerald-400/90 transition-colors duration-300"
                >
                  <FaWhatsapp size={13} />
                  <span>{CONTACT.whatsappDisplay}</span>
                </a>

                <div className="flex items-center gap-1.5">
                  {[
                    { href: CONTACT.github, label: 'GitHub', Icon: FaGithub },
                    { href: CONTACT.instagram, label: 'Instagram', Icon: FaInstagram },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-8 h-8 rounded-full border border-white/10
                        flex items-center justify-center text-white/40
                        hover:text-gold hover:border-gold/30 transition-colors duration-300"
                    >
                      <Icon size={12} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/25">
                <MapPin size={10} className="text-gold/50" />
                <span>{CONTACT.locationShort}</span>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
