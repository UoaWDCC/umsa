import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./layouts/RootLayout";
import App from "./App";
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
import Pruna from "./pages/project-team/Pruna";
import Alanna from "./pages/project-team/Alanna";
import Tadiwa from "./pages/project-team/Tadiwa";
import Terrence from "./pages/project-team/Terrence";
import Alex from "./pages/project-team/Alex";

{
  /* admin (CMS) imports */
}
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import HomeContentEditor from "./pages/admin/HomeContentEditor";
import AdminApprover from "./pages/admin/AdminApprover";

{
  /* here's where we set up all our routing */
}
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
      { path: "admin-approve", element: <AdminApprover />}
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
