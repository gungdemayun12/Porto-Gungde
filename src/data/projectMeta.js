/**
 * projectMeta.js — metadata ringan seputar proyek.
 * Dipisahkan dari `projects.js` (yang memuat seluruh teks & galeri) agar
 * komponen kecil seperti label kategori tidak menyeret data berat ke bundel
 * utama.
 */

export const projectCategories = ['All', 'Web', 'Mobile App', 'Private System'];

export const CATEGORY_LABELS = {
  All: { en: 'All', id: 'Semua' },
  Web: { en: 'Web', id: 'Web' },
  'Mobile App': { en: 'Mobile App', id: 'Aplikasi Mobile' },
  'Private System': { en: 'Private System', id: 'Sistem Privat' },
};

export const categoryLabel = (category, lang = 'en') =>
  CATEGORY_LABELS[category]?.[lang] || CATEGORY_LABELS[category]?.en || category;

/**
 * Accent CSS variables for a mobile project, derived from its `accent` colour.
 * Lets each app card/badge carry its own brand colour (Run Track orange,
 * CatatKu teal) instead of a single hard-coded orange.
 */
export const appAccentVars = (project, { text, bg, border } = {}) => {
  const hex = project?.accent;
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return undefined;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return {
    '--app-accent': hex,
    '--app-accent-rgb': `${r}, ${g}, ${b}`,
    '--app-accent-text': text || hex,
    '--app-accent-bg': bg || `rgba(${r}, ${g}, ${b}, 0.12)`,
    '--app-accent-border': border || `rgba(${r}, ${g}, ${b}, 0.34)`,
  };
};
