import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./layouts/RootLayout";
import App from "./App";
import "./index.css";

{
  /* page imports */
}
import Events from "./pages/Events";
import SignUp from "./pages/SignUp";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Sponsors from "./pages/Sponsors";
import FAQ from "./pages/Frequent-Asked-Question";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import {
  AdminLayout,
  AdminLogin,
  EventsEditor,
  FaqEditor,
  GalleryEditor,
  HomeContentEditor,
  SponsorsEditor,
  TeamEditor,
} from "./lazyRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "events", element: <Events /> },
      { path: "team", element: <Team /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "gallery", element: <Gallery /> },
      { path: "faq", element: <FAQ /> },
      { path: "contact", element: <Contact /> },
      { path: "sponsors", element: <Sponsors /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
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

  setTimeout(() => boot.remove(), 800);
}

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
  .then(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  )
  .then(() => withCap(imagesInView(), CAP_IMAGES))
  .then(() => requestAnimationFrame(dismissBoot));
