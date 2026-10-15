import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./layouts/RootLayout";
import App from "./App";
import { lazy } from "react";
const Submissions = lazy(() => import("./pages/admin/Submissions"));
import "./index.css";

{
  /* page imports */
}
import ProjectTeam from "./pages/Project-Team";
import Events from "./pages/Events";
import SignUp from "./pages/SignUp";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Sponsors from "./pages/Sponsors";
import FAQ from "./pages/Frequent-Asked-Question";
import About from "./pages/About";

{
  /* project team imports */
}
import {
  AdminLayout,
  AdminLogin,
  Alanna,
  Alex,
  EventsEditor,
  FaqEditor,
  GalleryEditor,
  HomeContentEditor,
  Pruna,
  SponsorsEditor,
  Tadiwa,
  TeamEditor,
  Terrence,
} from "./lazyRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "events", element: <Events /> },
      { path: "team", element: <Team /> },
      { path: "project-team", element: <ProjectTeam /> },
      { path: "alanna", element: <Alanna /> },
      { path: "alex", element: <Alex /> },
      { path: "pruna", element: <Pruna /> },
      { path: "tadiwa", element: <Tadiwa /> },
      { path: "terrence", element: <Terrence /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "gallery", element: <Gallery /> },
      { path: "faq", element: <FAQ /> },
      { path: "contact", element: <Contact /> },
      { path: "sponsors", element: <Sponsors /> },
      { path: "about", element: <About /> },
    ],
  },
  /* admin routes live OUTSIDE RootLayout so they don't get the public navbar/footer */
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/home-content" replace /> },
      { path: "home-content", element: <HomeContentEditor /> },
      { path: "events", element: <EventsEditor /> },
      { path: "team", element: <TeamEditor /> },
      { path: "sponsors", element: <SponsorsEditor /> },
      { path: "gallery", element: <GalleryEditor /> },
      { path: "faqs", element: <FaqEditor /> },
      { path: "inbox", element: <Submissions /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);

/* The boot screen holds until the first screenful is genuinely ready: React has
   painted, the blocking display font has resolved, and the images actually in
   view have decoded. Waiting on fonts alone was the gap — the screen lifted and
   then the photos arrived one by one, which is what read as a rough first load.

   Every wait is capped. A loading screen that outstays the thing it is hiding is
   worse than the pop it was covering, so nothing here can hold the page for more
   than a beat, and a slow image or font is simply left to arrive behind it. */
const CAP_FONTS = 900;
const CAP_IMAGES = 1200;

function withCap<T>(p: Promise<T>, ms: number) {
  return Promise.race([p, new Promise((r) => setTimeout(r, ms))]);
}

function dismissBoot() {
  const boot = document.getElementById("boot");
  if (!boot) return;
  boot.classList.add("is-done");
  boot.addEventListener("transitionend", () => boot.remove(), { once: true });
  // belt and braces if the transition never fires (reduced motion, hidden tab)
  setTimeout(() => boot.remove(), 800);
}

/** Images intersecting the first viewport — the only ones whose pop is visible. */
function imagesInView() {
  const pending = [...document.querySelectorAll("img")]
    .filter((img) => {
      const r = img.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0 && r.width > 0;
    })
    .filter((img) => !img.complete)
    .map(
      (img) =>
        new Promise<void>((res) => {
          img.addEventListener("load", () => res(), { once: true });
          img.addEventListener("error", () => res(), { once: true });
        }),
    );
  return Promise.all(pending);
}

const fontsReady = document.fonts
  ? withCap(document.fonts.ready, CAP_FONTS)
  : Promise.resolve();

fontsReady
  // one frame so React has laid out and the images above the fold exist
  .then(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
  .then(() => withCap(imagesInView(), CAP_IMAGES))
  .then(() => requestAnimationFrame(dismissBoot));
