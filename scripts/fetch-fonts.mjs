/**
 * fetch-fonts.mjs
 * ---------------------------------------------------------------------------
 * Mengunduh file WOFF2 dari Google Fonts ke `public/fonts/` agar font bisa
 * di-self-host: tidak ada request ke domain pihak ketiga, tidak ada FOUT,
 * dan font bisa di-preload dari origin sendiri.
 *
 * Hanya weight yang benar-benar dipakai aplikasi yang diunduh.
 * Jalankan sekali dengan `npm run fonts`.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public/fonts');

// User-Agent modern agar Google mengirim WOFF2 dengan unicode-range yang benar.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const FAMILIES = [
  {
    // Heading + body: satu superfamily geometris-humanis, bahasa Indonesia aman.
    url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&display=swap',
    slug: 'plus-jakarta-sans',
  },
  {
    // Aksen editorial (kata serif miring pada judul).
    url: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap',
    slug: 'instrument-serif',
  },
  {
    // Label teknis / eyebrow / angka.
    url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400..700&display=swap',
    slug: 'jetbrains-mono',
  },
];

// Subset latin + latin-ext cukup untuk EN/ID.
const KEEP_RANGES = ['latin', 'latin-ext'];

function parseBlocks(css) {
  const results = [];
  const pattern = /\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  let match;
  while ((match = pattern.exec(css))) {
    results.push({ subset: match[1], body: match[2] });
  }
  return results;
}

async function fetchFont(family) {
  const cssRes = await fetch(family.url, { headers: { 'User-Agent': UA } });
  if (!cssRes.ok) throw new Error(`CSS gagal: ${family.slug} (${cssRes.status})`);
  const css = await cssRes.text();

  const kept = [];

  for (const { subset, body } of parseBlocks(css)) {
    if (!KEEP_RANGES.includes(subset)) continue;

    const urlMatch = body.match(/url\((https:\/\/[^)]+\.woff2)\)/);
    if (!urlMatch) continue;

    const weight = (body.match(/font-weight:\s*([^;]+);/) || [])[1]?.trim() || '400';
    const style = (body.match(/font-style:\s*([^;]+);/) || [])[1]?.trim() || 'normal';
    const unicodeRange = (body.match(/unicode-range:\s*([^;]+);/) || [])[1]?.trim();

    // Nama file memuat subset, sehingga CSS bisa dibuat ulang tanpa menebak.
    const fileName = `${family.slug}-${weight.replace(/\s+/g, '-')}-${style}-${subset}.woff2`;

    const fontRes = await fetch(urlMatch[1], { headers: { 'User-Agent': UA } });
    if (!fontRes.ok) throw new Error(`Font gagal: ${fileName} (${fontRes.status})`);
    const buffer = Buffer.from(await fontRes.arrayBuffer());
    await writeFile(join(OUT_DIR, fileName), buffer);

    kept.push({ fileName, subset, weight, style, unicodeRange, bytes: buffer.length });
  }

  return kept;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const report = [];

  for (const family of FAMILIES) {
    const files = await fetchFont(family);
    report.push({ slug: family.slug, files });
  }

  for (const entry of report) {
    const total = entry.files.reduce((sum, file) => sum + file.bytes, 0);
    console.log(`${entry.slug}: ${entry.files.length} file, ${(total / 1024).toFixed(1)} KB`);
    entry.files.forEach((file) => console.log(`  - ${file.fileName}`));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
