# Panduan Deployment & Audit Performa

## 1. Audit Performa & Responsif (Lighthouse)

Sebelum melakukan deployment, pastikan Anda telah menjalankan build dan melakukan audit dengan Google Lighthouse.

### Langkah Pengujian Lokal:
1. **Build Proyek**:
   Jalankan perintah ini di terminal untuk membuat versi production:
   ```bash
   npm run build
   ```
2. **Preview Hasil Build**:
   ```bash
   npm run preview
   ```
3. **Jalankan Lighthouse**:
   - Buka Google Chrome.
   - Akses URL preview (biasanya `http://localhost:4173`).
   - Buka **Developer Tools** (F12 atau Ctrl+Shift+I).
   - Masuk ke tab **Lighthouse**.
   - Pilih opsi **Navigation**, centang semua categories (Performance, Accessibility, Best Practices, SEO), dan pilih Device (Mobile/Desktop).
   - Klik **Analyze page load**.

### Target Checklist:
- [ ] **Performance**: > 90 (Pastikan gambar/GLB sudah terkompresi).
- [ ] **Accessibility**: > 95 (Warna kontras, aria-labels pada tombol/ikon).
- [ ] **Best Practices**: > 95 (Tidak ada error di console, HTTPS saat deploy).
- [ ] **SEO**: 100 (Meta tags dan Title sudah ditambahkan di `index.html`).
- [ ] **Responsif**: Uji tampilan di layar HP (320px - 480px), Tablet (768px), dan Desktop (> 1024px) menggunakan tab *Device Toolbar* di Chrome DevTools.

---

## 2. Panduan Deployment

### Opsi A: Vercel (Rekomendasi - Paling Mudah)
Vercel sangat optimal untuk Vite dan React.

1. Buat akun di [Vercel](https://vercel.com/) dan hubungkan dengan GitHub Anda.
2. Push kode Anda ke repository GitHub.
3. Di dashboard Vercel, klik **Add New... > Project**.
4. Import repository GitHub Anda.
5. Vercel akan otomatis mendeteksi framework (Vite).
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Klik **Deploy**.
7. *Selesai!* URL live akan otomatis diberikan, dan setiap push ke cabang `main` akan otomatis di-deploy ulang.

### Opsi B: VPS (Nginx)
Jika Anda ingin menggunakan VPS sendiri (seperti DigitalOcean, Niagahoster, dll).

1. Build aplikasi di lokal atau di server:
   ```bash
   npm run build
   ```
   Folder `dist` akan terbuat.
2. Upload folder `dist` ke server VPS Anda (misalnya di `/var/www/gungdev-portofolio`).
3. Konfigurasi Nginx (`/etc/nginx/sites-available/gungdev`):
   ```nginx
   server {
       listen 80;
       server_name gungde.dev www.gungde.dev; # Ganti dengan domain Anda

       root /var/www/gungdev-portofolio;
       index index.html;

       # Penting untuk React Router! (Menghindari 404 saat reload di path selain '/')
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache control untuk aset static
       location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|glb|gltf)$ {
           expires 1y;
           add_header Cache-Control "public, max-age=31536000, immutable";
       }
   }
   ```
4. Enable site dan restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/gungdev /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
5. Install SSL dengan Certbot:
   ```bash
   sudo certbot --nginx -d gungde.dev -d www.gungde.dev
   ```

## 3. Catatan Tambahan (Lanyard & Animasi)
- **Model 3D (GLB)**: Jika Anda nanti mendapatkan file `.glb` asli, masukkan ke folder `public/models/` dan perbarui path di `src/components/lanyard/HeroLanyard.jsx`. Pastikan ukuran file `.glb` sudah dioptimalkan (direkomendasikan < 2MB menggunakan Draco compression) agar load cepat.
- **React Bits Animasi**: Untuk saat ini, animasi default menggunakan CSS dan Framer Motion (`motion`). Jika Anda ingin menambahkan efek spesifik dari *React Bits*, Anda bisa langsung copy-paste komponen mereka ke `src/components/ui/` dan menggunakannya.
