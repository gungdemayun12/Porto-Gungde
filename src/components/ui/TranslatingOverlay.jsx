/**
 * TranslatingOverlay — short "translating" state shown while the site swaps
 * languages. Keeps the switch from feeling instant and hides the text swap,
 * so the page never flickers between languages mid-sentence.
 */
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import CubeLoader from './CubeLoader';
import './TranslatingOverlay.css';

const EASE = [0.22, 1, 0.36, 1];

/** The panel mounts only while translating, so the counter starts at zero. */
function OverlayPanel({ from, to, reduceMotion }) {
  const isId = to === 'id';
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const started = performance.now();
    const duration = reduceMotion ? 240 : 760;
    const id = window.setInterval(() => {
      const next = Math.min(100, Math.round(((performance.now() - started) / duration) * 100));
      setPct(next);
      if (next >= 100) window.clearInterval(id);
    }, 55);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <motion.div
      className="translating__panel"
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.36, ease: EASE }}
    >
      <span className="translating__eyebrow">
        <span className="translating__pulse" aria-hidden="true" />
        {isId ? 'MENERJEMAHKAN' : 'TRANSLATING'}
      </span>

      <div className="translating__langs" aria-hidden="true">
        <span className="translating__lang translating__lang--done">{from.toUpperCase()}</span>
        <motion.span
          className="translating__arrow"
          animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <i className="fa-solid fa-arrow-right-long" />
        </motion.span>
        <span className="translating__lang translating__lang--target">{to.toUpperCase()}</span>
      </div>

      <p className="translating__copy">
        {isId
          ? 'Menerjemahkan konten ke Bahasa Indonesia…'
          : 'Translating the content to English…'}
      </p>

      <div className="translating__stage">
        <CubeLoader compact className="translating__cube" />
      </div>

      <div className="translating__progress" aria-hidden="true">
        <motion.span
          className="translating__fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduceMotion ? 0.24 : 0.82, ease: 'easeInOut' }}
        />
      </div>

      <div className="translating__meta">
        <span>{isId ? 'MEMUAT TERJEMAHAN' : 'LOADING TRANSLATION'}</span>
        <span className="translating__pct">{String(pct).padStart(3, '0')}%</span>
      </div>
    </motion.div>
  );
}

export default function TranslatingOverlay({ show, from = 'en', to = 'id' }) {
  const reduceMotion = useReducedMotion();
  const isId = to === 'id';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="translating"
          role="status"
          aria-live="polite"
          aria-label={isId ? 'Menerjemahkan ke Bahasa Indonesia' : 'Translating to English'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: EASE }}
        >
          <OverlayPanel from={from} to={to} reduceMotion={reduceMotion} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
