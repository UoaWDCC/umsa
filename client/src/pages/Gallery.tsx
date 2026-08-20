import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FiX } from "react-icons/fi";
import Camera from "../components/Camera";
import Photo from "../components/ui/Photo";
import Reveal from "../components/ui/Reveal";
import { StarTrio } from "../components/ui/Decor";
import { useGallery } from "../hooks/useSiteData";
import type { GalleryItem } from "../mocks/data";

/* Polaroid proportions come straight from the PHOTOS frame: a 550 x 373 card
   with the photo inset 35px at the sides, 43.5px at the top and 114.5px at the
   bottom — the deep margin the handwritten caption sits in. */
const CARD = "rounded-[10px] bg-gray-50";
const SHADOW = "shadow-[6px_10px_0_rgba(0,0,0,0.25)]";

// the scatter angles Figma uses, in frame order; the wall cycles through them
const TILTS = [0.8, -6.5, -6.35, 2.56, -16.23, 9.26, -8.95, 6, -8.95, -8.95];

function Polaroid({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];

  return (
    <motion.button
      layout
      onClick={onOpen}
      className={`${CARD} ${SHADOW} -mx-3 w-[clamp(210px,28vw,360px)] shrink-0 text-left md:-mx-5`}
      style={{ rotate: tilt, containerType: "inline-size" }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, rotate: tilt }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { rotate: 0, scale: 1.05, zIndex: 20 }}
    >
      {/* padding is a share of the card, so it has to be measured in container
          units — percentage padding would resolve against the wall instead */}
      <div className="px-[6.4cqw] pt-[11.7cqw] pb-[7cqw]">
        <Photo
          src={item.src}
          alt={item.caption}
          className="aspect-480/215 w-full bg-gray-100 object-cover"
        />
        <p className="mt-[6cqw] text-center font-script text-[7cqw] leading-none text-accent1-primary">
          {item.caption}
        </p>
      </div>
    </motion.button>
  );
}

export default function Gallery() {
  useEffect(() => {
    document.title = "Photos | UMSA";
  }, []);

  const { data: items, isPending, isError } = useGallery();
  // past events link straight to their album, e.g. /gallery?album=Sports%20Day
  const [params, setParams] = useSearchParams();
  const album = params.get("album") ?? "All";
  const setAlbum = (name: string) =>
    setParams(name === "All" ? {} : { album: name }, { replace: true });
  const [active, setActive] = useState<GalleryItem | null>(null);
  const reduced = useReducedMotion();

  const albums = useMemo(
    () => ["All", ...new Set((items ?? []).map((i) => i.album))],
    [items],
  );
  const shown = (items ?? []).filter((i) => album === "All" || i.album === album);

  // Escape closes the lightbox
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-16">
      <div className="mx-auto max-w-6xl">
        <Reveal from="left">
          <div className="flex items-center justify-between gap-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl">
              <span className="text-accent1-primary">Event </span>
              <span className="text-accent2-primary">Photos</span>
            </h1>
            <StarTrio className="hidden sm:flex" />
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {albums.map((name) => (
            <button
              key={name}
              onClick={() => setAlbum(name)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase
                transition-colors ${
                  album === name
                    ? "bg-accent1-primary text-white"
                    : "bg-background-tertiary text-foreground-secondary hover:bg-blue-100"
                }`}
            >
              {name}
            </button>
          ))}
        </div>

        {isPending && (
          <p className="mt-12 text-sm text-foreground-secondary">Loading photos…</p>
        )}
        {isError && (
          <p className="mt-12 text-sm text-foreground-secondary">Couldn&apos;t load photos.</p>
        )}

        {/* the pile: polaroids overlap rather than sit in a grid, and the camera
            lies across them from off the left edge */}
        <div className="relative mt-14">
          <Camera className="absolute top-[20%] -left-[27%] z-0 hidden w-[54%] md:block" />

          <motion.div
            layout
            className="relative z-10 flex flex-wrap items-start justify-center gap-y-10"
          >
            <AnimatePresence mode="popLayout">
              {shown.map((item, i) => (
                <Polaroid key={item.id} item={item} index={i} onOpen={() => setActive(item)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 text-white"
              aria-label="Close"
            >
              <FiX size={28} />
            </button>

            <motion.figure
              /* hugs the photo rather than filling the overlay: a full-width
                 box leaves transparent letterbox space beside the image that
                 still swallows clicks, so "click outside to close" would only
                 work well past the edges of the picture */
              className="flex max-w-5xl flex-col items-center"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.caption}
                className="max-h-[78vh] max-w-full rounded-2xl shadow-2xl"
              />
              <figcaption className="mt-3 text-center text-sm text-white">
                {active.caption} — <span className="text-blue-150">{active.album}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
