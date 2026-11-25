/**
 * ProjectVideo — facade video proyek yang baru diunduh saat diminta.
 *
 * Video demo bisa berukuran puluhan MB. Dengan facade ini, halaman detail
 * hanya memuat poster (webp ringan) dan sebuah tombol play; berkas video
 * baru diambil setelah pengunjung menekan tombol. `preload="none"` menjaga
 * agar browser tidak memulai unduhan sendiri.
 */
import { useState } from 'react';

export default function ProjectVideo({ src, poster, title = 'Project demo' }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <video
        src={src}
        className="project-video__player"
        controls
        autoPlay
        playsInline
        preload="none"
        poster={poster || undefined}
        aria-label={`${title} demo video`}
      />
    );
  }

  return (
    <button
      type="button"
      className="project-video"
      onClick={() => setActive(true)}
      aria-label={`Play ${title} demo video`}
      style={poster ? { backgroundImage: `url(${poster})` } : undefined}
    >
      <span className="project-video__scrim" aria-hidden="true" />
      <span className="project-video__play" aria-hidden="true">
        <i className="fa-solid fa-play" />
      </span>
      <span className="project-video__meta">
        <i className="fa-solid fa-video" aria-hidden="true" />
        <span>Lihat demo</span>
      </span>
      <span className="project-video__hint">
        Video baru dimuat setelah tombol ditekan
      </span>
    </button>
  );
}
