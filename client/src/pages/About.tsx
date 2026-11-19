import { useEffect } from "react";
import { MEMBERSHIP_FORM_URL } from "../lib/siteLinks";
import mascot from "../assets/about-us/mascot.png";
import squiggle from "../assets/about-us/squiggle.svg";
import dashed from "../assets/about-us/Vector 88.svg";
import starBlue from "../assets/about-us/Vector 87.svg";
import starAbove from "../assets/about-us/Vector 42.svg";
import starRed from "../assets/about-us/Vector 73.svg";
import starPinkA from "../assets/about-us/Vector 74.svg";
import starPinkB from "../assets/about-us/Vector 36.svg";
import starLavender from "../assets/about-us/Vector 89.svg";
import cloudPink from "../assets/about-us/Vector 66.svg";
import cloudPurple from "../assets/about-us/Vector 78.svg";
import cloudPinkB from "../assets/about-us/Vector 67.svg";

const PILLARS = [
  {
    title: "Culture",
    body: "Connecting Malaysians across campus, our club celebrates Malaysian culture, fosters friendships, and creates a welcoming space for all students.",
  },
  {
    title: "Community",
    body: "From cultural events to social gatherings, we bring a piece of home to your university life. Sign up below to join our club today!",
  },
];
const HEADING = "font-heading uppercase text-accent1-primary";
function BigStar({ src, x, y }: { src: string; x: number; y: number }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="absolute z-10 w-[10cqw] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x / 11.4}cqw`, top: `${y / 11.4}cqw` }}
    />
  );
}
export default function About() {
  useEffect(() => {
    document.title = "About | UMSA";
  }, []);
  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-16">
      <h1
        className={`mx-auto max-w-7xl text-5xl leading-none sm:text-7xl ${HEADING}`}
      >
        About <span className="text-accent2-primary">Us…</span>
      </h1>
      <div
        className="relative mx-auto mt-6 hidden aspect-[1140/1320] w-full max-w-[1140px] md:block"
        style={{ containerType: "inline-size" }}
      >
        <img
          src={cloudPink}
          alt=""
          className="absolute right-[5%] top-[2%] w-[23%]"
        />
        <img
          src={cloudPinkB}
          alt=""
          className="absolute -right-[12%] top-[4%] w-[30%]"
        />
        <img
          src={cloudPurple}
          alt=""
          className="absolute -left-[12%] top-[48%] w-[25%]"
        />
        <img
          src={dashed}
          alt=""
          className="absolute left-[1.49%] top-[11.97%] w-[98%]"
        />
        <img
          src={squiggle}
          alt=""
          className="absolute left-0 top-[8.33%] h-[77.42%] w-full"
        />
        <img
          src={mascot}
          alt="UMSA mascot"
          className="absolute -left-[4%] top-[1.5%] z-10 w-[20%] -rotate-[10deg]"
        />
        <div className="absolute left-0 top-[19.55%] z-10 w-[50.26%]">
          <div className="flex items-center justify-between gap-3">
            <img src={starRed} alt="" className="w-[6cqw]" />
            <h2 className={`text-[4.21cqw] leading-none ${HEADING}`}>
              {PILLARS[0].title}
            </h2>
            <img src={starPinkA} alt="" className="w-[6cqw]" />
          </div>
          <p
            className={`mt-[1.4cqw] text-justify text-[1.4cqw] leading-[1.875] tracking-[0.14cqw] ${HEADING}`}
          >
            {PILLARS[0].body}
          </p>
        </div>
        <div className="absolute left-[49.04%] top-[52.88%] z-10 w-[48.95%]">
          <div className="flex items-center justify-between gap-3">
            <img src={starLavender} alt="" className="w-[6cqw]" />
            <h2 className={`text-[4.21cqw] leading-none ${HEADING}`}>
              {PILLARS[1].title}
            </h2>
            <img src={starPinkB} alt="" className="w-[6cqw]" />
          </div>
          <p
            className={`mt-[1.4cqw] text-justify text-[1.4cqw] leading-[1.875] tracking-[0.14cqw] ${HEADING}`}
          >
            {PILLARS[1].body}
          </p>
        </div>
        <BigStar src={starBlue} x={587} y={195} />
        <BigStar src={starAbove} x={884} y={575} />
        <BigStar src={starBlue} x={418} y={1063} />
        <p
          className={`absolute inset-x-0 top-[90.15%] text-center text-[4.21cqw] ${HEADING}`}
        >
          A home away from home.
        </p>
      </div>
      <div className="mx-auto max-w-lg md:hidden">
        <img
          src={mascot}
          alt="UMSA mascot"
          className="mt-8 w-28 -rotate-[10deg]"
        />
        {PILLARS.map((pillar, i) => (
          <div key={pillar.title} className="mt-10">
            <div className="flex items-center gap-4">
              <img
                src={i === 0 ? starRed : starLavender}
                alt=""
                className="w-10"
              />
              <h2 className={`text-3xl ${HEADING}`}>{pillar.title}</h2>
            </div>
            <p className="mt-4 text-base leading-relaxed text-accent1-primary">
              {pillar.body}
            </p>
          </div>
        ))}
        <p className={`mt-12 text-2xl ${HEADING}`}>A home away from home.</p>
      </div>
      <div className="mt-8 text-center">
        <a
          href={MEMBERSHIP_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-accent2-primary px-6 py-3 font-heading text-sm text-white"
        >
          Join UMSA
        </a>
      </div>
    </section>
  );
}
