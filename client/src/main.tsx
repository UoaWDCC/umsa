
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import App from './App'
import './index.css'

{/* page imports */}
import ProjectTeam from './pages/Project-Team'
import Events from './pages/Events'
import SignUp from './pages/SignUp'
import Gallery from './pages/Gallery'
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Sponsors from "./pages/Sponsors";

{/* project team imports */}
import Pruna from "./pages/project-team/Pruna"
import Alanna from './pages/project-team/Alanna'
import Tadiwa from './pages/project-team/Tadiwa'
import Terrence from './pages/project-team/Terrence'
import Alex from './pages/project-team/Alex'

{/* here's where we set up all our routing */}
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true,              element: <App /> },
      { path: 'events',           element: <Events /> },
      { path: 'project-team',    element: <ProjectTeam /> },
      { path: 'sign-up',         element: <SignUp />},
      { path: 'gallery',         element: <Gallery />},
      { path: "contact", element: <Contact /> },
      { path: "sponsors", element: <Sponsors />},
   
      
      { path: 'alanna',          element: <Alanna /> },
      { path: 'tadiwa', element: <Tadiwa />},
      { path: 'terrence',         element: <Terrence />},
      { path: "pruna", element: <Pruna />},
      { path: 'alex',            element: <Alex/> }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
