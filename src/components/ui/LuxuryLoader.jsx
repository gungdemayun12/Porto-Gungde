import { useEffect, useState } from 'react';
import ParticleText from './ParticleText';

export default function LuxuryLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 900);
    return () => clearTimeout(fadeTimer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#090A0D] transition-opacity duration-500" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-5">
        <div className="h-24 w-[min(86vw,520px)]">
          <ParticleText text="GUNGDEV" color="#d4af37" highlightColor="#fff1a8" particleSize={2.2} density={5} gatherDuration={900} />
        </div>
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold-light/70">PORTFOLIO</span>
      </div>
    </div>
  );
}
