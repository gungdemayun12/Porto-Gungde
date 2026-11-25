/**
 * build-fonts-css.mjs
 * ---------------------------------------------------------------------------
 * Menghasilkan `src/styles/fonts.css` dari file WOFF2 yang ada di
 * `public/fonts/`. Semua font di-self-host sehingga tidak ada request ke
 * domain pihak ketiga dan teks langsung tampil dengan font final (tanpa
 * pergeseran layout / FOUT).
 *
 * Jalankan `npm run fonts` untuk mengunduh dan menulis ulang file ini.
 */
import { writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FONT_DIR = join(ROOT, 'public/fonts');
const OUT_FILE = join(ROOT, 'src/styles/fonts.css');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const FAMILIES = [
  {
    cssName: 'Plus Jakarta Sans',
    slug: 'plus-jakarta-sans',
    url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&display=swap',
  },
  {
    cssName: 'Instrument Serif',
    slug: 'instrument-serif',
    url: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap',
  },
  {
    cssName: 'JetBrains Mono',
    slug: 'jetbrains-mono',
    url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400..700&display=swap',
  },
];

// Subset latin + latin-ext cukup untuk bahasa Inggris & Indonesia.
const KEEP_SUBSETS = ['latin', 'latin-ext'];

/**
 * Google Fonts menandai tiap blok dengan komentar subset, mis.
 *   /* latin *\/
 *   @font-face { ... }
 * Ambil label itu supaya filter subset tepat sasaran.
 */
function parseBlocks(css) {
  const results = [];
  const pattern = /\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  let match;
  while ((match = pattern.exec(css))) {
    results.push({ subset: match[1], body: match[2] });
  }
  return results;
}

async function build() {
  const existing = new Set(await readdir(FONT_DIR));
  const rules = [];
  const manifest = [];

  for (const family of FAMILIES) {
    const res = await fetch(family.url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`CSS gagal: ${family.slug} (${res.status})`);
    const css = await res.text();

    const blocks = parseBlocks(css);
    if (blocks.length === 0) throw new Error(`Tidak ada @font-face: ${family.slug}`);

    for (const { subset, body } of blocks) {
      if (!KEEP_SUBSETS.includes(subset)) continue;

      const weight = (body.match(/font-weight:\s*([^;]+);/) || [])[1]?.trim() || '400';
      const style = (body.match(/font-style:\s*([^;]+);/) || [])[1]?.trim() || 'normal';
      const unicodeRange = (body.match(/unicode-range:\s*([^;]+);/) || [])[1]?.trim();
      const fileName = `${family.slug}-${weight.replace(/\s+/g, '-')}-${style}-${subset}.woff2`;

      if (!existing.has(fileName)) {
        throw new Error(`File font hilang: ${fileName} — jalankan "npm run fonts".`);
      }

      rules.push(
        [
          '@font-face {',
          `  font-family: '${family.cssName}';`,
          `  font-style: ${style};`,
          `  font-weight: ${weight};`,
          '  font-display: swap;',
          `  src: url('/fonts/${fileName}') format('woff2');`,
          unicodeRange ? `  unicode-range: ${unicodeRange};` : null,
          '}',
        ]
          .filter(Boolean)
          .join('\n')
      );

      manifest.push({ family: family.cssName, subset, style, weight, fileName });
    }
  }

  const header = `/* =========================================================
   FONT — self-hosted (dibuat otomatis oleh scripts/build-fonts-css.mjs)
   Berkas asli ada di /public/fonts. Jangan mengedit manual.
   ========================================================= */

`;

  await writeFile(OUT_FILE, header + rules.join('\n\n') + '\n', 'utf8');
  console.log(`fonts.css ditulis: ${rules.length} @font-face`);
  manifest.forEach((row) =>
    console.log(`  ${row.family.padEnd(20)} ${row.subset.padEnd(10)} ${row.style.padEnd(7)} ${row.fileName}`)
  );
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
