import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "./assets/GalleryTest2.png";

function App() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
     <div className="relative min-h-screen overflow-hidden">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl mt-7 font-bold text-white">
          Welcome to Project UMSA!
        </h1>
        <div className="text-sm mt-3 text-gray-400">
          <p>to get started, go to the project team section and have a look :)</p>
        </div>
      </div>

      {showImage && (
        <div>
          <Link
            to="/slang-of-the-day"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 animate-fadeIn">
            <img
              src={image}
              alt="Slang of the Day easter egg"
              className="w-64 rounded-3xl shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      )}
    </div>

  );
}
export default App;
