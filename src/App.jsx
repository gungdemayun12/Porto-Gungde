/**
 * App.jsx — komponen root aplikasi
 * Mengatur routing, layout (Navbar + Footer), dan provider.
 *
 * Catatan performa:
 * - Halaman & efek berat (glow cursor) dimuat dengan dynamic import, jadi
 *   bundel awal hanya berisi kerangka aplikasi + halaman beranda yang terlihat.
 * - Route selain beranda tidak ikut diunduh sampai pengunjung membukanya.
 */
import { lazy, Suspense, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LangProvider } from './hooks/useLang';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import RouteTransition from './components/ui/RouteTransition';
import ThemeTransition from './components/ui/ThemeTransition';
import ScrollProgress from './components/ui/ScrollProgress';
import LuxuryLoader from './components/ui/LuxuryLoader';
import { useDeviceCapability } from './hooks/useDeviceCapability';

// Halaman sekunder — baru diunduh saat rute dibuka.
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Efek kursor — hanya untuk pointer presisi, dimuat saat browser senggang.
const GlowCursor = lazy(() => import('./components/ui/GlowCursor'));

export default function App() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  // Efek berat (glow cursor WebGL) dimatikan di perangkat lemah, mode hemat
  // data, atau reduced-motion — dan baru dipasang saat browser idle agar paint
  // pertama tetap ringan.
  const { shouldUseFallback } = useDeviceCapability();
  const [showCursorFx, setShowCursorFx] = useState(false);

  useEffect(() => {
    if (shouldUseFallback) return undefined;

    // Kursor hanyalah hiasan: lewati perangkat sentuh agar tidak memuat
    // canvas WebGL yang tidak akan pernah terlihat.
    const hasFinePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return undefined;

    let idleId;
    let timerId;
    const start = () => setShowCursorFx(true);
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(start, { timeout: 3000 });
    } else {
      timerId = window.setTimeout(start, 2000);
    }

    return () => {
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) window.clearTimeout(timerId);
    };
  }, [shouldUseFallback]);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(root.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <HelmetProvider>
      <LangProvider>
        {/* Luxury Loading Intro Animation */}
        <LuxuryLoader />

        {showCursorFx &&
          createPortal(
            <Suspense fallback={null}>
              <GlowCursor
                color="#4FD19A"
                intensity={1.3}
                trailWidth={4}
                linger={1.4}
                glow={1.2}
                quality="medium"
                theme={theme}
                className="glow-cursor--viewport"
              />
            </Suspense>,
            document.body
          )}

        <BrowserRouter>
          {/* Theme switch flash overlay */}
          <ThemeTransition />
          {/* Reading progress line */}
          <ScrollProgress />
          {/* Noise overlay untuk tekstur halus */}
          <div className="noise-overlay">
            {/* Navbar sticky */}
            <Navbar />

            {/* Konten utama */}
            <main id="main-content">
              <RouteTransition>
                <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </RouteTransition>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </LangProvider>
    </HelmetProvider>
  );
}
