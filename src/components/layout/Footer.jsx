/**
 * Footer — rapi, elegan, dan aman di mode terang maupun gelap.
 *
 * Struktur:
 *  - Garis aksen gradasi emas di bagian paling atas
 *  - Blok brand (logo, tagline, lokasi, CTA kecil)
 *  - Navigasi cepat
 *  - Hubungi + ikon sosial
 *  - Baris bawah: hak cipta, status ketersediaan, tombol kembali ke atas
 */
import { useLang } from '../../hooks/useLang';
import { CONTACT, whatsappLink } from '../../data/contact';

const NAV_LINKS = [
  { id: 'about',      en: 'About',      id_: 'Tentang' },
  { id: 'projects',   en: 'Projects',   id_: 'Proyek' },
  { id: 'arcade',     en: 'Arcade',     id_: 'Arcade' },
  { id: 'experience', en: 'Journey',    id_: 'Perjalanan' },
  { id: 'contact',    en: 'Contact',    id_: 'Kontak' },
];

const SOCIALS = [
  { href: CONTACT.linkedin,  icon: 'fa-brands fa-linkedin',  label: 'LinkedIn' },
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
      className="relative overflow-hidden"
      role="contentinfo"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Garis aksen gradasi emas */}
      <div
        className="h-[1.5px] w-full"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
      />

      {/* Cahaya lembut di sudut — dekoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[38rem] h-[20rem] blur-[90px] opacity-[0.10]"
        style={{ background: 'radial-gradient(circle, var(--color-gold), transparent 70%)' }}
      />

      <div className="container-main relative pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* ── Brand (5/12) ── */}
          <div className="lg:col-span-5 sm:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo/gungdev-logo-gd-emerald.png"
                alt="Gungdev logo"
                className="brand-logo h-11 w-11 object-contain"
              />
              <div>
                <p
                  className="text-xl font-bold tracking-wide leading-none"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                >
                  GUNGDEV
                  <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>.</span>
                </p>
                <p
                  className="text-[10px] font-mono uppercase tracking-[0.18em] mt-1.5"
                  style={{ color: 'var(--color-gold-text)' }}
                >
                  {isId ? 'Web Developer & Digital Marketing' : 'Web Developer & Digital Marketing'}
                </p>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed mt-5 max-w-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              {t.footer.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
              <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
                <i className="fa-solid fa-location-dot text-[11px]" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                <span>{CONTACT.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
                <i className="fa-solid fa-circle text-[6px]" style={{ color: '#22c55e' }} aria-hidden="true" />
                <span>{isId ? 'Terbuka untuk proyek' : 'Open for projects'}</span>
              </div>
            </div>
          </div>

          {/* ── Navigasi (3/12) ── */}
          <nav className="lg:col-span-3" aria-label="Footer navigation">
            <span
              className="block text-[11px] font-mono uppercase tracking-[0.2em] font-bold mb-4"
              style={{ color: 'var(--color-gold-text)' }}
            >
              {isId ? 'Navigasi' : 'Navigation'}
            </span>
            <ul className="grid grid-cols-1 gap-1">
              {NAV_LINKS.map(({ id, en, id_ }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="footer-link group inline-flex items-center gap-2 text-xs font-mono min-h-9 cursor-pointer transition-colors duration-200"
                    style={{ color: 'var(--color-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
                  >
                    <i
                      className="fa-solid fa-chevron-right text-[8px] opacity-50 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    {isId ? id_ : en}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Hubungi & sosial (4/12) ── */}
          <div className="lg:col-span-4">
            <span
              className="block text-[11px] font-mono uppercase tracking-[0.2em] font-bold mb-4"
              style={{ color: 'var(--color-gold-text)' }}
            >
              {isId ? 'Terhubung' : 'Connect'}
            </span>

            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 text-xs font-mono transition-colors duration-200 mb-3 min-h-11 break-all"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              <i className="fa-solid fa-envelope text-[11px]" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
              {CONTACT.email}
            </a>

            <div className="flex flex-wrap items-center gap-2.5">
              {SOCIALS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="footer-social w-11 h-11 rounded-[2px] flex items-center justify-center transition-all duration-200 shadow-2xs"
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

        {/* ── Baris bawah ── */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs font-mono font-medium text-center sm:text-left" style={{ color: 'var(--color-muted)' }}>
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
            className="group flex h-11 w-11 items-center justify-center rounded-[2px] cursor-pointer transition-all duration-200 shadow-xs"
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
            <i
              className="fa-solid fa-arrow-up text-xs transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
