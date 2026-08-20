import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Sparkle, Starburst } from "./ui/Decor";
import Photo from "./ui/Photo";
import { UMSA_LINKTREE, type EventRecord } from "../mocks/data";

type Props = { event: EventRecord & { isDone: boolean }; index: number };

/* The card silhouette — an 825 x 301 band with a V notched down through the top
   edge and up through the bottom edge a fifth of the way in, and a six-tooth
   sawtooth right edge — lives in index.css as the `event-clip` polygon. */
/* Two copies of that silhouette: the body, and a second card behind it. Both
   cast a hard, unblurred offset shadow — those two shadows are what read as the
   red and blue rules under every card. The pair is always {pink over red,
   lavender over blue}; only which one is on top alternates down the page. */
const PINK = {
  fill: "bg-red-50",
  ink: "text-accent2-primary",
  rule: "border-accent2-primary",
  shadow: "drop-shadow(10px 15px 0 var(--color-accent2-primary))",
};
const LILAC = {
  fill: "bg-blue-50",
  ink: "text-accent1-primary",
  rule: "border-accent1-primary",
  shadow: "drop-shadow(10px 15px 0 var(--color-accent1-primary))",
};

const REST_Y = "12.3%";
const OPEN_Y = "50%";

const DATE_FMT = new Intl.DateTimeFormat("en-NZ", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const PILL_BASE =
  "ml-[12%] flex h-[7cqw] w-[80%] items-center justify-center gap-[1.4cqw] rounded-full " +
  "font-heading text-[1.9cqw] tracking-[0.14em] text-white uppercase transition-transform " +
  "hover:scale-105 ";

const LABEL = "font-heading text-[1.7cqw] tracking-[0.1em] underline uppercase";
const VALUE = "font-heading text-[1.6cqw] tracking-[0.06em] uppercase";

export default function EventBanner({ event, index }: Props) {
 const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  // tints alternate by position down the page, not by whether the event has passed
  const warm = index % 2 === 0;
  const body = warm ? PINK : LILAC;
  const plate = warm ? LILAC : PINK;
  const pill = warm ? "bg-red-250" : "bg-accent1-secondary";

  const when = DATE_FMT.format(new Date(event.eventDate));
  const time = new Date(event.eventDate).toLocaleTimeString("en-NZ", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <motion.article
      // warm cards sit left, cool cards step in from the right
      className={`relative w-full md:w-[86%] ${open ? "z-20" : "z-0"} ${warm ? "md:mr-auto" : "md:ml-auto"}`}
      style={{ containerType: "inline-size" }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: warm ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
    >
      {/* The card behind isn't decoration — the design slides it out on hover to
          show where and when the event is. At rest only its edge shows. */}
      <motion.div
        className="absolute inset-0"
        style={{ filter: plate.shadow, x: "-1.8%" }}
        animate={{ y: open && !reduced ? OPEN_Y : REST_Y }}
        transition={{ type: "spring", stiffness: 220, damping: 30 }}
      >
        <div className={`event-clip relative h-full w-full ${plate.fill}`}>
          <motion.div
            className={`absolute inset-x-[9%] top-[52%] ${plate.ink}`}
            animate={{ opacity: open && !reduced ? 1 : 0 }}
            transition={{ duration: 0.25, delay: open ? 0.12 : 0 }}
            aria-hidden={!open}
          >
            <Sparkle
              className="absolute top-[10%] -left-[2%] w-[6cqw]"
              tone={warm ? "blue" : "red"}
            />

            <div className="pl-[11%]">
              <p className={LABEL}>Location:</p>
              <p className={VALUE}>{event.location}</p>

              <span
                className={`my-[1.4cqw] block border-t-[0.25cqw] border-dashed opacity-60 ${plate.rule}`}
              />

              <div className="flex gap-[8cqw]">
                <div>
                  <p className={LABEL}>Date:</p>
                  <p className={VALUE}>{when}</p>
                </div>
                <div>
                  <p className={LABEL}>Time:</p>
                  <p className={VALUE}>{time}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative" style={{ filter: body.shadow }}>
        <div className={`event-clip relative aspect-825/301 w-full ${body.fill}`}>
          <Sparkle
            className="absolute top-[21%] left-[7.8%] w-[8.4cqw]"
            tone={warm ? "red" : "blue"}
          />

          {/* title over pill, centred on the card so a long name pushes the
              pill down instead of running into it */}
          <div className="absolute top-1/2 left-[24.7%] flex w-[40%] -translate-y-1/2 flex-col
            items-start gap-[2.2cqw]">
            <h3 className={`text-[4.6cqw] leading-[1.05] ${body.ink}`}>{event.eventName}</h3>

            {/* an event you can still go to takes a sign-up; one that has been
                and gone sends you to its photo album instead */}
            {event.isDone ? (
              <Link
                to={event.album ? `/gallery?album=${encodeURIComponent(event.album)}` : "/gallery"}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className={PILL_BASE + pill}
              >
                <Starburst className="w-[2.4cqw] shrink-0" tone="cream" />
                See photos
              </Link>
            ) : (
              <a
                href={event.eventLink || UMSA_LINKTREE}
                target="_blank"
                rel="noopener noreferrer"
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className={PILL_BASE + pill}
              >
                <Starburst className="w-[2.4cqw] shrink-0" tone="cream" />
                Sign up
              </a>
            )}
          </div>

          <Photo
            src={event.eventImage}
            alt={event.eventName}
            className="absolute top-[12.3%] left-[67.4%] h-[76.4%] w-[23.4%] border-[0.7cqw]
              border-background-primary bg-gray-100 object-cover"
          />
        </div>
      </div>
    </motion.article>
  );
}
