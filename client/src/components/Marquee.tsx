
import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useLocation } from "react-router-dom";
import starLarge from "../assets/star-solid.png";
import starSmall from "../assets/star-outline.png";

export default function Marquee() {
  const reduced = useReducedMotion();
  const home = useLocation().pathname === "/";
  const viewport = useRef<HTMLDivElement>(null);
  const sample = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(6);
  useLayoutEffect(() => {
    const measure = () => {
      const width = sample.current?.offsetWidth ?? 0;
      if (width)
        setCopies(
          Math.max(
            2,
            Math.ceil((viewport.current?.offsetWidth ?? 0) / width) + 1,
          ),
        );
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, [home]);
  const text = home ? "I ♥ Malaysia" : "Welcome to UMSA";
  const item = (i: number) => (
    <div className="flex h-12 shrink-0 items-center">
      <img
        src={i % 2 === 0 ? starLarge : starSmall}
        alt=""
        className="h-full w-auto shrink-0"
      />
      <span className="whitespace-nowrap px-6 font-heading text-sm tracking-wide text-white uppercase">
        {text}
      </span>
    </div>
  );
  return (
    <div
      ref={viewport}
      className="relative w-full overflow-hidden bg-accent1-primary"
      role="region"
      aria-label={text}
    >
      <div ref={sample} aria-hidden="true" className="invisible absolute">
        {item(0)}
      </div>
      <div
        className="flex w-max umsa-marquee-track"
        style={{
          animation: reduced
            ? "none"
            : `umsa-marquee ${copies * 4}s linear infinite`,
        }}
      >
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex"
            aria-hidden={group === 1 ? true : undefined}
          >
            {Array.from({ length: copies }, (_, i) => (
              <div key={i}>{item(i)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
