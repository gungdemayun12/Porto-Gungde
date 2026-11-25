/**
 * ProjectPoster — editorial "product poster" used as the artwork of every
 * non-app project card, in the same spirit as the Run Track preview:
 * a tilted browser window with the real screenshot, a bold wordmark, and a
 * few honest figures (features, screens, year). Drawn with CSS + SVG so it
 * stays sharp on every screen and needs no extra image assets.
 */
import { useLang } from '../../hooks/useLang';
import { categoryLabel } from '../../data/projectMeta';
import './ProjectPoster.css';

/* One accent per project, so the grid reads as a set but each card is distinct. */
const ACCENTS = {
  'bali-play-golf': '#2FA36B',
  'ubud-digital-creative': '#C9A24B',
  'undangan-digital-sony-dan-dewi': '#D1547F',
  'receipt-generator': '#3B7BF6',
  'zeisa-spa-seminyak-bali': '#C09A72',
  'sari-rasa-qr-ordering': '#E2683C',
  'warung-lestari-pos': '#E0A020',
  'big-tree-jewelry-classes-pos': '#7C5CFF',
  'absensi-online-qr-code': '#22A58A',
  'meru-jewelry-classes': '#C0A062',
  'bali-charming-tours': '#2E9E6B',
  'bali-bruce-tours': '#2E86C1',
  'kakluna-bali-trans': '#17A2A2',
  'maikebali-tour': '#D0522F',
};

const CATEGORY_ICON = {
  Web: 'fa-solid fa-globe',
  'Private System': 'fa-solid fa-lock',
  'Mobile App': 'fa-solid fa-mobile-screen-button',
};

function splitTitle(title) {
  // Posters only need a short wordmark: drop the "— subtitle" part and cap
  // long names at four words so two lines always fit.
  const base = title.split(/\s[-–—]\s/)[0].trim();
  let words = base.split(/\s+/);
  if (words.length > 4) words = words.slice(0, 4);
  if (words.length === 1) return [words[0], ''];
  const breakAt = words.length > 3 ? Math.ceil(words.length / 2) : words.length - 1;
  return [words.slice(0, breakAt).join(' '), words.slice(breakAt).join(' ')];
}

/** Shortens each highlight sentence into a crisp cover bullet. */
function shortFeatures(project, lang) {
  const list = project.results?.[lang] || project.results?.en || [];
  return list
    .map((line) =>
      line
        .split(/\s+(?:with|and|that|plus|for|using|serta|dan|yang|untuk|dengan)\s+|[,;:]/i)[0]
        .trim()
    )
    .filter(Boolean)
    .slice(0, 3);
}

function hostLabel(project) {
  if (project.privateSystem) return 'internal.dashboard';
  if (!project.liveUrl) return 'portfolio.preview';
  try {
    return new URL(project.liveUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'portfolio.preview';
  }
}

export default function ProjectPoster({ project }) {
  const { lang } = useLang();
  const title = project.title[lang] || project.title.en;
  const [lineOne, lineTwo] = splitTitle(title);
  const accent = ACCENTS[project.slug] || 'var(--color-gold)';
  const screens = project.gallery?.length || 0;
  const features = project.results?.[lang]?.length || project.results?.en?.length || 0;
  const featureList = shortFeatures(project, lang);
  const cover = project.coverThumb || project.thumbnail;
  const category = categoryLabel(project.category, lang);
  const isPrivate = Boolean(project.privateSystem);

  return (
    <div
      className="project-poster"
      style={{ '--poster-accent': accent }}
      aria-hidden="true"
    >
      <span className="project-poster__glow" />
      <span className="project-poster__grid" />

      <div className="project-poster__copy">
        <span className="project-poster__eyebrow">
          <i className={`${CATEGORY_ICON[project.category] || CATEGORY_ICON.Web} text-[0.55em]`} />
          {category}
        </span>

        <div className="project-poster__title">
          <span>{lineOne}</span>
          {lineTwo && <em>{lineTwo}</em>}
        </div>

        {featureList.length > 0 && (
          <ul className="project-poster__list">
            {featureList.map((feature) => (
              <li key={feature}>
                <i className="fa-solid fa-check" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="project-poster__stats">
          <div>
            <span>{lang === 'id' ? 'FITUR' : 'FEATURES'}</span>
            <strong>{String(features).padStart(2, '0')}</strong>
          </div>
          <div>
            <span>{lang === 'id' ? 'LAYAR' : 'SCREENS'}</span>
            <strong>{String(screens).padStart(2, '0')}</strong>
          </div>
        </div>

        <span className="project-poster__tag">
          <i className={isPrivate ? 'fa-solid fa-shield-halved' : 'fa-solid fa-bolt'} />
          {isPrivate
            ? (lang === 'id' ? 'Internal · Terlindungi' : 'Internal · Protected')
            : (lang === 'id' ? 'Web · Responsif' : 'Web · Responsive')}
        </span>
      </div>

      <div className="project-poster__shot">
        <div className="project-poster__chrome">
          <span className="project-poster__dots"><i /><i /><i /></span>
          <span className="project-poster__url">
            <i className={`fa-solid ${isPrivate ? 'fa-lock' : 'fa-globe'} text-[0.55em]`} />
            {hostLabel(project)}
          </span>
        </div>
        <div className="project-poster__screen">
          {cover ? (
            <img src={cover} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="project-poster__fallback">{title.charAt(0)}</span>
          )}
          <span className="project-poster__sheen" />
        </div>
      </div>

      <span className="project-poster__edge" />
    </div>
  );
}
