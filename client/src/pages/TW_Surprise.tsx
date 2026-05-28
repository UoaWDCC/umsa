import { motion } from "motion/react";
import tung from "../assets/surprise1.jpeg";
import umsa from "../assets/UMSA.png";

export default function Surprise() {

    const images = [
    { src: tung, alt: "tung" },
    { src: umsa, alt: "tung" },
    { src: tung, alt: "tung" },
    ]

    return (
        <>
        <p>SURPRISE</p>

        <div className="flex px-5 gap-10 flex-wrap justify-center">
        {images.map((image, index) => (
        <motion.div initial={{opacity:0, scale: 0, y:0}} animate={{opacity:1, scale:1, y:215}} 
        transition={{duration:3}} key={index}>
          <img
            src={image.src}
            alt={image.alt}
            className="w-48 h-48 object-fit animate-bounce"
          />
        </motion.div>
        ))}
        </div>
        </>
    )
}