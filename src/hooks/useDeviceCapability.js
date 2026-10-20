/**
 * Hook useDeviceCapability — putuskan 3D vs fallback ringan
 */
import { useState, useEffect } from 'react';

export function useDeviceCapability() {
  const [capabilities, setCapabilities] = useState(() => ({
    webglAvailable: typeof window !== 'undefined',
    isLowEnd: false,
    saveData: false,
    prefersReducedMotion: false,
    shouldUseFallback: false,
  }));

  useEffect(() => {
    let webglAvailable = false;
    try {
      const canvas = document.createElement('canvas');
      webglAvailable = !!(
        canvas.getContext('webgl2') || canvas.getContext('webgl')
      );
    } catch {
      webglAvailable = false;
    }

    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory; // undefined di sebagian browser
    const isLowEnd = cores <= 2 || (typeof memory === 'number' && memory <= 2);

    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(connection?.saveData);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const shouldUseFallback =
      !webglAvailable || isLowEnd || saveData || prefersReducedMotion;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCapabilities({
      webglAvailable,
      isLowEnd,
      saveData,
      prefersReducedMotion,
      shouldUseFallback,
    });
  }, []);

  return capabilities;
}
