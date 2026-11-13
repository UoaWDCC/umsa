import { motion, useReducedMotion } from "motion/react";
import { Star } from "./Decor";

type Props = {

  children: string;

  accent?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  children,
  accent,
  align = "left",
  className = "",
}: Props) {
  const reduced = useReducedMotion();
  const words = `${children}${accent ? ` ${accent}` : ""}`.split(" ");
  const accentFrom = accent ? words.length - accent.split(" ").length : words.length;

  return (
    <div className={`relative ${align === "center" ? "text-center" : ""} ${className}`}>
      <Star className="absolute -top-4 -left-6 hidden md:block" size={22} tone="red" spin />
      <h2 className="text-4xl md:text-6xl">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className={`inline-block ${i >= accentFrom ? "text-accent2-primary" : "text-accent1-primary"}`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 && <span>&nbsp;</span>}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}
