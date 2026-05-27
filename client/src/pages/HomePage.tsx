import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home | UMSA";
  }, []);

  return (
    <div className="flex flex-col items-center text-white px-6 py-12">
      <h1 className="text-5xl font-bold mb-3">UMSA</h1>
      <p className="text-white text-lg mb-3">
        University of Auckland Malaysian Students Association
      </p>
      <div className="w-full aspect-video mt-10 mb-10">
        <iframe
          className="w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=uBbsDjvI95vfXOQA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="max-w-xl text-center mb-5">
        <h2 className="text-2xl font-semibold mb-3">Who are we?</h2>
        <p className="text-white mb-10">
          umsa goated umsa goated umsa goated umsa goated umsa goated umsa
          goated umsa goated
        </p>
      </div>

      <div className="max-w-xl text-center border border-white/50 rounded-lg py-10 px-15">
        <h2 className="text-2xl font-semibold mb-3">Meet the Exec Team</h2>
        <p className="text-white mb-10">para abt umsa execs etc</p>
        <Link
          to="/team"
          className="mt-5 bg-white text-black font-semibold rounded-xl p-4"
        >
          click here
        </Link>
      </div>
    </div>
  );
}
