/**
 * PageTransition — smooth wipe animation on route change
 * A full-screen emerald overlay that wipes in then out.
 * Inspired by juliasta.my.id style transitions.
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const location = useLocation();
  const overlayRef = useRef(null);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Only animate on actual route change
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Wipe in (emerald bar slides up from bottom)
    overlay.style.transform = 'translateY(100%)';
    overlay.style.transition = 'none';
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = 'transform 0.38s cubic-bezier(0.76, 0, 0.24, 1)';
        overlay.style.transform = 'translateY(0%)';

        // Wipe out after brief pause
        setTimeout(() => {
          overlay.style.transition = 'transform 0.42s cubic-bezier(0.76, 0, 0.24, 1)';
          overlay.style.transform = 'translateY(-100%)';
          setTimeout(() => {
            overlay.style.visibility = 'hidden';
          }, 450);
        }, 120);
      });
    });
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        pointerEvents: 'none',
        visibility: 'hidden',
        background: 'linear-gradient(135deg, var(--color-gold-dark) 0%, var(--color-gold) 50%, var(--color-gold-dark) 100%)',
        willChange: 'transform',
        transform: 'translateY(100%)',
      }}
    />
  );
}
