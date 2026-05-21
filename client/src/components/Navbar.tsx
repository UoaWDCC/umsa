import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";

export default function Navbar() {
  // checks to see if dropdown is open or not
  const [isOpen, setIsOpen] = useState(false);

  // activates if isOpen updates
  const toggleDropdown = () => {
    // reverses isOpen i.e. if isOpen = True, !isOpen = False
    setIsOpen(!isOpen);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-white ${isActive ? "text-white font-semibold" : "text-gray-400"}`;

  return (

  <nav className="mx-6 py-4">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      
      <Link to="/" className="text-xl font-bold tracking-tight">
        UMSA
      </Link>

      {/* shows on desktop screens (hidden at first) */}
      <div className="hidden md:flex items-center gap-6 text-sm">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/About" className={linkClass}> About </NavLink>
        <NavLink to="/Events" className={linkClass}> Events</NavLink>
        <NavLink to="/sign-up" className={linkClass}>Sign Up</NavLink>
        <NavLink to="/Contact" className={linkClass}>Contact</NavLink>
        <NavLink to= "/Team" className={linkClass}> Team </NavLink>
        <NavLink to="/Sponsors" className={linkClass}> Sponsors </NavLink>
        <NavLink to="/Gallery" className={linkClass}>Gallery</NavLink>
        <NavLink to= "/faq" className={linkClass}> FAQ </NavLink> 
        <NavLink to="/project-team" className={linkClass}>Project Team</NavLink>
        {/* button to send user to sign up form via response link */}
        <a href="https://forms.gle/CQoE2nsZ9sGCWZqW8" target="_blank" rel="noopener noreferrer"
        className="px-6 py-1 rounded-full bg-blue-400 hover:bg-blue-700 hover:scale-110 
        transisition-transform duration-100">
          <button type="button" className="text-white font-bold cursor-pointer">Sign Up</button>
        </a>
      </div>

      {/* shows on small screens only (is hidden once screen size is big) */}
      <div className="md:hidden">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <button onClick={toggleDropdown} className="flex flex-col gap-1.5 lg:hidden p-2 text-white">

        {/* shows on desktop screens (hidden at first) */}
        <div className="hidden md:flex gap-6 text-sm">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/About" className={linkClass}>
            {" "}
            About{" "}
          </NavLink>
          <NavLink to="/Events" className={linkClass}>
            {" "}
            Events
          </NavLink>
          <NavLink to="/sign-up" className={linkClass}>
            Sign Up
          </NavLink>
          <NavLink to="/Contact" className={linkClass}>
            Contact
          </NavLink>
          <NavLink to="/Team" className={linkClass}>
            {" "}
            Team{" "}
          </NavLink>
          <NavLink to="/Sponsors" className={linkClass}>
            {" "}
            Sponsors{" "}
          </NavLink>
          <NavLink to="/Gallery" className={linkClass}>
            Gallery
          </NavLink>
          <NavLink to="/faq" className={linkClass}>
            {" "}
            FAQ{" "}
          </NavLink>
          <NavLink to="/project-team" className={linkClass}>
            Project Team
          </NavLink>
        </div>

        {/* shows on small screens only (is hidden once screen size is big) */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={toggleDropdown}
              className="flex flex-col gap-1.5 lg:hidden p-2 text-white"
            >
              {/* top line  */}
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-8 h-1 bg-white block transition-colors"
              />

              {/* middle Line */}
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-8 h-1 bg-white block transition-colors"
              />

              {/* bottom Line */}
              <motion.span
                animate={isOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
                className="w-8 h-1 bg-white block transition-colors"
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* if isOpen is true it runs the code in the block */}
      {isOpen && (
        // drop down options
        <div
          className="md:hidden absolute mt-2 left-0 w-full justify-items-start rounded-md bg-gray-900
          ring-black ring-opacity-5 focus:outline-none"
        >
          <div>
            <div className="flex flex-col justify-items-start px-8 py-10 gap-2 text-left whitespace-nowrap">
              <NavLink to="/" end className={linkClass} onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/sign-up"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </NavLink>

              <NavLink
                to="/Contact"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink
                to="/Team"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Team
              </NavLink>
              <NavLink
                to="/Sponser"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Sponsers
              </NavLink>
              <NavLink
                to="/Gallery"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </NavLink>
              <NavLink
                to="/faq"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </NavLink>
              <NavLink
                to="/project-team"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Project Team
              </NavLink>
              <a href="https://forms.gle/CQoE2nsZ9sGCWZqW8" target="_blank" rel="noopener noreferrer" 
              className="px-4 py-1 mr-1 rounded-full bg-blue-400 hover:bg-blue-700 hover:scale-110 
              transisition-transform duration-100">
                <button type="button" className="text-white font-bold cursor-pointer">Sign Up</button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
