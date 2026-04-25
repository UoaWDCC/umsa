import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import App from './App'
import ProjectTeam from './pages/Project-Team'
import './index.css'
import SignUp from './pages/SignUp'
import Gallery from './pages/Gallery'

{/* project team imports */}
import Pruna from "./pages/project-team/Pruna";
import Alanna from './pages/project-team/Alanna'
import Tadiwa from './pages/project-team/Tadiwa'
import Terrence from './pages/project-team/Terrence'

{/* here's where we set up all our routing */}
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index: true,             element: <App /> },
      {path: 'project-team',    element: <ProjectTeam /> },
      {path: 'sign-up',         element: <SignUp />},
      {path: 'gallery',         element: <Gallery />},
      
      {path: 'alanna',          element: <Alanna /> },
      {path: 'tadiwa', element: <Tadiwa />},
      {path: 'terrence',         element: <Terrence />},
      {path: "pruna", element: <Pruna />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
