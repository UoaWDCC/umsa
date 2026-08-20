import { motion, useReducedMotion } from "motion/react";
import { FaInstagram } from "react-icons/fa";
import type { Member } from "../mocks/data";

type Props = { member: Member; index: number; /** fill the slot the stage gives it */ fluid?: boolean };

/* Straight out of `assets/frames/TEAM.svg`: the card is 254 x 317 with a 10px
   radius, and the photo well is 200 x 181 sitting 27.65 in from the left and
   12.67 down from the top. As percentages of the card that is 10.9% / 4.0%,
   78.7% wide and 57.1% tall, which leaves the deep 38.9% skirt the role and
   name sit on. The shadow is a hard 8/10 offset in grey-200 — not a blur. */
const PHOTO = "absolute left-[10.9%] top-[4%] w-[78.7%] h-[57.1%] rounded-[4cqw] bg-gray-20";
const SHADOW = "shadow-[8px_10px_0_0_var(--color-gray-200)]";

/* The frame runs 15 cards in seven colour groups, in committee order. */
const TINTS = [
  "bg-blue-300", "bg-blue-300",
  "bg-blue-400", "bg-blue-400",
  "bg-accent2-primary", "bg-accent2-primary", "bg-accent2-primary",
  "bg-red-600", "bg-red-600",
  "bg-gray-500", "bg-gray-500",
  "bg-gray-700", "bg-gray-700",
  "bg-accent1-primary", "bg-accent1-primary",
];

// the tilts Figma gives each card, in the same order
const TILTS = [
  -2.79, 2.4, -5.23, 5.71, -3.15, 2.38, 6.23, -3.15, 0.04, -3.15, 4.21, -3.15,
  3.56, -3.15, 6.92,
];

/** The heart / comment / send row, copied verbatim from a card in the frame. */
function Glyphs({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="203 503 75 25" className={className} fill="none">
      <path d="M209.316 511.282C213.525 508.088 217.109 514.462 217.109 514.462C217.109 514.462 218.827 508.114 224.09 510.563C229.353 513.011 217.628 525.113 217.628 525.113C217.628 525.113 205.107 514.477 209.316 511.282Z" stroke="#F9F9FB" strokeWidth="2" />
      {/* Figma exports this one as an inside-stroke: a filled ring plus a
          mask. Taking the ring without the mask rendered it solid, which is
          why it sat so much heavier than the heart and the send arrow. This
          is the plain geometry, stroked to match them. */}
      <path
        d="M241.987 506.907C246.84 506.67 250.959 510.28 251.188 514.969C251.262 516.489 250.915 517.934 250.251 519.204L252.003 523.41L249.235 520.724C247.71 522.546 245.422 523.759 242.814 523.886C237.96 524.123 233.84 520.514 233.612 515.825C233.383 511.136 237.133 507.143 241.987 506.907Z"
        stroke="#F9F9FB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M274.18 522.455L270.19 516.948L269.911 516.564L269.439 516.536L262.588 516.134L275.033 507.265L274.18 522.455Z" stroke="#F9F9FB" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function PolaroidCard({ member, index, fluid = false }: Props) {
  const reduced = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];
  const tint = TINTS[index % TINTS.length];

  return (
    <motion.article
      className={`group relative aspect-254/317 rounded-[10px] ${
        fluid ? "w-full" : "w-[150px] sm:w-[178px]"
      } ${tint} ${SHADOW}`}
      style={{ rotate: tilt, containerType: "inline-size" }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26, rotate: tilt }}
      /* On the stage the cards are part of one fixed composition that is sized
         by aspect-ratio, and the scroll observer kept measuring it before that
         settled — every card stayed invisible. There they animate on mount; in
         the wrapped fallback, where the wall is genuinely long, they still
         animate as they come into view. */
      {...(fluid
        ? { animate: { opacity: 1, y: 0, rotate: tilt } }
        : {
            whileInView: { opacity: 1, y: 0, rotate: tilt },
            viewport: { once: true, amount: 0 },
          })}
      /* 20ms, not 50: across fifteen cards a 50ms step spreads the entrance
         over 0.70s while each card only takes 0.5s, so the first one lands
         before the last one leaves and the board fills in as a queue. At 20ms
         the whole wall is in flight together and reads as one wave. */
      transition={{ duration: 0.5, delay: index * 0.02, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { rotate: 0, scale: 1.06, zIndex: 20 }}
    >
      {member.img ? (
        <img src={member.img} alt={member.fullName} className={`${PHOTO} object-cover`} loading="lazy" />
      ) : (
        <span aria-hidden className={PHOTO} />
      )}

      {/* the skirt: glyph row, then role over name */}
      <div className="absolute inset-x-[10.9%] top-[66.5%]">
        <Glyphs className="w-[26%]" />
        <p className="mt-[2.5cqw] font-heading text-[6cqw] leading-[1.06] tracking-[0.02em] text-white uppercase">
          {member.role}
        </p>
        <p className="mt-[1cqw] font-heading text-[4.7cqw] tracking-[0.08em] text-white/80 uppercase">
          {member.fullName}
        </p>
      </div>

      {/* the rest of the profile, on hover — the frame has no room for it */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-[1.5cqw]
          rounded-[10px] bg-inherit px-[10.9%] opacity-0 transition-opacity duration-300
          group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <p className="font-heading text-[7cqw] leading-[1.05] text-white uppercase">
          {member.fullName}
        </p>
        <dl className="space-y-[0.8cqw] text-[4.6cqw] leading-[1.25] text-white/85">
          <div>
            <dt className="sr-only">Degree</dt>
            <dd>{member.degree}</dd>
          </div>
          <div>
            <dt className="sr-only">Ethnicity</dt>
            <dd>{member.ethnicity}</dd>
          </div>
          <div>
            <dt className="sr-only">MBTI and favourite artist</dt>
            <dd>
              {member.mbti} · {member.favArtist}
            </dd>
          </div>
        </dl>
        <p className="text-[4.6cqw] leading-[1.3] text-white italic">“{member.bio}”</p>
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[1cqw] inline-flex items-center gap-[2cqw] text-[4.6cqw] text-white
            transition-opacity hover:opacity-70"
        >
          <FaInstagram className="h-[5.5cqw] w-[5.5cqw] shrink-0" />
          {/* strip the URL down to the handle — the old one-liner replaced the
              trailing slash with "@" as well, so every handle ended in one */}
          @{member.instagram.replace(/^.*instagram\.com\//, "").replace(/\/+$/, "")}
        </a>
      </div>
    </motion.article>
  );
}
