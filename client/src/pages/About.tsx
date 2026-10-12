import { useEffect } from "react";
import { Link } from "react-router-dom";
import mascot from "../assets/about-us/mascot.png";
import squiggle from "../assets/about-us/squiggle.svg";
import dashed from "../assets/about-us/Vector 88.svg";
import AboutNavbar from "../components/AboutNavbar";

// Stars and clouds
import starBlue from "../assets/about-us/Vector 87.svg";
import starAbove from "../assets/about-us/Vector 42.svg";
import starRed from "../assets/about-us/Vector 73.svg";
import starPinkA from "../assets/about-us/Vector 74.svg";
import starPinkB from "../assets/about-us/Vector 36.svg";
import starLavender from "../assets/about-us/Vector 89.svg";
import cloudPink from "../assets/about-us/Vector 66.svg";
import cloudPurple from "../assets/about-us/Vector 78.svg";
import cloudPinkB from "../assets/about-us/Vector 67.svg";
import footerWave from "../assets/about-us/Vector 27.svg";
import badge from "../assets/about-us/badge.svg";
import socialIcons from "../assets/about-us/social-icons.svg";
import banner from "../assets/about-us/banner.svg";
// TODO: swap Archivo Black for Sekuya once the font file is available
const DISPLAY = "'Sekuya', sans-serif";
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

// small star beside a heading, shown at its natural Figma size
function Star({ src }: { src: string }) {
  return <img src={src} alt="" aria-hidden="true" className="shrink-0" />;
}

// big star placed by its CENTER point on the canvas, natural Figma size
function BigStar({ src, x, y }: { src: string; x: number; y: number }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="absolute z-10"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    />
  );
}

export default function About() {
  useEffect(() => {
    document.title = "About | gotUMSA";
  }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      <AboutNavbar />
            {/* ---------- banner ---------- */}
      <img src={banner} alt="Welcome to UMSA" className="block h-auto w-full" />
      {/* clouds are positioned against the page edges so they bleed off like in Figma */}
      <img src={cloudPink} alt="" className="absolute z-0" style={{ right: 56, top: 160 }} />
      <img src={cloudPurple} alt="" className="absolute left-0 z-0" style={{ top: 745 }} />
      <img src={cloudPinkB} alt="" className="absolute z-0" style={{ right: 0, top: 179 }} />
      <div className="relative z-10 pb-24">
        {/* header: left-aligned like Figma */}
        <h1
          className="pl-9 pt-10 text-left uppercase"
          style={{ fontFamily: DISPLAY, fontSize: "96px", lineHeight: "90px" }}
        >
          <span style={{ color: BLUE }}>about </span>
          <span style={{ color: RED }}>us...</span>
        </h1>

        {/* squiggle + text blocks share one fixed-size canvas so coordinates line up */}
        <div className="relative mx-auto mt-6" style={{ width: 1140, height: 1260 }}>
          {/* dashed line: sits inside the S-curve, behind the solid squiggle */}
          <img src={dashed} alt="" className="absolute z-0" style={{ left: 17, top: 158 }} />

          <img
            src={squiggle}
            alt=""
            className="absolute left-0 z-0"
            style={{ top: 110, width: 1140, height: 1022 }}
          />

          {/* mascot: bigger, tilted, covers the start of the line */}
          <img
            src={mascot}
            alt="UMSA mascot"
            className="absolute z-10"
            style={{ left: -110, top: 20, width: 230, transform: "rotate(-10deg)" }}
          />

          {/* CULTURE */}
          <div className="absolute z-10" style={{ left: 0, top: 258, width: 573 }}>
            <div className="flex items-center justify-between">
              <Star src={starRed} />
              <h2 className="uppercase" style={headingStyle}>Culture</h2>
              <Star src={starPinkA} />
            </div>
            <p className="uppercase mt-4" style={bodyStyle}>
              Connecting Malaysians across campus, our club celebrates Malaysian culture, fosters
              friendships, and creates a welcoming space for all students.
            </p>
          </div>

          {/* COMMUNITY: stars sit outside the text block */}
          <div className="absolute z-10" style={{ left: 559, top: 698, width: 558 }}>
            <div className="-mx-14 flex items-center justify-between">
              <Star src={starLavender} />
              <h2 className="uppercase" style={headingStyle}>Community</h2>
              <Star src={starPinkB} />
            </div>
            <p className="uppercase mt-4" style={bodyStyle}>
              From cultural events to social gatherings, we bring a piece of home to your university
              life. Sign up below to join our club today!
            </p>
          </div>

          {/* big blue stars, placed by center point */}
          <BigStar src={starBlue} x={587} y={195} />
          <BigStar src={starAbove} x={884} y={575} />
          <BigStar src={starBlue} x={418} y={1063} />

          {/* CTA line */}
          <p
            className="absolute z-10 uppercase whitespace-nowrap text-center"
            style={{ ...headingStyle, left: -23, width: 1055, top: 1190 }}
          >
            A home away from home.
          </p>
        </div>
      </div>

            {/* ---------- wave footer ---------- */}
      <div className="relative">
        {/* Figma's blue jagged shape, stretched to full page width */}
        <img src={footerWave} alt="" className="block w-full h-auto" />

        {/* footer content sits on top of the shape */}
        <div className="absolute inset-0 flex items-center justify-between mx-auto max-w-[1140px] px-10 pt-10 text-white">
          <nav
            className="flex flex-col gap-3 text-right uppercase"
            style={{ fontFamily: DISPLAY, fontSize: "20px", letterSpacing: "1.2px" }}
          >
            <Link to="/About">About Us</Link>
            <Link to="/Sponsors">Sponsors</Link>
            <Link to="/Events">Our Events</Link>
            <Link to="/Team">Meet the Team</Link>
          </nav>

          <img src={badge} alt="UMSA 2026 logo" className="w-44" />

          <div className="flex flex-col items-start gap-4 text-left">
          <nav
              className="flex flex-col gap-3 text-left capitalize"
              style={{ fontFamily: DISPLAY, fontSize: "20px", letterSpacing: "1.2px" }}
            >
              <Link to="/Gallery">Photos</Link>
              <Link to="/Contact">Contact Us</Link>
            </nav>
            <div className="relative inline-block">
  <img src={socialIcons} alt="" className="block h-10 w-auto" />

  {/* invisible links laid over each third of the image */}
  <a
    href="#"
    aria-label="Facebook"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute left-0 top-0 h-full w-1/3"
  />
  <a
    href="#"
    aria-label="Instagram"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute left-1/3 top-0 h-full w-1/3"
  />
  <a
    href="#"
    aria-label="Twitter"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute left-2/3 top-0 h-full w-1/3"
  />
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
