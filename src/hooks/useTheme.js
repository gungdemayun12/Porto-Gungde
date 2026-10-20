/**
 * Hook useTheme — mengelola tema light/dark
 * Menyimpan preferensi di localStorage dan menghormati prefers-color-scheme
 * jika pengguna belum pernah memilih manual.
 */
import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  // Inisialisasi state dari DOM (yang sudah diatur oleh script anti-FOUC di index.html)
  const [theme, setThemeState] = useState(() => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  // Sinkronkan class 'dark' di <html> dan simpan ke localStorage
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
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
