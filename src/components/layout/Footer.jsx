import { ArrowUp } from 'lucide-react';
import { useLang } from '../../hooks/useLang';

export default function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70" role="contentinfo">
      <div className="container-main py-8 sm:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-heading text-lg tracking-[0.08em] text-text">GUNGDEV</span>
            <p className="mt-1 text-sm text-muted">{t.footer.tagline}</p>
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <p className="text-xs text-muted">© {currentYear} Gungdev. {t.footer.rights}</p>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={t.footer.backToTop} className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-gold/35 text-muted hover:border-gold hover:text-gold cursor-pointer">
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
