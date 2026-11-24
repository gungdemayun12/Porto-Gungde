/**
 * Data "Learning Journey" — pengganti timeline pengalaman kerja.
 *
 * Catatan penting: ini BUKAN klaim pengalaman kerja profesional.
 * Isinya tahapan belajar nyata yang bisa dibuktikan lewat proyek di portofolio
 * ini, jadi jujur sekaligus tetap menunjukkan progres dan kompetensi.
 *
 * Kalau nanti sudah ada pengalaman kerja/magang formal, tambahkan entri baru
 * dengan `type: 'work'` dan section akan menampilkannya pada kolom kanan.
 */

export const learningData = [
  {
    year: '2026',
    yearId: '2026',
    phase: { en: 'Native Android & Cloud', id: 'Android Native & Cloud' },
    focus: 'Java · Firebase · MVVM',
    description: {
      en: 'Stepped into native Android development by building CatatKu end to end — a Java app with Firebase Firestore sync, MVVM layering, Firestore security rules, bilingual localisation, and 84 unit tests. This is where architecture and data modelling started to matter more than just making screens work.',
      id: 'Masuk ke pengembangan Android native dengan membangun CatatKu dari nol — aplikasi Java dengan sinkronisasi Firebase Firestore, arsitektur MVVM, Firestore security rules, lokalisasi dua bahasa, dan 84 unit test. Di tahap ini arsitektur dan pemodelan data mulai lebih penting daripada sekadar membuat layar berjalan.',
    },
    tags: ['Java', 'Android', 'Firebase', 'MVVM', 'JUnit'],
  },
  {
    year: '2025',
    yearId: '2025',
    phase: { en: 'Full-Stack & Private Systems', id: 'Full-Stack & Sistem Privat' },
    focus: 'Laravel · MySQL · RBAC',
    description: {
      en: 'Moved from static websites into systems people actually operate daily: a multi-branch POS, a QR food-ordering platform, and a stock and cash-reconciliation dashboard. Learned to model roles and permissions, keep stock consistent with sales, and design flows for staff who have no time to read instructions.',
      id: 'Beralih dari website statis ke sistem yang benar-benar dipakai sehari-hari: POS multi-cabang, platform pemesanan QR, dan dashboard stok serta rekonsiliasi kas. Di sini saya belajar memodelkan peran dan izin akses, menjaga stok tetap konsisten dengan penjualan, dan merancang alur untuk staf yang tidak punya waktu membaca instruksi.',
    },
    tags: ['Laravel', 'MySQL', 'RBAC', 'POS', 'REST API'],
  },
  {
    year: '2024',
    yearId: '2024',
    phase: { en: 'Web Foundations & Client Work', id: 'Dasar Web & Pekerjaan Klien' },
    focus: 'React · WordPress · SEO',
    description: {
      en: 'Started with client websites — tour operators, a spa, and digital invitations — learning responsive layout, content structure, and local SEO. This was the first taste of turning a real business need into something that works on a phone and can be found on Google.',
      id: 'Dimulai dari website klien — operator tour, spa, dan undangan digital — sambil mempelajari tata letak responsif, struktur konten, dan SEO lokal. Ini pengalaman pertama mengubah kebutuhan bisnis nyata menjadi sesuatu yang berjalan di ponsel dan bisa ditemukan di Google.',
    },
    tags: ['React', 'WordPress', 'SEO', 'HTML/CSS'],
  },
  {
    year: '2023',
    yearId: '2023',
    phase: { en: 'Learning the Fundamentals', id: 'Mempelajari Dasar-Dasar' },
    focus: 'HTML · CSS · JavaScript',
    description: {
      en: 'The starting point: HTML, CSS, and JavaScript fundamentals through self-directed practice and small experiments. No clients yet — just building things, breaking them, and figuring out why they broke.',
      id: 'Titik awal: dasar HTML, CSS, dan JavaScript melalui latihan mandiri dan eksperimen kecil. Belum ada klien — hanya membangun sesuatu, merusaknya, lalu mencari tahu penyebabnya.',
    },
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];
