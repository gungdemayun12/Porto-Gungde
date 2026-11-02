/**
 * ThemeToggle — tombol toggle tema light/dark
 * Ikon Font Awesome keren, border rapi, terlihat jelas di kedua mode.
 */
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border bg-surface/80
        flex items-center justify-center transition-all duration-300
        hover:border-gold hover:bg-gold/10 cursor-pointer shadow-xs active:scale-95"
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        {/* Sun icon — visible in dark mode */}
        <i
          className={`fa-solid fa-sun text-sm text-gold transition-all duration-300 absolute inset-0 flex items-center justify-center ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50 pointer-events-none'
          }`}
          aria-hidden="true"
        />
        {/* Moon icon — visible in light mode */}
        <i
          className={`fa-solid fa-moon text-sm text-gold-text transition-all duration-300 absolute inset-0 flex items-center justify-center ${
            isDark
              ? 'opacity-0 -rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100'
          }`}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
