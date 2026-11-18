/**
 * ScrollProgress — slim emerald reading progress bar.
 * Powered by Motion's scroll-linked values with a spring for a soft finish.
 */
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: reduceMotion ? scrollYProgress : smooth }}
      aria-hidden="true"
    />
  );
}
