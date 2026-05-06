import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="w-full px-4 py-8">
        <ScrollRestoration />
        <Outlet />  
      </main>
      <Footer />
    </div>
  );
}