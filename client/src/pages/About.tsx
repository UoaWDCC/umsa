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

      <div className="relative max-w-[1140px] mx-auto" style={{ minHeight: "988px" }}>
        <img src={squiggle} alt="" className="absolute top-0 left-0 w-full -z-10" />
        <p
  className="capitalize text-center absolute z-10"
  style={{
    color: "#2727DC",
    fontFamily: "'Archivo Black', sans-serif",
    fontSize: "48px",
    lineHeight: "50px",
    letterSpacing: "4.8px",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
  }}
>
  A home away from home.
</p>
        <div className="relative z-10 pt-8">
          <h2 style={{ color: "#2727DC", fontFamily: "'Archivo Black', sans-serif", fontSize: "48px", lineHeight: "50px", letterSpacing: "4.8px" }} className="capitalize">
            Culture
          </h2>
          <p
            className="capitalize text-justify mx-auto"
            style={{
              width: "573px",
              height: "180px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "#2727DC",
              fontSize: "16px",
              lineHeight: "30px",
              letterSpacing: "1.6px",
            }}
          >
            Connecting Malaysians across campus, our club celebrates Malaysian culture, fosters friendships, and creates a welcoming space for all students.
          </p>
        </div>

        <div className="relative z-10 mt-40">
          <h2 style={{ color: "#2727DC", fontFamily: "'Archivo Black', sans-serif", fontSize: "48px", lineHeight: "50px", letterSpacing: "4.8px" }} className="capitalize">
            Community
          </h2>
          <p
            className="capitalize text-justify mx-auto"
            style={{
              width: "558px",
              color: "#2727DC",
              fontSize: "16px",
              lineHeight: "30px",
              letterSpacing: "1.6px",
            }}
          >
            From cultural events to social gatherings, we bring a piece of home to your university life. Sign up below to join our club today!
          </p>
        </div>
      </div>
    </div>
  );
}
{/* TODO: squiggle image not rendering in DOM — works standalone, cause unclear, revisit later */}