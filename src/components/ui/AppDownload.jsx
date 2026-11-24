/**
 * AppDownload — shared download CTA + install guide for mobile projects.
 * The APK ships from /public/downloads so visitors can test on a real device.
 *
 * Copy is generic (driven by the project object) so every mobile project —
 * Run Track, CatatKu and future apps — reads correctly. Projects can override
 * the defaults by supplying `installSteps` and `downloadNote`.
 */
import { useLang } from '../../hooks/useLang';
import Reveal from './Reveal';

/** Fallback install steps when a project doesn't define its own. */
const STEPS = {
  en: [
    'Tap Download App and wait for the APK file to finish downloading.',
    'Open the file, then allow "Install unknown apps" for your browser if Android asks.',
    'Launch the app, sign in or create an account, and start exploring.',
  ],
  id: [
    'Ketuk Unduh Aplikasi dan tunggu berkas APK selesai diunduh.',
    'Buka berkasnya, lalu izinkan "Instal aplikasi tidak dikenal" untuk browser jika diminta Android.',
    'Jalankan aplikasinya, masuk atau buat akun, lalu mulai menjelajah.',
  ],
};

const NOTE = {
  en: 'The APK is shared for hands-on testing on a real Android device.',
  id: 'Berkas APK dibagikan untuk pengujian langsung pada perangkat Android.',
};

export function DownloadButton({ project, compact = false, showMeta = true, className = '', onClick }) {
  const { lang } = useLang();
  const isId = lang === 'id';

  if (!project?.downloadUrl) return null;

  const label = compact
    ? (isId ? 'APK' : 'APK')
    : (isId ? 'Unduh Aplikasi' : 'Download App');

  const ariaLabel = isId
    ? `Unduh aplikasi ${project.name} (${project.downloadSize || 'APK'})`
    : `Download the ${project.name} app (${project.downloadSize || 'APK'})`;

  return (
    <a
      href={project.downloadUrl}
      download={project.downloadFileName || 'app.apk'}
      className={`btn-square btn-square--app ${compact ? 'btn-square--sm' : ''} ${className}`.trim()}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <i className="fa-brands fa-android btn-square__icon" aria-hidden="true" />
      <span>{label}</span>
      {showMeta && project.downloadSize && (
        <span className="btn-square__meta">{project.downloadSize}</span>
      )}
      <i className="fa-solid fa-arrow-down-to-line btn-square__arrow" aria-hidden="true" />
    </a>
  );
}

export default function AppDownloadPanel({ project }) {
  const { lang } = useLang();
  const isId = lang === 'id';

  if (!project?.downloadUrl) return null;

  const steps = project.installSteps?.[lang] || project.installSteps?.en || STEPS[lang] || STEPS.en;
  const note = project.downloadNote?.[lang] || project.downloadNote?.en || NOTE[lang] || NOTE.en;
  const blurb =
    project.downloadBlurb?.[lang] ||
    project.downloadBlurb?.en ||
    (isId
      ? `Unduh berkas APK dan rasakan langsung pengalaman ${project.name} di ponsel Android Anda.`
      : `Download the APK and experience ${project.name} first-hand on an Android phone.`);

  // Chips are derived from the project so they never claim features it lacks.
  const chips = project.downloadChips?.[lang] || project.downloadChips?.en || [
    { icon: 'fa-brands fa-android', label: 'Android' },
    { icon: 'fa-solid fa-file-arrow-down', label: 'APK' },
    { icon: 'fa-solid fa-weight-hanging', label: project.downloadSize || 'APK' },
  ];

  return (
    <Reveal className="app-download mb-12" amount={0.15}>
      <span className="app-download__halo" aria-hidden="true" />
      <span className="app-download__grid" aria-hidden="true" />

      <div className="app-download__top">
        <div className="app-download__intro">
          {project.icon && (
            <span className="app-download__icon">
              <img src={project.icon} alt="" loading="lazy" decoding="async" />
            </span>
          )}
          <div className="app-download__copy">
            <span className="app-download__eyebrow">
              <i className="fa-brands fa-android" aria-hidden="true" />
              ANDROID · APK
            </span>
            <h2 className="app-download__title" id="app-download-title">
              {isId ? `Coba ${project.name} di perangkat Anda.` : `Try ${project.name} on your device.`}
            </h2>
            <p className="app-download__desc">{blurb}</p>
          </div>
        </div>

        <DownloadButton project={project} className="app-download__cta" />
      </div>

      <div className="app-download__chips">
        {chips.map((chip) => (
          <span key={chip.label}>
            <i className={chip.icon} aria-hidden="true" />
            {chip.label}
          </span>
        ))}
      </div>

      <div className="app-download__install">
        <span className="app-download__install-title">
          <i className="fa-solid fa-screwdriver-wrench" aria-hidden="true" />
          {isId ? 'Cara memasang' : 'How to install'}
        </span>
        <ol className="app-download__steps">
          {steps.map((step, index) => (
            <li key={step}>
              <span className="app-download__step-index">{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <p className="app-download__note">
        <i className="fa-solid fa-circle-info" aria-hidden="true" />
        {note}
      </p>
    </Reveal>
  );
}
