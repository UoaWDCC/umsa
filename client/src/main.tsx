import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import App from './App'
import ProjectTeam from './pages/Project-Team'
import Events from './pages/Events'
import Alanna from './pages/project-team/Alanna'
import Alex from './pages/project-team/Alex'
import './index.css'

{/* here's where we set up all our routing */}
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children: [
      { index: true,              element: <App /> },
      { path: 'events',           element: <Events /> },
      { path: 'project-team',     element: <ProjectTeam /> },
      { path: 'alanna',          element: <Alanna /> },
      { path: 'alex',            element: <Alex/> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);