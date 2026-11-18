/**
 * BrowserFrame — membungkus screenshot proyek dengan mockup jendela browser
 * (traffic dots + URL bar) agar terlihat seperti cover poster, bukan screenshot polos.
 * Dipakai untuk hero preview & galeri di halaman detail / modal.
 */
import './BrowserFrame.css';

function hostLabel(project) {
  if (!project) return 'portfolio.preview';
  if (project.privateSystem) return 'internal.dashboard';
  if (!project.liveUrl) return 'portfolio.preview';
  try {
    return new URL(project.liveUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'portfolio.preview';
  }
}

export default function BrowserFrame({
  src,
  alt = '',
  project,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  objectFit = 'cover',
  children,
  fallbackChar = '?',
}) {
  const host = hostLabel(project);
  const isPrivate = Boolean(project?.privateSystem);

  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-frame__chrome">
        <span className="browser-frame__dots">
          <i /><i /><i />
        </span>
        <span className="browser-frame__url">
          <i className={`fa-solid ${isPrivate ? 'fa-lock' : 'fa-globe'}`} aria-hidden="true" />
          <span>{host}</span>
        </span>
      </div>
      <div className="browser-frame__screen">
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={loading}
            decoding={decoding}
            style={{ objectFit }}
          />
        ) : (
          <span className="browser-frame__fallback">{fallbackChar}</span>
        )}
        {children}
        <span className="browser-frame__sheen" />
      </div>
    </div>
  );
}
