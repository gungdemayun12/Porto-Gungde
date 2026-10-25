/**
 * ThemeToggle — tombol toggle tema light/dark
 * Menampilkan ikon matahari (☀️) atau bulan (🌙) dengan animasi rotasi.
 */
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="relative p-2 rounded-full transition-all duration-300 hover:bg-surface cursor-pointer group"
    >
      {/* Container ikon dengan animasi rotasi */}
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Ikon matahari — terlihat di dark mode (karena klik akan ke light) */}
        <Sun
          size={20}
          className={`absolute inset-0 text-gold transition-all duration-300 ${
            isDark
              ? 'rotate-0 opacity-100 scale-100'
              : 'rotate-90 opacity-0 scale-75'
          }`}
        />
        {/* Ikon bulan — terlihat di light mode (karena klik akan ke dark) */}
        <Moon
          size={20}
          className={`absolute inset-0 text-gold transition-all duration-300 ${
            isDark
              ? '-rotate-90 opacity-0 scale-75'
              : 'rotate-0 opacity-100 scale-100'
          }`}
        />
      </div>
    </button>
  );
}
