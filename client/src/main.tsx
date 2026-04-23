import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import App from "./App";
import ProjectTeam from "./pages/Project-Team";
import Alanna from "./pages/project-team/Alanna";
import "./index.css";
import Pruna from "./pages/project-team/Pruna";
import About from "./pages/About";

{/* here's where we set up all our routing */}
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "project-team", element: <ProjectTeam /> },
      { path: "alanna", element: <Alanna /> },
      { path: "pruna", element: <Pruna /> },
      { path: "about", element: <About />},
  
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
