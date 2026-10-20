/**
 * StaticBadge — fallback ringan untuk Lanyard (tanpa Three.js)
 */
import gungdePhoto from '../../assets/gungde.jpeg';
import { useTheme } from '../../hooks/useTheme';

export default function StaticBadge() {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="swing-animation">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-gold mb-0" />
          <div className="w-0.5 h-16 bg-gradient-to-b from-gold to-gold-light" />

          <div
            className={`w-52 sm:w-56 rounded-2xl overflow-hidden border border-gold/30
              ${isDark ? 'bg-surface' : 'bg-white'} card-shadow`}
          >
            <div className="gradient-gold h-1.5" />

            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={gungdePhoto}
                alt="Gungde — Web Developer"
                className="w-full h-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <h3 className="font-heading font-semibold text-white text-sm tracking-wide">
                  Gungde
                </h3>
                <p className="font-mono text-[10px] text-gold uppercase tracking-wider mt-0.5">
                  Web Developer
                </p>
              </div>
            </div>

            <div className="gradient-gold h-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
