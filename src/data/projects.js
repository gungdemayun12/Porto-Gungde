/**
 * Data proyek portfolio — website bisnis, sistem pemesanan, dan aplikasi web internal.
 * Setiap proyek dilengkapi galeri tangkapan layar, spesifikasi teknis, dan ringkasan fitur.
 */

const resolveCategory = (item) => {
  if (item.mobileApp) return 'Mobile App';
  if (item.privateSystem) return 'Private System';
  return 'Web';
};

// ---------------------------------------------------------------------------
// PIPELINE GAMBAR
// File sumber tetap JPEG di /images/project/web/ (maks 1600px). Turunan WebP
// yang ringan dibuat oleh `npm run images` dan disimpan di
// /images/project/opt/ dengan dua ukuran:
//
//   -card.webp    → 640px, untuk thumbnail kartu proyek (rata-rata ±16 KB)
//   -detail.webp  → 1200px, untuk hero & galeri halaman detail
//
// Pemetaan dilakukan dari daftar proyek yang sebenarnya dipakai, jadi bundle
// tidak perlu memuat manifest gambar yang tidak terpakai.
// ---------------------------------------------------------------------------

const slugifyFile = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Nama dasar file dari sebuah path gambar proyek, mis. "balicharming (1)". */
const imageBaseName = (src) => {
  if (!src || !src.includes('/images/project/')) return null;
  let file = src.split('/').pop();
  if (!file) return null;
  try {
    file = decodeURIComponent(file);
  } catch {
    // Biarkan apa adanya bila escape sequence tidak valid.
  }
  return slugifyFile(file.replace(/\.(png|jpe?g|webp)$/i, ''));
};

const optimizedImage = (src, size) => {
  const base = imageBaseName(src);
  return base ? `/images/project/opt/${base}-${size}.webp` : src || null;
};

// Fallback untuk proyek yang gambarnya belum punya turunan WebP.
const toWebImage = (src) =>
  src && src.includes('/images/project/')
    ? src.replace('/images/project/', '/images/project/web/').replace(/\.(png|jpe?g)$/i, '.jpg')
    : src;

const project = (data) => {
  const item = { ...data };
  delete item.stack;
  const category = resolveCategory(item);
  const webThumb = toWebImage(item.thumbnail || null);
  const webGallery = Array.isArray(item.gallery) ? item.gallery.map(toWebImage) : item.gallery;
  return {
    year: item.year || 2025,
    ...item,
    thumbnail: webThumb,
    gallery: webGallery,
    // Turunan ringan untuk tampilan kartu & halaman detail.
    coverThumb: optimizedImage(item.thumbnail, 'card') || webThumb,
    galleryDetail: Array.isArray(webGallery)
      ? webGallery.map((src) => optimizedImage(src, 'detail') || src)
      : webGallery,
    category,
    displayCategory: category,
    title: { en: item.name, id: item.name },
    summary: { en: item.summaryEn, id: item.summaryId },
    detail: { en: item.detailEn, id: item.detailId },
    results: { en: item.resultsEn, id: item.resultsId },
    role: typeof item.role === 'object' ? item.role : { en: item.role || 'Web Developer', id: item.role || 'Web Developer' },
  };
};

