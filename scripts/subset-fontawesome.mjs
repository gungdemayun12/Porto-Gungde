/**
 * subset-fontawesome.mjs
 * ---------------------------------------------------------------------------
 * Menghasilkan `src/styles/fontawesome-subset.css` yang hanya memuat
 * @font-face + glyph untuk ikon yang benar-benar dipakai di dalam `src/`.
 *
 * Latar belakang: `all.min.css` bawaan paket berisi ~2.700 selector ikon
 * (±88 KB CSS) dan tiga file font penuh. Dengan subset ini, CSS ikon turun
 * ke beberapa KB dan hanya font yang dipakai yang diunduh.
 *
 * Jalankan `npm run icons` setelah menambah/menghapus ikon.
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = join(ROOT, 'src');
const FA_DIR = join(ROOT, 'node_modules/@fortawesome/fontawesome-free');
const FONT_OUT = join(ROOT, 'public/fonts');
const CSS_OUT = join(ROOT, 'src/styles/fontawesome-subset.css');

const STYLE_DIRS = {
  solid: 'webfonts/fa-solid-900.woff2',
  regular: 'webfonts/fa-regular-400.woff2',
  brands: 'webfonts/fa-brands-400.woff2',
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(jsx?|mjs)$/.test(extname(entry.name))) files.push(full);
  }
  return files;
};

/**
 * Kumpulkan ikon yang dipakai:
 *  - Pasangan eksplisit `fa-solid fa-x` memberi tahu gaya dengan pasti.
 *  - Nama berdiri sendiri (mis. `{ icon: 'fa-sun' }` di dalam objek atau
 *    template literal) tidak menyebut gaya, sehingga dicocokkan ke gaya
 *    pertama yang tersedia di metadata Font Awesome.
 */
async function collectIcons(index) {
  const files = await walk(SRC_DIR);
  const pairPattern = /\bfa-(solid|regular|brands)\s+fa-([a-z0-9-]+)\b/g;
  const barePattern = /\bfa-([a-z0-9-]+)\b/g;

  const used = new Map(); // style -> Set(iconName)
  const add = (style, name) => {
    if (!used.has(style)) used.set(style, new Set());
    used.get(style).add(name);
  };

  for (const file of files) {
    const text = await readFile(file, 'utf8');

    let match;
    while ((match = pairPattern.exec(text))) {
      const [, style, name] = match;
      add(style, name);
    }

    const paired = new Set([...text.matchAll(pairPattern)].map((m) => m[2]));
    while ((match = barePattern.exec(text))) {
      const [, name] = match;
      if (paired.has(name)) continue;
      const meta = index[name];
      if (!meta?.svgs?.classic) continue;
      // Pakai gaya pertama yang tersedia (urutan preferensi: solid, regular, brands).
      const style = ['solid', 'regular', 'brands'].find((s) => meta.svgs.classic[s]);
      if (style) add(style, name);
    }
  }

  return used;
}

/** Parse `icon-families.json`: nama ikon → { unicode, svgs.classic[style] }. */
async function loadIconIndex() {
  const raw = await readFile(join(FA_DIR, 'metadata/icon-families.json'), 'utf8');
  return JSON.parse(raw);
}

async function main() {
  await mkdir(FONT_OUT, { recursive: true });

  const index = await loadIconIndex();
  const used = await collectIcons(index);

  const unknown = [];
  const rules = [];
  const codepointsByStyle = new Map(); // style -> Set(codepoint string)

  for (const [style, names] of used) {
    for (const name of [...names].sort()) {
      const meta = index[name];
      const available = meta?.svgs?.classic?.[style];
      if (!meta || !available) {
        unknown.push(`${style} fa-${name}`);
        continue;
      }
      const codepoint = meta.unicode;
      rules.push(`.fa-${style}.fa-${name}::before { content: "\\${codepoint}"; }`);
      if (!codepointsByStyle.has(style)) codepointsByStyle.set(style, new Set());
      codepointsByStyle.get(style).add(codepoint);
    }
  }

  // Subset berkas font: hanya glyph yang dipakai. Font bawaan Font Awesome
  // berukuran 115-120 KB, sedangkan puluhan glyph hanya butuh beberapa KB.
  const fontFaces = [];
  for (const [style, relative] of Object.entries(STYLE_DIRS)) {
    if (!used.has(style)) continue;

    const codes = [...(codepointsByStyle.get(style) ?? [])];
    if (!codes.length) continue;

    const source = await readFile(join(FA_DIR, relative));
    const text = codes.map((c) => String.fromCodePoint(parseInt(c, 16))).join('');

    const subset = await subsetFont(source, text, { targetFormat: 'woff2' });

    const baseName = relative.split('/').pop();
    await writeFile(join(FONT_OUT, baseName), subset);

    const family =
      style === 'brands' ? '"Font Awesome 7 Brands"' : style === 'regular' ? '"Font Awesome 7 Free"' : '"Font Awesome 7 Free"';
    const weight = style === 'solid' ? 900 : 400;
    fontFaces.push(
      [
        '@font-face {',
        `  font-family: ${family};`,
        `  font-style: normal;`,
        `  font-weight: ${weight};`,
        '  font-display: block;',
        `  src: url('/fonts/${baseName}') format('woff2');`,
        '}',
      ].join('\n')
    );
    console.log(
      `  ${baseName}: ${(source.length / 1024).toFixed(0)} KB → ${(subset.length / 1024).toFixed(1)} KB (${codes.length} glyph)`
    );
  }

  const css = `/* =========================================================
   FONT AWESOME — subset (dibuat otomatis oleh scripts/subset-fontawesome.mjs)
   Hanya ikon yang dipakai di src/. Jangan mengedit manual.
   Ikon terpakai: ${rules.length}
   ========================================================= */

${fontFaces.join('\n\n')}

.fa-solid, .fas,
.fa-regular, .far { font-family: 'Font Awesome 7 Free'; font-style: normal; line-height: 1; -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased; display: var(--fa-display, inline-block); font-variant: normal; text-rendering: auto; }
.fa-solid, .fas { font-weight: 900; }
.fa-regular, .far { font-weight: 400; }

.fa-brands, .fab { font-family: 'Font Awesome 7 Brands'; font-weight: 400; font-style: normal; line-height: 1; -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased; display: var(--fa-display, inline-block); font-variant: normal; text-rendering: auto; }

${rules.join('\n')}
`;

  await writeFile(CSS_OUT, css, 'utf8');

  console.log(`Ikon dipakai: ${rules.length}`);
  console.log(`CSS ditulis: ${CSS_OUT}`);
  if (unknown.length) {
    console.log(`\nTidak ditemukan di metadata (${unknown.length}):`);
    unknown.forEach((u) => console.log('  -', u));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
