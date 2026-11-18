/**
 * Reveal — scroll-triggered entrance built on Motion (framer-motion).
 * Motion is already part of the stack, so this stays dependency-free while
 * giving every section a consistent, GPU-friendly reveal.
 */
import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1];

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  amount = 0.2,
  once = true,
  as = 'div',
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.62, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
