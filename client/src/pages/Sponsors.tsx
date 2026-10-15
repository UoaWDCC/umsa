import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Reveal from "../components/ui/Reveal";
import { SparkleTrio, StarTrio } from "../components/ui/Decor";
import SponsorTicket from "../components/SponsorTicket";
import { useSponsors } from "../hooks/useSiteData";
import { REGIONS, type Region, type Sponsor } from "../types/content";

/* The Review Two board stacks the deals under the suburb they're in: one big
   region ticket with a SEE ALL badge, and opening it slides the region's own
   tickets out underneath. That is what this page does — the region ticket is
   the same silhouette at full width, and its stack expands in place. */

const REGION_SKIN = [
  { body: "bg-blue-700", plate: "bg-red-600", accent: "text-red-350", perf: "border-blue-300" },
  { body: "bg-red-600", plate: "bg-gray-900", accent: "text-blue-900", perf: "border-gray-100" },
  { body: "bg-gray-900", plate: "bg-red-600", accent: "text-red-350", perf: "border-blue-300" },
  { body: "bg-blue-700", plate: "bg-gray-900", accent: "text-red-350", perf: "border-blue-300" },
];

const HARD_SHADOW = "drop-shadow(-8px 15px 0 var(--color-blue-250))";

function RegionTicket({
  region,
  count,
  index,
  open,
  onToggle,
}: {
  region: Region;
  count: number;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const skin = REGION_SKIN[index % REGION_SKIN.length];

  return (
    <motion.button
      onClick={onToggle}
      aria-expanded={open}
      className="relative block w-full text-left"
      style={{ containerType: "inline-size" }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* the plate that peeks out behind, tilted the other way */}
      <motion.div
        className="absolute inset-0"
        style={{ filter: HARD_SHADOW }}
        initial={false}
        animate={{ x: "1.6%", y: open ? "16%" : "9%", rotate: open ? -2.4 : -1.5 }}
        transition={{ type: "spring", stiffness: 220, damping: 30 }}
      >
        <div className={`ticket-clip h-full w-full ${skin.plate}`} />
      </motion.div>

      <div className="relative" style={{ filter: HARD_SHADOW }}>
        <div className={`ticket-clip relative aspect-829/266 w-full ${skin.body}`}>
          <span
            aria-hidden
            className={`absolute top-[6.8%] bottom-[7.9%] left-[9.6%] border-l-2 border-dashed ${skin.perf}`}
          />
          <span
            aria-hidden
            className={`absolute top-[6.8%] bottom-[7.9%] left-[90.6%] border-l-2 border-dashed ${skin.perf}`}
          />

          <div className="absolute top-1/2 left-[16%] w-[52%] -translate-y-1/2">
            <p className="font-heading text-[6.4cqw] leading-[1.02] text-white uppercase">
              {region}
            </p>
            <p className={`font-heading text-[5.6cqw] leading-[1.05] uppercase ${skin.accent}`}>
              Discounts
            </p>
          </div>

          <span
            className="absolute top-1/2 left-[76%] flex h-[15cqw] w-[16cqw] -translate-x-1/2
              -translate-y-1/2 flex-col items-center justify-center rounded-[50%] bg-red-250
              text-center text-[2.6cqw] leading-[1.15] font-semibold tracking-wide text-white uppercase"
            style={{ filter: "drop-shadow(8px 8px 0 var(--color-red-350))" }}
          >
            <span>{open ? "Hide" : "See"}</span>
            <span>{open ? `(${count})` : "All"}</span>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function Sponsors() {
  useEffect(() => {
    document.title = "Sponsors | UMSA";
  }, []);

  const reduced = useReducedMotion();
  const { data: sponsors, isPending, isError } = useSponsors();
  const [query, setQuery] = useState("");
  // every region starts shut, so the page opens as just the four covers
  const [openRegion, setOpenRegion] = useState<Region | null>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sponsors ?? [];
    return (sponsors ?? []).filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.offer.toLowerCase().includes(q) ||
        (s.detail ?? "").toLowerCase().includes(q),
    );
  }, [sponsors, query]);

  // searching cuts across the regions, so it drops the accordion entirely
  const searching = query.trim().length > 0;

  const byRegion = useMemo(() => {
    const map = new Map<Region, Sponsor[]>(REGIONS.map((r) => [r, []]));
    for (const s of matches) map.get(s.region)?.push(s);
    return map;
  }, [matches]);

  return (
    <section className="px-6 pt-12 pb-16">
      <div className="mx-auto max-w-4xl">
        <Reveal from="left">
          <div className="flex items-center justify-between gap-6">
            <h1 className="text-4xl text-accent1-primary sm:text-5xl md:text-7xl">Sponsors</h1>
            <StarTrio className="hidden sm:flex" />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sponsors…"
              aria-label="Search sponsors"
              className="w-full max-w-xs rounded-full border-2 border-blue-150 bg-white px-5 py-2
                font-heading text-xs tracking-[0.12em] text-accent1-primary uppercase outline-none
                transition-colors placeholder:text-blue-200 focus:border-accent1-primary"
            />
            <p className="font-heading text-xs tracking-[0.14em] text-foreground-secondary uppercase">
              {matches.length} deal{matches.length === 1 ? "" : "s"} for members
            </p>
          </div>
        </Reveal>

        {isPending && <p className="mt-12 text-sm text-foreground-secondary">Loading sponsors…</p>}
        {isError && (
          <p className="mt-12 text-sm text-foreground-secondary">Couldn&apos;t load sponsors.</p>
        )}

        {searching ? (
          <div className="mt-12 flex flex-col gap-10">
            {matches.map((sponsor, i) => (
              <SponsorTicket key={sponsor.id} sponsor={sponsor} index={i} />
            ))}
            {matches.length === 0 && (
              <p className="text-center text-sm text-foreground-secondary">
                No sponsor matches “{query}”.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-12 flex flex-col gap-16 md:gap-20">
            {REGIONS.map((region, i) => {
              const list = byRegion.get(region) ?? [];
              const open = openRegion === region;
              return (
                <div key={region}>
                  <RegionTicket
                    region={region}
                    count={list.length}
                    index={i}
                    open={open}
                    onToggle={() => setOpenRegion(open ? null : region)}
                  />

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key={`${region}-stack`}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        {/* A stack of paper sliding apart. Each ticket starts
                            tucked a full card-height up — directly behind the
                            one above it — and drops out from under it, with the
                            z-order descending so it really is underneath. The
                            travel is one card either way, which keeps it crisp:
                            an earlier version started every card on the pile at
                            slot 0, so the twelfth had to cross 3200px and
                            arrived long after the container had finished
                            opening, which is what made it feel broken. */}
                        <motion.div
                          className="mt-10 ml-[6%] flex flex-col gap-10 md:ml-[10%]"
                          /* The stagger has to be much shorter than a card's
                             own travel or the first one lands before the last
                             one leaves, and it reads as a queue of arrivals
                             rather than one spread. At 12 ms across twelve
                             cards the whole set is in flight together and it
                             lands as a single gesture. */
                          variants={{
                            open: { transition: { staggerChildren: 0.012 } },
                            shut: { transition: { staggerChildren: 0.01, staggerDirection: -1 } },
                          }}
                          initial="shut"
                          animate="open"
                          exit="shut"
                        >
                          {list.map((sponsor, j) => (
                            <motion.div
                              key={sponsor.id}
                              // each card sits under the one above it
                              style={{ zIndex: list.length - j }}
                              variants={
                                reduced
                                  ? { shut: { opacity: 0 }, open: { opacity: 1 } }
                                  : {
                                      shut: { y: "-100%" },
                                      open: { y: "0%" },
                                    }
                              }
                              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <SponsorTicket sponsor={sponsor} index={j} stacked />
                            </motion.div>
                          ))}
                          {list.length === 0 && (
                            <p className="text-sm text-foreground-secondary">
                              No deals in this area yet.
                            </p>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        <Reveal>
          <div className="mt-24 flex items-center gap-6">
            <p className="font-heading text-lg leading-tight tracking-[0.14em] uppercase md:text-xl">
              <span className="text-accent2-primary">UMSA</span>
              <span className="text-accent1-primary">2026</span>
              <br />
              <span className="text-accent1-primary">Sponsors</span>
            </p>
            <SparkleTrio />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
