import { motion, useReducedMotion } from "motion/react";

/* The pale dashed curve that weaves behind the event cards, copied verbatim out
   of `assets/frames/EVENTS.svg`. In the frame it runs from x 159 to 1349 down
   the full 2910-tall page, so it is stretched to whatever height the list
   happens to be; `vector-effect` keeps the stroke an even weight while that
   happens, and the dashes are the frame's own 40/80/120/160 rhythm. */
export default function EventTrail({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox="0 0 1440 2910"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        d="M529.5 499C529.5 499 1025.86 479.232 1155.5 701C1348.97 1031.95 351.58 734.766 262 1107.5C158.559 1537.91 1219.15 1366.94 1155.5 1805C1099.68 2189.19 179 2383.5 179 2383.5"
        stroke="#D3D3F8"
        strokeWidth="20"
        strokeDasharray="40 80 120 160"
        vectorEffect="non-scaling-stroke"
        /* Opacity only. Animating `pathLength` would draw the line on, but
           motion implements that by rewriting strokeDasharray — which wipes out
           the frame's own 40/80/120/160 dash rhythm and leaves a solid hairline. */
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: reduced ? 0 : 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}
