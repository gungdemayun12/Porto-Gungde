/**
 * Navbar — navigasi utama floating luxury island
 * Desain modern, glassmorphism dengan aksen emas mewah,
 * logo monogram eksklusif, navigasi aktif, dan tombol hamburger animasi.
 */
import { useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import LangToggle from '../ui/LangToggle';
import Button from '../ui/Button';
import { useLang } from '../../hooks/useLang';
import MobileMenu from './MobileMenu';

// ID section untuk navigasi dan highlight aktif
const NAV_SECTIONS = ['about', 'projects', 'process', 'experience', 'contact'];

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
    process: t.nav.process,
    experience: t.nav.experience,
    contact: t.nav.contact,
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-3 sm:pt-4 px-4 sm:px-6">
        <nav
          className={`container-main max-w-6xl mx-auto rounded-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between
            ${isScrolled
              ? 'bg-surface/80 dark:bg-[#101218]/88 backdrop-blur-xl border border-gold/20 shadow-[0_8px_28px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
              : 'bg-surface/35 dark:bg-[#101218]/35 backdrop-blur-md border border-border/50'
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
            className="flex items-center gap-3 group"
          >
            {/* Monogram Seal */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-surface dark:bg-[#0C0D12] flex items-center justify-center">
                <span className="font-heading text-base font-bold gradient-gold-text">G</span>
              </div>
            </div>
            {/* Nama Brand */}
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-text text-base tracking-wide group-hover:text-gold-text transition-colors">
                GUNGDEV<span className="text-gold font-serif">.</span>
              </span>
              <span className="text-[10px] font-mono text-muted tracking-widest uppercase -mt-1 hidden sm:block">
                Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg/50 dark:bg-black/30 border border-border/50">
            {NAV_SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer
                  ${activeSection === id
                    ? 'text-stone-950 font-bold gradient-gold shadow-sm shadow-gold/30'
                    : 'text-muted hover:text-text hover:bg-gold/10'
                  }`}
              >
                {navLabels[id]}
              </button>
            ))}
          </div>

          {/* Action Hub Desktop */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LangToggle />
            <ThemeToggle />

            {/* Tombol Hubungi / Hire Me */}
            <Button
              onClick={() => scrollTo('contact')}
              className="shine-sweep text-xs py-2 px-5 cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={14} className="text-stone-900" />
              <span>{t.nav.hireMe}</span>
            </Button>
          </div>

          {/* Mobile Right Controls: Lang, Theme, & Animated Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <LangToggle />
            <ThemeToggle />

            {/* Hamburger — morph halus ke X */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="relative w-10 h-10 rounded-full border border-gold/25 bg-gold/[0.08]
                flex items-center justify-center text-text
                hover:border-gold/45 hover:bg-gold/12
                transition-[border-color,background-color,transform] duration-400
                ease-[cubic-bezier(0.16,1,0.3,1)]
                cursor-pointer active:scale-[0.94]"
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
