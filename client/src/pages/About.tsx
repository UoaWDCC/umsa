import { useEffect } from "react";
import { Link } from "react-router-dom";
import mascot from "../assets/about-us/mascot.png";
import squiggle from "../assets/about-us/squiggle.svg";
import dashed from "../assets/about-us/Vector 88.svg";

// Stars and clouds
import starBlue from "../assets/about-us/Vector 87.svg";
import starRed from "../assets/about-us/Vector 73.svg";
import starPinkA from "../assets/about-us/Vector 74.svg";
import starPinkB from "../assets/about-us/Vector 36.svg";
import starLavender from "../assets/about-us/Vector 89.svg";
import cloudPink from "../assets/about-us/Vector 66.svg";
import cloudPurple from "../assets/about-us/Vector 78.svg";

// TODO: swap Archivo Black for Sekuya once the font file is available
const DISPLAY = "'Archivo Black', sans-serif";
const BLUE = "#2727DC";
const RED = "#FF5252";

const headingStyle = {
  color: BLUE,
  fontFamily: DISPLAY,
  fontSize: "48px",
  lineHeight: "50px",
  letterSpacing: "4.8px",
} as const;

const bodyStyle = {
  color: BLUE,
  fontFamily: DISPLAY,
  fontSize: "16px",
  lineHeight: "30px",
  letterSpacing: "1.6px",
  textAlign: "justify",
} as const;

// height only, so non-square stars keep their proportions
function Star({ src, height = 40 }: { src: string; height?: number }) {
  return <img src={src} alt="" style={{ height, width: "auto" }} aria-hidden="true" />;
}

export default function About() {
  useEffect(() => {
    document.title = "About | gotUMSA";
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* ---------- main content ---------- */}
      <div className="relative mx-auto w-[1140px] max-w-full px-4 pt-10 pb-24">
        {/* decorative clouds */}
        <img src={cloudPink} alt="" className="absolute -right-10 top-4" />
        <img src={cloudPurple} alt="" className="absolute -left-24 top-[640px]" />

        {/* header */}
        <h1
          className="text-center uppercase"
          style={{ fontFamily: DISPLAY, fontSize: "96px", lineHeight: "90px" }}
        >
          <span style={{ color: BLUE }}>about </span>
          <span style={{ color: RED }}>us...</span>
        </h1>

        {/* squiggle + text blocks share one fixed-size canvas so coordinates line up */}
        <div className="relative mx-auto mt-6" style={{ width: 1140, height: 1260 }}>
          {/* dashed line sits behind the solid squiggle */}
          <img src={dashed} alt="" className="absolute left-0 z-0" style={{ top: 110 }} />

          <img
            src={squiggle}
            alt=""
            className="absolute left-0 z-0"
            style={{ top: 110, width: 1140, height: 1022 }}
          />

          {/* mascot sits on the start of the line */}
          <img
            src={mascot}
            alt="UMSA mascot"
            className="absolute z-10"
            style={{ left: 40, top: 40, width: 150 }}
          />

          {/* CULTURE */}
          <div className="absolute z-10" style={{ left: 40, top: 200, width: 573 }}>
            <div className="flex items-center gap-4">
              <Star src={starRed} height={44} />
              <h2 className="uppercase" style={headingStyle}>Culture</h2>
              <Star src={starPinkA} height={44} />
            </div>
            <p className="uppercase mt-4" style={bodyStyle}>
              Connecting Malaysians across campus, our club celebrates Malaysian culture, fosters
              friendships, and creates a welcoming space for all students.
            </p>
          </div>

          {/* COMMUNITY */}
          <div className="absolute z-10" style={{ left: 564, top: 700, width: 558 }}>
            <div className="flex items-center gap-4">
              <Star src={starLavender} height={44} />
              <h2 className="uppercase" style={headingStyle}>Community</h2>
              <Star src={starPinkB} height={44} />
            </div>
            <p className="uppercase mt-4" style={bodyStyle}>
              From cultural events to social gatherings, we bring a piece of home to your university
              life. Sign up below to join our club today!
            </p>
          </div>

          {/* big stars along the line */}
          <div className="absolute z-10" style={{ left: 420, top: 1010 }}>
            <Star src={starBlue} height={110} />
          </div>
          <div className="absolute z-10" style={{ left: 760, top: 290 }}>
            <Star src={starBlue} height={100} />
          </div>

          {/* CTA line */}
          <p
            className="absolute z-10 uppercase whitespace-nowrap text-center"
            style={{ ...headingStyle, left: 0, width: 1140, top: 1170 }}
          >
            A home away from home.
          </p>
        </div>
      </div>

      {/* ---------- wave footer ---------- */}
      <div className="relative" style={{ backgroundColor: BLUE }}>
        {/* jagged top edge */}
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className="absolute left-0 w-full"
          style={{ top: -39, height: 40 }}
          aria-hidden="true"
        >
          <polygon
            fill={BLUE}
            points="0,40 0,20 60,8 120,24 180,6 240,22 300,10 360,26 420,8 480,22 540,4 600,20 660,10 720,26 780,8 840,22 900,6 960,24 1020,10 1080,22 1140,8 1200,24 1260,6 1320,22 1380,10 1440,20 1440,40"
          />
        </svg>

        <div className="mx-auto flex max-w-[1140px] items-center justify-between px-10 py-12 text-white">
          <nav
            className="flex flex-col gap-3 text-right uppercase"
            style={{ fontFamily: DISPLAY, fontSize: "12px", letterSpacing: "1.2px" }}
          >
            <Link to="/About">About Us</Link>
            <Link to="/Sponsors">Sponsors</Link>
            <Link to="/Events">Our Events</Link>
            <Link to="/Team">Meet the Team</Link>
          </nav>

          <img src={mascot} alt="UMSA logo" className="w-28" />

          <div className="flex flex-col gap-4">
            <nav
              className="flex flex-col gap-3 uppercase"
              style={{ fontFamily: DISPLAY, fontSize: "12px", letterSpacing: "1.2px" }}
            >
              <Link to="/Gallery">Photos</Link>
              <Link to="/Contact">Contact Us</Link>
            </nav>
            <div className="flex gap-3">
              {/* TODO: swap these placeholders for the real social icons and links */}
              {["f", "ig", "x"].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold"
                  style={{ color: BLUE }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}