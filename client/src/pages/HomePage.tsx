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
          className="w-full h-full"
          src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          title="UMSA Video"
          allowFullScreen
        />
      </div>
    </div>
  );
}
