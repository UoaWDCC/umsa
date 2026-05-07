import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-white ${isActive ? 'text-white font-semibold' : 'text-gray-400'}`;
  
  return (
  
  <nav className="mx-6 py-4">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight">
        UMSA
      </Link>
      {/* shows on desktop screens (hidden at first) */}
      <div className="hidden md:flex gap-6 text-sm">
        <NavLink to="/" end className={linkClass}>home</NavLink>
        <NavLink to="/project-team" className={linkClass}>project team</NavLink>
        <NavLink to="/sign-up" className={linkClass}>Sign Up</NavLink>
      </div>

      {/* shows on small screens only (is hidden once screen size is big) */}
      <select className="block md:hidden">
        <option value="">Dropdown</option>
        <option value="/">home</option>
        <option value="/project-team">project team</option>
        <option value="/sign-up">Sign Up</option>
      </select>

    </div>
  </nav>
  );
}