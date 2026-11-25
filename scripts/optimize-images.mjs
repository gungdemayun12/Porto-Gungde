/**
 * optimize-images.mjs
 * ---------------------------------------------------------------------------
 * Membuat turunan gambar yang ringan untuk kebutuhan web:
 *
 *   card    → lebar 640px   (thumbnail kartu proyek, ratio 16:9)
 *   detail  → lebar 1200px  (hero & galeri di halaman detail proyek)
 *
 * Semua turunan disimpan sebagai WebP (kualitas 78-82) di
 * `public/images/project/opt/`. Nama file di-hash supaya aman dari cache lama.
 *
 * Skrip hanya memproses file sumber dan melewati file yang sudah ada,
 * jadi aman dijalankan berulang kali. Jalankan dengan `npm run images`.
 */
import { readdir, mkdir, access, writeFile } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = join(ROOT, 'public/images/project/web');
const OUT_DIR = join(ROOT, 'public/images/project/opt');

// Ikon aplikasi & logo tidak berada di folder yang sama dengan screenshot.
// Didaftarkan eksplisit agar bisa dioptimasi tanpa mengubah struktur folder.
const EXTRA_SOURCES = [
  { file: join(ROOT, 'public/images/project/catatku.png'), slug: 'catatku' },
  { file: join(ROOT, 'public/images/project/runtrack-icon.png'), slug: 'runtrack-icon' },
];

const SIZES = [
  { key: 'card', width: 640, quality: 78 },
  { key: 'detail', width: 1200, quality: 80 },
];

// Ikon aplikasi cukup satu ukuran kecil (dipakai maksimal 96px di layar).
const ICON_SIZES = [{ key: 'icon', width: 192, quality: 82 }];

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

/** Nama file yang stabil dan bebas karakter aneh di URL. */
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SOURCE_DIR)).filter((file) =>
    /\.(jpe?g|png)$/i.test(extname(file))
  );

  let created = 0;
  let skipped = 0;
  let totalBytes = 0;

  const manifest = {};

  for (const file of files) {
    const sourcePath = join(SOURCE_DIR, file);
    const slug = slugify(basename(file, extname(file)));
    const entry = {};

    for (const { key, width, quality } of SIZES) {
      const outName = `${slug}-${key}.webp`;
      const outPath = join(OUT_DIR, outName);
      entry[key] = `/images/project/opt/${outName}`;

      if (await exists(outPath)) {
        skipped += 1;
        continue;
      }

      const buffer = await sharp(sourcePath)
        .rotate()
        .resize({ width, withoutEnlargement: true, fit: 'inside' })
        .webp({ quality, effort: 5 })
        .toBuffer();

      await writeFile(outPath, buffer);
      totalBytes += buffer.length;
      created += 1;
    }

    manifest[file] = entry;
  }

  await writeFile(
    join(OUT_DIR, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8'
  );

  // Ikon aplikasi — satu varian kecil, tetap transparan bila sumbernya PNG.
  for (const { file, slug } of EXTRA_SOURCES) {
    if (!(await exists(file))) continue;
    for (const { key, width, quality } of ICON_SIZES) {
      const outName = `${slug}-${key}.webp`;
      const outPath = join(OUT_DIR, outName);
      if (await exists(outPath)) {
        skipped += 1;
        continue;
      }
      const buffer = await sharp(file)
        .resize({ width, withoutEnlargement: true, fit: 'inside' })
        .webp({ quality, effort: 5, alphaQuality: 90 })
        .toBuffer();
      await writeFile(outPath, buffer);
      totalBytes += buffer.length;
      created += 1;
    }
  }

  console.log(
    `Gambar dioptimasi: ${created} dibuat, ${skipped} dilewati, ` +
      `total ${(totalBytes / 1024 / 1024).toFixed(2)} MB`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
