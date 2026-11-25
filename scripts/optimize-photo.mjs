/**
 * optimize-photo.mjs
 * ---------------------------------------------------------------------------
 * Membuat turunan WebP untuk foto profil yang dipakai kartu Hero.
 *
 * Foto asli (560x996 JPEG, ±149 KB) dipertahankan sebagai sumber, tetapi
 * browser memakai versi WebP yang jauh lebih kecil di semua titik pakai
 * (kartu 3D, kartu statis, skeleton).
 *
 * Jalankan `npm run photos`.
 */
import { writeFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, 'src/assets/gungde.jpeg');
const OUT = join(ROOT, 'src/assets/gungde.webp');

async function main() {
  // Kartu Hero ditampilkan maksimal ±288 px lebar di layar retina 2x,
  // jadi 480 px sudah cukup tajam dan memotong ±50% ukuran berkas.
  const buffer = await sharp(SOURCE)
    .resize({ width: 480, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 74, effort: 6 })
    .toBuffer();

  await writeFile(OUT, buffer);

  const before = (await stat(SOURCE)).size;
  const after = buffer.length;
  console.log(
    `Foto profil: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB ` +
      `(${Math.round((1 - after / before) * 100)}% lebih kecil)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
