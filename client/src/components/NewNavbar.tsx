import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import UMSALogo from './UMSALogo.png';

export default function NewNavbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); 
  const linkClass =
    "text-[16px] whitespace-nowrap font-normal uppercase [font-family:'Sekuya'] text-[#2727DC] transition-colors hover:text-blue-700";

  const dropdownItem =
    "px-4 py-2 text-[14px] uppercase [font-family:'Sekuya'] text-[#2727DC] hover:bg-[#e6e6fa]";

  const loginClass =
    "rounded-full bg-[#FF4B55] px-5 py-[3px] text-[14px] uppercase text-white [font-family:'Sekuya'] " +
    "shadow-[0_3px_0_#B3202B] transition-transform hover:translate-y-[1px] hover:shadow-[0_2px_0_#B3202B]";

  return (
    <nav className="relative flex h-[55px] items-center bg-[#F9F9FB] border-2 border-[#8A4DF7] px-[24px]">
      
      <NavLink to="/" className="shrink-0 ml-[16px] md:ml-[96px]">
        <img src={UMSALogo} alt="UMSA Logo" className="h-[40px] w-[40px] object-contain" />
      </NavLink>

      
      <div className="hidden md:flex flex-1 items-center justify-evenly px-[40px]">
        <NavLink to="/" end className={linkClass}>Home</NavLink>

        <div
          className="relative"
          onMouseEnter={() => setOpenMenu('about')}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <button className={linkClass}>About</button>
          {openMenu === 'about' && (
            <div className="absolute left-0 top-full z-50 pt-2">
              <div className="flex min-w-[180px] flex-col rounded-md border border-[#2727DC] bg-[#F9F9FB] py-2 shadow-lg">
                <NavLink to="/About" className={dropdownItem}>About Us</NavLink>
                <NavLink to="/Team" className={dropdownItem}>Our Team</NavLink>
                <NavLink to="/Contact" className={dropdownItem}>Contact</NavLink>
              </div>
            </div>
          )}
        </div>


        <div
          className="relative"
          onMouseEnter={() => setOpenMenu('events')}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <button className={linkClass}>Events</button>
          {openMenu === 'events' && (
            <div className="absolute left-0 top-full z-50 pt-2">
              <div className="flex min-w-[180px] flex-col rounded-md border border-[#2727DC] bg-[#F9F9FB] py-2 shadow-lg">
                <NavLink to="/Events" className={dropdownItem}>Events</NavLink>
                <NavLink to="/Gallery" className={dropdownItem}>Photos</NavLink>
              </div>
            </div>
          )}
        </div>

        <NavLink to="/Sponsors" className={linkClass}>Sponsors</NavLink>
      </div>

      
      <div className="hidden md:block shrink-0">
        <NavLink to="/login" className={loginClass}>Login</NavLink>
      </div>

      
      <div className="ml-auto md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="block p-2 text-[#2727DC]" aria-label="Toggle menu">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      
      {isOpen && (
        <div className="md:hidden absolute left-0 top-full z-50 w-full border-2 border-t-0 border-[#8A4DF7] bg-[#F9F9FB]">
          <div className="flex flex-col gap-3 px-8 py-8 text-left">
            <NavLink to="/" end className={linkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/About" className={linkClass} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/Team" className={linkClass} onClick={() => setIsOpen(false)}>Team</NavLink>
            <NavLink to="/Contact" className={linkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
            <NavLink to="/Events" className={linkClass} onClick={() => setIsOpen(false)}>Events</NavLink>
            <NavLink to="/Gallery" className={linkClass} onClick={() => setIsOpen(false)}>Gallery</NavLink>
            <NavLink to="/Sponsors" className={linkClass} onClick={() => setIsOpen(false)}>Sponsors</NavLink>
            <NavLink to="/login" className={`${loginClass} self-start`} onClick={() => setIsOpen(false)}>Login</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}