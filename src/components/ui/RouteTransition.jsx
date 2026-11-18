/**
 * RouteTransition — soft slide/fade between routes.
 *
 * The outgoing page fades/lifts away, then the incoming page rises in.
 * Only opacity + a small translate are animated, so the work stays on the
 * compositor and feels light even on low-end phones.
 *
 * Scroll handling: pages reset to the top, except when the destination
 * carries a hash (e.g. /#projects after leaving a project detail) — there the
 * Home page lands on that section itself.
 */
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLocation } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1];

export default function RouteTransition({ children }) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <div className="route-transition">
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          if (location.hash) return;
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      >
        <motion.div
          key={location.pathname}
          className="route-transition__page"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={
            reduceMotion
              ? { opacity: 0, transition: { duration: 0.01 } }
              : { opacity: 0, y: -10, transition: { duration: 0.18, ease: EASE } }
          }
          transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: EASE }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
