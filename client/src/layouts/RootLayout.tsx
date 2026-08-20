import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-blue-400">
      <Navbar />
      <main className="w-full">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
