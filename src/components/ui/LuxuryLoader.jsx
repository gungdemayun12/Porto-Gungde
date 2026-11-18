import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import CubeLoader from './CubeLoader';

const EASE = [0.16, 1, 0.3, 1];

export default function LuxuryLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  const isMobile = typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 640px)').matches
    : false;
  const duration = reduceMotion ? 0.45 : isMobile ? 1.05 : 1.55;

  useEffect(() => {
    const removeTimer = setTimeout(() => setVisible(false), duration * 1000);

    return () => clearTimeout(removeTimer);
  }, [duration]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="loader-screen"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.2 : 0.5, ease: EASE } }}
        >
          <span className="loader-screen__aurora" aria-hidden="true" />
          <span className="loader-screen__grid" aria-hidden="true" />

          <motion.div
            className="loader-screen__content"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="loader-screen__eyebrow">PORTFOLIO · 2026</span>

            <motion.span
              className="loader-screen__word"
              initial={reduceMotion ? false : { opacity: 0, letterSpacing: '0.52em' }}
              animate={{ opacity: 1, letterSpacing: '0.22em' }}
              transition={{ duration: 1.05, ease: EASE }}
            >
              GUNGDEV
            </motion.span>

            <CubeLoader compact className="loader-screen__cube" />

            <span className="loader-screen__track" aria-hidden="true">
              <motion.span
                className="loader-screen__fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: Math.max(0.35, duration * 0.86), ease: 'easeInOut' }}
              />
            </span>

            <span className="loader-screen__sub">BALI · INDONESIA</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
