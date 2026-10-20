/**
 * Hook useBreakpoint — deteksi breakpoint responsif
 * Mengembalikan breakpoint aktif dan flag boolean per ukuran.
 */
import { useState, useEffect } from 'react';

// Definisi breakpoint sesuai spesifikasi
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint() {
  const [width, setWidth] = useState(() => {
    // SSR-safe: default ke desktop
    return typeof window !== 'undefined' ? window.innerWidth : 1024;
  });

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      // Debounce resize untuk performa
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    width,
    isMobile: width < BREAKPOINTS.sm,      // < 640px
    isTablet: width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg, // 640-1023px
    isDesktop: width >= BREAKPOINTS.lg,     // >= 1024px
    isXl: width >= BREAKPOINTS.xl,          // >= 1280px
    is2xl: width >= BREAKPOINTS['2xl'],     // >= 1536px
    // Breakpoint aktif saat ini
    current: width >= BREAKPOINTS['2xl'] ? '2xl'
      : width >= BREAKPOINTS.xl ? 'xl'
      : width >= BREAKPOINTS.lg ? 'lg'
      : width >= BREAKPOINTS.md ? 'md'
      : width >= BREAKPOINTS.sm ? 'sm'
      : 'xs',
  };
}
