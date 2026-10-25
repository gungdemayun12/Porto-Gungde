/**
 * Contact — informasi kontak langsung (tanpa overclaim)
 */
import { useState } from 'react';
import { Mail, MapPin, Clock, Copy, Check, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp, FaGithub, FaInstagram } from 'react-icons/fa6';
import SectionTitle from '../components/ui/SectionTitle';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';
import { CONTACT, whatsappLink } from '../data/contact';

export default function Contact() {
  const { lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });
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
      className="section-padding relative overflow-hidden bg-bg/90 dark:bg-[#07080B]"
      aria-label="Contact"
      ref={ref}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        <SectionTitle
          label={isId ? 'KONTAK' : 'CONTACT'}
          title={isId ? 'Mari bahas kebutuhan Anda.' : 'Let’s discuss your project.'}
          subtitle={
            isId
              ? 'Hubungi saya lewat WhatsApp atau email untuk konsultasi website.'
              : 'Reach me via WhatsApp or email to discuss your website needs.'
          }
        />

        <div
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="md:col-span-3 -mb-1 rounded-[28px] border border-gold/25 bg-gradient-to-br from-gold/15 via-surface/80 to-emerald-500/5 p-6 sm:p-8 shadow-[0_18px_60px_rgba(212,175,55,0.12)] relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-gold">{isId ? 'Kontak' : 'Contact'}</span>
                  <h3 className="mt-2 font-heading text-2xl sm:text-3xl text-text dark:text-white">{isId ? 'Ceritakan kebutuhan proyek Anda.' : 'Tell me about your project.'}</h3>
                  <p className="mt-2 text-base text-muted dark:text-stone-300 max-w-xl">{isId ? 'Saya akan meninjau kebutuhan dan ruang lingkupnya bersama Anda.' : 'I’ll review your needs and discuss the project scope with you.'}</p>
                </div>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="group shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:-translate-y-0.5 transition-all">
                  <FaWhatsapp size={18} />
                  <span>{isId ? 'Chat via WhatsApp' : 'Chat on WhatsApp'}</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-7 rounded-[24px] bg-surface/80 dark:bg-[#0C0E14] border border-emerald-500/30 hover:border-emerald-500/60 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <FaWhatsapp size={24} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted">
                    <Mail size={12} className="text-gold" />
                    {isId ? 'Kontak' : 'Contact'}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-text dark:text-white mb-1">
                  WhatsApp
                </h3>
                <p className="text-sm text-muted dark:text-stone-300">
                  {CONTACT.whatsappDisplay}
                </p>
                <p className="text-sm text-muted mt-2">
                  {isId ? 'Untuk pertanyaan dan diskusi proyek' : 'For questions and project discussions'}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-border/50 dark:border-stone-800 text-sm text-emerald-700 dark:text-emerald-400">
                <span>{isId ? 'Chat Sekarang' : 'Start Chat'}</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>

            <div className="group relative p-7 rounded-[24px] bg-surface/80 dark:bg-[#0C0E14] border border-border dark:border-gold/25 hover:border-gold/60 shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                    <Mail size={22} />
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg dark:bg-[#08090D] border border-border dark:border-gold/30 text-[11px] font-mono text-muted hover:text-gold hover:border-gold transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="font-heading text-lg font-bold text-text dark:text-white mb-1">
                  Email
                </h3>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-gold-text hover:underline break-all"
                >
                  {CONTACT.email}
                </a>
                <p className="text-sm text-muted mt-2">
                  {isId ? 'Saya akan membalas secepatnya' : 'I reply as soon as I can'}
                </p>
              </div>

              <a
                href={`mailto:${CONTACT.email}`}
                className="pt-6 flex items-center justify-between border-t border-border/50 dark:border-stone-800 text-sm text-gold-text group-hover:text-gold-light"
              >
                <span>{isId ? 'Kirim Email' : 'Send Email'}</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="group relative p-7 rounded-[24px] bg-surface/80 dark:bg-[#0C0E14] border border-border dark:border-gold/25 hover:border-gold/60 shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                    <MapPin size={22} />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400">
                    <Clock size={12} className="text-gold" />
                    <span>UTC+8 (WITA)</span>
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-text dark:text-white mb-1">
                  {isId ? 'Lokasi' : 'Location'}
                </h3>
                <p className="text-sm text-muted dark:text-stone-300">
                  {CONTACT.location}
                </p>
                <p className="text-sm text-muted mt-2">
                  {CONTACT.locationShort}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-2 border-t border-border/50 dark:border-stone-800 text-sm text-muted">
                <MapPin size={14} className="text-gold shrink-0" />
                <span>Bali, Indonesia</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-surface/60 dark:bg-[#0A0C11] border border-border dark:border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-gold font-medium">
              {isId ? 'Media Sosial' : 'Social'}
              </span>
              <p className="text-sm text-muted mt-0.5">
                @_gungde • {isId ? 'Web Developer & Pemasaran Digital' : 'Web Developer & Digital Marketing'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: FaGithub, href: CONTACT.github, label: 'GitHub' },
                { icon: FaInstagram, href: CONTACT.instagram, label: 'Instagram' },
                { icon: FaWhatsapp, href: waLink, label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-11 h-11 rounded-xl bg-bg dark:bg-[#07080B] border border-border dark:border-gold/25 flex items-center justify-center text-muted hover:text-gold-text dark:hover:text-gold hover:border-gold hover:scale-105 transition-all duration-300 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
