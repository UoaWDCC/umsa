import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  const { pathname } = useLocation();
  const isAbout = pathname.toLowerCase() === "/about";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {!isAbout && <Navbar />}
      <main className={isAbout ? "w-full" : "w-full px-4 py-8"}>
        <ScrollRestoration />
        <Outlet />
      </main>
      {!isAbout && <Footer />}
    </div>
    
  );
}