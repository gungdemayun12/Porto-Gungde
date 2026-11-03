/**
 * ThemeToggle — tombol toggle tema light/dark
 * Ikon Font Awesome keren, border rapi, terlihat jelas di kedua mode.
 */
import { useTheme } from '../../hooks/useTheme';
import { useLang } from '../../hooks/useLang';

export default function ThemeToggle({ showLabel = false }) {
  const { isDark, setTheme } = useTheme();
  const { lang } = useLang();
  const isId = lang === 'id';

  if (!showLabel) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label={isDark
          ? (isId ? 'Beralih ke mode terang' : 'Switch to light mode')
          : (isId ? 'Beralih ke mode gelap' : 'Switch to dark mode')}
        aria-pressed={isDark}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/80
          text-gold-text shadow-xs transition-all duration-300 hover:border-gold hover:bg-gold/10
          hover:text-gold active:scale-95 sm:h-10 sm:w-10"
      >
        <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-sm`} aria-hidden="true" />
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label={isId ? 'Tema warna' : 'Color theme'}
      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/80 p-1 shadow-xs"
    >
      {[
        { theme: 'light', label: isId ? 'Terang' : 'Light', icon: 'fa-sun', name: isId ? 'Mode terang' : 'Light mode' },
        { theme: 'dark', label: isId ? 'Gelap' : 'Dark', icon: 'fa-moon', name: isId ? 'Mode gelap' : 'Dark mode' },
      ].map(({ theme, label, icon, name }) => {
        const selected = (theme === 'dark') === isDark;
        return (
          <button
            key={theme}
            type="button"
            onClick={() => setTheme(theme)}
            aria-label={name}
            aria-pressed={selected}
            className={`flex min-h-8 items-center justify-center gap-2 rounded-full px-2.5 text-xs font-semibold
              transition-all duration-200 active:scale-95 ${
                selected
                  ? 'bg-gold/15 text-gold-text ring-1 ring-gold/25'
                  : 'text-muted hover:bg-gold/10 hover:text-gold-text'
              }`}
          >
            <i className={`fa-solid ${icon} text-xs`} aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
