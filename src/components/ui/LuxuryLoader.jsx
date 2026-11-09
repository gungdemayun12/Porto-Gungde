import { useEffect, useState } from 'react';
import LatticeLoader from './LatticeLoader';

export default function LuxuryLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [status, setStatus] = useState('working');

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const delay = isMobile ? 850 : 1250;

    const exitTimer = setTimeout(() => {
      setStatus('done');
      setIsExiting(true);
    }, delay);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, delay + 400);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#070B09]
        transition-opacity duration-[400ms] ease-out pointer-events-none
        ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="font-heading text-3xl font-semibold tracking-[0.2em] text-gold-light">
          GUNGDEV
        </span>
        <LatticeLoader
          status={status}
          label="Loading portfolio"
          doneLabel="Ready"
          errorLabel="Unable to load"
          pattern="orbit"
          color="#4FD19A"
          doneColor="#22c55e"
          showTimer={false}
          fontSize={13}
          cellSize={7}
          gap={3}
          glow
          className="text-gold-light"
        />
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold-light/70">
          PORTFOLIO
        </span>
      </div>
    </div>
  );
}
