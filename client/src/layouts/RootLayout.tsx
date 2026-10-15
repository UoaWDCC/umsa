import { Suspense, useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  const location = useLocation();

  // keyboard/screen-reader users land at the top of the new page, not mid-scroll
  useEffect(() => {
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="paper flex min-h-screen flex-col">
      <Navbar />

      {/* No page-level AnimatePresence here. With `mode="wait"` the router
          renders the incoming route immediately, AnimatePresence discards it
          while the outgoing one finishes exiting, then mounts it a second time
          — so every page animated in, vanished, and animated in again. Each
          page already brings its own entrance, so the wrapper is dropped and
          nothing mounts twice. */}
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
