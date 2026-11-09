/**
 * Contact — fully dual-mode safe, Font Awesome icons, clean layout.
 * High-contrast colors in both dark and light mode, matched dual button CTA.
 */
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { useLang } from '../hooks/useLang';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CONTACT, whatsappLink } from '../data/contact';

export default function Contact() {
  const { lang } = useLang();
  const titleRef = useScrollReveal();
  const heroCardRef = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });
  const cardsRef = useScrollReveal({ rootMargin: '0px 0px -20px 0px' });
  const socialRef = useScrollReveal({ rootMargin: '0px 0px -10px 0px' });
  const [copied, setCopied] = useState(false);
  const isId = lang === 'id';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const waLink = whatsappLink(
    isId
      ? 'Halo Gungde, saya tertarik mendiskusikan proyek website.'
      : 'Hello Gungde, I would like to discuss a website project.'
  );

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      aria-label="Contact"
    >
      <div className="container-main relative z-10">
        <div ref={titleRef} className="sr-fade-up">
          <SectionTitle
            label={isId ? 'KONTAK' : 'CONTACT'}
            title={isId ? 'Mari bahas kebutuhan Anda.' : "Let's discuss your project."}
            subtitle={isId
              ? 'Hubungi saya lewat WhatsApp atau email untuk konsultasi dan penawaran website.'
              : 'Reach out via WhatsApp or email to discuss your website and marketing goals.'}
          />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Hero CTA card with matched dual button pair */}
          <div
            ref={heroCardRef}
            className="sr-fade-up rounded-[24px] p-6 sm:p-8 mb-6 relative overflow-hidden shadow-2xs"
            style={{
              background: 'var(--color-surface)',
              border: '1.5px solid color-mix(in srgb, var(--color-gold) 30%, transparent)',
            }}
          >
            <div
              className="absolute -right-16 -top-16 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-gold) 7%, transparent), transparent 70%)' }}
            />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] font-bold mb-2"
                  style={{ color: 'var(--color-gold-text)' }}
                >
                  <span className="h-px w-5" style={{ background: 'var(--color-gold)' }} />
                  {isId ? 'Konsultasi Terbuka' : 'Open for Inquiries'}
                </span>
                <h3
                  className="text-2xl sm:text-3xl mb-2 font-bold"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                >
                  {isId ? 'Ceritakan ide dan kebutuhan proyek Anda.' : 'Tell me about your project.'}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {isId
                    ? 'Saya siap membantu merancang website profesional dan solusi pemasaran digital yang tepat untuk Anda.'
                    : "I'm ready to craft high-performance websites and effective digital strategies tailored for you."}
                </p>
              </div>

              {/* Dual button pair in Hero CTA card */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 items-stretch sm:items-center">
                <Button
                  variant="primary"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-sm"
                >
                  <i className="fa-brands fa-whatsapp text-base" aria-hidden="true" />
                  <span>{isId ? 'Chat WhatsApp' : 'Chat WhatsApp'}</span>
                </Button>

                <Button
                  variant="outline"
                  href={`mailto:${CONTACT.email}`}
                >
                  <i className="fa-solid fa-envelope text-sm" aria-hidden="true" />
                  <span>{isId ? 'Kirim Email' : 'Send Email'}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* 3-column contact cards */}
          <div ref={cardsRef} className="sr-stagger grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            {/* WhatsApp Card */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card group relative p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{ minHeight: '230px' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-whatsapp)';
                e.currentTarget.style.boxShadow = '0 16px 40px -12px color-mix(in srgb, var(--color-whatsapp) 30%, transparent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'var(--color-whatsapp-bg)', filter: 'blur(30px)' }}
              />
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-2xs"
                    style={{
                      background: 'var(--color-whatsapp-bg)',
                      border: '1px solid var(--color-whatsapp-border)',
                      color: 'var(--color-whatsapp)',
                    }}
                  >
                    <i className="fa-brands fa-whatsapp text-xl" aria-hidden="true" />
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold"
                    style={{
                      background: 'var(--color-whatsapp-bg)',
                      border: '1px solid var(--color-whatsapp-border)',
                      color: 'var(--color-whatsapp)',
                    }}
                  >
                    <i className="fa-solid fa-comment-dots text-[10px]" aria-hidden="true" />
                    {isId ? 'Respon Cepat' : 'Fast Response'}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  WhatsApp
                </h3>
                <p className="text-sm font-mono font-semibold" style={{ color: 'var(--color-whatsapp)' }}>
                  {CONTACT.whatsappDisplay}
                </p>
                <p className="text-xs sm:text-sm mt-1.5" style={{ color: 'var(--color-muted)' }}>
                  {isId ? 'Untuk pertanyaan langsung & konsultasi cepat' : 'Direct messaging and quick project consultation'}
                </p>
              </div>
              <div
                className="flex items-center justify-between pt-4 mt-4 text-xs sm:text-sm font-semibold"
                style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-whatsapp)' }}
              >
                <span>{isId ? 'Buka WhatsApp' : 'Open WhatsApp'}</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* Email Card */}
            <div
              className="contact-card group relative p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{ minHeight: '230px', cursor: 'default' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-gold) 55%, var(--color-border))';
                e.currentTarget.style.boxShadow = '0 16px 40px -12px color-mix(in srgb, var(--color-gold) 28%, transparent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'color-mix(in srgb, var(--color-gold) 10%, transparent)', filter: 'blur(30px)' }}
              />
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-2xs"
                    style={{
                      background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)',
                      color: 'var(--color-gold)',
                    }}
                  >
                    <i className="fa-solid fa-envelope-open-text text-base" aria-hidden="true" />
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold cursor-pointer transition-colors shadow-2xs"
                    style={{
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      color: copied ? '#16a34a' : 'var(--color-text)',
                    }}
                  >
                    {copied ? (
                      <>
                        <i className="fa-solid fa-check text-xs text-green-500" aria-hidden="true" />
                        <span>{isId ? 'Tersalin!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-copy text-xs text-gold" aria-hidden="true" />
                        <span>{isId ? 'Salin' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  Email
                </h3>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-xs sm:text-sm font-mono font-semibold break-all transition-colors hover:underline"
                  style={{ color: 'var(--color-gold-text)' }}
                >
                  {CONTACT.email}
                </a>
                <p className="text-xs sm:text-sm mt-1.5" style={{ color: 'var(--color-muted)' }}>
                  {isId ? 'Untuk penawaran formal atau detail RFP' : 'For formal proposals, RFPs, or inquiries'}
                </p>
              </div>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group/link flex items-center justify-between pt-4 mt-4 text-xs sm:text-sm font-semibold transition-colors"
                style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-gold-text)' }}
              >
                <span>{isId ? 'Kirim Pesan Email' : 'Send An Email'}</span>
                <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Location Card */}
            <div
              className="contact-card group relative p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{ minHeight: '230px' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-gold) 55%, var(--color-border))';
                e.currentTarget.style.boxShadow = '0 16px 40px -12px color-mix(in srgb, var(--color-gold) 28%, transparent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'color-mix(in srgb, var(--color-gold) 10%, transparent)', filter: 'blur(30px)' }}
              />
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-2xs"
                    style={{
                      background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)',
                      color: 'var(--color-gold)',
                    }}
                  >
                    <i className="fa-solid fa-location-dot text-lg" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold" style={{ color: 'var(--color-gold-text)' }}>
                    <i className="fa-regular fa-clock text-xs text-gold" aria-hidden="true" />
                    <span>UTC+8 (WITA)</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  {isId ? 'Lokasi & Zona Waktu' : 'Location & Timezone'}
                </h3>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  {CONTACT.location}
                </p>
                <p className="text-xs sm:text-sm mt-1.5" style={{ color: 'var(--color-muted)' }}>
                  {isId ? 'Bekerja secara remote untuk klien lokal dan global' : 'Working remotely with local and global clients'}
                </p>
              </div>
              <div
                className="flex items-center gap-2 pt-4 mt-4 text-xs sm:text-sm font-semibold"
                style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              >
                <i className="fa-solid fa-globe text-xs text-gold" aria-hidden="true" />
                <span>Bali, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Social strip */}
          <div
            ref={socialRef}
            className="sr-fade-up p-5 sm:p-6 rounded-[20px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <div className="text-center sm:text-left">
              <span
                className="font-mono text-xs uppercase tracking-widest font-bold"
                style={{ color: 'var(--color-gold-text)' }}
              >
                {isId ? 'Jejaring Sosial' : 'Social Profiles'}
              </span>
              <p className="text-xs sm:text-sm mt-0.5 font-medium" style={{ color: 'var(--color-muted)' }}>
                @_gungde · {isId ? 'Web Developer & Praktisi Pemasaran Digital' : 'Web Developer & Digital Marketing Specialist'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: 'fa-brands fa-github',    href: CONTACT.github,    label: 'GitHub' },
                { icon: 'fa-brands fa-instagram', href: CONTACT.instagram, label: 'Instagram' },
                { icon: 'fa-brands fa-whatsapp',  href: waLink,            label: 'WhatsApp' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-2xs"
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
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
                  <i className={`${icon} text-base`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}