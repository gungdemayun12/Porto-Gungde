/**
 * Footer — clean, polished, fully dual-mode safe.
 * Font Awesome social icons, crisp typography, and responsive layout.
 */
import { useLang } from '../../hooks/useLang';
import { CONTACT, whatsappLink } from '../../data/contact';

const NAV_LINKS = [
  { id: 'about',      en: 'About',      id_: 'Tentang' },
  { id: 'projects',   en: 'Projects',   id_: 'Proyek' },
  { id: 'arcade',     en: 'Arcade',     id_: 'Arcade' },
  { id: 'experience', en: 'Experience', id_: 'Pengalaman' },
  { id: 'contact',    en: 'Contact',    id_: 'Kontak' },
];

const SOCIALS = [
  { href: CONTACT.github,    icon: 'fa-brands fa-github',    label: 'GitHub' },
  { href: CONTACT.instagram, icon: 'fa-brands fa-instagram', label: 'Instagram' },
  { href: whatsappLink('Hi Gungde!'), icon: 'fa-brands fa-whatsapp', label: 'WhatsApp' },
];

export default function Footer() {
  const { t, lang } = useLang();
  const currentYear = new Date().getFullYear();
  const isId = lang === 'id';

  return (
    <footer
      className="relative"
      role="contentinfo"
      style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
    >
      {/* Gold gradient accent line */}
      <div
        className="h-[1.5px] w-full"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
      />

      <div className="container-main py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 mb-10">

          {/* Brand block (col 1-5) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo/gungdev-logo-gd-emerald.png"
                alt="Gungdev logo"
                className="brand-logo h-10 w-10 object-contain"
              />
              <p
                className="text-xl font-bold tracking-wide"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text)',
                }}
              >
                GUNGDEV
                <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>.</span>
              </p>
            </div>
            <p
              className="text-xs font-mono leading-relaxed max-w-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs font-mono" style={{ color: 'var(--color-gold-text)' }}>
              <i className="fa-solid fa-location-dot text-xs text-gold" aria-hidden="true" />
              <span>{CONTACT.location}</span>
            </div>
          </div>

          {/* Navigation (col 6-8) */}
          <nav className="md:col-span-4 flex flex-col gap-2.5" aria-label="Footer navigation">
            <span
              className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold mb-1"
              style={{ color: 'var(--color-gold-text)' }}
            >
              {isId ? 'Navigasi' : 'Navigation'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map(({ id, en, id_ }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-xs font-mono text-left cursor-pointer transition-colors duration-200 py-1"
                  style={{ color: 'var(--color-muted)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--color-muted)')}
                >
                  <i className="fa-solid fa-chevron-right text-[9px] mr-1.5 opacity-60" aria-hidden="true" />
                  {isId ? id_ : en}
                </button>
              ))}
            </div>
          </nav>

          {/* Social links (col 9-12) */}
          <div className="md:col-span-3">
            <span
              className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold mb-3 block"
              style={{ color: 'var(--color-gold-text)' }}
            >
              {isId ? 'Terhubung' : 'Connect'}
            </span>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shadow-2xs"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-gold)';
                    e.currentTarget.style.color = 'var(--color-gold)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-text)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i className={`${icon} text-base`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs font-mono font-medium" style={{ color: 'var(--color-muted)' }}>
            © {currentYear} Gungde Mayun. {t.footer.rights}
          </p>

          <div className="flex items-center gap-1.5 text-xs font-mono font-medium" style={{ color: 'var(--color-muted)' }}>
            <i className="fa-solid fa-heart text-[10px]" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
            <span>{isId ? 'Dibuat dengan dedikasi di Bali, Indonesia' : 'Crafted with care in Bali, Indonesia'}</span>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t.footer.backToTop}
            className="flex h-9 w-9 items-center justify-center rounded-full cursor-pointer transition-all duration-200 shadow-xs"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-gold)';
              e.currentTarget.style.color = 'var(--color-gold)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <i className="fa-solid fa-arrow-up text-xs" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}