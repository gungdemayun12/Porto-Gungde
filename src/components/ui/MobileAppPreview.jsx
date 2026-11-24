/**
 * MobileAppPreview — a self-contained, screenshot-free product visual for
 * mobile projects. Renders a phone mockup next to an editorial stats panel so
 * the card stays crisp on every screen size without shipping heavy images.
 *
 * Two visual themes are supported:
 *  - `run`   — GPS running companion (Run Track), orange accent, live map.
 *  - `notes` — task + finance companion (CatatKu), teal accent, task list.
 *
 * Theme data lives in THEMES; the layout is shared so both stay consistent.
 */
import './MobileAppPreview.css';

const PANEL_ROUTE =
  'M14 112 C 30 86, 52 100, 66 78 S 94 44, 112 58 S 142 92, 160 66 S 186 26, 208 40';
const SCREEN_ROUTE =
  'M10 66 C 24 52, 36 62, 48 46 S 70 24, 84 38 S 108 64, 122 44 S 142 16, 150 22';

const THEMES = {
  run: {
    // Phone screen (top half)
    appMark: 'R',
    appName: 'Run Track',
    chip: 'GPS',
    heroValue: '5.24',
    heroUnit: 'KM',
    metrics: [
      ['PACE', '5\u203242\u2033'],
      ['TIME', '29:58'],
      ['KCAL', '428'],
    ],
    cta: 'PAUSE',
    // Editorial panel
    eyebrow: 'GPS RUNNING',
    eyebrowIcon: 'fa-solid fa-location-crosshairs',
    primary: '5.24',
    primaryUnit: 'KM',
    stats: [
      ['PACE', '5\u203242\u2033', '/km'],
      ['TIME', '29:58', ''],
      ['CAL', '428', ''],
    ],
    tag: 'Android \u00b7 APK',
  },
  notes: {
    appMark: 'C',
    appName: 'CatatKu',
    chip: 'SYNC',
    heroValue: 'Rp 2,4jt',
    heroUnit: 'SALDO',
    metrics: [
      ['TUGAS', '12'],
      ['SELESAI', '8'],
      ['DOMPET', '3'],
    ],
    cta: 'CATAT',
    eyebrow: 'TASKS & FINANCE',
    eyebrowIcon: 'fa-solid fa-clipboard-check',
    primary: '12',
    primaryUnit: 'TUGAS',
    stats: [
      ['SALDO', 'Rp 2,4jt', ''],
      ['ANGGARAN', '78%', ''],
      ['TABUNGAN', '5jt', ''],
    ],
    tag: 'Android \u00b7 APK',
  },
};

export default function MobileAppPreview({
  variant = 'card',
  icon,
  theme = 'run',
  appName,
  className = '',
}) {
  const data = THEMES[theme] || THEMES.run;
  const name = appName || data.appName;

  return (
    <div
      className={`app-preview app-preview--${variant} app-preview--theme-${theme} ${className}`.trim()}
      aria-hidden="true"
    >
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
                <span className="app-phone__app-mark">{data.appMark}</span>
              )}
              <span className="app-phone__app-name">{name}</span>
              <span className="app-phone__gps"><i />{data.chip}</span>
            </div>

            <div className="app-phone__map">
              <svg viewBox="0 0 160 84" fill="none" preserveAspectRatio="none">
                <path className="app-phone__map-path" d={SCREEN_ROUTE} />
                <circle className="app-phone__map-dot" cx="150" cy="22" r="3" />
              </svg>
              <span className="app-phone__map-chip">
                {theme === 'notes' ? 'REAL-TIME' : 'LIVE'}
              </span>
            </div>

            <div className="app-phone__distance">
              <strong>{data.heroValue}</strong>
              <span>{data.heroUnit}</span>
            </div>

            <div className="app-phone__metrics">
              {data.metrics.map(([label, value]) => (
                <div key={label}><span>{label}</span><b>{value}</b></div>
              ))}
            </div>

            <div className="app-phone__cta">
              <span className="app-phone__pause" />
              {data.cta}
            </div>
          </div>
        </div>

        {/* Editorial stats panel */}
        <div className="app-preview__panel">
          <span className="app-preview__eyebrow">
            <i className={data.eyebrowIcon} />
            {data.eyebrow}
          </span>
          <span className="app-preview__title">{name}</span>

          <div className="app-preview__primary">
            <strong>{data.primary}</strong>
            <span>{data.primaryUnit}</span>
          </div>

          <div className="app-preview__stats">
            {data.stats.map(([label, value, suffix]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>
                  {value}
                  {suffix ? <small>{suffix}</small> : null}
                </strong>
              </div>
            ))}
          </div>

          <span className="app-preview__tag">
            <i className="fa-brands fa-android" />
            {data.tag}
          </span>
        </div>
      </div>
    </div>
  );
}
