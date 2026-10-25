import { useEffect, useRef } from 'react';
import './ParticleText.css';

export default function ParticleText({
  text = 'GUNGDEV',
  color = '#d4af37',
  highlightColor = '#fff1a8',
  particleSize = 2,
  density = 5,
  gatherDuration = 1200,
  className = '',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const canvas = root?.querySelector('canvas');
    const ctx = canvas?.getContext('2d');
    if (!root || !canvas || !ctx) return;

    let particles = [];
    let raf;
    let start = performance.now();

    const resize = () => {
      const { width, height } = root.getBoundingClientRect();
      if (!width || !height) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const canvasWidth = Math.ceil(width);
      const canvasHeight = Math.ceil(height);
      canvas.width = Math.ceil(canvasWidth * ratio);
      canvas.height = Math.ceil(canvasHeight * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const source = document.createElement('canvas');
      source.width = canvasWidth;
      source.height = canvasHeight;
      const sourceContext = source.getContext('2d', { willReadFrequently: true });
      if (!sourceContext) return;

      const fontSize = Math.min(72, (width / Math.max(5, text.length)) * 1.2);
      sourceContext.font = `800 ${fontSize}px sans-serif`;
      sourceContext.textAlign = 'center';
      sourceContext.textBaseline = 'middle';
      sourceContext.fillText(text, width / 2, height / 2);

      const pixels = sourceContext.getImageData(0, 0, canvasWidth, canvasHeight).data;
      const step = width < 480 ? Math.max(density, 6) : density;
      particles = [];
      start = performance.now();

      for (let y = 0; y < canvasHeight; y += step) {
        for (let x = 0; x < canvasWidth; x += step) {
          if (pixels[(y * canvasWidth + x) * 4 + 3] > 80) {
            particles.push({
              x: width / 2 + (Math.random() - 0.5) * width,
              y: height + Math.random() * height,
              targetX: x,
              targetY: y,
              delay: Math.random() * 280,
            });
          }
        }
      }

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    const draw = (now) => {
      const { width, height } = root.getBoundingClientRect();
      const elapsed = now - start;
      ctx.clearRect(0, 0, width, height);

      let moving = false;
      particles.forEach((particle) => {
        const progress = Math.min(
          1,
          Math.max(0, (elapsed - particle.delay) / gatherDuration)
        );
        const easing = 1 - Math.pow(1 - progress, 3);
        particle.x += (particle.targetX - particle.x) * (0.035 + 0.065 * easing);
        particle.y += (particle.targetY - particle.y) * (0.035 + 0.065 * easing);

        ctx.fillStyle = progress < 1 ? highlightColor : color;
        ctx.globalAlpha = 0.2 + 0.8 * easing;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fill();

        if (
          progress < 1 ||
          Math.abs(particle.x - particle.targetX) > 0.5 ||
          Math.abs(particle.y - particle.targetY) > 0.5
        ) {
          moving = true;
        }
      });

      ctx.globalAlpha = 1;
      if (moving) raf = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [text, color, highlightColor, particleSize, density, gatherDuration]);

  return (
    <div ref={ref} className={`particle-text ${className}`} style={style}>
      <canvas className="particle-text__canvas" aria-hidden="true" />
      <span className="particle-text__label">{text}</span>
      <span className="particle-text__sr">{text}</span>
    </div>
  );
}
