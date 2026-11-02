/**
 * LangToggle — tombol toggle bahasa EN/ID
 * Font Awesome icon, border rapi, terlihat jelas di dark dan light mode.
 */
import { useLang } from '../../hooks/useLang';

export default function LangToggle() {
  const { lang, toggleLang, isTranslating } = useLang();

  return (
    <button
      onClick={toggleLang}
      aria-label={`Switch to ${lang === 'en' ? 'Indonesian' : 'English'}`}
      aria-busy={isTranslating}
      disabled={isTranslating}
      className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full text-xs font-mono font-semibold
        border border-border bg-surface/80 text-text hover:border-gold hover:text-gold-text
        transition-all duration-300 cursor-pointer shadow-xs active:scale-95"
    >
      <i className="fa-solid fa-globe text-xs text-gold" aria-hidden="true" />
      <span className="uppercase tracking-wider">
        {lang === 'en' ? 'ID' : 'EN'}
      </span>
    </button>
  );
}
