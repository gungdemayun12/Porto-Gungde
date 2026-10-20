/**
 * App.jsx — komponen root aplikasi
 * Mengatur routing, layout (Navbar + Footer), dan provider.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LangProvider } from './hooks/useLang';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import LuxuryLoader from './components/ui/LuxuryLoader';

export default function App() {
  return (
    <HelmetProvider>
      <LangProvider>
        {/* Luxury Loading Intro Animation */}
        <LuxuryLoader />

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
