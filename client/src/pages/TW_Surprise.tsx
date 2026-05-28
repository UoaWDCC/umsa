import tung from "../assets/surprise1.jpeg";

export default function Surprise() {

    const images = [
    { src: tung, alt: "tung" },
    { src: tung, alt: "tung" },
    { src: tung, alt: "tung" },
    ]

    return (
        <>
        <p>SURPRISE</p>
        <img src="tung" alt="" />

        <div className="flex px-5 gap-10 flex-wrap justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-48 h-48 object-cover"
          />
        ))}
        </div>
        </>
    )
}