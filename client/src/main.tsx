import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import App from './App'
import ProjectTeam from './pages/Project-Team'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children: [
      { index: true,              element: <App /> },
      { path: 'project-team',     element: <ProjectTeam /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);