export const projectsData = [
  project({
    slug: 'run-track',
    name: 'Run Track',
    location: 'Bali, Indonesia',
    role: { en: 'Android App Developer', id: 'Android App Developer' },
    year: 2026,
    mobileApp: true,
    icon: '/images/project/opt/runtrack-icon-icon.webp',
    accent: '#FD520F',
    downloadUrl: '/downloads/runtrack.apk',
    downloadFileName: 'RunTrack.apk',
    downloadSize: '16.9 MB',
    appMeta: {
      platform: 'Android',
      format: 'APK',
      size: '16.9 MB',
      tracking: 'GPS',
    },
    downloadBlurb: {
      en: 'Download the APK and experience the full run-tracking flow — live GPS map, real-time metrics, and post-run summaries — on an Android phone.',
      id: 'Unduh berkas APK dan rasakan langsung alur pelacakan lari, peta GPS, serta ringkasan sesi di ponsel Android.',
    },
    downloadChips: {
      en: [
        { icon: 'fa-brands fa-android', label: 'Android' },
        { icon: 'fa-solid fa-file-arrow-down', label: 'APK' },
        { icon: 'fa-solid fa-weight-hanging', label: '16.9 MB' },
        { icon: 'fa-solid fa-location-crosshairs', label: 'GPS Tracking' },
      ],
      id: [
        { icon: 'fa-brands fa-android', label: 'Android' },
        { icon: 'fa-solid fa-file-arrow-down', label: 'APK' },
        { icon: 'fa-solid fa-weight-hanging', label: '16.9 MB' },
        { icon: 'fa-solid fa-location-crosshairs', label: 'Pelacakan GPS' },
      ],
    },
    installSteps: {
      en: [
        'Tap Download App and wait for the APK file to finish downloading.',
        'Open the file, then allow "Install unknown apps" for your browser if Android asks.',
        'Launch Run Track, grant GPS permission, and start your first run.',
      ],
      id: [
        'Ketuk Unduh Aplikasi dan tunggu berkas APK selesai diunduh.',
        'Buka berkasnya, lalu izinkan "Instal aplikasi tidak dikenal" untuk browser jika diminta Android.',
        'Jalankan Run Track, berikan izin GPS, dan mulai sesi lari pertama Anda.',
      ],
    },
    downloadNote: {
      en: 'The APK is shared for hands-on testing. Make sure your Android device has GPS enabled.',
      id: 'Berkas APK dibagikan untuk pengujian langsung. Pastikan perangkat Android memiliki GPS aktif.',
    },
    summaryEn: 'A Strava-inspired Android running companion that records every run with live GPS tracking, real-time pace, per-kilometer splits, calorie and elevation insights, and a personal training history.',
    summaryId: 'Aplikasi Android pendamping lari bergaya Strava yang merekam setiap sesi lari dengan GPS real-time, pace dan split per kilometer, estimasi kalori, elevasi, serta riwayat latihan pribadi.',
    detailEn: 'Run Track is an Android running companion built for runners who want the essentials without the noise. One tap starts a session: the app locks onto GPS, begins drawing the route on a live map, and streams distance, moving time, current pace, average pace, calories burned, and elevation gain in a clean, glanceable dashboard designed to be read mid-stride. Pause and resume keep the timer honest at traffic lights, while auto-pause quietly handles the short stops you would otherwise forget.\n\nEvery run closes with a summary that feels like a training log: a route replay, per-kilometer splits, fastest and slowest kilometers, total climb, calorie estimate, and a comparison against your recent average. Completed activities are stored in a personal history where weekly and monthly totals, streaks, and personal records build up over time, so progress is visible instead of guessed. A lightweight account and onboarding flow keep each runner\'s history private, while settings let the experience be tuned to the device.\n\nThe interface follows a sporty dark theme with high-contrast numerals and an orange accent borrowed from the Run Track identity, keeping the screen readable under Bali\'s midday sun and at dusk. Permission flows for precise location and background tracking are handled explicitly, GPS accuracy is surfaced to the runner, and battery-conscious sampling keeps long runs practical. Run Track is packaged as an installable Android APK, so the complete tracking flow can be tried on a real device directly from this portfolio.',
    detailId: 'Run Track adalah aplikasi pendamping lari Android yang dibangun untuk pelari yang menginginkan hal-hal esensial tanpa distraksi. Satu ketukan memulai sesi: aplikasi mengunci GPS, mulai menggambar rute di peta langsung, lalu menampilkan jarak, waktu bergerak, pace saat ini, pace rata-rata, estimasi kalori, dan elevasi dalam dashboard yang bersih dan mudah dibaca sambil berlari. Tombol jeda dan lanjutkan menjaga waktu tetap akurat saat berhenti di lampu merah, sementara auto-pause menangani jeda pendek yang sering terlewat.\n\nSetiap sesi lari ditutup dengan ringkasan bergaya buku latihan: replay rute, split per kilometer, kilometer tercepat dan terlambat, total tanjakan, estimasi kalori, serta perbandingan dengan rata-rata lari terakhir. Aktivitas yang selesai tersimpan dalam riwayat pribadi, tempat total mingguan dan bulanan, streak, serta rekor pribadi terus bertambah sehingga progres terlihat nyata, bukan sekadar perkiraan. Alur akun dan onboarding yang ringan menjaga riwayat setiap pelari tetap privat, sementara halaman pengaturan memungkinkan pengalaman disesuaikan dengan perangkat.\n\nAntarmukanya memakai tema gelap sporty dengan angka berkontras tinggi dan aksen oranye dari identitas Run Track, agar layar tetap terbaca di bawah terik Bali maupun saat senja. Alur izin lokasi presisi dan pelacakan latar belakang ditangani secara eksplisit, akurasi GPS ditampilkan kepada pelari, dan pengambilan sampel yang hemat baterai membuat lari jarak jauh tetap praktis. Run Track dikemas sebagai APK Android yang bisa dipasang langsung, sehingga seluruh alur pelacakan dapat dicoba di perangkat nyata dari portofolio ini.',
    resultsEn: [
      'One-tap GPS run tracking with a live map and animated route drawing',
      'Real-time distance, moving time, current and average pace, calories, and elevation',
      'Pause, resume, and auto-pause that protect the accuracy of every session',
      'Per-kilometer splits plus a post-run summary with route replay and comparisons',
      'Personal run history with weekly progress, streaks, and personal records',
      'Sporty dark interface with high-contrast numerals and an installable Android APK',
    ],
    resultsId: [
      'Pelacakan lari GPS sekali ketuk dengan peta langsung dan rute yang tergambar animatif',
      'Jarak, waktu bergerak, pace saat ini dan rata-rata, kalori, serta elevasi real-time',
      'Jeda, lanjutkan, dan auto-pause yang menjaga akurasi setiap sesi lari',
      'Split per kilometer serta ringkasan setelah lari dengan replay rute dan perbandingan',
      'Riwayat lari pribadi dengan progres mingguan, streak, dan rekor pribadi',
      'Antarmuka gelap sporty dengan angka kontras tinggi dan APK Android siap dipasang',
    ],
  }),

  project({
    slug: 'catatku',
    name: 'CatatKu',
    location: 'Bali, Indonesia',
    role: { en: 'Android App Developer', id: 'Android App Developer' },
    year: 2026,
    mobileApp: true,
    icon: '/images/project/opt/catatku-icon.webp',
    thumbnail: '/images/project/catatku.png',
    accent: '#0F9B8E',
    appTheme: 'notes',
    downloadUrl: '/downloads/catatku.apk',
    downloadFileName: 'CatatKu-2.0-release.apk',
    downloadSize: '11.36 MB',
    appMeta: {
      platform: 'Android',
      format: 'APK',
      size: '11.36 MB',
      version: '2.0',
      minAndroid: '8.0 (API 26)',
    },
    downloadBlurb: {
      en: 'Download the signed release APK and try the full CatatKu experience — tasks, subtasks, wallets, budgets, recurring bills, and CSV/PDF reports — on an Android phone.',
      id: 'Unduh APK release yang sudah ditandatangani dan coba langsung pengalaman CatatKu — tugas, subtask, dompet, anggaran, tagihan berulang, hingga ekspor laporan CSV/PDF — di ponsel Android.',
    },
    downloadChips: {
      en: [
        { icon: 'fa-brands fa-android', label: 'Android 8.0+' },
        { icon: 'fa-solid fa-file-arrow-down', label: 'Signed APK' },
        { icon: 'fa-solid fa-weight-hanging', label: '11.36 MB' },
        { icon: 'fa-solid fa-code-branch', label: 'v2.0' },
        { icon: 'fa-solid fa-cloud', label: 'Firebase Sync' },
      ],
      id: [
        { icon: 'fa-brands fa-android', label: 'Android 8.0+' },
        { icon: 'fa-solid fa-file-arrow-down', label: 'APK Signed' },
        { icon: 'fa-solid fa-weight-hanging', label: '11,36 MB' },
        { icon: 'fa-solid fa-code-branch', label: 'v2.0' },
        { icon: 'fa-solid fa-cloud', label: 'Sinkron Firebase' },
      ],
    },
    installSteps: {
      en: [
        'Tap Download App and wait for the signed APK to finish downloading.',
        'Open the file, then allow "Install unknown apps" for your browser if Android asks.',
        'Launch CatatKu, create an account or sign in with Google, and your data syncs to the cloud.',
      ],
      id: [
        'Ketuk Unduh Aplikasi dan tunggu berkas APK signed selesai diunduh.',
        'Buka berkasnya, lalu izinkan "Instal aplikasi tidak dikenal" untuk browser jika diminta Android.',
        'Jalankan CatatKu, buat akun atau masuk dengan Google, dan data Anda tersinkron ke cloud.',
      ],
    },
    downloadNote: {
      en: 'The APK is the signed v2.0 release, shared for hands-on testing. An internet connection is required for cloud sync and sign-in.',
      id: 'Berkas APK adalah release v2.0 yang sudah ditandatangani, dibagikan untuk pengujian langsung. Koneksi internet diperlukan untuk sinkronisasi cloud dan masuk akun.',
    },
    summaryEn: 'A native Android app (Java + Firebase) that unifies daily task management and personal finance tracking in one place — with real-time cloud sync, per-user data isolation, and bilingual support.',
    summaryId: 'Aplikasi Android native (Java + Firebase) yang menyatukan manajemen tugas harian dan pencatatan keuangan pribadi dalam satu tempat — dengan sinkronisasi cloud real-time, isolasi data per pengguna, dan dukungan dua bahasa.',
    detailEn:
      'CatatKu is a native Android application that combines two everyday needs that usually live in separate apps: managing what you have to do, and keeping track of what you spend. A single authentication flow opens both modules, so a task list and a financial ledger share one account, one visual language, and the same real-time cloud backend.\n\nThe To-Do module covers the full lifecycle of a task: title, description, custom category, priority, deadline with time, and optional estimated duration. Tasks can be broken into subtasks with a progress ratio, and once every subtask is ticked off the app offers to close the parent task automatically. A search field is paired with ten different views — All, Today, Upcoming, Overdue, Completed, Today\'s Focus, Starred, Stale, Quick Wins, and Has Steps — plus category, priority, and custom date-range filters. A monthly calendar marks every day that holds work, statistics show completion rate, a trend chart and a per-category distribution, and scheduled reminders survive a device reboot. Long-pressing the floating action button opens Quick Capture for recording a task without the full form.\n\nThe Finance module goes well beyond a simple expense log. Wallets can be cash, bank, or e-wallet, each with a custom colour, an opening balance, and its own currency. Transactions carry coloured categories with icons and group by day with a daily net. Transfers between wallets are stored as a pair of linked transaction legs, so the overall balance can never drift, and they are excluded from monthly spending totals. On top of that sit monthly category budgets with progress bars and warnings, recurring bills anchored to their original day, savings goals with deposit progress, and debts and receivables with staged payments and clear status. Reports render a donut chart per category and a trend line, and export to both CSV for spreadsheets and PDF for printing, over the current month, all time, or any custom date range.\n\nUnder the hood the app follows a Repository–ViewModel–LiveData architecture across 105 Java files, with data held in Firebase Firestore and authenticated through Firebase Auth. Security is enforced at the database level: Firestore rules use an isOwner() check so every user can only read and write their own documents. The interface adapts to light and dark themes, scales cleanly up to a 150% system font size, and is fully localised in Indonesian and English with 960 strings per language. The build is covered by 84 unit tests across 13 classes, and a signed release APK is available to install directly from this page.',
    detailId:
      'CatatKu adalah aplikasi Android native yang menggabungkan dua kebutuhan sehari-hari yang biasanya terpisah di aplikasi berbeda: mengelola apa yang harus dikerjakan, dan memantau apa yang dikeluarkan. Satu alur autentikasi membuka kedua modul, sehingga daftar tugas dan catatan keuangan berbagi satu akun, satu bahasa visual, dan backend cloud real-time yang sama.\n\nModul To-Do mencakup siklus penuh sebuah tugas: judul, deskripsi, kategori kustom, prioritas, tenggat beserta jam, dan estimasi durasi. Tugas dapat dipecah menjadi subtask dengan rasio progres, dan ketika seluruh subtask selesai aplikasi menawarkan untuk menutup tugas utamanya secara otomatis. Kolom pencarian dipasangkan dengan sepuluh tampilan berbeda — Semua, Hari ini, Mendatang, Terlambat, Selesai, Fokus hari ini, Berbintang, Mengendap, Cepat selesai, dan Punya langkah — plus filter kategori, prioritas, dan rentang tanggal kustom. Kalender bulanan menandai setiap tanggal yang memiliki pekerjaan, statistik menampilkan completion rate, grafik tren dan distribusi per kategori, dan pengingat terjadwal tetap berfungsi setelah perangkat di-reboot. Menekan lama tombol FAB membuka Quick Capture untuk mencatat tugas tanpa membuka form penuh.\n\nModul Keuangan melangkah jauh melampaui catatan pengeluaran biasa. Dompet dapat berupa tunai, bank, atau e-wallet, masing-masing dengan warna kustom, saldo awal, dan mata uangnya sendiri. Transaksi membawa kategori berwarna dengan ikon dan dikelompokkan per tanggal beserta net harian. Transfer antar dompet disimpan sebagai sepasang transaksi yang saling terhubung, sehingga total saldo tidak mungkin melenceng, dan keduanya dikecualikan dari total pengeluaran bulanan. Di atasnya tersedia anggaran bulanan per kategori dengan progress bar dan peringatan, tagihan berulang yang terikat pada tanggal aslinya, target tabungan dengan progres setoran, serta utang dan piutang dengan pembayaran bertahap dan status yang jelas. Laporan menghadirkan donut chart per kategori dan grafik tren, serta dapat diekspor ke CSV untuk spreadsheet maupun PDF siap cetak, untuk bulan ini, seluruh transaksi, atau rentang tanggal kustom.\n\nDi balik layar, aplikasi mengikuti arsitektur Repository–ViewModel–LiveData pada 105 file Java, dengan data tersimpan di Firebase Firestore dan autentikasi melalui Firebase Auth. Keamanan ditegakkan di tingkat database: aturan Firestore memakai pemeriksaan isOwner() sehingga setiap pengguna hanya dapat membaca dan menulis dokumennya sendiri. Antarmuka beradaptasi dengan tema terang dan gelap, menyesuaikan diri hingga ukuran font sistem 150%, dan terlokalisasi penuh dalam bahasa Indonesia dan Inggris dengan 960 string per bahasa. Build-nya dilindungi 84 unit test pada 13 kelas, dan APK release yang sudah ditandatangani tersedia untuk dipasang langsung dari halaman ini.',
    resultsEn: [
      'Dual modules — To-Do List and Finance — behind a single authentication flow',
      'Real-time cloud sync on Firebase Firestore with per-user data isolation via isOwner() rules',
      'Subtasks with progress tracking and an automatic completion prompt for the parent task',
      'Ten task views plus category, priority, and custom date-range filters, with a monthly calendar',
      'Advanced finance: wallet transfers, multi-currency with live rates, budgets, recurring bills, savings goals, and debts',
      'CSV and PDF report export with custom date ranges, shared through the Android share sheet',
      'Bilingual UI (Indonesian and English, 960 strings each) with light and dark themes',
      'Account deletion with re-authentication and typed confirmation, plus 84 unit tests across 13 classes',
    ],
    resultsId: [
      'Modul ganda — To-Do List dan Keuangan — di balik satu alur autentikasi',
      'Sinkronisasi cloud real-time di Firebase Firestore dengan isolasi data per pengguna lewat aturan isOwner()',
      'Subtask dengan pelacakan progres dan penawaran penyelesaian otomatis untuk tugas induk',
      'Sepuluh tampilan tugas plus filter kategori, prioritas, dan rentang tanggal, dengan kalender bulanan',
      'Keuangan lanjutan: transfer antar dompet, multi-mata uang dengan kurs otomatis, anggaran, tagihan berulang, target tabungan, dan utang-piutang',
      'Ekspor laporan CSV dan PDF dengan rentang tanggal kustom melalui lembar berbagi Android',
      'Antarmuka dua bahasa (Indonesia dan Inggris, 960 string masing-masing) dengan tema terang dan gelap',
      'Hapus akun dengan re-autentikasi dan konfirmasi ketik, serta 84 unit test pada 13 kelas',
    ],
  }),

  project({
    slug: 'bali-play-golf',
    name: 'Bali Play Golf',
    location: 'Denpasar, Bali',
    role: { en: 'Web Developer & Digital Experience Designer', id: 'Web Developer & Digital Experience Designer' },
    year: 2026,
    thumbnail: '/images/project/baliplaygolf%20(1).png',
    gallery: [
      '/images/project/baliplaygolf%20(1).png',
      '/images/project/baliplaygolf%20(2).png',
      '/images/project/baliplaygolf%20(3).png',
      '/images/project/baliplaygolf%20(4).png',
      '/images/project/baliplaygolf%20(5).png',
      '/images/project/baliplaygolf%20(6).png',
      '/images/project/baliplaygolf%20(7).png',
      '/images/project/baliplaygolf%20(8).png',
    ],
    summaryEn: 'A premium golf tour and tee-time booking website for Bali Play Golf, a licensed local travel operator offering curated packages at New Kuta Golf, Bali Handara Golf, and Bukit Pandawa Golf with instant WhatsApp reservations.',
    summaryId: 'Website pemesanan paket golf premium Bali Play Golf, operator travel lokal berlisensi yang menawarkan paket pilihan ke New Kuta Golf, Bali Handara Golf, dan Bukit Pandawa Golf dengan reservasi WhatsApp instan.',
    detailEn: 'Bali Play Golf is the official booking platform of PT. Bali Travel Plan, a licensed local tour operator based in Denpasar that turns a single round of golf into a complete island experience. The site presents three signature courses: New Kuta Golf, a links-style championship layout perched on limestone cliffs above Dreamland and Balangan beaches; Bali Handara Golf, a legendary 1974 mountain course set nearly 1,400 metres above sea level inside an extinct volcanic crater in Bedugul; and Bukit Pandawa Golf, an 18-hole par-3 course on the cliffs of Kutuh with panoramic Indian Ocean views.\n\nEvery package is documented in detail, including 18-hole green fees, caddie and shared golf cart, player insurance, mineral water, weekend surcharges, private hotel transfers, tee-box categories, course specifications, facilities, awards, and cancellation policies. A real-time search and filter explorer helps visitors compare courses by destination and playing style, while an interactive Bali map, a three-step "Choose → Book → Play" journey, a floating WhatsApp widget, and pre-filled inquiry templates reduce the booking process to a single conversation. The visual identity pairs a fresh fairway-green palette with editorial serif typography, soft organic image frames, and generous white space, echoing the calm of Bali\'s highlands and coastline. Fully responsive and bilingual (English & Indonesian), the site is structured for local SEO so travelling golfers can discover and book their ideal Bali tee time from any device.',
    detailId: 'Bali Play Golf adalah platform pemesanan resmi PT. Bali Travel Plan, operator tur lokal berlisensi di Denpasar yang mengubah satu ronde golf menjadi pengalaman pulau yang utuh. Website ini menampilkan tiga lapangan unggulan: New Kuta Golf, lapangan championship bergaya links di atas tebing batu kapur menghadap Pantai Dreamland dan Balangan; Bali Handara Golf, lapangan pegunungan legendaris tahun 1974 pada ketinggian hampir 1.400 meter di dalam kawah gunung purba Bedugul; serta Bukit Pandawa Golf, lapangan 18 hole par-3 di tebing Kutuh dengan panorama Samudra Hindia.\n\nSetiap paket dijelaskan secara transparan, mulai dari green fee 18 hole, caddy dan golf cart bersama, asuransi pemain, air mineral, tambahan biaya akhir pekan, layanan antar-jemput privat, kategori tee box, spesifikasi lapangan, fasilitas, penghargaan, hingga kebijakan pembatalan. Pencarian dan filter paket real-time membantu pengunjung membandingkan lapangan berdasarkan destinasi dan gaya bermain, dilengkapi peta interaktif Bali, alur pemesanan tiga langkah "Pilih → Pesan → Bermain", widget WhatsApp mengambang, serta template pesan otomatis sehingga proses booking cukup diselesaikan dalam satu percakapan. Identitas visualnya memadukan palet hijau fairway yang segar dengan tipografi serif editorial, bingkai foto organik, dan ruang putih yang lapang, mencerminkan ketenangan dataran tinggi dan garis pantai Bali. Dibangun sepenuhnya responsif dan dwibahasa (Inggris & Indonesia) dengan struktur konten ramah SEO lokal, sehingga pegolf mancanegara mudah menemukan dan memesan tee time impian mereka dari perangkat apa pun.',
    resultsEn: [
      'Curated package explorer with live search and filters for Handara, New Kuta, Bukit Pandawa, cliff courses, solo players, and groups',
      'Transparent course detail pages covering green fees, inclusions, tee boxes, course specifications, awards, and cancellation policies',
      'Three-step booking flow with automated WhatsApp inquiry templates and a persistent floating chat widget',
      'Interactive Bali golf map and structured local SEO content for international golf travellers',
      'Fresh fairway-green visual identity with editorial serif typography, organic framing, and full mobile responsiveness',
    ],
    resultsId: [
      'Eksplorasi paket golf dengan pencarian real-time dan filter Handara, New Kuta, Bukit Pandawa, cliff course, pemain tunggal, hingga grup',
      'Halaman detail lapangan transparan mencakup green fee, fasilitas, tee box, spesifikasi, penghargaan, dan kebijakan pembatalan',
      'Alur pemesanan tiga langkah dengan template pesan WhatsApp otomatis dan tombol chat mengambang yang selalu tersedia',
      'Peta interaktif lapangan golf Bali dan konten terstruktur ramah SEO lokal untuk wisatawan pegolf',
      'Identitas visual hijau fairway segar dengan tipografi serif editorial, bingkai organik, dan responsif penuh di semua perangkat',
    ],
    liveUrl: 'https://baliplaygolf.com/',
  }),

  project({
    slug: 'ubud-digital-creative',
    name: 'Ubud Digital Creative',
    location: 'Ubud, Bali',
    role: { en: 'Full-Stack Developer', id: 'Full-Stack Developer' },
    year: 2025,
    thumbnail: '/images/project/ubuddigitalcreative1%20(1).png',
    gallery: [
      '/images/project/ubuddigitalcreative1%20(1).png',
      '/images/project/ubuddigitalcreative1%20(2).png',
      '/images/project/ubuddigitalcreative1%20(3).png',
      '/images/project/ubuddigitalcreative1%20(4).png',
      '/images/project/ubuddigitalcreative1%20(5).png',
      '/images/project/ubuddigitalcreative1%20(6).png',
      '/images/project/ubuddigitalcreative1%20(7).png',
      '/images/project/ubuddigitalcreative1%20(8).png',
    ],
    summaryEn: 'A high-end visual production studio website in Ubud, Bali, highlighting luxury photography, 4K aerial videography, villa architectural shoots, and content creation for premium brands.',
    summaryId: 'Website studio produksi visual mewah di Ubud, Bali, yang menampilkan layanan fotografi premium, videografi drone 4K, pemotretan arsitektur villa, dan manajemen konten media sosial.',
    detailEn: 'Ubud Digital Creative is a premier creative media and visual production house founded by Gusde Bathya in Ubud, Bali. With over 6+ years of industry experience, 200+ completed projects, and 120+ satisfied international and local clients, the studio specializes in luxury hospitality imagery, villa architectural documentation for Airbnb and Booking.com, commercial brand shoots, drone aerial cinematography, and social media growth strategies.\n\nThe website was engineered to reflect the studio\'s sophisticated dark-luxury aesthetic accented with warm gold tones. Key highlights include an interactive masonry portfolio with high-resolution media previews, structured 4-step creative workflow breakdowns (Brief & Concept, Production Shoot, Color Grading Post-Production, and Cloud Gallery Handover), bilingual localization (English & Indonesian), and an integrated WhatsApp consultation channel for immediate client booking inquiries.',
    detailId: 'Ubud Digital Creative adalah rumah produksi visual dan agensi kreatif terkemuka di Ubud, Bali yang didirikan oleh Gusde Bathya. Dengan pengalaman lebih dari 6 tahun, 200+ proyek terselesaikan, dan 120+ klien puas, studio ini mengkhususkan diri pada fotografi perhotelan mewah, dokumentasi arsitektur villa siap listing Airbnb & Booking.com, pemotretan produk komersial, sinematografi udara (drone), hingga manajemen konten media sosial.\n\nWebsite ini dirancang dengan gaya dark luxury beraksen emas elegan yang memancarkan estetika visual premium. Fitur utama mencakup galeri masonry interaktif dengan resolusi tinggi, alur kerja 4 tahap produksi terstruktur (Brief & Moodboard, Hari Pemotretan, Pascaproduksi & Color Grading, hingga Pengiriman Galeri), dukungan dwibahasa (Inggris & Indonesia), serta integrasi tombol konsultasi WhatsApp untuk mempermudah calon klien memesan sesi pemotretan secara langsung.',
    resultsEn: [
      'High-impact dark luxury aesthetic with interactive masonry media showcase',
      'Full service catalog: Villa Architectural, Aerial Drone, Lifestyle, & Product Shoots',
      'Structured 4-step production roadmap from concept moodboard to final cloud gallery delivery',
      'Direct WhatsApp booking integration with pre-filled service inquiry templates',
    ],
    resultsId: [
      'Desain dark luxury responsif dengan galeri portofolio foto & video interaktif',
      'Katalog layanan lengkap: Arsitektur Villa, Drone Udara, Lifestyle, & Produk Komersial',
      'Visualisasi 4 tahap produksi dari moodboard konsep hingga pengiriman galeri',
      'Integrasi pemesanan WhatsApp cepat dengan format pesan konsultasi instan',
    ],
    liveUrl: 'https://ubuddigitalcreative.artsyanaid.com/',
  }),

  project({
    slug: 'undangan-digital-sony-dan-dewi',
    name: 'Undangan Digital — Sonyo & Dewi',
    location: 'Bali',
    role: { en: 'Frontend & Interactive Web Developer', id: 'Frontend & Interactive Web Developer' },
    year: 2025,
    thumbnail: '/images/project/undangan%20digital%20(1).png',
    gallery: [
      '/images/project/undangan%20digital%20(1).png',
      '/images/project/undangan%20digital%20(2).png',
      '/images/project/undangan%20digital%20(3).png',
      '/images/project/undangan%20digital%20(4).png',
      '/images/project/undangan%20digital%20(5).png',
    ],
    summaryEn: 'An elegant, interactive Balinese Hindu wedding invitation for Sonyo & Dewi, featuring custom guest personalization, ceremony countdown, background audio player, interactive maps, and digital RSVP.',
    summaryId: 'Undangan pernikahan digital adat Bali (Pawiwahan) yang elegan dan interaktif untuk Sonyo & Dewi, dilengkapi personalisasi nama tamu, pemutar musik latar, hitung mundur acara, peta lokasi, dan buku tamu digital.',
    detailEn: 'Designed for the traditional Balinese Hindu wedding (Pawiwahan) of I Nyoman Kerta Wijaya (Sonyo) and Putu Dewi Yuliantari (Dewi), this web-based digital invitation replaces conventional paper cards with an immersive, multimedia experience tailored for mobile devices.\n\nGuests receive personalized invitation links that dynamically display their names on the welcome envelope. Upon clicking "Buka Undangan", smooth page animations unfold alongside traditional ambient background music with play/pause controls. The invitation includes formal Balinese Hindu greetings (Om Swastyastu), bride and groom family ancestry profiles, ceremony and reception schedule with an active countdown timer, Google Maps navigation to the venue, a romantic pre-wedding photo gallery, a digital angpao (cash gift) section with one-click bank account copying, and an interactive RSVP guestbook for blessings and attendance confirmations.',
    detailId: 'Dibuat khusus untuk upacara Pawiwahan (pernikahan adat Hindu Bali) antara I Nyoman Kerta Wijaya (Sonyo) dan Putu Dewi Yuliantari (Dewi), website undangan digital ini menghadirkan pengalaman interaktif kaya media yang menggantikan undangan fisik konvensional, dioptimalkan sempurna untuk layar ponsel.\n\nSetiap tamu menerima tautan personal dengan nama tamu yang tercetak otomatis di layar amplop utama. Saat tombol "Buka Undangan" ditekan, alunan musik latar tradisional mengalun dengan tombol kontrol putar/jeda yang fleksibel. Undangan ini memuat salam Om Swastyastu, profil silsilah keluarga kedua mempelai, jadwal prosesi Pawiwahan dan resepsi lengkap dengan hitung mundur waktu (countdown), navigasi rute Google Maps langsung ke lokasi acara, galeri foto pre-wedding, fitur amplop digital (transfer bank & QRIS sekali klik), serta formulir konfirmasi kehadiran (RSVP) dan ucapan doa restu tamu.',
    resultsEn: [
      'Personalized guest URL routing with animated opening cover ("Buka Undangan")',
      'Ceremony timeline & live countdown timer with calendar reminder integration',
      'Ambient background music player with persistent floating play/pause control',
      'Digital gift envelope with instant account number copy and interactive RSVP guestbook',
    ],
    resultsId: [
      'Personalisasi nama tamu otomatis dengan amplop animasi buka undangan',
      'Jadwal acara Pawiwahan & resepsi lengkap dengan hitung mundur real-time',
      'Pemutar audio musik latar dengan tombol kontrol mengambang yang responsif',
      'Amplop digital salin nomor rekening instan dan buku ucapan doa restu interaktif',
    ],
    liveUrl: 'https://nainvitation.my.id/sonyodandewi/',
  }),

  project({
    slug: 'receipt-generator',
    name: 'Cetak Struk Online — Thermal Receipt Generator',
    role: { en: 'Web Application Engineer', id: 'Web Application Engineer' },
    year: 2025,
    thumbnail: '/images/project/receipt%20generator1%20(1).png',
    gallery: [
      '/images/project/receipt%20generator1%20(1).png',
      '/images/project/receipt%20generator1%20(2).png',
      '/images/project/receipt%20generator1%20(3).png',
      '/images/project/receipt%20generator1%20(4).png',
      '/images/project/receipt%20generator1%20(5).png',
    ],
    summaryEn: 'A comprehensive web-based thermal receipt generator and editor for small businesses, featuring live 58mm/80mm thermal paper preview, customizable logos, dynamic item calculations, and direct Bluetooth ESC/POS printer support.',
    summaryId: 'Aplikasi web pembuat dan editor struk thermal untuk UMKM dan ritel, dilengkapi pratinjau langsung ukuran kertas 58mm/80mm, kustomisasi logo toko, perhitungan harga otomatis, dan koneksi printer Bluetooth thermal.',
    detailEn: 'Cetak Struk Online is a specialized web utility developed to help retail merchants, food stalls, and freelancers design, calculate, and print authentic point-of-sale thermal receipts directly from any browser without requiring expensive POS hardware.\n\nThe application features a clean two-panel interface: an intuitive input control panel on the left and a pixel-accurate thermal receipt simulation on the right. Users can configure store logos (image upload or styled typography), store headers (address, tax ID, phone number), cashier and customer metadata, invoice numbers, and transaction timestamps. The dynamic transaction table auto-calculates line items, quantities, subtotal, discounts, tax (PPN), payment methods (Cash, QRIS, Transfer), and exact change. Built-in layout tools allow instant switching between standard 58mm and 80mm thermal paper widths, monospaced thermal fonts (Courier Prime), dashed or double divider borders, barcode/QR code generation, and direct ESC/POS Bluetooth printing or high-resolution PNG/PDF export.',
    detailId: 'Cetak Struk Online adalah aplikasi utilitas web yang dirancang untuk membantu pemilik UMKM, kedai kopi, toko kelontong, dan bisnis jasa membuat dan mencetak struk kasir thermal berkualitas tinggi langsung dari browser tanpa perlu perangkat kasir mahal.\n\nAplikasi ini mengusung antarmuka dua panel yang ergonomis: form konfigurasi data di sisi kiri dan simulasi struk thermal akurat 1:1 di sisi kanan. Pengguna dapat menyesuaikan identitas toko (unggah logo atau teks khusus), alamat, nomor telepon, nama kasir, nama pelanggan, hingga nomor nota otomatis. Tabel item transaksi secara dinamis menghitung harga satuan, kuantitas, subtotal, diskon, PPN, metode pembayaran tunai/non-tunai, serta uang kembalian. Fitur unggulan mencakup pemilihan lebar kertas struk (58mm dan 80mm), pilihan tipografi font kasir (Courier Prime), garis pemisah struk ("===" / "---"), pembuatan QR code transaksi, serta koneksi cetak langsung ke printer Bluetooth thermal via Web Bluetooth ESC/POS atau ekspor gambar struk.',
    resultsEn: [
      'Live 1:1 thermal receipt preview with 58mm and 80mm paper size toggles',
      'Dynamic transaction calculation with subtotal, multi-tier discounts, tax, and change',
      'Custom store branding with image logo upload, custom headers, and footer notes',
      'Direct ESC/POS Bluetooth thermal printing and instant high-res receipt export',
    ],
    resultsId: [
      'Pratinjau struk thermal 1:1 real-time dengan pilihan ukuran kertas 58mm dan 80mm',
      'Kalkulasi transaksi otomatis untuk subtotal, diskon, PPN, dan kembalian pelanggan',
      'Kustomisasi identitas toko dengan unggah logo gambar, header alamat, dan catatan kaki',
      'Dukungan cetak printer thermal Bluetooth ESC/POS dan ekspor format gambar struk',
    ],
    liveUrl: 'https://receipt-generator-eight-indol.vercel.app/',
  }),

  project({
    slug: 'zeisa-spa-seminyak-bali',
    name: 'Zeisa Spa Seminyak Bali',
    location: 'Seminyak, Bali',
    role: { en: 'Web Developer & SEO Specialist', id: 'Web Developer & SEO Specialist' },
    year: 2025,
    thumbnail: '/images/project/spa1%20(1).png',
    gallery: [
      '/images/project/spa1%20(1).png',
      '/images/project/spa1%20(2).png',
      '/images/project/spa1%20(3).png',
      '/images/project/spa1%20(4).png',
      '/images/project/spa1%20(5).png',
    ],
    summaryEn: 'A serene, editorial spa website in Seminyak, Bali, presenting eleven massage rituals, a dedicated nail menu, and two curated multi-hour packages with transparent 60/90/120-minute pricing, a mobile spa option, and one-tap WhatsApp reservations.',
    summaryId: 'Website spa bernuansa tenang di Seminyak, Bali, yang menyajikan sebelas ritual pijat, menu kuku khusus, dan dua paket terkurasi berdurasi panjang dengan harga transparan 60/90/120 menit, opsi mobile spa, serta reservasi WhatsApp sekali klik.',
    detailEn: 'Zeisa Spa Seminyak is a wellness sanctuary in the heart of Seminyak, Bali, offering authentic Balinese healing therapies, holistic body scrubs, natural facial rejuvenation, nail care, and relaxing couple rituals.\n\nThe site is structured to move a visitor from curiosity to a reservation with very few steps. Treatments are organised into clear groups: eleven massage and body rituals (Balinese, Swedish, Hotstone, Couple, Massage and Scrub, Lomi Lomi, Foot, Deep Tissue, Facial, Traditional, plus aromatherapy add-ons such as coconut oil and aloe vera), a dedicated nail menu of gel and classic manicure-pedicure services, and two curated multi-hour packages—Package I (massage, body scrub, and body mask, two hours) and Package II (which adds a traditional facial, two and a half hours).\n\nEvery treatment is documented with a short explanation of its benefits and a transparent three-tier duration menu at 60, 90, and 120 minutes, so guests know the price before they enquire. A mobile spa option extends selected treatments to private villas, which matters for travellers staying in Seminyak and Canggu. Every booking button opens WhatsApp with the treatment name, duration, and rate already filled in, so the guest only confirms a time—removing the friction of a long enquiry form. The visual identity leans on warm earth tones, editorial serif headings, soft natural textures, and unhurried photography to convey calm before the first treatment is even booked. The site is fully responsive and optimised for local search so travellers looking for a spa in Seminyak can find it easily.',
    detailId: 'Zeisa Spa Seminyak adalah tempat peristirahatan dan perawatan tubuh di pusat Seminyak, Bali, yang menawarkan terapi pijat tradisional Bali, lulur tubuh alami, peremajaan wajah, perawatan kuku, serta ritual relaksasi untuk pasangan.\n\nStruktur situsnya dirancang untuk mengantar pengunjung dari rasa ingin tahu menuju reservasi dalam sedikit langkah. Perawatan dikelompokkan secara jelas: sebelas ritual pijat dan tubuh (Balinese, Swedish, Hotstone, Couple, Massage and Scrub, Lomi Lomi, Foot, Deep Tissue, Facial, Traditional, ditambah opsi aromaterapi seperti coconut oil dan aloe vera), menu kuku khusus berisi layanan manicure-pedicure gel dan klasik, serta dua paket terkurasi berdurasi panjang—Package I (pijat, body scrub, dan body mask, dua jam) dan Package II (menambahkan facial tradisional, dua setengah jam).\n\nSetiap perawatan dijelaskan manfaatnya secara singkat dan dilengkapi daftar harga tiga tingkat durasi yang transparan pada 60, 90, dan 120 menit, sehingga tamu mengetahui tarif sebelum bertanya. Opsi mobile spa memperluas perawatan tertentu ke vila privat, hal yang penting bagi wisatawan yang menginap di Seminyak dan Canggu. Setiap tombol pemesanan membuka WhatsApp dengan nama perawatan, durasi, dan tarif yang sudah terisi otomatis, sehingga tamu cukup mengonfirmasi waktu—menghilangkan hambatan formulir panjang. Identitas visualnya bertumpu pada warna tanah yang hangat, judul serif editorial, tekstur alami yang lembut, dan fotografi yang tidak terburu-buru untuk menghadirkan ketenangan sejak sebelum perawatan dipesan. Situs sepenuhnya responsif dan dioptimalkan untuk pencarian lokal agar wisatawan yang mencari spa di Seminyak mudah menemukannya.',
    resultsEn: [
      'Serene editorial design with warm earth tones tailored for wellness travellers in Seminyak',
      'Treatment catalogue grouped into massage rituals, a dedicated nail menu, and two curated multi-hour packages',
      'Transparent three-tier duration pricing (60/90/120 min) shown before the guest enquires',
      'Mobile spa option extending selected treatments to private villas and hotels',
      'One-tap WhatsApp booking that pre-fills treatment name, duration, and rate',
      'Responsive layout with local SEO for travellers searching for a Seminyak spa',
    ],
    resultsId: [
      'Desain editorial yang menenangkan dengan warna tanah hangat untuk wisatawan wellness di Seminyak',
      'Katalog perawatan terkelompok: ritual pijat, menu kuku khusus, dan dua paket terkurasi berdurasi panjang',
      'Harga transparan tiga tingkat durasi (60/90/120 menit) yang terlihat sebelum tamu bertanya',
      'Opsi mobile spa yang membawa perawatan pilihan ke vila dan hotel privat',
      'Pemesanan WhatsApp sekali klik dengan nama perawatan, durasi, dan tarif yang sudah terisi',
      'Tata letak responsif dengan SEO lokal bagi wisatawan yang mencari spa di Seminyak',
    ],
    liveUrl: 'https://zeisaspaseminyakbali.com/',
  }),

  project({
    slug: 'sari-rasa-qr-ordering',
    name: 'Sari Rasa — QR Food Ordering System',
    location: 'Bali',
    role: { en: 'Full-Stack Software Engineer', id: 'Full-Stack Software Engineer' },
    year: 2026,
    privateSystem: true,
    thumbnail: '/images/project/sarirasa%20(1).png',
    gallery: [
      '/images/project/sarirasa%20(1).png',
      '/images/project/sarirasa%20(2).png',
      '/images/project/sarirasa%20(3).png',
      '/images/project/sarirasa%20(4).png',
      '/images/project/sarirasa%20(5).png',
      '/images/project/sarirasa%20(6).png',
      '/images/project/sarirasa%20(7).png',
      '/images/project/sarirasa%20(8).png',
      '/images/project/sarirasa%20(9).png',
      '/images/project/sarirasa%20(10).png',
      '/images/project/sarirasa%20(11).png',
      '/images/project/sarirasa%20(12).png',
    ],
    summaryEn: 'A private QR-based ordering platform for Sari Rasa that lets dine-in customers order from their table, choose a payment method, and track order progress without waiting in line.',
    summaryId: 'Sistem pemesanan makanan berbasis QR privat untuk Sari Rasa yang memungkinkan pelanggan memesan dari meja, memilih metode pembayaran, dan memantau status pesanan tanpa perlu mengantre.',
    detailEn: 'Sari Rasa is a private digital ordering system designed to make dine-in service faster and more efficient. Each table has its own QR code. After scanning, customers enter their name and phone number, browse the menu, add items to their order, and submit it directly from their table. This self-service flow reduces queues at the cashier and gives customers more time to decide comfortably.\n\nThe platform supports flexible payment handling: customers can choose online payment or payment at the cashier by presenting the barcode generated for their order. After checkout, customers can monitor the order status through the system, from order received and being prepared to ready for pickup or completed. An admin dashboard supports the restaurant team with order monitoring, menu and table management, payment verification, and role-based access for different operational responsibilities. As a private system, the portfolio showcases the product experience and interface while keeping restaurant data and access protected.',
    detailId: 'Sari Rasa adalah sistem pemesanan digital privat yang dirancang untuk membuat layanan makan di tempat menjadi lebih cepat dan efisien. Setiap meja memiliki QR code masing-masing. Setelah melakukan pemindaian, pelanggan mengisi nama dan nomor telepon, melihat menu, menambahkan makanan ke pesanan, lalu mengirimkan pesanan langsung dari meja. Alur self-service ini mengurangi antrean di kasir dan memberi pelanggan waktu yang lebih nyaman untuk menentukan pilihan.\n\nSistem mendukung pilihan pembayaran yang fleksibel: pelanggan dapat membayar secara online atau memilih membayar di kasir dengan menunjukkan barcode pesanan yang dihasilkan sistem. Setelah checkout, pelanggan dapat memantau status pesanan mulai dari pesanan diterima, sedang diproses, hingga siap diambil atau selesai. Dashboard admin membantu tim restoran memantau pesanan, mengelola menu dan meja, memverifikasi pembayaran, serta mengatur akses berdasarkan peran operasional. Karena merupakan sistem privat, portofolio ini menampilkan pengalaman dan antarmukanya tanpa membuka data maupun akses sistem kepada publik.',
    resultsEn: [
      'Table-specific QR ordering flow with customer name and phone registration',
      'Dine-in menu browsing, cart management, and order submission from the customer device',
      'Online payment or cashier payment using a generated order barcode',
      'Real-time order status tracking and role-based admin dashboard for restaurant operations',
    ],
    resultsId: [
      'Alur pemesanan QR khusus setiap meja dengan registrasi nama dan nomor telepon pelanggan',
      'Menu dine-in, keranjang, dan pengiriman pesanan langsung dari perangkat pelanggan',
      'Pilihan pembayaran online atau kasir menggunakan barcode pesanan',
      'Pemantauan status pesanan dan dashboard admin berbasis role untuk operasional restoran',
    ],
  }),

  project({
    slug: 'warung-lestari-pos',
    name: 'Warung Lestari POS',
    location: 'Bali',
    role: { en: 'Full-Stack Software Engineer', id: 'Full-Stack Software Engineer' },
    year: 2026,
    privateSystem: true,
    thumbnail: '/images/project/warunglestari%20(2).png',
    gallery: [
      '/images/project/warunglestari%20(1).png',
      '/images/project/warunglestari%20(2).png',
      '/images/project/warunglestari%20(9).png',
      '/images/project/warunglestari%20(3).png',
      '/images/project/warunglestari%20(5).png',
      '/images/project/warunglestari%20(4).png',
      '/images/project/warunglestari%20(6).png',
      '/images/project/warunglestari%20(7).png',
      '/images/project/warunglestari%20(8).png',
    ],
    summaryEn: 'A private web-based POS system for food & beverage businesses, featuring multi-role access control, live cashier ordering, real-time inventory tracking, and daily cash reconciliation.',
    summaryId: 'Sistem POS privat berbasis web untuk bisnis kuliner dan toko makanan, dilengkapi manajemen hak akses bertingkat (RBAC), transaksi kasir cepat, pelacakan stok real-time, serta rekonsiliasi kas harian.',
    detailEn: 'Built specifically for Warung Lestari to modernize daily food-and-beverage operations, this private Point of Sale application unites cashier workflows, inventory monitoring, and business analytics into a centralized platform. The system implements granular Role-Based Access Control (RBAC), separating privileges between Super Admin (unrestricted access to dashboard metrics, stock audits, expense logging, daily closing, and role permissions) and Cashier (an intuitive, fast-paced ordering interface with customizable permissions). Key operational features include quick touchscreen-friendly order creation with custom item notes, automated stock deductions tied directly to sales invoices, menu catalog management with purchase cost (HPP) and profit margin analysis, comprehensive transaction history with receipt printing and PDF/Excel exports, automated stock movement audit logs, interactive financial revenue analytics, and end-of-day cash reconciliation (Daily Closing) to match physical drawer cash against system records. As a dedicated internal business platform, this showcase highlights the software architecture, user experience, and features while safeguarding internal business data.',
    detailId: 'Dibuat khusus untuk Warung Lestari guna memodernisasi operasional bisnis makanan dan minuman sehari-hari, aplikasi Point of Sale (POS) privat ini menyatukan alur transaksi kasir, pemantauan inventaris, dan analitik bisnis ke dalam satu platform terpusat. Sistem ini mengimplementasikan Manajemen Hak Akses Berbasis Peran (RBAC) yang memisahkan wewenang secara aman antara Super Admin (akses menyeluruh ke metrik dashboard, audit stok, pencatatan pengeluaran, daily closing, dan konfigurasi izin) serta Kasir (layar pemesanan cepat yang mudah digunakan dengan batasan akses fleksibel). Fitur-fitur unggulannya mencakup pembuatan pesanan cepat dengan catatan khusus menu dan kalkulasi otomatis, pemotongan stok otomatis yang terhubung ke nomor invoice, manajemen katalog produk dengan analisis harga beli (HPP) dan margin keuntungan, riwayat transaksi lengkap dengan cetak struk serta ekspor laporan PDF/Excel, audit log mutasi stok masuk-keluar, analitik pendapatan dan omzet interaktif, hingga rekonsiliasi penutupan kas harian (Daily Closing) untuk mencocokkan uang kas fisik dengan catatan sistem. Sebagai sistem internal bisnis, portofolio ini menampilkan antarmuka dan kemampuan teknisnya tanpa membuka akses publik.',
    resultsEn: [
      'Role-based access control (Super Admin & Cashier)',
      'Fast cashier checkout with order notes & auto stock deduction',
      'End-of-day cash reconciliation (Daily Closing) to prevent drawer discrepancies',
      'Live stock movement audit log & financial analytics with PDF/Excel reports',
    ],
    resultsId: [
      'Manajemen hak akses berbasis peran (Super Admin & Kasir)',
      'Layar kasir transaksi cepat dengan catatan menu & potong stok otomatis',
      'Rekonsiliasi kas penutupan harian (Daily Closing) untuk mencegah selisih uang fisik',
      'Audit log mutasi stok real-time & analitik omzet dengan ekspor laporan PDF/Excel',
    ],
  }),

  project({
    slug: 'big-tree-jewelry-classes-pos',
    name: 'Big Tree Jewelry Classes POS',
    location: 'Ubud, Bali',
    role: { en: 'Full-Stack Software Engineer', id: 'Full-Stack Software Engineer' },
    year: 2025,
    privateSystem: true,
    thumbnail: '/images/project/posbigtree%20(2).png',
    gallery: [
      '/images/project/posbigtree%20(1).png',
      '/images/project/posbigtree%20(2).png',
      '/images/project/posbigtree%20(3).png',
      '/images/project/posbigtree%20(4).png',
      '/images/project/posbigtree%20(5).png',
      '/images/project/posbigtree%20(6).png',
      '/images/project/posbigtree%20(7).png',
      '/images/project/posbigtree%20(8).png',
      '/images/project/posbigtree%20(9).png',
      '/images/project/posbigtree%20(10).png',
    ],
    summaryEn: 'A private, multi-branch POS for Big Tree Jewelry Classes, bringing branch sales, class transactions, silver inventory, staff operations, and business reports into one role-managed system.',
    summaryId: 'Sistem POS privat multi-cabang untuk Big Tree Jewelry Classes yang menyatukan penjualan cabang, transaksi kelas, inventaris perak, operasional staf, dan laporan bisnis dalam satu sistem dengan akses berbasis peran.',
    detailEn: 'Built to support Big Tree Jewelry Classes across six branches—Big Tree, Lumbung, Signature, Padi, Alam Ubud, and The Legend—this private system brings key store operations into one POS. The dashboard gives an at-a-glance view of branch sales, transactions, users, and silver stock. Staff can process jewelry-class purchases with participant counts, add-ons, payment details, and online-platform bookings, while managers can review revenue by channel, transactions, daily cash closing and reconciliation, silver inventory and usage, silversmith activity, payroll, and operating expenses. User management shows SUPER_ADMIN and KASIR roles, with access organized around each role’s responsibilities. The ten screenshots in this gallery show the system’s login, multi-branch overview, operational dashboards, reports, and checkout flow. This is a private system, so the portfolio showcases its interface without offering public access.',
    detailId: 'Sistem privat ini dibuat untuk mendukung operasional Big Tree Jewelry Classes di enam cabang—Big Tree, Lumbung, Signature, Padi, Alam Ubud, dan The Legend—dengan berbagai aktivitas toko yang terintegrasi dalam satu POS. Dashboard menyajikan ringkasan penjualan dan transaksi cabang, jumlah pengguna, serta stok perak. Staf dapat memproses pembelian kelas perhiasan dengan mengatur jumlah peserta, add-on, detail pembayaran, dan booking dari platform online. Pengelola dapat meninjau pendapatan berdasarkan kanal, transaksi, closing dan rekonsiliasi kas harian, inventaris serta pemakaian perak, aktivitas silversmith, payroll, dan pengeluaran operasional. Pengelolaan pengguna menampilkan peran SUPER_ADMIN dan KASIR, dengan akses yang disesuaikan terhadap tanggung jawab masing-masing. Sepuluh gambar di galeri memperlihatkan login, ringkasan multi-cabang, dashboard operasional, laporan, dan alur transaksi. Sistem ini bersifat privat, sehingga portofolio menampilkan antarmukanya tanpa menyediakan akses publik.',
    resultsEn: [
      'Unified POS overview for six branches',
      'Class checkout with participant, add-on, payment, and booking details',
      'Role-managed access for SUPER_ADMIN and KASIR',
      'Silver stock, revenue, cash closing, payroll, and expense reports',
    ],
    resultsId: [
      'Ringkasan POS terintegrasi untuk enam cabang',
      'Transaksi kelas dengan detail peserta, add-on, pembayaran, dan booking',
      'Akses berbasis peran SUPER_ADMIN dan KASIR',
      'Laporan stok perak, pendapatan, closing kas, payroll, dan pengeluaran',
    ],
    liveUrl: 'https://pos.bigtreejewelryclasses.com/',
  }),

  project({
    slug: 'absensi-online-qr-code',
    name: 'Absensi Online QR Code',
    role: { en: 'Frontend Web Developer', id: 'Frontend Web Developer' },
    year: 2025,
    thumbnail: '/images/project/absensi.png',
    video: '/videos/absensi-online.mp4',
    summaryEn: 'An attendance web app that records check-ins through dynamic QR scanning and brings attendance records into an administrative review dashboard.',
    summaryId: 'Aplikasi web absensi yang mencatat kehadiran melalui pemindaian QR interaktif dan menyajikan data kehadiran dalam dashboard admin untuk ditinjau.',
    detailEn: 'The application combines a high-speed QR-based check-in flow with an administrative dashboard for monitoring employee or student attendance records. The camera scanner provides rapid QR code detection on mobile devices and laptops, ensuring seamless check-in and check-out logs with automated timestamps. Administrators can inspect attendance timelines, filter records by department or date range, and export attendance logs for payroll and auditing.',
    detailId: 'Aplikasi ini menggabungkan alur pencatatan kehadiran menggunakan pemindai QR berbasis kamera dengan dashboard administratif untuk memantau data absensi karyawan atau peserta didik. Pemindai kamera mendeteksi kode QR unik secara cepat dan akurat di ponsel maupun laptop, mencatat waktu masuk dan pulang secara otomatis. Pengelola dapat memeriksa linimasa kehadiran harian, menyaring data berdasarkan tanggal atau divisi, serta mengekspor rekap absensi untuk kebutuhan payroll dan evaluasi.',
    resultsEn: [
      'Instant camera-based QR attendance scanning for check-in & check-out',
      'Real-time admin dashboard with live attendance records and statistics',
      'Automated timestamping and audit trails for accurate time tracking',
      'Data filtering and exportable reports for streamlined administrative workflows',
    ],
    resultsId: [
      'Pemindaian absensi cepat berbasis kamera QR untuk jam masuk & pulang',
      'Dashboard admin real-time dengan log data dan statistik kehadiran harian',
      'Pencatatan waktu otomatis yang akurat untuk pelacakan jam kerja',
      'Penyaringan data dan ekspor laporan terstruktur untuk mempermudah evaluasi',
    ],
  }),

  project({
    slug: 'meru-jewelry-classes',
    name: 'Meru Jewelry Classes Bali',
    location: 'Canggu, Bali',
    role: { en: 'Frontend & Web Developer', id: 'Frontend & Web Developer' },
    year: 2024,
    thumbnail: '/images/project/meru%201%20(1).png',
    gallery: [
      '/images/project/meru%201%20(1).png',
      '/images/project/meru1%20(2).png',
      '/images/project/meru1%20(3).png',
      '/images/project/meru1%20(4).png',
      '/images/project/meru1%20(5).png',
      '/images/project/meru1%20(6).png',
    ],
    summaryEn: 'A premier artisan jewelry workshop platform in Canggu, Bali, featuring an interactive 8-branch studio locator map, a 4-step silversmithing craft guide, tiered course packages, and an instant dual-channel reservation system.',
    summaryId: 'Website resmi studio kerajinan perhiasan perak di Canggu, Bali, dilengkapi peta interaktif 8 cabang studio, panduan visual 4 tahap menenun perak, katalog paket berjenjang, dan alur reservasi terintegrasi.',
    detailEn: 'Meru Jewelry Classes is a leading silversmithing studio and cultural craft workshop located on Jl. Pantai Batu Bolong in Canggu, Bali. The studio offers hands-on jewelry-making sessions where international travelers, couples, and creative enthusiasts craft bespoke silver and brass rings, pendants, and other pieces under the guidance of Balinese master silversmiths.\n\nThe website was architected to deliver a high-converting digital presence tailored for international visitors:\n• Tiered Workshop Packages: Clearly outlines course durations, silver/brass allowances, and transparent IDR pricing—including Intro to Silversmithing (IDR 625K / 1–2 hrs / 1–6g silver, one piece to take home), Brass with Gold Plating (IDR 495K / 1–10g brass plus gold plating), the Couples Silversmithing Class for two (IDR 1.250K / 1–2 hrs, one piece each), the Full Day Silversmithing class (IDR 1.800K / 3–5 hrs / 1–15g silver, up to two designs), a Family Package for four (IDR 2.500K) and a Big Group Package for up to ten people (IDR 625K/person), with optional 24K gold plating (IDR 250K) and gemstone setting (IDR 200K–300K) add-ons.\n• 4-Step Craft Visualizer: Illustrates the authentic hands-on silversmithing journey (Design & Sketch → Shape & Saw → Solder & Assemble → Polish & Buff), giving first-time participants total confidence.\n• Interactive 8-Branch Bali Studio Map: Interactive directory showcasing Meru\'s 8 studio locations across Canggu, Seminyak, Ubud, Sanur, and Uluwatu, complete with addresses, operating hours, and one-tap Google Maps directions.\n• Dual-Channel Booking System: Facilitates frictionless reservations via an interactive online date/slot picker form, paired with automated WhatsApp URL routing pre-populated with package selection and group size.',
    detailId: 'Meru Jewelry Classes adalah studio kerajinan perhiasan perak terkemuka yang berlokasi di Jl. Pantai Batu Bolong, Canggu, Bali. Studio ini menghadirkan pengalaman belajar menempa perhiasan tangan (silversmithing) otentik, di mana para wisatawan mancanegara dan pasangan dapat merancang serta membawa pulang cincin, liontin, atau perhiasan perak dan kuningan buatan sendiri didampingi pengrajin perak master Bali.\n\nPlatform web ini dirancang khusus untuk memenuhi standar wisatawan internasional dengan arsitektur informasi yang terstruktur rapi:\n• Katalog Paket Kursus Berjenjang: Menyajikan informasi transparan mengenai durasi, jatah perak/kuningan, dan tarif kelas—mulai dari Intro to Silversmithing (IDR 625K / 1–2 jam / 1–6 gram perak, satu karya untuk dibawa pulang), Brass with Gold Plating (IDR 495K / 1–10 gram kuningan + sepuh emas), Kelas Couples untuk berdua (IDR 1.250K / 1–2 jam, satu karya per orang), kelas Full Day Silversmithing (IDR 1.800K / 3–5 jam / 1–15 gram perak, hingga dua desain), Family Package untuk empat orang (IDR 2.500K), serta Big Group Package hingga sepuluh orang (IDR 625K/orang), dengan add-on opsional sepuh emas 24K (IDR 250K) dan pemasangan batu permata (IDR 200K–300K).\n• Visualisasi 4 Tahap Pembuatan (Craft Process): Menampilkan alur belajar interaktif (Design & Sketch → Shape & Form → Solder & Join → Polish & Shine) yang memberikan gambaran jelas bagi pemula.\n• Peta Interaktif 8 Cabang Studio di Bali: Direktori studio yang memetakan 8 lokasi workshop Meru di Canggu, Seminyak, Ubud, Sanur, hingga Uluwatu lengkap dengan jam buka dan tautan rute Google Maps langsung.\n• Sistem Reservasi Jalur Ganda (Dual-Channel): Menggabungkan formulir pemesanan online untuk memilih jadwal dan tanggal kelas, dengan tombol WhatsApp instan berformat pesan otomatis sesuai paket yang dipilih.',
    resultsEn: [
      'Interactive 8-branch studio map locator across Canggu, Seminyak, Ubud, Sanur, & Uluwatu',
      'Transparent course tiers (Intro IDR 625K, Brass IDR 495K, Couples IDR 1.250K, Full Day IDR 1.800K, Family IDR 2.500K, Group IDR 625K/pax)',
      'Educational 4-step craft visualizer detailing Design, Shape, Solder, and Polish workflows',
      'Dual-channel booking engine supporting online reservation form and direct WhatsApp URL generator',
      'Verified "Excellent" rating from 34 TripAdvisor guest reviews for international travelers',
      'Optimized mobile-first responsiveness and localized schema markup for Bali tourist SEO',
    ],
    resultsId: [
      'Peta interaktif direktori 8 cabang studio di Canggu, Seminyak, Ubud, Sanur, dan Uluwatu',
      'Katalog tarif kelas transparan (Intro IDR 625K, Brass IDR 495K, Couples IDR 1.250K, Masterclass IDR 1.800K)',
      'Panduan visual 4 tahap pembuatan perhiasan: Mendesain, Membentuk, Menyolder, dan Mengilapkan',
      'Sistem pemesanan jalur ganda dengan formulir jadwal online dan generator pesan WhatsApp otomatis',
      'Integrasi ulasan bintang 5 TripAdvisor & Google Reviews untuk membangun kepercayaan turis global',
      'Desain mobile-first super responsif dan optimasi SEO lokal untuk kata kunci kursus perak Bali',
    ],
    liveUrl: 'https://merujewelryclasses.com/',
  }),

  project({
    slug: 'bali-charming-tours',
    name: 'Bali Charming Tours',
    location: 'Denpasar, Bali',
    role: { en: 'Full-Stack Web Developer', id: 'Full-Stack Web Developer' },
    year: 2024,
    thumbnail: '/images/project/balicharming%20(1).png',
    gallery: [
      '/images/project/balicharming%20(1).png',
      '/images/project/balicharming%20(2).png',
      '/images/project/balicharming%20(3).png',
      '/images/project/balicharming%20(4).png',
      '/images/project/balicharming%20(5).png',
      '/images/project/balicharming%20(6).png',
      '/images/project/balicharming%20(7).png',
      '/images/project/balicharming%20(8).png',
      '/images/project/balicharming%20(9).png',
    ],
    summaryEn: 'A full-scale private Bali tour portal for Bali Charming Tours, running an end-to-end 6-step online booking funnel (Product List → Details → Cart → Booking Details → Payment → Finish), 21-currency support, and rich itineraries for Full Day, Activities, and Nusa Penida tours.',
    summaryId: 'Portal tour privat Bali untuk Bali Charming Tours dengan alur pemesanan online 6 tahap (Product List → Detail → Keranjang → Booking Details → Payment → Finish), dukungan 21 mata uang, dan itinerary rinci untuk tour Full Day, Activities, dan Nusa Penida.',
    detailEn: 'Bali Charming Tours is a private Bali tour operator offering curated Full Day tours, activities, Nusa Penida crossings, and private car charters. Rather than a simple brochure, the site is engineered as a complete self-service booking platform.\n\nReservations run through an integrated booking engine with a clear six-step funnel—Product List → Product Details → Shopping Cart → Booking Details → Payment → Finish—so guests can browse packages, pick a date, review inclusions, enter traveller details, and pay online in one flow. Payment options include Visa, Mastercard, and PayPal, and prices are shown in 21 currencies (IDR plus 20 international currencies), making checkout comfortable for foreign travellers.\n\nEvery tour page is information-dense: a top highlight, a "Highlight & Experience" summary, a day-by-day Itinerary, Notes, clear Inclusion and Exclusion lists, a "Pick Up Area & Time" section, a "What To Bring" checklist, and Important Information, alongside badges for Private Tour, Hotel Pickup, Minimum 2 Persons, and Price per Pax. The catalogue spans Nusa Penida tours (such as the Nusa Penida Mix Trip East & West, West Coast Highlights, and the West & Manta snorkeling combination), Bali Activities (ATV rafting & swing combos, Ubud cycling, river tubing, Mount Batur 4WD jeep sunrise, Blue Lagoon snorkeling), Bali Full Day cultural tours (Kintamani Volcano, Ubud rice terrace & swing, Bedugul & Tanah Lot, Gate of Heaven East Bali), and a private car charter with driver. Trust pillars—trusted experts, private comfort, custom itineraries, and local insight—run throughout, with a WhatsApp line (+62 851-9099-8775) available for quick questions.',
    detailId: 'Bali Charming Tours adalah operator tour privat Bali yang menawarkan tour Full Day, aktivitas, penyeberangan Nusa Penida, dan sewa mobil privat. Alih-alih sekadar brosur, situs ini dirancang sebagai platform pemesanan mandiri yang lengkap.\n\nReservasi berjalan melalui mesin pemesanan terintegrasi dengan alur enam tahap yang jelas—Product List → Product Details → Shopping Cart → Booking Details → Payment → Finish—sehingga tamu dapat menelusuri paket, memilih tanggal, meninjau fasilitas, mengisi data wisatawan, dan membayar online dalam satu alur. Opsi pembayaran mencakup Visa, Mastercard, dan PayPal, dan harga ditampilkan dalam 21 mata uang (IDR plus 20 mata uang internasional), membuat checkout nyaman bagi wisatawan mancanegara.\n\nHalaman setiap tour sangat informatif: highlight utama, ringkasan "Highlight & Experience", Itinerary harian, Notes, daftar Inclusion dan Exclusion yang jelas, bagian "Pick Up Area & Time", ceklis "What To Bring", serta Important Information—dilengkapi badge Private Tour, Hotel Pickup, Minimal 2 Orang, dan Harga per Pax. Katalognya meliputi tour Nusa Penida (seperti Nusa Penida Mix Trip East & West, West Coast Highlights, dan kombinasi West & Manta snorkeling), Bali Activities (ATV rafting & swing combo, Ubud cycling, river tubing, Mount Batur 4WD jeep sunrise, Blue Lagoon snorkeling), tour budaya Full Day (Kintamani Volcano, Ubud rice terrace & swing, Bedugul & Tanah Lot, Gate of Heaven East Bali), hingga private car charter dengan supir. Pilar kepercayaan—tim ahli, kenyamanan privat, itinerary kustom, dan wawasan lokal—ditonjolkan di seluruh situs, dengan jalur WhatsApp (+62 851-9099-8775) untuk pertanyaan cepat.',
    resultsEn: [
      'Complete 6-step online booking funnel (Product List → Details → Cart → Booking Details → Payment → Finish)',
      'Online payment via Visa, Mastercard, and PayPal with prices in 21 currencies (IDR + 20 international)',
      'Rich tour pages with Itinerary, Inclusion/Exclusion, Pick Up Area & Time, and a What To Bring checklist',
      'Full Day, Activities, Nusa Penida, and Private Car Charter catalogue with clear per-pax pricing',
      'Badges and trust pillars: Private Tour, Hotel Pickup, Minimum 2 Persons, and local insight',
      'Direct WhatsApp support line plus detailed guest testimonials for social proof',
    ],
    resultsId: [
      'Alur pemesanan online 6 tahap lengkap (Product List → Detail → Keranjang → Booking Details → Payment → Finish)',
      'Pembayaran online via Visa, Mastercard, dan PayPal dengan harga dalam 21 mata uang (IDR + 20 internasional)',
      'Halaman tour informatif dengan Itinerary, Inclusion/Exclusion, Pick Up Area & Time, dan ceklis What To Bring',
      'Katalog Full Day, Activities, Nusa Penida, dan Private Car Charter dengan harga per pax yang jelas',
      'Badge dan pilar kepercayaan: Private Tour, Hotel Pickup, Minimal 2 Orang, dan wawasan lokal',
      'Jalur dukungan WhatsApp langsung serta testimoni tamu untuk bukti sosial',
    ],
    liveUrl: 'https://balicharmingtours.com/',
  }),

  project({
    slug: 'bali-bruce-tours',
    name: 'Bali Bruce Tours',
    location: 'Denpasar, Bali',
    role: { en: 'Frontend & E-Commerce Developer', id: 'Frontend & E-Commerce Developer' },
    year: 2024,
    thumbnail: '/images/project/balibrucetour%20(1).png',
    gallery: [
      '/images/project/balibrucetour%20(1).png',
      '/images/project/balibrucetour%20(2).png',
      '/images/project/balibrucetour%20(3).png',
      '/images/project/balibrucetour%20(4).png',
      '/images/project/balibrucetour%20(5).png',
      '/images/project/balibrucetour%20(6).png',
    ],
    summaryEn: 'A private Bali and overland tour platform for Bali Bruce Tours, offering day tours, Nusa Penida, Mount Batur jeep and trekking, and Komodo/Wae Rebo/Kelimutu expeditions through an integrated 6-step online booking engine with Visa, Mastercard, and PayPal payment.',
    summaryId: 'Platform tour privat Bali dan overland untuk Bali Bruce Tours yang menawarkan day tour, Nusa Penida, Mount Batur jeep & trekking, hingga ekspedisi Komodo/Wae Rebo/Kelimutu melalui mesin pemesanan online 6 tahap dengan pembayaran Visa, Mastercard, dan PayPal.',
    detailEn: 'Bali Bruce Tours specialises in private Bali experiences and extended overland trips across Indonesia—Nusa Penida, Labuan Bajo & Komodo, Wae Rebo, Kelimutu, plus Mount Batur and a Bali–Gili fast boat service. The site is built around transparency and self-service booking.\n\nLike a full tour operator, it runs an integrated 6-step reservation engine (Product List → Product Details → Shopping Cart → Booking Details → Payment → Finish) with online payment via Visa, Mastercard, and PayPal. Each detail page lays out the Top Highlight, Itinerary, Notes, Inclusion, Exclusion, Pick Up Time & Area, What To Bring, and Important Information, with badges for Private Car, Hotel Pickup, Minimum 2 Persons, and Price. The catalogue covers Bali Full Day tours (Ubud Cultural & Nature, UNESCO World Heritage & Sunset, Gate of Heaven & East Bali, North & Central Bali, South Bali Cultural Sunset), Bali Activities (Ayung and Telaga Waja rafting, Ubud ATV, Mount Batur sunrise jeep and summit trekking, Lovina dolphin watching, horse riding, Benoa watersport), Nusa Penida day tours, express fast boat tickets to Gili Trawangan, and multi-day Labuan Bajo/Komodo cruise packages.\n\nA "Here Are 5 Reasons" section summarises why guests choose Bali Bruce Tours—professional local drivers and guides, a private clean fleet, flexible itineraries, transparent pricing with no hidden fees, and hassle-free all-in packages—while guest testimonials and a gallery build social proof. The site also requires guests to carry valid personal travel insurance before joining any tour. A WhatsApp line (+62 812-3715-5240) handles custom itinerary requests, and the site offers a multi-language switcher (English, German, French, Dutch, Japanese, Chinese, Arabic, and more).',
    detailId: 'Bali Bruce Tours mengkhususkan diri pada pengalaman privat di Bali serta perjalanan overland ke destinasi ikonik Indonesia—Nusa Penida, Labuan Bajo & Komodo, Wae Rebo, Kelimutu, plus Mount Batur dan layanan fast boat Bali–Gili. Situs ini dibangun dengan fokus transparansi dan pemesanan mandiri.\n\nSeperti tour operator lengkap, situs ini menjalankan mesin reservasi terintegrasi 6 tahap (Product List → Product Details → Shopping Cart → Booking Details → Payment → Finish) dengan pembayaran online via Visa, Mastercard, dan PayPal. Setiap halaman detail memuat Top Highlight, Itinerary, Notes, Inclusion, Exclusion, Pick Up Time & Area, What To Bring, dan Important Information, dengan badge Private Car, Hotel Pickup, Minimal 2 Orang, dan Harga. Katalognya mencakup tour Bali Full Day (Ubud Cultural & Nature, UNESCO World Heritage & Sunset, Gate of Heaven & East Bali, North & Central Bali, South Bali Cultural Sunset), Bali Activities (rafting Ayung & Telaga Waja, ATV Ubud, Mount Batur sunrise jeep & summit trekking, Lovina dolphin watching, horse riding, Benoa watersport), day tour Nusa Penida, tiket express fast boat ke Gili Trawangan, hingga paket cruise Labuan Bajo/Komodo multi-hari.\n\nBagian "Here Are 5 Reasons" merangkum alasan tamu memilih Bali Bruce Tours—supir dan pemandu lokal profesional, armada privat yang bersih, itinerary fleksibel, harga transparan tanpa biaya tersembunyi, dan paket all-in yang praktis—dilengkapi testimoni tamu dan galeri sebagai bukti sosial. Situs ini juga mewajibkan tamu membawa asuransi perjalanan pribadi yang valid sebelum mengikuti tour. Jalur WhatsApp (+62 812-3715-5240) menangani permintaan itinerary kustom, dan situsnya menyediakan pemilih multi-bahasa (Inggris, Jerman, Prancis, Belanda, Jepang, Mandarin, Arab, dan lainnya).',
    resultsEn: [
      'Integrated 6-step booking engine (Product List → Details → Cart → Booking Details → Payment → Finish)',
      'Online payment via Visa, Mastercard, and PayPal',
      'Rich detail pages: Itinerary, Inclusion/Exclusion, Pick Up Time & Area, What To Bring, Important Information',
      'Catalog spanning Full Day, Activities, Nusa Penida, Mount Batur jeep/trekking, and Komodo/Wae Rebo/Kelimutu expeditions',
      'Bali–Gili Trawangan fast boat tickets and multi-day overland cruise packages',
      '5-pillar trust section, guest testimonials, and a multi-language site switcher',
    ],
    resultsId: [
      'Mesin pemesanan online 6 tahap terintegrasi (Product List → Detail → Keranjang → Booking Details → Payment → Finish)',
      'Pembayaran online via Visa, Mastercard, dan PayPal',
      'Halaman detail informatif: Itinerary, Inclusion/Exclusion, Pick Up Time & Area, What To Bring, Important Information',
      'Katalog Full Day, Activities, Nusa Penida, Mount Batur jeep/trekking, hingga ekspedisi Komodo/Wae Rebo/Kelimutu',
      'Tiket fast boat Bali–Gili Trawangan dan paket cruise overland multi-hari',
      'Bagian kepercayaan 5 pilar, testimoni tamu, dan pemilih multi-bahasa',
    ],
    liveUrl: 'https://balibrucetours.com/',
  }),

  project({
    slug: 'kakluna-bali-trans',
    name: 'Kakluna Bali Trans',
    location: 'Denpasar, Bali',
    role: { en: 'Frontend & Web Developer', id: 'Frontend & Web Developer' },
    year: 2024,
    thumbnail: '/images/project/kakluna%20(1).png',
    gallery: [
      '/images/project/kakluna%20(1).png',
      '/images/project/kakluna%20(2).png',
      '/images/project/kakluna%20(3).png',
      '/images/project/kakluna%20(4).png',
      '/images/project/kakluna%20(5).png',
      '/images/project/kakluna%20(6).png',
    ],
    summaryEn: 'An island transport and Ngurah Rai Airport transfer website for Kak Luna Bali Trans, organising airport pickups into three colour-coded coverage zones, a transparent per-car fleet rate list (Avanza to Alphard, HiAce, Elf), and a full catalogue of Full Day, Activities, and Nusa Penida tours—backed by 204 guest reviews.',
    summaryId: 'Website transportasi pulau dan antar-jemput Bandara Ngurah Rai milik Kak Luna Bali Trans, dengan pembagian zona jemput bandara berkode warna, daftar tarif armada per mobil yang transparan (Avanza hingga Alphard, HiAce, Elf), serta katalog lengkap tour Full Day, Activities, dan Nusa Penida—didukung 204 ulasan tamu.',
    detailEn: 'Kak Luna Bali Trans is a local Bali transport and tour operator built around three services: airport transfers, full-day sightseeing, and activity and island tours. It positions itself as "crafted by locals", with authentic insights, customised trips, dedicated care, and island expertise.\n\nAirport transfers are organised into three clearly explained, colour-coded coverage zones—Zone 1 (Green) for accommodation closest to Ngurah Rai airport with the quickest transfer times, Zone 2 (Blue) for mid-range destinations further out, and Zone 3 (Orange) for the island\'s furthest, most remote escapes—so travellers immediately understand which fixed rate applies to them.\n\nThe fleet is presented with transparent per-car starting prices and passenger capacity: Toyota Avanza (5 pax, IDR 650K), Toyota Reborn (6 pax, IDR 950K), Toyota Fortuner (6 pax, IDR 1.200K), Toyota Hiace (up to 14 pax, IDR 1.300K), the luxury Toyota Alphard (6 pax, IDR 3.000K), and the Isuzu Elf Short (12–13 pax). Each charter runs up to 10 hours with unlimited fuel and mileage, no deposit, and cash payment when meeting the driver.\n\nBeyond transfers, the site catalogues Full Day, Activities, and Nusa Penida tours with published starting prices—such as the Bali Bedugul & Tanah Lot Sunset Tour, Kintamani Volcano & Cultural Heritage Tour, South Bali Cultural & Coastal Wonders Tour, Ubud Countryside Cycling Tour, the ATV Quad Bike and combo tours, Benoa Watersport, River Tubing, and the Nusa Penida East/West and Manta snorkeling combinations. Trust is reinforced through a "5.0 Excellent" rating based on 204 guest reviews, punctual airport pick-ups, professional local drivers, a private clean fleet, flexible itineraries, and transparent pricing with no hidden fees. A dedicated WhatsApp line keeps the booking process to a single conversation.',
    detailId: 'Kak Luna Bali Trans adalah operator transportasi dan tour lokal Bali yang dibangun di atas tiga layanan: antar-jemput bandara, tour full day, serta tour aktivitas dan antar pulau. Brand ini memposisikan diri sebagai "crafted by locals", dengan wawasan otentik, perjalanan yang bisa dikustomisasi, pelayanan penuh, dan keahlian tentang pulau.\n\nAntar-jemput bandara dibagi ke dalam tiga zona cakupan berkode warna yang dijelaskan gamblang—Zone 1 (Green) untuk akomodasi terdekat dengan Bandara Ngurah Rai dengan waktu tempuh tercepat, Zone 2 (Blue) untuk destinasi jarak menengah, dan Zone 3 (Orange) untuk wilayah paling jauh dan terpencil—sehingga wisatawan langsung paham tarif tetap mana yang berlaku untuk mereka.\n\nDaftar armadanya disajikan dengan harga mulai per mobil dan kapasitas penumpang yang transparan: Toyota Avanza (5 penumpang, IDR 650K), Toyota Reborn (6, IDR 950K), Toyota Fortuner (6, IDR 1.200K), Toyota Hiace (hingga 14, IDR 1.300K), Toyota Alphard mewah (6, IDR 3.000K), dan Isuzu Elf Short (12–13). Setiap sewa mencakup hingga 10 jam tanpa batas jarak dan bahan bakar, tanpa deposit, dan pembayaran tunai saat bertemu supir.\n\nSelain transfer, situs ini mengatalogkan tour Full Day, Activities, dan Nusa Penida dengan harga mulai yang tercantum—seperti Bali Bedugul & Tanah Lot Sunset Tour, Kintamani Volcano & Cultural Heritage Tour, South Bali Cultural & Coastal Wonders Tour, Ubud Countryside Cycling Tour, paket ATV Quad Bike dan kombinasinya, Benoa Watersport, River Tubing, hingga kombinasi Nusa Penida East/West dan Manta snorkeling. Kepercayaan diperkuat rating "5.0 Excellent" berdasarkan 204 ulasan tamu, penjemputan bandara tepat waktu, supir lokal profesional, armada privat yang bersih, itinerary fleksibel, dan harga transparan tanpa biaya tersembunyi. Satu jalur WhatsApp khusus membuat proses pemesanan cukup dalam satu percakapan.',
    resultsEn: [
      'Three colour-coded airport coverage zones (Zone 1 Green, Zone 2 Blue, Zone 3 Orange) with clear fixed rates',
      'Transparent per-car fleet pricing: Avanza, Reborn, Fortuner, Hiace, Alphard, and Elf with passenger capacity',
      'Full catalogue of Full Day, Activities, and Nusa Penida tours with published starting prices',
      '10-hour charter with unlimited fuel and mileage, no deposit, and cash payment on arrival',
      '5.0 "Excellent" rating backed by 204 verified guest reviews',
      'One-tap WhatsApp booking and consultation for personalised itineraries',
    ],
    resultsId: [
      'Tiga zona cakupan bandara berkode warna (Zone 1 Green, Zone 2 Blue, Zone 3 Orange) dengan tarif tetap yang jelas',
      'Tarif armada per mobil transparan: Avanza, Reborn, Fortuner, Hiace, Alphard, dan Elf lengkap kapasitas penumpang',
      'Katalog lengkap tour Full Day, Activities, dan Nusa Penida dengan harga mulai yang tercantum',
      'Sewa 10 jam tanpa batas jarak & bahan bakar, tanpa deposit, bayar tunai saat tiba',
      'Rating 5.0 "Excellent" berdasarkan 204 ulasan tamu terverifikasi',
      'Pemesanan dan konsultasi sekali klik via WhatsApp untuk itinerary yang dipersonalisasi',
    ],
    liveUrl: 'https://kaklunabalitrans.com/',
  }),

  project({
    slug: 'maikebali-tour',
    name: 'Maikebali Tour',
    location: 'Ubud, Bali',
    role: { en: 'Frontend & Web Developer', id: 'Frontend & Web Developer' },
    year: 2024,
    thumbnail: '/images/project/maikebalitour6.png',
    gallery: [
      '/images/project/maikebalitour6.png',
      '/images/project/maikebalitour1%20(2).png',
      '/images/project/maikebalitour1%20(3).png',
      '/images/project/maikebalitour1%20(4).png',
      '/images/project/maikebalitour1%20(1).png',
      '/images/project/maikebalitour7.png',
    ],
    summaryEn: 'A local Bali tour operator platform for Mai Kebali Tour, combining a full online booking engine—live travel calendar, group size, hotel pick-up add-on, and card, PayPal, or bank transfer checkout—with full-day, spiritual, cycling, street-food, wedding, and Nusa Penida catalogue.',
    summaryId: 'Platform operator tur lokal Mai Kebali Tour yang memadukan mesin pemesanan online lengkap—kalender tanggal live, jumlah peserta, tambahan antar-jemput hotel, dan pembayaran kartu, PayPal, atau transfer bank—dengan katalog full day, spiritual, cycling, street food, pernikahan Bali, hingga Nusa Penida.',
    detailEn: 'Mai Kebali Tour is a local tour operator based in Bali, founded by Ngurah Oka—a native Balinese born and raised in Ubud who graduated from a Tourism High School and brings more than 15 years of experience in the tourism industry. Under the motto "Customer Satisfaction is our Goal", the company designs curated experiences together with partner restaurants, activity providers, and travel services.\n\nThe site is built as a self-service booking platform rather than a brochure. A secure checkout flow lets travellers select a package, pick their travel date from a live calendar, enter group size, optionally add hotel pick-up, pay by credit card, PayPal, or local bank transfer, and receive instant booking confirmation together with itinerary updates—while a small deposit secures the date and the balance is settled at the end of the trip. WhatsApp remains available for custom itineraries and quick questions, so guests can choose the channel that suits them.\n\nThe catalogue is organised into clear categories—Bali Full Day Tour, Bali Activities Tour, Nusa Penida Tour, Spiritual Tour, Cycling Tour, Street Food Tour, Shore Excursion, and Balinese Wedding—so visitors can quickly find the experience that matches their trip. Signature itineraries are documented in detail with published starting prices, such as the Sala Sacred Waterfall Blessing & Customizable Tour, the Symbolic Balinese Wedding Ceremony at Puri Tegal Jaya, the Ubud Village Cycling tour through rice fields with a homemade Balinese lunch, the Kintamani morning and sunrise downhill cycling tours, the Lempuyang "Gate of Heaven" tour, the Jatiluwih UNESCO rice-terrace tour, and the Tanah Lot Temple & hidden waterfall tour.\n\nEach package lists what is included, its starting price, and practical highlights, while service guarantees—private car with driver, English-speaking drivers, hotel pickup, air-conditioned vehicles, flexible arrangements, 24/7 support, and secure payment options—are surfaced throughout the site. TripAdvisor guest reviews provide social proof, and a dedicated custom-tour flow lets travellers build their own itinerary.',
    detailId: 'Mai Kebali Tour adalah operator tur lokal yang berbasis di Bali, didirikan oleh Ngurah Oka—seorang Bali asli yang lahir dan besar di Ubud, lulusan SMK Pariwisata dengan pengalaman lebih dari 15 tahun di industri pariwisata. Dengan moto "Customer Satisfaction is our Goal", perusahaan ini merancang pengalaman terkurasi bersama restoran mitra, penyedia aktivitas, dan layanan travel lainnya.\n\nSitus ini dibangun sebagai platform pemesanan mandiri, bukan sekadar brosur. Alur checkout yang aman memungkinkan wisatawan memilih paket, menentukan tanggal perjalanan lewat kalender live, mengisi jumlah peserta, menambahkan antar-jemput hotel sebagai opsi, membayar dengan kartu kredit, PayPal, atau transfer bank lokal, lalu menerima konfirmasi pemesanan instan beserta pembaruan itinerary—dengan deposit kecil untuk mengunci tanggal dan pelunasan di akhir perjalanan. WhatsApp tetap tersedia untuk itinerary kustom dan pertanyaan cepat, sehingga tamu dapat memilih kanal yang paling nyaman.\n\nKatalognya ditata dalam kategori yang jelas—Bali Full Day Tour, Bali Activities Tour, Nusa Penida Tour, Spiritual Tour, Cycling Tour, Street Food Tour, Shore Excursion, dan Balinese Wedding—sehingga pengunjung dapat dengan cepat menemukan pengalaman yang sesuai. Paket andalan dijelaskan secara rinci lengkap dengan harga mulai, seperti Sala Sacred Waterfall Blessing & Customizable Tour, Upacara Pernikahan Bali simbolik di Puri Tegal Jaya, tur bersepeda Desa Ubud menembus sawah dengan makan siang Bali buatan rumah, tur sepeda menurun Kintamani (pagi & sunrise), tur Lempuyang "Gate of Heaven", tur sawah terasering Jatiluwih (situs UNESCO), serta tur Tanah Lot & air terjun tersembunyi.\n\nSetiap paket mencantumkan fasilitas yang termasuk, harga mulai, dan sorotan praktis, sementara jaminan layanan—mobil privat dengan supir, supir berbahasa Inggris, penjemputan hotel, kendaraan ber-AC, jadwal fleksibel, dukungan 24/7, serta opsi pembayaran yang aman—ditampilkan di seluruh situs. Ulasan tamu dari TripAdvisor menjadi bukti sosial, dan alur custom tour memungkinkan wisatawan menyusun itinerary sendiri.',
    resultsEn: [
      'Online booking engine with live travel calendar, group size, and optional hotel pick-up add-on',
      'Secure checkout via credit card, PayPal, or local bank transfer with instant booking confirmation',
      'Category-based catalog covering Full Day, Activities, Nusa Penida, Spiritual, Cycling, Street Food, Shore Excursion, & Wedding tours',
      'Detailed signature itineraries such as the Sala Sacred Waterfall Blessing and the Puri Tegal Jaya Balinese wedding ceremony',
      'Transparent inclusions and published starting prices alongside a "Request a Quote" flow for custom packages',
      'Local operator credibility backed by 15+ years of experience and TripAdvisor guest reviews',
    ],
    resultsId: [
      'Mesin pemesanan online dengan kalender tanggal live, jumlah peserta, dan opsi tambahan antar-jemput hotel',
      'Checkout aman via kartu kredit, PayPal, atau transfer bank lokal dengan konfirmasi pemesanan instan',
      'Katalog berbasis kategori: Full Day, Activities, Nusa Penida, Spiritual, Cycling, Street Food, Shore Excursion, & Wedding',
      'Itinerari andalan yang rinci seperti Sala Sacred Waterfall Blessing dan upacara pernikahan Bali di Puri Tegal Jaya',
      'Fasilitas dan harga mulai yang transparan, serta alur "Request a Quote" untuk paket kustom',
      'Kredibilitas operator lokal dengan pengalaman 15+ tahun dan ulasan tamu TripAdvisor',
    ],
    liveUrl: 'https://maikebalitour.com/',
  }),
];

/** Proyek dengan berkas aplikasi yang bisa diunduh pengunjung. */
export const downloadableProjects = projectsData.filter((p) => p.downloadUrl);

// Metadata ringan tetap bisa diimpor dari sini untuk kompatibilitas, tetapi
// komponen yang hanya butuh label kategori sebaiknya mengimpor
// `data/projectMeta` agar tidak ikut memuat data proyek.
export { appAccentVars, projectCategories, CATEGORY_LABELS, categoryLabel } from './projectMeta';

