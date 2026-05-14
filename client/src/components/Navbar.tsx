import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-white ${isActive ? 'text-white font-semibold' : 'text-gray-400'}`;

  return (
    <nav className="mx-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          UMSA
        </Link>
        <div className="flex gap-6 text-sm">
          <NavLink to="/" end className={linkClass}>home</NavLink>
          <NavLink to="/project-team" className={linkClass}>project team</NavLink>
          <NavLink to="/events" className={linkClass}>events</NavLink>
          <NavLink to="/sign-up" className={linkClass}>Sign Up</NavLink>
          <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
          <NavLink to="/Login" className={linkClass}>Login</NavLink>
        </div>
      </div>
    </nav>
  );
}