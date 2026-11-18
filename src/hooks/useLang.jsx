/**
 * Hook useLang — mengelola bahasa situs (EN/ID)
 * Menyimpan preferensi di localStorage, default EN.
 *
 * Setiap pergantian bahasa melewati state "translating" singkat: overlay
 * ditampilkan lebih dulu, konten baru dipasang di belakangnya, lalu overlay
 * memudar. Jadi teks tidak pernah terlihat berkedip berganti mendadak.
 */
import { useState, useCallback, createContext, useContext, useEffect, useRef } from 'react';
import en from '../i18n/en';
import id from '../i18n/id';
import TranslatingOverlay from '../components/ui/TranslatingOverlay';

// Map bahasa ke objek teks
const translations = { en, id };

// Durasi overlay terlihat sebelum bahasa benar-benar diganti.
const TRANSLATE_MS = 880;

// Context untuk bahasa (agar bisa diakses di seluruh komponen)
const LangContext = createContext(null);

/**
 * Provider bahasa — bungkus App dengan ini
 */
export function LangProvider({ children }) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLang, setTargetLang] = useState(null);
  const translationTimer = useRef(null);
  const translatingRef = useRef(false);
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('lang');
    return saved === 'id' ? 'id' : 'en';
  });
  const langRef = useRef(lang);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-language', lang);
  }, [lang]);

  useEffect(() => () => window.clearTimeout(translationTimer.current), []);

  // Pasang bahasa baru + sinkronkan atribut dokumen dan localStorage.
  const commitLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('data-language', newLang);
  }, []);

  // Tampilkan overlay "translating" dulu, baru ganti bahasanya.
  const startTranslation = useCallback((newLang) => {
    if (!newLang || !translations[newLang]) return;
    if (newLang === langRef.current || translatingRef.current) return;

    translatingRef.current = true;
    setTargetLang(newLang);
    setIsTranslating(true);

    window.clearTimeout(translationTimer.current);
    translationTimer.current = window.setTimeout(() => {
      commitLang(newLang);
      setIsTranslating(false);
      translatingRef.current = false;
    }, TRANSLATE_MS);
  }, [commitLang]);

  // Dipakai LangToggle (pilih bahasa langsung)
  const setLang = useCallback((newLang) => {
    startTranslation(newLang);
  }, [startTranslation]);

  // Ganti ke bahasa sebaliknya
  const toggleLang = useCallback(() => {
    startTranslation(langRef.current === 'en' ? 'id' : 'en');
  }, [startTranslation]);

  // Ambil objek teks sesuai bahasa aktif
  const t = translations[lang] || translations.en;

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t, isTranslating, targetLang }}>
      {children}
      <TranslatingOverlay
        show={isTranslating}
        from={lang}
        to={targetLang || (lang === 'en' ? 'id' : 'en')}
      />
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
