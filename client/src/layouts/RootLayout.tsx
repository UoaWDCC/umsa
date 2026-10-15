import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Marquee from '../components/Marquee';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-white text-white">
      <Navbar />
      <main className="w-full">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
    </div>
    
  );
}
