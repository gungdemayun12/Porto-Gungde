/**
 * HeroLanyard — kartu ID 3D dengan fallback statis yang ringan.
 *
 * Strategi pemuatan (penting untuk performa):
 * 1. Semua perangkat langsung melihat `StaticBadge` (foto + CSS) sehingga
 *    Hero tampil utuh tanpa menunggu WebGL/Three.js.
 * 2. Bundle 3D (three + drei + rapier, ±3 MB) hanya diunduh bila perangkat
 *    layak: WebGL tersedia, bukan perangkat hemat data/lemah, bukan layar
 *    sentuh kecil, dan pengguna tidak meminta reduced-motion.
 * 3. Di layar sentuh, kartu tetap berbentuk 3D secara visual memakai fallback
 *    statis — jadi tampilan mobile konsisten tanpa biaya unduhan besar.
 */
import { lazy, Suspense, useState, useEffect, useRef, Component } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import StaticBadge from './StaticBadge';
import gungdePhoto from '../../assets/gungde.webp';

const Lanyard3D = lazy(() => import('../ui/Lanyard'));

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Lanyard 3D fallback:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/** Placeholder saat kartu 3D sedang dimuat — menjaga tinggi layout. */
function LanyardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[380px]">
      <div className="w-2.5 h-2.5 rounded-full bg-gold/40 mb-1 animate-pulse" />
      <div className="w-[2px] h-20 bg-gradient-to-b from-gold/40 to-gold/10" />
      <div className="w-52 h-72 rounded-2xl overflow-hidden border border-gold/20 bg-surface/80 relative">
        <img
          src={gungdePhoto}
          alt=""
          className="w-full h-full object-cover object-top opacity-70"
          width="208"
          height="288"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default function HeroLanyard() {
  const { isMobile, isTablet } = useBreakpoint();
  const { shouldUseFallback, webglAvailable, prefersReducedMotion } = useDeviceCapability();

  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Muat 3D hanya pada perangkat pointer presisi dengan viewport memadai.
  // Layar sentuh kecil memakai fallback statis agar unduhan tetap ringan.
  const allow3D =
    webglAvailable && !prefersReducedMotion && !shouldUseFallback && !isMobile && !isTablet;

  // Tunda beberapa saat agar paint pertama (Hero + foto) selesai lebih dulu.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!allow3D) return undefined;

    let idleId;
    let timerId;
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(start, { timeout: 2200 });
    } else {
      timerId = window.setTimeout(start, 1400);
    }

    return () => {
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) window.clearTimeout(timerId);
    };
  }, [allow3D]);

  // Jangan buat canvas WebGL saat panggung tidak terlihat.
  useEffect(() => {
    if (!allow3D) return undefined;
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [allow3D]);

  // Kartu statis butuh ruang untuk tali + kartu (3:4) + nameplate, sehingga
  // tingginya sedikit lebih besar dari kanvas 3D pada layar kecil.
  const containerHeight = isMobile ? '360px' : isTablet ? '430px' : '570px';

  const fallback = (
    <div
      ref={containerRef}
      className="lanyard-container w-full flex items-center justify-center"
      style={{ height: containerHeight, minHeight: isMobile ? '360px' : '360px' }}
    >
      <StaticBadge />
    </div>
  );

  if (!allow3D) return fallback;

  return (
    <div
      ref={containerRef}
      className="lanyard-container w-full relative flex flex-col items-center justify-center"
      style={{ height: containerHeight, minHeight: '360px' }}
    >
      <div className="lanyard-hint absolute top-2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-gold/35 backdrop-blur-md shadow-xs text-text">
        <i className="fa-solid fa-hand-pointer text-xs text-gold" aria-hidden="true" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-gold-text font-bold">
          Drag the card
        </span>
      </div>

      {inView && ready ? (
        <WebGLErrorBoundary fallback={<StaticBadge />}>
          <Suspense fallback={<LanyardSkeleton />}>
            <Lanyard3D
              position={[0, 0, 17.5]}
              gravity={[0, -40, 0]}
              fov={19}
              transparent
              frontImage={gungdePhoto}
              backImage={gungdePhoto}
              imageFit="cover"
              lanyardWidth={0.82}
            />
          </Suspense>
        </WebGLErrorBoundary>
      ) : (
        <LanyardSkeleton />
      )}
    </div>
  );
}
