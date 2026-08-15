import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";
import umsa  from "../assets/icons/umsa.png"
import redstar1 from "../assets/stars/redstar_left.svg"
import pinkstar from "../assets/stars/pinkstar.svg"
import redstar2 from "../assets/stars/redstar_right.svg"
import minipink from "../assets/stars/pinkstar_mini.svg"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-blue-600 ${
      isActive ? "text-blue-600 font-semibold" : "text-blue-500"
    }`;

  return (
    <nav>
      <div className="mx-8 hidden md:flex gap-4 items-center justify-between text-sm">
        <Link to="/" className="tracking-tight">
          <img src={umsa} className="max-w-15"/>
        </Link>
        {/* Desktop nav */}
        <div className="flex flex-1 items-center-safe justify-between gap-10 pl-[clamp(1rem,5vw,8rem)]">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/About" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/Team" className={linkClass}>
            Our Team
          </NavLink>
          <NavLink to="/Events" className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/Sponsors" className={linkClass}>
            Sponsors
          </NavLink>
          {/* <NavLink to="/sign-up" className={linkClass}>
            Sign Up
          </NavLink> */}
          <NavLink to="/Contact" className={linkClass}>
            Contact
          </NavLink>
          <NavLink to="/Gallery" className={linkClass}>
            Photos
          </NavLink>
          {/* <NavLink to="/project-team" className={linkClass}>
            Project Team
          </NavLink> */}
          {/* <NavLink to="/faq" className={linkClass} onClick={closeDropdown}>
            FAQ
          </NavLink> */}

          {/* <a
            href="https://forms.gle/CQoE2nsZ9sGCWZqW8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-1 rounded-full bg-blue-400 hover:bg-blue-700 hover:scale-110 transition-transform duration-100 text-white font-bold"
          >
            Sign Up
          </a> */}
        </div>
      </div>

      <div className="hidden md:flex bg-blue-500">
          <div className="flex w-full items-center justify-between">
            <img src={redstar1} className="max-w-16"/>
            <img src={pinkstar}/>
            <img src={redstar2}/>
            <img src={minipink}/>
          </div>
      </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">
            <img src={umsa} className="max-w-15"/>
          </Link>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex flex-col gap-1.5 p-2 text-white"
              aria-label="Toggle navigation menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                className="w-8 h-1 bg-white block"
              />

              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-8 h-1 bg-white block"
              />

              <motion.span
                animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                className="w-8 h-1 bg-white block"
              />
            </button>
          </motion.div>
        </div>

      {/* Mobile dropdown */}
      {isOpen && (

        <div className="md:hidden absolute mt-2 left-0 w-full rounded-md bg-gray-900 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col px-8 py-10 gap-2 text-left whitespace-nowrap">
            <NavLink to="/" end className={linkClass} onClick={closeDropdown}>
              Home
            </NavLink>
            <NavLink to="/About" className={linkClass} onClick={closeDropdown}>
              About
            </NavLink>
            <NavLink to="/Team" className={linkClass} onClick={closeDropdown}>
              Our Team
            </NavLink>
            <NavLink to="/Events" className={linkClass} onClick={closeDropdown}>
              Events
            </NavLink>
            <NavLink to="/Sponsors" className={linkClass} onClick={closeDropdown}>
              Sponsors
            </NavLink>
            {/* <NavLink to="/sign-up" className={linkClass} onClick={closeDropdown}>
              Sign Up
            </NavLink> */}
            <NavLink to="/Contact" className={linkClass} onClick={closeDropdown}>
              Contact
            </NavLink>
            <NavLink to="/Gallery" className={linkClass} onClick={closeDropdown}>
              Photos
            </NavLink>
            {/* <NavLink to="/faq" className={linkClass} onClick={closeDropdown}>
              FAQ
            </NavLink> */}
            <NavLink
              to="/project-team"
              className={linkClass}
              onClick={closeDropdown}
            >
              Project Team
            </NavLink>

            {/* <a
              href="https://forms.gle/CQoE2nsZ9sGCWZqW8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit px-4 py-1 mt-2 rounded-full bg-blue-400 hover:bg-blue-700 hover:scale-110 transition-transform duration-100 text-white font-bold"
            >
              Sign Up
            </a> */}
          </div>
        </div>
      )}
    </nav>
  );
}