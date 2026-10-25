/**
 * Hook useLang — mengelola bahasa situs (EN/ID)
 * Menyimpan preferensi di localStorage, default EN.
 */
import { useState, useCallback, createContext, useContext, useEffect, useRef } from 'react';
import en from '../i18n/en';
import id from '../i18n/id';

// Map bahasa ke objek teks
const translations = { en, id };

// Context untuk bahasa (agar bisa diakses di seluruh komponen)
const LangContext = createContext(null);

/**
 * Provider bahasa — bungkus App dengan ini
 */
export function LangProvider({ children }) {
  const [isTranslating, setIsTranslating] = useState(false);
  const translationTimer = useRef(null);
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('lang');
    return saved === 'id' ? 'id' : 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-language', lang);
  }, [lang]);

  useEffect(() => () => window.clearTimeout(translationTimer.current), []);

  const setLang = useCallback((newLang) => {
    if (!newLang || !translations[newLang]) return;
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('data-language', newLang);
  }, []);

  const toggleLang = useCallback(() => {
    if (isTranslating) return;
    setIsTranslating(true);
    translationTimer.current = window.setTimeout(() => {
      setLang(lang === 'en' ? 'id' : 'en');
      setIsTranslating(false);
    }, 420);
  }, [isTranslating, lang, setLang]);

  // Ambil objek teks sesuai bahasa aktif
  const t = translations[lang] || translations.en;

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t, isTranslating }}>
      {children}
      {isTranslating && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed top-[5.25rem] left-1/2 z-[110] -translate-x-1/2"
        >
          <div className="flex items-center gap-2 rounded-full border border-gold/25 bg-surface/95 px-4 py-2 text-xs font-medium text-text shadow-lg shadow-black/10 backdrop-blur-xl dark:bg-[#101218]/95 dark:text-white">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-gold/25 border-t-gold" aria-hidden="true" />
            <span>{lang === 'en' ? 'Menerjemahkan…' : 'Translating…'}</span>
          </div>
        </div>
      )}
    </LangContext.Provider>
  );
}

/**
 * Hook untuk mengakses bahasa dan teks terjemahan
 */
// The hook shares the language context module with its provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang harus digunakan di dalam LangProvider');
  }
  return context;
}
