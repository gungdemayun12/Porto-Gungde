/**
 * Hook useLang — mengelola bahasa situs (EN/ID)
 * Menyimpan preferensi di localStorage, default EN.
 */
import { useState, useCallback, createContext, useContext, useEffect } from 'react';
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
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('lang');
    return saved === 'id' ? 'id' : 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-language', lang);
  }, [lang]);

  const setLang = useCallback((newLang) => {
    if (!newLang || !translations[newLang]) return;
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('data-language', newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'id' : 'en');
  }, [lang, setLang]);

  // Ambil objek teks sesuai bahasa aktif
  const t = translations[lang] || translations.en;

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

/**
 * Hook untuk mengakses bahasa dan teks terjemahan
 */
export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang harus digunakan di dalam LangProvider');
  }
  return context;
}
