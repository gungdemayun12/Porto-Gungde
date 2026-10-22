import { useEffect, useRef } from 'react';
import './GlowCursor.css';

/** React Bits-style gold cursor trail with click burst. Lightweight Canvas 2D fallback. */
export default function GlowCursor({
  children,
  color = '#d4af37',
  secondaryColor = '#fff1a8',
  intensity = 1.3,
  trailWidth = 3,
  linger = 1.4,
  glow = 1.2,
  clickBurst = true,
  enabled = true,
  className = '',
  style,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || !enabled) return undefined;

    const ctx = canvas.getContext('2d');
    const points = [];
    const bursts = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, rect.width * ratio);
      canvas.height = Math.max(1, rect.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const render = (time) => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const now = time / 1000;
      const maxAge = Math.max(0.7, linger);
      ctx.clearRect(0, 0, rect.width, rect.height);

      points.splice(0, points.length - 45);
      for (let i = points.length - 1; i > 0; i -= 1) {
        const a = points[i];
        const b = points[i - 1];
        const age = now - a.time;
        if (age > maxAge) continue;
        const alpha = Math.max(0, 1 - age / maxAge) * intensity;
        const width = Math.max(1, trailWidth * (0.45 + alpha));
        const gradient = ctx.createLinearGradient(b.x, b.y, a.x, a.y);
        gradient.addColorStop(0, `${secondaryColor}00`);
        gradient.addColorStop(1, color);
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(a.x, a.y);
        ctx.strokeStyle = gradient;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.shadowColor = color;
        ctx.shadowBlur = 10 * glow;
        ctx.stroke();
      }

      bursts.splice(0, bursts.length - 8);
      bursts.forEach((burst) => {
        const age = now - burst.time;
        if (age > 0.55) return;
        const progress = age / 0.55;
        ctx.globalAlpha = 1 - progress;
        ctx.strokeStyle = secondaryColor;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 18;
        for (let i = 0; i < 8; i += 1) {
          const angle = (Math.PI * 2 * i) / 8;
          const start = 4 + progress * 8;
          const end = 15 + progress * 28;
          ctx.beginPath();
          ctx.moveTo(burst.x + Math.cos(angle) * start, burst.y + Math.sin(angle) * start);
          ctx.lineTo(burst.x + Math.cos(angle) * end, burst.y + Math.sin(angle) * end);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (points.some((point) => now - point.time < maxAge) || bursts.some((burst) => now - burst.time < 0.55)) {
        raf = requestAnimationFrame(render);
      }
      last = now;
    };

    const position = (event) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        points.push({ x, y, time: performance.now() / 1000 });
        schedule();
      }
    };
    const click = (event) => {
      if (!clickBurst) return;
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        bursts.push({ x, y, time: performance.now() / 1000 });
        schedule();
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();
    root.addEventListener('pointermove', position, { passive: true });
    root.addEventListener('pointerdown', click, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      root.removeEventListener('pointermove', position);
      root.removeEventListener('pointerdown', click);
    };
  }, [color, secondaryColor, intensity, trailWidth, linger, glow, clickBurst, enabled]);

  return (
    <div ref={rootRef} className={`glow-cursor ${className}`} style={style}>
      <canvas ref={canvasRef} className="glow-cursor__canvas" aria-hidden="true" />
      <div className="glow-cursor__content">{children}</div>
    </div>
  );
}
