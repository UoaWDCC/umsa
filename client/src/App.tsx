import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useHomeContent } from "./hooks/useHomeContent";
import { useEvents } from "./hooks/useEvents";
import { Cloud, Sparkle, Star } from "./components/ui/Decor";
import Reveal from "./components/ui/Reveal";
import Photo from "./components/ui/Photo";
import EventCarousel from "./components/EventCarousel";
import mascotSit from "./assets/icons/umsa_sit.png";
import mascotCap from "./assets/icons/umsa_cool.png";
import heroPhoto from "./assets/humans.png";

const HERO_FOOT =
  "Non-profit Malaysian student-run club affiliated with the University of Auckland, New Zealand.";

function Hero({ heading, subtitle }: { heading: string; subtitle: string }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const mascotY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 70]);

  const words = heading.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const tail = words.at(-1) ?? "";

  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-6">
      <Star
        className="absolute top-24 left-[3%] z-0"
        size={92}
        tone="red"
        spin
      />
      <Sparkle
        className="absolute top-16 right-[6%] z-0"
        size={64}
        tone="pink"
      />
      <Sparkle
        className="absolute top-44 right-[16%] z-0 hidden md:block"
        size={38}
        tone="blue"
        spin
      />

      <div
        className="relative mx-auto max-w-7xl"
        style={{ containerType: "inline-size" }}
      >
        <motion.h1
          className="text-center text-[min(7.4cqw,5.5rem)] leading-[1.1] break-words"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-accent1-primary">{lead} </span>
          <span className="text-accent2-primary">{tail}</span>
        </motion.h1>

        <div className="relative mt-2 flex flex-col items-center gap-4 md:block">
          <motion.img
            src={mascotSit}
            alt=""
            style={{ y: mascotY }}
            className="pointer-events-none mx-auto w-32 sm:w-44 md:w-60"
            initial={
              reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotate: -8 }
            }
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <motion.p
            className="max-w-[20rem] text-center md:absolute md:top-0 md:right-0 md:max-w-[15rem] md:text-right font-heading text-[10px]
              leading-[2] tracking-[0.22em] text-accent2-primary uppercase md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          <motion.p
            className="max-w-[20rem] text-center md:absolute md:bottom-0 md:left-0 md:max-w-[15rem] md:text-left font-heading text-[9px] leading-[2]
              tracking-[0.18em] text-accent2-primary uppercase md:text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {HERO_FOOT}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { data: content, isPending, isFetching, refetch } = useHomeContent();
  const {
    data: events,
    isPending: eventsPending,
    isError: eventsError,
    refetch: refetchEvents,
    isFetching: eventsFetching,
  } = useEvents();

  useEffect(() => {
    document.title = "UMSA — Home";
  }, []);

  if (isPending) {
    return (
      <section
        className="mx-auto max-w-4xl px-6 py-20 text-center"
        role="status"
      >
        Loading homepage…
      </section>
    );
  }

  if (!content) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p role="alert">We couldn’t load the homepage. Please try again.</p>
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="mt-4 rounded-full bg-accent1-primary px-6 py-3 text-white disabled:opacity-50"
        >
          {isFetching ? "Loading…" : "Try again"}
        </button>
      </section>
    );
  }

  const upcoming = (events ?? [])
    .map((e) => ({ ...e, isDone: new Date(e.eventDate) < new Date() }))
    .filter((e) => !e.isDone)
    .sort((a, b) => +new Date(a.eventDate) - +new Date(b.eventDate));

  return (
    <>
      <Hero heading={content.heading} subtitle={content.subtitle} />

      <Reveal from="scale">
        <Photo
          src={heroPhoto}
          alt="UMSA members on the lawn"
          priority
          className="h-56 w-full bg-blue-50 object-cover md:h-96"
        />
      </Reveal>

      {content.introVideoUrl && (
        <section className="mx-auto max-w-4xl px-6 py-12">
          <iframe
            src={content.introVideoUrl}
            title="UMSA introduction"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="aspect-video w-full rounded-xl border-0"
          />
        </section>
      )}

      <section className="relative bg-blue-50 px-6 py-16 text-center">
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <h2 className="relative inline-block text-4xl text-accent1-primary md:text-5xl">
              {content.aboutHeading}
              <Star
                className="absolute -top-2 -right-12 hidden md:block"
                size={26}
                tone="red"
                spin
              />
              <Sparkle
                className="absolute top-4 -right-24 hidden md:block"
                size={22}
                tone="blue"
              />
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl font-heading text-sm leading-relaxed tracking-wide text-accent1-primary uppercase md:text-base">
              {content.aboutBody}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.img
              src={mascotCap}
              alt=""
              className="mx-auto mt-8 w-28 md:w-36"
              whileHover={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 0.6 }}
            />
          </Reveal>

          <Reveal delay={0.25}>
            <a
              href="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent2-primary px-6 py-2.5
                font-heading text-[11px] tracking-[0.16em] text-white uppercase
                transition-transform hover:scale-105"
            >
              <Star size={13} tone="cream" /> Read more
            </a>
          </Reveal>
        </div>

        <Sparkle
          className="absolute bottom-8 left-[8%] hidden md:block"
          size={26}
          tone="light"
        />
        <Sparkle
          className="absolute bottom-16 left-[16%] hidden md:block"
          size={18}
          tone="light"
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-3xl text-accent1-primary md:text-5xl">
          Meet the Exec Team
        </h2>
        <Link
          to="/team"
          className="mt-6 inline-flex rounded-full bg-accent1-primary px-6 py-3 font-heading text-sm text-white"
        >
          Meet the Team →
        </Link>
      </section>

      <section className="relative overflow-hidden px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative mb-10 flex items-center justify-center gap-4">
            <Sparkle className="hidden md:block" size={26} tone="pink" />
            <Sparkle className="hidden md:block" size={22} tone="blue" />
            <Star className="hidden md:block" size={26} tone="red" spin />
            <h2 className="text-4xl text-accent2-primary md:text-5xl">
              Our Events
            </h2>
          </div>

          {eventsPending ? (
            <p role="status">Loading events…</p>
          ) : eventsError && !events ? (
            <div>
              <p role="alert">We couldn’t load the events.</p>
              <button
                type="button"
                onClick={() => void refetchEvents()}
                disabled={eventsFetching}
                className="mt-3 underline disabled:opacity-50"
              >
                {eventsFetching ? "Loading…" : "Try again"}
              </button>
            </div>
          ) : (
            <EventCarousel events={upcoming} />
          )}

          <div className="mt-10 text-center">
            <a
              href="/events"
              className="inline-flex items-center gap-2 rounded-full bg-accent1-primary px-6 py-2.5
                font-heading text-[11px] tracking-[0.16em] text-white uppercase
                transition-transform hover:scale-105"
            >
              <Star size={13} tone="cream" /> See more events
            </a>
          </div>
        </div>

        <Cloud className="absolute -bottom-4 -left-16 w-80" tone="red" />
        <Cloud className="absolute -bottom-6 -right-16 w-96" tone="light" />
      </section>
    </>
  );
}
