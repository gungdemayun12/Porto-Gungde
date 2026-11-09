/**
 * LangToggle — tombol toggle bahasa EN/ID
 * Font Awesome icon, border rapi, terlihat jelas di dark dan light mode.
 */
import { useLang } from '../../hooks/useLang';

export default function LangToggle({ compact = false }) {
  const { lang, setLang, isTranslating } = useLang();

  return (
    <div
      role="group"
      aria-label="Language"
      aria-busy={isTranslating}
      className={`inline-flex items-center gap-1 rounded-full border border-border bg-surface/80 shadow-xs ${
        compact ? 'p-0.5' : 'p-1'
      }`}
    >
      <i className={`fa-solid fa-globe text-xs text-gold ${compact ? 'hidden' : 'px-2'}`} aria-hidden="true" />
      {[
        { code: 'id', label: 'ID', name: 'Bahasa Indonesia' },
        { code: 'en', label: 'EN', name: 'English' },
      ].map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-label={name}
          aria-pressed={lang === code}
          disabled={isTranslating}
          className={`${compact ? 'min-w-8 px-1.5' : 'min-w-9 px-2.5'} rounded-full py-1.5 text-[11px] font-mono font-bold tracking-wider
            transition-all duration-200 disabled:cursor-wait disabled:opacity-60 ${
              lang === code
                ? 'bg-gold text-[var(--color-on-accent)] shadow-sm'
                : 'text-muted hover:bg-gold/10 hover:text-gold-text'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
