import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home | UMSA";
  }, []);

  return (
    <div className="flex flex-col items-center text-white px-6 py-12">
      <h1 className="text-5xl font-bold mb-3">UMSA</h1>
      <p className="text-white text-lg">
        University of Auckland Malaysian Students Association
      </p>
      <div className="w-full aspect-video">
        <iframe 
        className="w-full h-full rounded-lg mt-10"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=uBbsDjvI95vfXOQA"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen>
        </iframe>
      </div>
      <div className="max-w-xl text-center mb-5"></div>
    </div>
  );
}
