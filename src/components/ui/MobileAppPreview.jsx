/**
 * MobileAppPreview — a self-contained, screenshot-free product visual for
 * mobile projects. Renders a sporty phone mockup with live run metrics so the
 * card stays crisp on every screen size without shipping heavy image assets.
 */
import './MobileAppPreview.css';

const PANEL_ROUTE =
  'M14 112 C 30 86, 52 100, 66 78 S 94 44, 112 58 S 142 92, 160 66 S 186 26, 208 40';
const SCREEN_ROUTE =
  'M10 66 C 24 52, 36 62, 48 46 S 70 24, 84 38 S 108 64, 122 44 S 142 16, 150 22';

export default function MobileAppPreview({ variant = 'card', icon, className = '' }) {
  return (
    <div className={`app-preview app-preview--${variant} ${className}`.trim()} aria-hidden="true">
      <span className="app-preview__glow" />
      <span className="app-preview__grid" />

      <svg className="app-preview__route" viewBox="0 0 240 140" fill="none" preserveAspectRatio="none">
        <path className="app-preview__route-line" d={PANEL_ROUTE} />
        <circle className="app-preview__route-dot" cx="208" cy="40" r="3.4" />
      </svg>

      <div className="app-preview__inner">
        {/* Phone mockup */}
        <div className="app-phone">
          <div className="app-phone__screen">
            <div className="app-phone__status">
              <span>9:41</span>
              <span className="app-phone__notch" />
              <span className="app-phone__signal"><i /><i /><i /></span>
            </div>

            <div className="app-phone__app">
              {icon ? (
                <img src={icon} alt="" />
              ) : (
                <span className="app-phone__app-mark">R</span>
              )}
              <span className="app-phone__app-name">Run Track</span>
              <span className="app-phone__gps"><i />GPS</span>
            </div>

            <div className="app-phone__map">
              <svg viewBox="0 0 160 84" fill="none" preserveAspectRatio="none">
                <path className="app-phone__map-path" d={SCREEN_ROUTE} />
                <circle className="app-phone__map-dot" cx="150" cy="22" r="3" />
              </svg>
              <span className="app-phone__map-chip">LIVE</span>
            </div>

            <div className="app-phone__distance">
              <strong>5.24</strong>
              <span>KM</span>
            </div>

            <div className="app-phone__metrics">
              <div><span>PACE</span><b>5&apos;42&quot;</b></div>
              <div><span>TIME</span><b>29:58</b></div>
              <div><span>KCAL</span><b>428</b></div>
            </div>

            <div className="app-phone__cta">
              <span className="app-phone__pause" />
              PAUSE
            </div>
          </div>
        </div>

        {/* Editorial stats panel */}
        <div className="app-preview__panel">
          <span className="app-preview__eyebrow">
            <i className="fa-solid fa-location-crosshairs" />
            GPS RUNNING
          </span>
          <span className="app-preview__title">Run Track</span>

          <div className="app-preview__primary">
            <strong>5.24</strong>
            <span>KM</span>
          </div>

          <div className="app-preview__stats">
            <div>
              <span>PACE</span>
              <strong>5&apos;42&quot;<small>/km</small></strong>
            </div>
            <div>
              <span>TIME</span>
              <strong>29:58</strong>
            </div>
            <div>
              <span>CAL</span>
              <strong>428</strong>
            </div>
          </div>

          <span className="app-preview__tag">
            <i className="fa-brands fa-android" />
            Android · APK
          </span>
        </div>
      </div>
    </div>
  );
}
