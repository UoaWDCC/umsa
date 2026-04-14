import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import App from './App'
import ProjectTeam from './pages/Project-Team'
import Alanna from './pages/project-team/Alanna'

import './index.css'
import Intro from './pages/project-team/Intro'
import Minahil from './pages/project-team/Minahil'

{/* here's where we set up all our routing */}
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children: [
      { index: true,              element: <App /> },
      { path: 'project-team',     element: <ProjectTeam /> },
      { path: 'alanna',          element: <Alanna /> },
      { path: 'intro', element: <Intro /> },
      { path: 'minahil', element: <Minahil /> }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);