/**
 * useScrollReveal — lightweight IntersectionObserver-based scroll animation
 * Applies a CSS class when element enters viewport.
 * Returns a ref to attach to the element.
 */
import { useEffect, useRef } from 'react';

export function useScrollReveal({
  threshold = 0.1,
  rootMargin = '0px 0px -60px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('sr-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-visible');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('sr-visible');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, rootMargin, once]);

  return ref;
}
