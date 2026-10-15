import { lazy } from "react";

export const Pruna = lazy(() => import("./pages/project-team/Pruna"));
export const Alanna = lazy(() => import("./pages/project-team/Alanna"));
export const Tadiwa = lazy(() => import("./pages/project-team/Tadiwa"));
export const Terrence = lazy(() => import("./pages/project-team/Terrence"));
export const Alex = lazy(() => import("./pages/project-team/Alex"));

export const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
export const AdminLogin = lazy(() => import("./pages/admin/Login"));
export const HomeContentEditor = lazy(() => import("./pages/admin/HomeContentEditor"));

const editors = () => import("./pages/admin/editors");
export const EventsEditor = lazy(() => editors().then((m) => ({ default: m.EventsEditor })));
export const FaqEditor = lazy(() => editors().then((m) => ({ default: m.FaqEditor })));
export const GalleryEditor = lazy(() => editors().then((m) => ({ default: m.GalleryEditor })));
export const SponsorsEditor = lazy(() => editors().then((m) => ({ default: m.SponsorsEditor })));
export const TeamEditor = lazy(() => editors().then((m) => ({ default: m.TeamEditor })));
