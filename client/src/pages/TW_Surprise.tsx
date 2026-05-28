import { motion } from "motion/react";
import tung from "../assets/surprise1.jpeg";
import umsa from "../assets/UMSA.png";

const fireKeyframes = `
  @keyframes fireAura {
    0%   { box-shadow: 0 0 10px 4px #ff4500, 0 0 20px 8px #ff6a00, 0 0 40px 12px #ff000088; }
    25%  { box-shadow: 0 0 14px 6px #ff6a00, 0 0 28px 12px #ffae00, 0 0 50px 16px #ff4500aa; }
    50%  { box-shadow: 0 0 18px 8px #ffae00, 0 0 36px 14px #ff4500, 0 0 60px 20px #ff6a0099; }
    75%  { box-shadow: 0 0 14px 6px #ff4500, 0 0 28px 10px #ff6a00, 0 0 50px 16px #ffae0088; }
    100% { box-shadow: 0 0 10px 4px #ff4500, 0 0 20px 8px #ff6a00, 0 0 40px 12px #ff000088; }
  }

  @keyframes flicker {
    0%, 100% { transform: scale(1);    filter: brightness(1); }
    20%       { transform: scale(1.03); filter: brightness(1.1); }
    40%       { transform: scale(0.98); filter: brightness(0.95); }
    60%       { transform: scale(1.02); filter: brightness(1.05); }
    80%       { transform: scale(0.99); filter: brightness(1); }
  }
`;

export default function Surprise() {

  const images = [
    { src: tung, alt: "tung" },
    { src: umsa, alt: "umsa" },
    { src: tung, alt: "tung" },
  ];

  return (
    <>
      <style>{fireKeyframes}</style>
      <p>SURPRISE</p>

      <div className="flex px-5 gap-10 flex-wrap justify-center">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 215 }}
            transition={{ duration: 3 }}
            style={{
              borderRadius: "12px",
              animation: `fireAura 1.5s ease-in-out infinite, flicker 0.9s ease-in-out infinite`,
              animationDelay: `${index * 0.3}s`,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-48 h-48 object-cover"
              style={{ borderRadius: "12px", display: "block" }}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}