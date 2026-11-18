/**
 * Hook useTheme — mengelola tema light/dark
 * Menyimpan preferensi di localStorage dan menghormati prefers-color-scheme
 * jika pengguna belum pernah memilih manual.
 */
import { useState, useEffect, useCallback } from 'react';
import { startThemeGlitch, canGlitchTheme } from '../lib/themeGlitch';

let themeTransitionTimer = null;

function enableThemeTransition() {
  const root = document.documentElement;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  root.classList.add('theme-transition');
  window.clearTimeout(themeTransitionTimer);
  themeTransitionTimer = window.setTimeout(() => {
    root.classList.remove('theme-transition');
    themeTransitionTimer = null;
  }, 420);
}

export function useTheme() {
  // Inisialisasi state dari DOM (yang sudah diatur oleh script anti-FOUC di index.html)
  const [theme, setThemeState] = useState(() => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  // Sinkronkan class 'dark' di <html> dan simpan ke localStorage.
  // Dengan View Transitions, perubahan class dibungkus glitch klip-path;
  // tanpa dukungan, jatuh ke fade warna singkat seperti sebelumnya.
  const setTheme = useCallback((newTheme) => {
    const commit = () => {
      setThemeState(newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', newTheme);
    };

    if (canGlitchTheme()) {
      startThemeGlitch(commit);
    } else {
      enableThemeTransition();
      commit();
    }
  }, []);

  // Toggle antara light dan dark
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Dengarkan perubahan system preference (hanya jika user belum pernah memilih)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      // Hanya ikuti system preference jika belum ada pilihan di localStorage
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [setTheme]);

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' };
}
