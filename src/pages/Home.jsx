/**
 * Home — halaman beranda (one-page)
 * Hero -> Projects -> About -> Arcade -> Experience -> Contact
 *
 * Performa: hanya Hero yang ikut bundel awal. Section di bawah lipatan dimuat
 * sebagai chunk terpisah saat pengunjung mulai menggulir, sehingga waktu
 * render pertama di mobile tidak menunggu seluruh halaman.
 */
import { lazy, Suspense, useLayoutEffect, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';

const Projects = lazy(() => import('../sections/Projects'));
const About = lazy(() => import('../sections/About'));
const Arcade = lazy(() => import('../sections/TypingGame'));
const Experience = lazy(() => import('../sections/Experience'));
const Contact = lazy(() => import('../sections/Contact'));

/** Placeholder setinggi section agar layout tidak melompat saat chunk dimuat. */
function SectionPlaceholder({ minHeight = '60vh' }) {
  return <div style={{ minHeight }} aria-hidden="true" />;
}

export default function Home() {
  const { hash } = useLocation();

  // Saat pengunjung membuka beranda lewat tautan bersauh (mis. /#projects),
  // section tujuan harus tersedia sebelum scroll dipulihkan.
  const hashNeedsSections = Boolean(hash) && !hash.startsWith('#hero');
  const [shouldLoadRest, setShouldLoadRest] = useState(hashNeedsSections);

  // Muat section lain begitu Hero hampir selesai terlihat, atau saat pengunjung
  // mulai menggulir — mana pun yang lebih dulu.
  useEffect(() => {
    if (shouldLoadRest) return undefined;

    let idleId;
    let timerId;
    const start = () => setShouldLoadRest(true);

    const onScroll = () => {
      if (window.scrollY > 120) start();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(start, { timeout: 2500 });
    } else {
      timerId = window.setTimeout(start, 1800);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) window.clearTimeout(timerId);
    };
  }, [shouldLoadRest]);

  // Land on the requested section (e.g. /#projects after leaving a detail page)
  // before the browser paints, so the route transition never shows a flash.
  useLayoutEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
  }, [hash, shouldLoadRest]);

  return (
    <>
      <Hero />
      {/* Placeholder berjangkar: tujuan #projects & kawan-kawan tetap bisa
          ditemukan sebelum chunk section-nya selesai diunduh. */}
      <div id="projects" className="section-deferred">
        {shouldLoadRest && (
          <Suspense fallback={<SectionPlaceholder minHeight="140vh" />}>
            <Projects />
            <About />
            <Arcade />
            <Experience />
            <Contact />
          </Suspense>
        )}
      </div>
    </>
  );
}
