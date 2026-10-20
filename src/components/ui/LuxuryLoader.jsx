import { useEffect, useState } from 'react';

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
        <div className="h-10 w-10 rounded-full border border-gold/25 border-t-gold animate-spin" />
        <span className="font-heading text-sm tracking-[0.3em] text-gold-light">GUNGDEV</span>
      </div>
    </div>
  );
}
