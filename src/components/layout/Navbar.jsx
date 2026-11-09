/**
 * Navbar — navigasi utama floating luxury island
 * Desain modern, glassmorphism dengan aksen emas mewah,
 * logo monogram eksklusif, navigasi aktif, dan tombol hamburger animasi.
 */
import { useState, useEffect, useCallback } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import LangToggle from '../ui/LangToggle';
import Button from '../ui/Button';
import { useLang } from '../../hooks/useLang';
import MobileMenu from './MobileMenu';

// ID section untuk navigasi dan highlight aktif
const NAV_SECTIONS = ['about', 'projects', 'arcade', 'experience', 'contact'];

export default function Navbar() {
  const { t } = useLang();
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Deteksi scroll untuk transisi header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver untuk link aktif
  useEffect(() => {
    const observers = [];

    NAV_SECTIONS.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push({ observer, el });
    });

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, []);

  // Smooth scroll
  const scrollTo = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  // Lock body scroll saat mobile menu aktif tanpa layout jump
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.touchAction = '';
      return;
    }

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const navLabels = {
    about: t.nav.about,
    projects: t.nav.projects,
    arcade: 'Arcade',
    experience: t.nav.experience,
    contact: t.nav.contact,
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-3 sm:pt-4 px-4 sm:px-6">
        <nav
          className={`container-main max-w-6xl mx-auto rounded-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between
            ${isScrolled
              ? 'bg-surface/92 dark:bg-[#0A120D]/92 backdrop-blur-xl border border-gold/30 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
              : 'bg-surface/85 dark:bg-[#0A120D]/85 backdrop-blur-md border border-border shadow-xs'
            }`}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo & Monogram Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0">
              <img
                src="/images/logo/gungdev-logo-gd-emerald.png"
                alt="Gungdev logo"
                className="brand-logo h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Nama Brand */}
            <div className="hidden min-[380px]:flex flex-col">
              <span className="font-heading font-semibold text-text text-sm tracking-wide group-hover:text-gold-text transition-colors sm:text-base">
                GUNGDEV<span className="text-gold font-serif">.</span>
              </span>
              <span className="text-[10px] font-mono text-muted tracking-widest uppercase -mt-0.5 hidden xl:block font-medium">
                {t.hero.role}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden min-[1120px]:flex items-center gap-0.5 px-2.5 py-1.5 rounded-full border"
            style={{
              background: 'color-mix(in srgb, var(--color-bg) 85%, transparent)',
              borderColor: 'var(--color-border)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {NAV_SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-300 cursor-pointer
                  ${activeSection === id
                    ? 'font-bold shadow-xs'
                    : 'hover:bg-gold/10'
                  }`}
                style={{
                  background: activeSection === id ? 'var(--color-gold)' : 'transparent',
                  color: activeSection === id ? 'var(--color-on-accent)' : 'var(--color-muted)',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== id) e.currentTarget.style.color = 'var(--color-text)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== id) e.currentTarget.style.color = 'var(--color-muted)';
                }}
              >
                {navLabels[id]}
              </button>
            ))}
          </div>

          {/* Action Hub Desktop */}
          <div className="hidden min-[1120px]:flex items-center gap-2.5">
            <LangToggle compact />
            <ThemeToggle />

            {/* Tombol Hubungi / Hire Me */}
            <Button
              variant="primary"
              onClick={() => scrollTo('contact')}
              className="text-xs py-2 px-4.5 rounded-full cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <i className="fa-solid fa-paper-plane text-xs" aria-hidden="true" />
              <span>{t.nav.hireMe}</span>
            </Button>
          </div>

          {/* Mobile Right Controls: Lang, Theme, & Animated Hamburger */}
          <div className="flex min-[1120px]:hidden items-center gap-2">
            <LangToggle compact />
            <ThemeToggle />

            {/* Hamburger — morph halus ke X */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border bg-surface/90
                flex items-center justify-center text-text
                hover:border-gold hover:bg-gold/10
                transition-[border-color,background-color,transform] duration-400
                ease-[cubic-bezier(0.16,1,0.3,1)]
                cursor-pointer active:scale-95 shadow-xs"
            >
              <span className="relative block w-5 h-3.5" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 block h-[1.5px] w-5 rounded-full bg-current origin-center
                    transition-[transform,background-color] duration-400
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${mobileMenuOpen ? 'translate-y-[6.5px] rotate-45 !bg-gold' : ''}`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 block h-[1.5px] w-3.5 rounded-full bg-gold
                    transition-[opacity,transform] duration-300
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${mobileMenuOpen ? 'opacity-0 scale-x-50' : 'opacity-100 scale-x-100'}`}
                />
                <span
                  className={`absolute left-0 bottom-0 block h-[1.5px] w-5 rounded-full bg-current origin-center
                    transition-[transform,background-color] duration-400
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${mobileMenuOpen ? '-translate-y-[6.5px] -rotate-45 !bg-gold' : ''}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Luxury Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sections={NAV_SECTIONS}
        navLabels={navLabels}
        activeSection={activeSection}
        scrollTo={scrollTo}
      />
    </>
  );
}