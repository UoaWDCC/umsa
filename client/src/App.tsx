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

  const words = heading.trim().split(/\s+/);
  const lead = words.slice(0, -1).join(" ");
  const tail = words.at(-1) ?? "";

  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-6">
      <Star
        className="absolute top-24 left-[3%] z-0 hidden md:block"
        size={92}
        tone="red"
        spin
      />
      <Sparkle
        className="absolute right-[3%] bottom-4 z-0 hidden md:block"
        size={64}
        tone="pink"
      />
      <Sparkle
        className="absolute right-[14%] bottom-16 z-0 hidden md:block"
        size={38}
        tone="blue"
        spin
      />

      <div
        className="relative mx-auto max-w-7xl"
        style={{ containerType: "inline-size" }}
      >
        <motion.h1
          className="text-center text-[min(6.4cqw,5.5rem)] leading-[1.1] text-balance break-words"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {lead && <span className="text-accent1-primary">{lead} </span>}
          <span className="text-accent2-primary">{tail}</span>
        </motion.h1>

        <div className="relative mt-2 flex flex-col items-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-6">
          <motion.img
            src={mascotSit}
            alt=""
            style={{ y: mascotY }}
            className="pointer-events-none mx-auto w-32 sm:w-44 md:col-start-2 md:row-start-1 md:w-60"
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
            className="max-w-[20rem] text-center font-heading text-[10px] leading-[2] tracking-[0.22em] break-words
              text-red-200 uppercase md:col-start-3 md:row-start-1 md:max-w-[22rem] md:self-start md:justify-self-end
              md:text-right md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          <motion.p
            className="max-w-[20rem] text-center font-heading text-[9px] leading-[2] tracking-[0.18em] text-red-200
              uppercase md:col-start-1 md:row-start-1 md:max-w-[17rem] md:self-end md:justify-self-start md:text-left
              md:text-[11px]"
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

      <section className="relative overflow-hidden bg-blue-50 px-6 py-16 md:py-20">
        <div className="relative mx-auto max-w-5xl text-center md:text-left">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
              <h2 className="text-4xl leading-[1.1] text-balance break-words text-accent1-primary md:text-6xl">
                {content.aboutHeading}
              </h2>
              <div className="hidden items-center gap-3 md:flex">
                <Star size={30} tone="red" spin />
                <Sparkle size={30} tone="light" />
                <Sparkle size={30} tone="pink" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mx-auto mt-5 max-w-3xl font-heading text-sm leading-relaxed tracking-wide break-words
                whitespace-pre-line text-accent1-secondary uppercase md:mr-0 md:text-right md:text-lg"
            >
              {content.aboutBody}
            </p>
          </Reveal>

          <div className="mt-8 flex flex-col items-center">
            <Reveal delay={0.2}>
              <motion.img
                src={mascotCap}
                alt=""
                className="w-32 md:w-44"
                whileHover={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.6 }}
              />
            </Reveal>

            <Reveal delay={0.25}>
              <Link
                to="/about"
                className="relative z-10 -mt-3 inline-flex items-center gap-2 rounded-full bg-accent2-primary px-6 py-2.5
                  font-heading text-[11px] tracking-[0.16em] text-white uppercase
                  transition-transform hover:scale-105"
              >
                <Star size={13} tone="cream" /> Read more
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-10 left-[6%] hidden gap-4 md:flex">
          <Sparkle size={30} tone="cream" />
          <Sparkle size={30} tone="cream" />
          <Sparkle size={30} tone="cream" />
        </div>
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
