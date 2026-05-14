import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {

  // checks to see if dropdown is open or not
  const [isOpen, setIsOpen] = useState(false);

  // activates if isOpen updates
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
        <NavLink to="/About" className={linkClass}> About </NavLink>
        <NavLink to="/Events" className={linkClass}> Events</NavLink>
        <NavLink to="/sign-up" className={linkClass}>Sign Up</NavLink>
        <NavLink to="/Contact" className={linkClass}>Contact</NavLink>
        <NavLink to= "/Team" className={linkClass}> Team </NavLink>
        <NavLink to="/Sponsors" className={linkClass}> Sponser </NavLink>
        <NavLink to="/Gallery" className={linkClass}>Gallery</NavLink>
        <NavLink to= "/faq" className={linkClass}> FAQ </NavLink> 
        <NavLink to="/project-team" className={linkClass}>Project Team</NavLink>
      </div>



      {/* shows on small screens only (is hidden once screen size is big) */}
      <div className="md:hidden">
        <button onClick={toggleDropdown} className="block lg:hidden p-2 text-white">
          {/* hamburger icon */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://w3.org">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      </div>

      {/* if isOpen is true it runs the code in the block */}
      {isOpen && (
        // drop down options
        <div className="md:hidden absolute mt-2 left-0 w-full justify-items-start rounded-md bg-gray-900
          ring-black ring-opacity-5 focus:outline-none">
          <div>
            <div className="flex flex-col px-8 py-10 gap-2 text-left whitespace-nowrap">
              <NavLink to="/" end className={linkClass} onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/About" className={linkClass} onClick={() => setIsOpen(false)}>
                About
              </NavLink>
              <NavLink to="/Events" className={linkClass} onClick={() => setIsOpen(false)}>
                Events
              </NavLink>
              <NavLink to="/sign-up" className={linkClass} onClick={() => setIsOpen(false)}>
                Sign Up
              </NavLink>
               <NavLink to="/Contact" className={linkClass} onClick={() => setIsOpen(false)}>
                Contact
              </NavLink>
                  <NavLink to="/Team" className={linkClass} onClick={() => setIsOpen(false)}>
                Team
              </NavLink>
              <NavLink to="/Sponser" className={linkClass} onClick={() => setIsOpen(false)}>
                Sponsers
              </NavLink>
              <NavLink to="/Gallery" className={linkClass} onClick={() => setIsOpen(false)}>
                Gallery
              </NavLink>
              <NavLink to="/faq" className={linkClass} onClick={() => setIsOpen(false)}>
                FAQ
              </NavLink>
              <NavLink to="/project-team" className={linkClass} onClick={() => setIsOpen(false)}>
                Project Team
              </NavLink>
              
            </div>
          </div>
          
        </div>
      )}

  </nav>
  );
}