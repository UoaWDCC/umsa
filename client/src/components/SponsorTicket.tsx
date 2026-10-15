import { motion, useReducedMotion } from "motion/react";
import { FaInstagram } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import type { Sponsor } from "../types/content";

type Props = {
  sponsor: Sponsor;
  index: number;

  stacked?: boolean;
};

const SKINS = [
  { body: "bg-blue-700", accent: "text-red-350", perf: "border-blue-300" },
  { body: "bg-red-600", accent: "text-blue-900", perf: "border-gray-100" },
  { body: "bg-gray-900", accent: "text-red-350", perf: "border-blue-300" },
];

export default function SponsorTicket({ sponsor, index, stacked = false }: Props) {
  const reduced = useReducedMotion();
  const skin = SKINS[index % SKINS.length];
  const link = sponsor.url ?? sponsor.instagram;
  const Root = link ? motion.a : motion.div;

  const entrance = stacked
    ? {}
    : {
        initial: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0 },
        transition: {
          duration: 0.4,
          delay: (index % 5) * 0.05,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  return (
    <Root
      {...(link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="relative block"
      style={{ containerType: "inline-size" }}
      {...entrance}
      whileHover={reduced || !link ? undefined : { y: -3 }}
    >
      <div
        className={`ticket-clip relative flex min-h-[32.1cqw] w-full items-center
          gap-[4cqw] px-[14%] py-[5cqw] ${skin.body}`}
      >

        <span
          aria-hidden
          className={`absolute top-[8%] bottom-[8%] left-[9.6%] border-l-2 border-dashed ${skin.perf}`}
        />
        <span
          aria-hidden
          className={`absolute top-[8%] bottom-[8%] left-[90.6%] border-l-2 border-dashed ${skin.perf}`}
        />

        <div className="min-w-0 flex-1">
          <p className="font-heading text-[5cqw] leading-[1.05] text-balance text-white uppercase">
            {sponsor.name}
          </p>
          <p className={`font-heading text-[4.4cqw] leading-[1.1] uppercase ${skin.accent}`}>
            {sponsor.offer}
          </p>
          {sponsor.detail && (
            <p className="mt-[1.6cqw] max-w-[44cqw] text-[2.4cqw] leading-[1.4] text-white/75">
              {sponsor.detail}
            </p>
          )}
        </div>

        <span
          className="flex h-[17cqw] w-[17cqw] shrink-0 items-center justify-center rounded-[2cqw]
            bg-white p-[1.4cqw]"
        >
          {sponsor.logo ? (
            <img src={sponsor.logo} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="font-heading text-[3cqw] text-accent1-primary uppercase">UMSA</span>
          )}
        </span>

        {link && (
          <span
            aria-hidden
            className="absolute top-[10%] right-[10.5%] flex h-[5.4cqw] w-[5.4cqw] items-center
              justify-center rounded-full bg-red-250 text-white"
          >
            {sponsor.url ? (
              <FiExternalLink className="h-[3cqw] w-[3cqw]" />
            ) : (
              <FaInstagram className="h-[3cqw] w-[3cqw]" />
            )}
          </span>
        )}
      </div>
    </Root>
  );
}
