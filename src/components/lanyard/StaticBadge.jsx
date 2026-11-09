/**
 * StaticBadge — fallback ringan untuk Lanyard (tanpa Three.js)
 * Kartu ID ala galeri: tali emas, frame tipis, dan nameplate.
 */
import gungdePhoto from '../../assets/gungde.jpeg';

export default function StaticBadge() {
  return (
    <div className="static-badge">
      <div className="static-badge__swing">
        <span className="static-badge__hook" aria-hidden="true" />
        <span className="static-badge__strap" aria-hidden="true" />

        <div className="static-badge__card">
          <img
            src={gungdePhoto}
            alt="Gungde — Web Developer & Digital Marketing"
            className="static-badge__photo"
            loading="eager"
            decoding="async"
          />
          <span className="static-badge__vignette" aria-hidden="true" />
          <span className="static-badge__edge" aria-hidden="true" />

          <div className="static-badge__meta">
            <span className="static-badge__name">Gungde</span>
            <span className="static-badge__role">Web Developer</span>
          </div>

          <span className="static-badge__shine" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
