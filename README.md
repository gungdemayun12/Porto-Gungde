# Gungdev — Portfolio

Portfolio pribadi Gungde Mayun, web developer & digital marketing di Bali.
Dibangun dengan React 19, Vite, Tailwind CSS v4, dan React Router.

## Menjalankan proyek

```bash
npm install
npm run dev       # server pengembangan
npm run build     # build produksi ke dist/
npm run preview   # pratinjau hasil build
npm run lint      # ESLint
```

## Pipeline aset

Aset berat tidak diproses manual. Setiap kali menambah foto atau proyek baru,
jalankan skrip berikut lalu build ulang.

| Perintah | Skrip | Keluaran |
| --- | --- | --- |
| `npm run images` | `scripts/optimize-images.mjs` | Turunan WebP di `public/images/project/opt/` (varian `card` 640px, `detail` 1200px, `icon` 192px) |
| `npm run photos` | `scripts/optimize-photo.mjs` | `src/assets/gungde.webp` (480px, q74) |
| `npm run icons` | `scripts/subset-fontawesome.mjs` | `src/styles/fontawesome-subset.css` + font ikon yang sudah di-subset |
| `npm run fonts` | `scripts/fetch-fonts.mjs`, `scripts/build-fonts-css.mjs` | `public/fonts/*.woff2` dan `src/styles/fonts.css` |

Catatan penting:

- **`npm run images`** wajib dijalankan setelah menambah gambar proyek. Data di
  `src/data/projects.js` menurunkan `coverThumb` dan `galleryDetail` dari nama
  berkas asli, jadi turunan WebP harus sudah ada.
- **`npm run icons`** wajib dijalankan ulang setiap kali menambah atau menghapus
  ikon Font Awesome. Skrip ini memindai `src/`, menulis hanya selector ikon yang
  dipakai, dan **memangkas berkas font** ke glyph yang benar-benar terpakai
  (sekitar 249 KB → 10 KB). Ikon yang tidak terdaftar akan tampil kosong.
- Ikon antarmuka baru sebaiknya memakai `lucide-react` (sudah dipakai luas) agar
  tidak perlu menjalankan ulang subset Font Awesome. Font Awesome dipakai untuk
  logo brand (WhatsApp, GitHub, Instagram, dsb.).

## Strategi performa

Beban halaman dijaga tetap ringan, terutama di ponsel.

- **Pemuatan bertahap.** Seksi di bawah hero (`Projects`, `About`, `Arcade`,
  `Experience`, `Contact`) diimpor dinamis setelah idle atau saat mendekati
  viewport. Rute detail proyek dan halaman 404 juga dipecah terpisah.
- **3D hanya di desktop.** Lanyard Three.js dimuat setelah idle dan hanya pada
  perangkat dengan WebGL, tanpa `prefers-reduced-motion`, serta lebar ≥ 1024px.
  Di ponsel dan tablet dipakai `StaticBadge` berbasis gambar WebP.
- **Kursor glow** hanya dimuat pada perangkat dengan pointer presisi
  (`hover: hover`), sehingga tidak pernah diunduh di layar sentuh.
- **Gambar WebP berukuran tepat.** Kartu proyek memakai varian 640px (±16 KB per
  gambar), bukan berkas asli. Video demo proyek memakai pola *click-to-play*
  (`ProjectVideo`), jadi tidak ada unduhan video saat halaman dibuka.
- **Font self-hosted** dengan subset `latin` + `latin-ext` saja, dua di antaranya
  di-`preload`.

Angka acuan hasil audit (`scripts/audit-payload.cjs`):

| Perangkat | Total transfer | Catatan |
| --- | --- | --- |
| Ponsel 390px | ± 461 KB | Three.js tidak diunduh |
| Desktop 1440px | ± 1,5 MB | Termasuk Three.js (1,08 MB) dan model GLB (355 KB) |

## Pemeriksaan otomatis

Skrip audit memakai `puppeteer-core` dan Chrome sistem. Jalankan pratinjau build
lebih dulu, lalu arahkan skrip ke alamat tersebut.

```bash
npm run build
npm run preview -- --port 5200
```

```powershell
$env:AUDIT_URL="http://localhost:5200"   # tanpa garis miring di akhir
node scripts/audit-page.cjs      # render, font, error konsol, overflow, gambar rusak
node scripts/audit-payload.cjs   # total transfer per perangkat
node scripts/audit-detail.cjs    # rute SPA (detail proyek, 404)
node scripts/screenshot.cjs      # tangkapan layar ke scripts/shots/
```

Lokasi Chrome diatur di dalam tiap skrip (`CHROME`). Sesuaikan bila berbeda.
Laporan ditulis ke `scripts/_*.txt` dan tangkapan layar ke `scripts/shots/`;
keduanya diabaikan Git.

## Struktur singkat

```
src/
  components/     komponen UI, lanyard 3D, layout
  data/           projects.js (data lengkap) & projectMeta.js (metadata ringan)
  hooks/          useBreakpoint, useLang, useDeviceCapability, useInView
  pages/          Home, ProjectDetail, NotFound
  sections/       Hero, Projects, About, Arcade, Experience, Contact
  styles/         index.css, fonts.css, fontawesome-subset.css (dua terakhir hasil generate)
scripts/          pipeline aset + skrip audit
```

`src/styles/fonts.css` dan `src/styles/fontawesome-subset.css` adalah berkas hasil
generate — jangan mengedit manual, ubah skripnya lalu jalankan ulang perintahnya.
