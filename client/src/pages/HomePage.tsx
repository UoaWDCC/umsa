import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/UMSA_LOGO.png";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home | UMSA";
  }, []);

  return (
    <div className="flex flex-col items-center text-white px-6 py-12">
      <img src={logo} alt="UMSA logo" className="w-20 mb-4" />
      <h1 className="text-8xl font-bold mb-2">UMSA</h1>
      <div className="mt-3 px-2 py-2 border border-blue-500/50 rounded-full bg-blue-950/40 backdrop-blur-sm">
        <p className="text-med text-blue-300 font-medium">
          UNION OF MALAYSIAN STUDENTS IN AUCKLAND
        </p>
      </div>
      <div className="w-full max-w-2xl aspect-video mt-12 mb-10">
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
        <h2 className="text-3xl font-semibold mb-3">WHO ARE WE?</h2>
        <p className="text-white text-lg mb-10">
          umsa goated umsa goated umsa goated umsa goated umsa goated umsa
          goated umsa goated
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 bg-blue-950/20 p-10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
          <h2 className="text-3xl font-semibold mb-3">
            MEET THE EXEC TEAM
          </h2>
          <div className="h-px bg-blue-500 mb-5" />
          <p className="text-white mb-8 max-w-md mx-auto text-center">
            para abt umsa execs etc
          </p>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl px-7 py-4 transition-colors duration-200"
          >
            MEET THE TEAM →
          </Link>
        </div>
      </div>
    </div>
  );
}
