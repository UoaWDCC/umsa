import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Starburst } from "./ui/Decor";
import type { EventRecord } from "../mocks/data";

type Props = { events: EventRecord[] };

/** The home page shows events as a coverflow: the centre card is full size and
    full opacity, its neighbours sit back and dimmed. */
export default function EventCarousel({ events }: Props) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  if (events.length === 0) {
    return (
      <p className="text-center text-sm text-foreground-secondary">
        Nothing scheduled right now — check back soon.
      </p>
    );
  }

  const step = (delta: number) =>
    setActive((i) => (i + delta + events.length) % events.length);

  // the three slots on screen: previous, current, next
  const slots = [-1, 0, 1].map((offset) => ({
    offset,
    event: events[(active + offset + events.length) % events.length],
  }));

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      <button
        onClick={() => step(-1)}
        aria-label="Previous event"
        className="shrink-0 font-heading text-3xl text-accent2-primary transition-transform hover:-translate-x-1"
      >
        ❰
      </button>

      <div className="flex items-end justify-center gap-3 md:gap-5">
        <AnimatePresence initial={false} mode="popLayout">
          {slots.map(({ offset, event }) => {
            const centre = offset === 0;
            return (
              <motion.button
                key={`${event.id}-${offset}`}
                layout
                onClick={() => (centre ? undefined : step(offset))}
                className="relative block w-28 shrink-0 md:w-40"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: centre ? 1 : 0.35,
                  scale: centre ? 1 : 0.86,
                }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={!centre}
                tabIndex={centre ? -1 : 0}
              >
                <img
                  src={event.eventImage}
                  alt={centre ? event.eventName : ""}
                  className="aspect-[3/4] w-full border-2 border-accent1-primary object-cover"
                  loading="lazy"
                />
                <p
                  className={`mt-2 font-heading text-[11px] tracking-[0.12em] uppercase md:text-sm ${
                    centre ? "text-accent1-primary" : "text-accent1-secondary"
                  }`}
                >
                  {event.eventName}
                </p>
                {centre && (
                  <Starburst
                    className="absolute -top-3 -right-3"
                    size={26}
                    tone="red"
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <button
        onClick={() => step(1)}
        aria-label="Next event"
        className="shrink-0 font-heading text-3xl text-accent2-primary transition-transform hover:translate-x-1"
      >
        ❱
      </button>
    </div>
  );
}
