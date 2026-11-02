/**
 * StaticBadge — fallback ringan untuk Lanyard (tanpa Three.js)
 * Terlihat konsisten dan elegan di mode dark maupun light.
 */
import gungdePhoto from '../../assets/gungde.jpeg';

export default function StaticBadge() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="swing-animation">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-gold mb-0 shadow-xs" />
          <div className="w-0.5 h-16 bg-gradient-to-b from-gold to-gold-light" />

          <div className="w-52 sm:w-56 rounded-2xl overflow-hidden border border-gold/40 bg-surface card-shadow shadow-lg">
            <div className="gradient-gold h-1.5" />

            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={gungdePhoto}
                alt="Gungde — Web Developer"
                className="w-full h-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <h3 className="font-heading font-bold text-white text-base tracking-wide">
                  Gungde
                </h3>
                <p className="font-mono text-xs text-gold uppercase tracking-wider mt-0.5 font-semibold">
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