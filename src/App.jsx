/**
 * App.jsx — komponen root aplikasi
 * Mengatur routing, layout (Navbar + Footer), dan provider.
 */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LangProvider } from './hooks/useLang';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import LuxuryLoader from './components/ui/LuxuryLoader';
import GlowCursor from './components/ui/GlowCursor';

export default function App() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

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

        {createPortal(
          <GlowCursor
            color="#D4AF37"
            intensity={1.3}
            trailWidth={4}
            linger={1.4}
            glow={1.2}
            quality="medium"
            theme={theme}
            className="glow-cursor--viewport"
          />,
          document.body
        )}

        <BrowserRouter>
          {/* Noise overlay untuk tekstur halus */}
          <div className="noise-overlay">
            {/* Navbar sticky */}
            <Navbar />

            {/* Konten utama */}
            <main id="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </LangProvider>
    </HelmetProvider>
  );
}
