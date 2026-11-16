import { useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import rightArrow from "../assets/right_arrow.svg";
import leftArrow from "../assets/left_arrow.svg";
import type { EventRecord } from "../types/content";

const WIDE_QUERY = "(min-width: 640px)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(WIDE_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

// 3 cards side by side from the sm breakpoint, one at a time on phones
function useVisibleCount() {
  const wide = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true,
  );
  return wide ? 3 : 1;
}

export default function EventCarousel({ events }: { events: EventRecord[] }) {
  const [position, setPosition] = useState(0);
  const reduced = useReducedMotion();
  const visible = useVisibleCount();
  const maxIndex = Math.max(0, events.length - visible);
  const index = Math.min(position, maxIndex);
  const visibleEvents = events.slice(index, index + visible);
  const featured = visibleEvents.length === 3 ? 1 : 0;
  if (!events.length)
    return (
      <p className="text-center text-sm text-foreground-secondary">
        No events scheduled
      </p>
    );
  return (
    <div className="flex items-center justify-center gap-3 px-2 sm:gap-5">
      <button
        type="button"
        aria-label="Previous events"
        disabled={index === 0}
        onClick={() => setPosition(Math.max(0, index - 1))}
        className="shrink-0 disabled:opacity-30"
      >
        <img src={leftArrow} alt="" className="h-10 w-auto sm:h-16" />
      </button>
      <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 sm:grid-cols-3">
        {visibleEvents.map((event, counter) => (
          <motion.a
            key={event.id}
            href={event.eventLink || "/events"}
            target={event.eventLink ? "_blank" : undefined}
            rel={event.eventLink ? "noopener noreferrer" : undefined}
            className="mx-auto block w-full max-w-56"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{
              opacity: counter === featured ? 1 : 0.7,
              y: 0,
            }}
            whileHover={reduced ? undefined : { opacity: 1, scale: 1.03 }}
          >
            {event.eventImage ? (
              <img
                src={event.eventImage}
                alt={event.eventName}
                className="aspect-[3/4] w-full rounded-md object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className="aspect-[3/4] w-full rounded-md bg-blue-50"
                aria-hidden="true"
              />
            )}
            <p
              className={`mt-3 line-clamp-2 text-center font-heading text-sm break-words ${
                counter === featured
                  ? "text-accent1-primary"
                  : "text-accent1-secondary"
              }`}
            >
              {event.eventName}
            </p>
          </motion.a>
        ))}
      </div>
      <button
        type="button"
        aria-label="Next events"
        disabled={index === maxIndex}
        onClick={() => setPosition(Math.min(maxIndex, index + 1))}
        className="shrink-0 disabled:opacity-30"
      >
        <img src={rightArrow} alt="" className="h-10 w-auto sm:h-16" />
      </button>
    </div>
  );
}
