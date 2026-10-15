import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** direction the content travels in from */
  from?: "bottom" | "left" | "right" | "scale";
};

const OFFSETS = {
  bottom: { y: 28, x: 0, scale: 1 },
  left: { y: 0, x: -32, scale: 1 },
  right: { y: 0, x: 32, scale: 1 },
  scale: { y: 0, x: 0, scale: 0.92 },
};

/** Scroll-triggered entrance. Fires once, and collapses to a plain fade when the
    user prefers reduced motion. */
export default function Reveal({ children, className, delay = 0, from = "bottom" }: Props) {
  const reduced = useReducedMotion();
  const offset = OFFSETS[from];

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      // fires as soon as any part of the element is on screen: waiting for a
      // quarter of it meant content that was already visible on load sat blank
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
