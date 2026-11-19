import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import EventBanner from "../components/EventBanner";
import EventTrail from "../components/EventTrail";
import Reveal from "../components/ui/Reveal";
import { Star } from "../components/ui/Decor";
import { useEvents } from "../hooks/useEvents";
import { EVENT_TAGS } from "../types/content";

function StarRow() {
  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <Star size={20} tone="red" />
      <Star size={20} tone="light" />
      <Star size={20} tone="pink" />
    </div>
  );
}

const PER_PAGE = 4;
const FILTERS = ["All", ...EVENT_TAGS] as const;

export default function Events() {
  useEffect(() => {
    document.title = "Events | UMSA";
  }, []);

  const { data: events, isPending, isError } = useEvents();
  const [tag, setTag] = useState<string>("All");
  const [page, setPage] = useState(1);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const decorated = (events ?? [])
      .map((e) => ({ ...e, isDone: new Date(e.eventDate) < now }))
      .filter((e) => tag === "All" || e.eventTag === tag);

    return {
      upcoming: decorated
        .filter((e) => !e.isDone)
        .sort((a, b) => +new Date(a.eventDate) - +new Date(b.eventDate)),
      past: decorated
        .filter((e) => e.isDone)
        .sort((a, b) => +new Date(b.eventDate) - +new Date(a.eventDate)),
    };
  }, [events, tag]);

  const pageCount = Math.max(1, Math.ceil(past.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const pastOnPage = past.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <>
      <Reveal>
        <header className="mx-auto max-w-6xl px-6 pt-12 pb-6 text-center">
          <h1 className="text-4xl md:text-6xl">
            <span className="text-accent2-primary">Upcoming </span>
            <span className="text-accent1-primary">Events</span>
          </h1>
          <StarRow />
        </header>
      </Reveal>

      <div className="relative mx-auto max-w-6xl px-6">
        <EventTrail className="absolute inset-x-0 top-0 z-0 h-full w-full" />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((option) => (
            <button
              key={option}
              onClick={() => {
                setTag(option);
                setPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide
                transition-colors ${
                  tag === option
                    ? "bg-accent1-primary text-white"
                    : "bg-background-tertiary text-foreground-secondary hover:bg-blue-100"
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        {isPending && (
          <p className="text-center text-sm text-foreground-secondary">Loading events…</p>
        )}
        {isError && (
          <p className="text-center text-sm text-foreground-secondary">
            Couldn&apos;t load events.
          </p>
        )}

        <div className="relative z-10 space-y-20 md:space-y-32">
          <AnimatePresence mode="popLayout">
            {upcoming.map((event, i) => (
              <motion.div key={event.id} layout exit={{ opacity: 0, scale: 0.96 }}>
                <EventBanner event={event} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>

          {!isPending && upcoming.length === 0 && (
            <p className="text-center text-sm text-foreground-secondary">
              No upcoming events in this category.
            </p>
          )}
        </div>

        <div id="past" className="scroll-mt-28 pt-20">
          <div className="mb-8 text-center">
            <Reveal>
              <h2 className="text-4xl md:text-6xl">
                <span className="text-accent1-primary">Past </span>
                <span className="text-accent2-primary">Events</span>
              </h2>
              <StarRow />
            </Reveal>
          </div>

          <div className="relative z-10 space-y-20 md:space-y-32">
            <AnimatePresence mode="popLayout">
              {pastOnPage.map((event, i) => (
                <motion.div key={event.id} layout exit={{ opacity: 0, scale: 0.96 }}>
                  <EventBanner event={event} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>

            {!isPending && past.length === 0 && (
              <p className="text-center text-sm text-foreground-secondary">
                No past events in this category.
              </p>
            )}
          </div>

          {pageCount > 1 && (
            <div className="mt-28 flex justify-center gap-2 md:mt-32">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  aria-current={n === currentPage ? "page" : undefined}
                  className={`h-9 w-9 rounded-full text-sm font-semibold transition-colors ${
                    n === currentPage
                      ? "bg-accent2-primary text-white"
                      : "bg-background-tertiary text-foreground-secondary hover:bg-red-100"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
