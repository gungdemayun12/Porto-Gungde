/**
 * HeroLanyard — lazy 3D lanyard + fallback ringan
 */
import { lazy, Suspense, useState, useEffect, useRef, Component } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import StaticBadge from './StaticBadge';
import gungdePhoto from '../../assets/gungde.jpeg';

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
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default function HeroLanyard() {
  const { isMobile, isTablet } = useBreakpoint();
  const { shouldUseFallback, webglAvailable, prefersReducedMotion } = useDeviceCapability();
  const useMobileFallback =
    !webglAvailable ||
    prefersReducedMotion ||
    ((!isMobile && !isTablet) && shouldUseFallback);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(isMobile || isTablet);

  const containerHeight = isMobile ? '390px' : isTablet ? '460px' : '570px';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '80px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  if (useMobileFallback) {
    return (
      <div
        ref={containerRef}
        className="lanyard-container w-full flex items-center justify-center"
        style={{ height: containerHeight, minHeight: '360px' }}
      >
        <StaticBadge />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="lanyard-container w-full relative flex flex-col items-center justify-center"
      style={{ height: containerHeight, minHeight: '360px' }}
    >
      <div className="absolute top-2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-gold/35 backdrop-blur-md shadow-xs text-text">
        <i className="fa-solid fa-hand-pointer text-xs text-gold animate-bounce" aria-hidden="true" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-gold-text font-bold">
          Drag the card
        </span>
      </div>

      {isVisible ? (
        <WebGLErrorBoundary fallback={<StaticBadge />}>
          <Suspense fallback={<LanyardSkeleton />}>
            <Lanyard3D
              position={[0, 0, isMobile ? 15 : 17.5]}
              gravity={[0, isMobile ? -32 : -40, 0]}
              fov={isMobile ? 16 : 19}
              transparent
              frontImage={gungdePhoto}
              backImage={gungdePhoto}
              imageFit="cover"
            />
          </Suspense>
        </WebGLErrorBoundary>
      ) : (
        <LanyardSkeleton />
      )}
    </div>
  );
}