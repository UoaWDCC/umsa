import { Suspense, useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="paper flex min-h-screen flex-col">
      <Navbar />

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  );
}
