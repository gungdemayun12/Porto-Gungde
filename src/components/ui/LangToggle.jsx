/**
 * LangToggle — tombol toggle bahasa EN/ID
 * Menampilkan kode bahasa aktif dengan animasi slide.
 */
import { useLang } from '../../hooks/useLang';
import { Languages } from 'lucide-react';

export default function LangToggle() {
  const { lang, toggleLang, isTranslating } = useLang();

  return (
    <button
      onClick={toggleLang}
      aria-label={`Switch to ${lang === 'en' ? 'Indonesian' : 'English'}`}
      aria-busy={isTranslating}
      disabled={isTranslating}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm font-mono font-medium
        text-muted hover:text-gold-text transition-colors duration-300 hover:bg-surface cursor-pointer"
    >
      <Languages size={16} className="text-gold" />
      <span className="uppercase tracking-wider text-xs">
        {lang === 'en' ? 'ID' : 'EN'}
      </span>
    </button>
  );
}
