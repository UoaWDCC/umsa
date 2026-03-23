import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />  
      </main>
    </div>
  );
}