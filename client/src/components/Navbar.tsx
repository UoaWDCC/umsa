import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';

export default function Navbar() {

  // eeee
  const [isOpen, setIsOpen] = useState(false);

  // seeee
  const toggleDropdown = () => {
    // reverses isOpen i.e. if isOpen = True, !isOpen = False
    setIsOpen(!isOpen);
    }

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
      <div className="block md:hidden">
        <button onClick={toggleDropdown}>
          Options
        </button>
      </div>

        {/* if isOpen is true it runs the code in the block */}
        {isOpen && (
          <div
              className="mt-2 w-56 
              rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5
              focus:outline-none"
          >
            <div>
                <NavLink to="/" end className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/project-team" className={linkClass}>
                  Project Team
                </NavLink>
                <NavLink to="/sign-up" className={linkClass}>
                    Sign Up
                </NavLink>
            </div>
          </div>
        )}

    </div>
  </nav>
  );
}