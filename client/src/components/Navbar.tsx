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
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/project-team" className={linkClass}>Project Team</NavLink>
        <NavLink to="/sign-up" className={linkClass}>Sign Up</NavLink>
      </div>

      {/* shows on small screens only (is hidden once screen size is big) */}
      <div className="relative">

      <div className="md:hidden">
        <button onClick={toggleDropdown}>
          Dropdown
        </button>
      </div>

      {/* if isOpen is true it runs the code in the block */}
      {isOpen && (
        <div className="md:hidden absolute z-5 my-5 w-full rounded-md bg-white
          ring-black ring-opacity-5 focus:outline-none">
          <div>
            <div className="flex flex-col px-4 py-10 gap-2">
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
          
        </div>
      )}
      </div>
    </div>
  </nav>
  );
}