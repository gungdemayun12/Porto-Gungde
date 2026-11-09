/**
 * ThemeTransition — visual flash/wipe when switching dark ↔ light mode
 * A quick circular reveal from the toggle button position.
 */
import { useEffect, useRef } from 'react';

// This component listens to theme class changes on <html>
// and plays a clip-path or opacity flash transition
export default function ThemeTransition() {
  const overlayRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    let prevClass = root.classList.contains('dark') ? 'dark' : 'light';

    const observer = new MutationObserver(() => {
      const nowClass = root.classList.contains('dark') ? 'dark' : 'light';
      if (nowClass === prevClass) return;
      prevClass = nowClass;

      const overlay = overlayRef.current;
      if (!overlay) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Cancel any running animation
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      // Flash in
      overlay.style.transition = 'none';
      overlay.style.opacity = '0.18';
      overlay.style.visibility = 'visible';

      rafRef.current = requestAnimationFrame(() => {
        overlay.style.transition = 'opacity 0.32s ease-out';
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.visibility = 'hidden';
        }, 360);
      });
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99980,
        pointerEvents: 'none',
        visibility: 'hidden',
        opacity: 0,
        background: 'var(--color-gold)',
        willChange: 'opacity',
      }}
    />
  );
}
