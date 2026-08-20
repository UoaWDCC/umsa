import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import PolaroidCard from "../components/PolaroidCard";
import { Erasers, Glasses, NotePad, Pens } from "../components/DeskObjects";
import Reveal from "../components/ui/Reveal";
import { useMembers } from "../hooks/useMembers";

/* MEET THE TEAM is a fixed 1440 x 3183 composition, not a grid: the pairs step
   down and across the board in a set arrangement, with the pad in the left
   margin and the glasses, pens and erasers in the right one. Every position
   below is that card's frame coordinate divided by the frame box, so above md
   the page reproduces the composition and scales as a whole. Below md it falls
   back to a plain wrapped wall, which is the only thing that survives there. */
const SPOTS = [
  { left: "11.53%", top: "9.40%" }, // President
  { left: "34.81%", top: "9.05%" }, // Vice President
  { left: "23.45%", top: "20.62%" }, // Secretary
  { left: "47.54%", top: "19.82%" }, // Treasurer
  { left: "14.06%", top: "31.64%" }, // Content Creator
  { left: "37.86%", top: "31.51%" }, // Designer
  { left: "60.86%", top: "31.29%" }, // Photographer
  { left: "44.03%", top: "43.23%" }, // Public Relations
  { left: "66.20%", top: "43.80%" },
  { left: "51.81%", top: "55.20%" }, // Social
  { left: "74.67%", top: "54.95%" },
  { left: "27.50%", top: "68.08%" }, // Cultural
  { left: "49.42%", top: "66.51%" },
  { left: "40.76%", top: "79.33%" }, // Sports
  { left: "63.42%", top: "78.35%" },
];

const CARD_W = "17.64%";

function SignOff({ className = "" }: { className?: string }) {
  return (
    <p className={`font-heading leading-tight tracking-[0.14em] uppercase ${className}`}>
      <span className="text-accent2-primary">UMSA </span>
      <span className="text-accent1-primary">2026</span>
      <br />
      <span className="text-accent1-primary">Committee</span>
    </p>
  );
}

export default function Team() {
  useEffect(() => {
    document.title = "Meet the Team | UMSA";
  }, []);

  const reduced = useReducedMotion();
  const { data: members, isPending, isError } = useMembers();
  const list = members ?? [];

  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-16">
      {isPending && (
        <p className="mx-auto max-w-6xl text-sm text-foreground-secondary">Loading the team…</p>
      )}
      {isError && (
        <p className="mx-auto max-w-6xl text-sm text-foreground-secondary">
          Couldn&apos;t load the team.
        </p>
      )}

      {/* the board, composed as the frame composes it */}
      <div
        className="relative mx-auto hidden aspect-1440/3183 w-full max-w-[1440px] md:block"
        style={{ containerType: "inline-size" }}
      >
        {/* positioned on the animated element itself: wrapping an absolutely
            positioned heading in a static Reveal made the wrapper's slide drag
            it across the stage before it settled */}
        <motion.h1
          className="absolute top-[2.6%] left-[3.5%] text-[7cqw] leading-none whitespace-nowrap"
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-accent1-primary">Meet the </span>
          <span className="text-accent2-primary">Team</span>
        </motion.h1>

        <Glasses className="absolute top-[9.99%] left-[65.28%] w-[30.28%]" />
        <Pens className="absolute top-[21.61%] left-[81.94%] w-[17.36%]" />
        <NotePad className="absolute top-[43.67%] -left-[2.08%] w-[44.79%]" />
        <Erasers className="absolute top-[69.9%] left-[76.74%] w-[20.14%]" />

        {list.map((member, i) => {
          const spot = SPOTS[i % SPOTS.length];
          return (
            <div
              key={member.id}
              className="absolute"
              style={{ left: spot.left, top: spot.top, width: CARD_W }}
            >
              <PolaroidCard member={member} index={i} fluid />
            </div>
          );
        })}

        <motion.div
          className="absolute top-[90.5%] left-[4.2%]"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SignOff className="text-[1.9cqw]" />
        </motion.div>
      </div>

      {/* narrow screens: the same cards, wrapped */}
      <div className="mx-auto max-w-3xl md:hidden">
        <Reveal from="left">
          <h1 className="text-4xl sm:text-5xl">
            <span className="text-accent1-primary">Meet the </span>
            <span className="text-accent2-primary">Team</span>
          </h1>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-start justify-center gap-x-3 gap-y-8 sm:gap-x-5">
          {list.map((member, i) => (
            <PolaroidCard key={member.id} member={member} index={i} />
          ))}
        </div>

        <SignOff className="mt-14 text-lg" />
      </div>
    </section>
  );
}
