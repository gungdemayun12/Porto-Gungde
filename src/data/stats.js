/**
 * Statistik portofolio — SEMUA angka di sini dihitung dari data nyata,
 * bukan diketik manual. Kalau proyek ditambah/dihapus, angkanya ikut berubah.
 *
 * Prinsip: jangan menampilkan klaim yang tidak bisa dibuktikan
 * (jumlah klien, tingkat kepuasan, tahun pengalaman) selama datanya belum ada.
 */
import { projectsData } from './projects';
import { allTechLogos } from './stack';

/** Jumlah proyek per kategori, dihitung dari projectsData. */
export const projectCounts = {
  total: projectsData.length,
  web: projectsData.filter((p) => !p.mobileApp && !p.privateSystem).length,
  mobile: projectsData.filter((p) => p.mobileApp).length,
  privateSystem: projectsData.filter((p) => p.privateSystem).length,
};

/** Jumlah teknologi unik yang dipakai di seluruh stack. */
export const techCount = new Set(allTechLogos.map((item) => item.name)).size;

/** Tahun proyek paling awal — dipakai sebagai penanda "sejak". */
export const firstProjectYear = Math.min(...projectsData.map((p) => p.year));

/** Jumlah aplikasi yang bisa diunduh langsung pengunjung. */
export const downloadableCount = projectsData.filter((p) => p.downloadUrl).length;

/**
 * Deretan statistik yang tampil di section Stats.
 * `value` boleh angka statis atau fungsi agar selalu mengikuti data.
 */
export const statsData = [
  { key: 'projects', value: projectCounts.total, suffix: '' },
  { key: 'categories', value: 3, suffix: '' },
  { key: 'technologies', value: techCount, suffix: '' },
  { key: 'years', value: new Date().getFullYear() - firstProjectYear + 1, suffix: '' },
];
