import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import AboutDecor from "../components/AboutDecor";
import Reveal from "../components/ui/Reveal";
import { Sparkle, Star } from "../components/ui/Decor";
import logo from "../assets/brand/umsa-logo.png";

const PILLARS = [
  {
    title: "Culture",
    body:
      "Connecting Malaysians across campus. Our club celebrates Malaysian culture, fosters friendships, and creates a welcoming space for all students.",
  },
  {
    title: "Community",
    body:
      "From cultural events to social gatherings, we bring a piece of home to your university life. Sign up below to join our club today!",
  },
];

const HEADING = "font-heading leading-none text-accent1-primary uppercase";
/* The frame justifies the pillar copy, but justification only reads well in the
   wide stage column — on a phone it opens rivers, so it stays left-aligned there. */
const COPY = "font-heading leading-[1.7] tracking-[0.04em] text-accent1-primary uppercase";
const COPY_STAGE = `${COPY} text-justify`;

/* The ABOUT frame is a fixed 1440 x 1922 composition — the copy is placed in the
   gaps the winding arrow leaves, so it only holds together if the text and the
   artwork scale as one. Above md the page is that frame, laid out as a single
   stage in per-cent of the frame box with type in container units. Below md the
   arrangement can't survive, so the same content stacks instead. */
function Stage() {
  const reduced = useReducedMotion();

  /* Everything here is above the fold on load, so it animates on mount rather
     than on scroll. Driving it from `whileInView` meant the observer fired
     against zero-height wrappers and pieces of the page arrived late or not at
     all — which is what made the first paint jump around. */
  const enter = (i: number, from: "left" | "right" | "up" = "up") => ({
    initial: reduced
      ? { opacity: 0 }
      : { opacity: 0, x: from === "left" ? -28 : from === "right" ? 28 : 0, y: from === "up" ? 20 : 0 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div
      className="relative mx-auto hidden aspect-1440/1922 w-full max-w-[1440px] md:block"
      style={{ containerType: "inline-size" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <AboutDecor className="h-full w-full" />
      </motion.div>

      <motion.h1
        className={`absolute top-[8.5%] left-[3.8%] text-[8cqw] ${HEADING}`}
        {...enter(0, "left")}
      >
        About <span className="text-accent2-primary">Us…</span>
      </motion.h1>

      <motion.img
        src={logo}
        alt=""
        className="absolute top-[16.5%] left-[4%] w-[17cqw]"
        initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: -10.5 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute top-[28%] left-[13.1%] w-[41cqw]"
        {...enter(1, "left")}
      >
        <h2 className={`ml-[8.8cqw] text-[3.7cqw] ${HEADING}`}>{PILLARS[0].title}</h2>
        <p className={`mt-[1.6cqw] text-[1.3cqw] ${COPY_STAGE}`}>{PILLARS[0].body}</p>
      </motion.div>

      <motion.div
        className="absolute top-[51%] left-[53.5%] w-[39cqw]"
        {...enter(2, "right")}
      >
        <h2 className={`ml-[4cqw] text-[3.7cqw] ${HEADING}`}>{PILLARS[1].title}</h2>
        <p className={`mt-[1.6cqw] text-[1.3cqw] ${COPY_STAGE}`}>{PILLARS[1].body}</p>
      </motion.div>

      <motion.p
        className={`absolute inset-x-0 top-[77%] text-center text-[4.4cqw] whitespace-nowrap ${HEADING}`}
        {...enter(3)}
      >
        A home away from home.
      </motion.p>
    </div>
  );
}

/** Narrow screens: the same copy, stacked, with the decoration dropped. */
function Stacked() {
  return (
    <div className="mx-auto max-w-md px-6 md:hidden">
      <h1 className={`text-5xl ${HEADING}`}>
        About <span className="text-accent2-primary">Us…</span>
      </h1>
      <img src={logo} alt="" className="mt-5 w-24 -rotate-[10.5deg]" />

      {PILLARS.map((pillar, i) => (
        <Reveal key={pillar.title} delay={i * 0.1} className="mt-12">
          <div className="flex items-center gap-3">
            {i === 0 ? <Star size={22} tone="red" /> : <Sparkle size={22} tone="light" />}
            <h2 className={`text-2xl ${HEADING}`}>{pillar.title}</h2>
          </div>
          <p className={`mt-3 text-[11px] ${COPY}`}>{pillar.body}</p>
        </Reveal>
      ))}

      <p className={`mt-14 text-center text-2xl ${HEADING}`}>A home away from home.</p>
    </div>
  );
}

export default function About() {
  useEffect(() => {
    document.title = "About Us | UMSA";
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-4 md:pb-0">
      <Stage />
      <Stacked />
    </section>
  );
}
