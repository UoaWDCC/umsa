import { useEffect } from "react";
import mascot from "../assets/about-us/mascot.png";
import squiggle from "../assets/about-us/squiggle.svg";

export default function About() {
  useEffect(() => {
    document.title = "About | gotUMSA";
  }, []);

  return (
    <div className="mx-auto px-10 py-8">
      <h1 className="text-center uppercase" style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "96px", lineHeight: "90px" }}>
        <span style={{ color: "#2727DC" }}>about </span>
        <span style={{ color: "#FF5252" }}>us...</span>
      </h1>

      <img src={mascot} alt="UMSA mascot" className="w-32 mx-auto" />

      <div className="relative max-w-[1140px] mx-auto">
        <img src={squiggle} alt="" className="absolute inset-0 left-0 w-full -z-10" />
        <div className="relative z-10 pt-8">
          <h2 style={{ color: "#2727DC", fontFamily: "'Archivo Black', sans-serif", fontSize: "48px", lineHeight: "50px", letterSpacing: "4.8px" }} className="capitalize">
            Culture
          </h2>
          <p>Connecting Malaysians across campus...</p>
        </div>
        <div className="relative z-10 mt-40">
          <h2 style={{ color: "#2727DC", fontFamily: "'Archivo Black', sans-serif", fontSize: "48px", lineHeight: "50px", letterSpacing: "4.8px" }} className="capitalize">
            Community
          </h2>
          <p>From cultural events to social gatherings...</p>
        </div>
      </div>
    </div>
  );
}