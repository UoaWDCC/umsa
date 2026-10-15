// Adapted from Twu1738's UoaWDCC/umsa PR #61; data comes from the real API.
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import rightArrow from "../assets/right_arrow.svg";
import leftArrow from "../assets/left_arrow.svg";
import type { EventRecord } from "../types/content";

const VISIBLE = 3;
export default function EventCarousel({ events }: { events: EventRecord[] }) {
  const [position, setPosition] = useState(0);
  const reduced = useReducedMotion();
  const maxIndex = Math.max(0, events.length - VISIBLE);
  const index = Math.min(position, maxIndex);
  const visibleEvents = events.slice(index, index + VISIBLE);
  if (!events.length)
    return (
      <p className="text-center text-sm text-foreground-secondary">
        Nothing scheduled right now — check back soon.
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
              opacity: counter === 1 || visibleEvents.length === 1 ? 1 : 0.7,
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
            <p className="mt-3 font-heading text-sm text-accent1-primary">
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
