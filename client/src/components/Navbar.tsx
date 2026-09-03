import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";
import umsa  from "../assets/icons/umsa.png"
import redstar1 from "../assets/stars/redstar_left.svg"
import pinkstar from "../assets/stars/pinkstar.svg"
import redstar2 from "../assets/stars/redstar_right.svg"
import minipink from "../assets/stars/pinkstar_mini.svg"
import mini_heart from "../assets/mini_heart.svg"

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
    <nav className="relative z-50">
      <div className="mx-8 hidden md:flex gap-4 items-center justify-between text-sm text-nowrap transform: translate-x-()">
        <Link to="/" className="tracking-tight">
          <img src={umsa} className="max-w-15"/>
        </Link>
        {/* Desktop nav */}
        <div className="flex flex-1 min-w-0 items-center-safe justify-between gap-[clamp(0.75rem,3vw,2.5rem)] pl-[clamp(1rem,5vw,5rem)]">
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

      <div className="hidden md:flex bg-blue-500 h-13.5 overflow-hidden">
          <div className="flex w-full items-center justify-between px-[clamp(0.5rem,2vw,1.5rem)] gap-2 text-white">
            <img src={redstar1} className="h-[clamp(1.5rem,2.6vw,2.25rem)] w-auto shrink-0 -ml-[clamp(1rem,2.5vw,2rem)]"/>
            <p className="flex items-center gap-3 shrink-0">
              i <img src={mini_heart} className="w-4 h-4 inline-block" /> malaysia
            </p>
            <img src={pinkstar} className="h-[clamp(1.75rem,4vw,3.25rem)] w-auto shrink-0"/>
            <p className="flex items-center gap-3 shrink-0">
              i <img src={mini_heart} className="w-4 h-4 inline-block" /> malaysia
            </p>
            <img src={redstar2} className="h-[clamp(1.75rem,4vw,3.25rem)] w-auto shrink-0"/>
            <p className="flex items-center gap-3 shrink-0">
              i <img src={mini_heart} className="w-4 h-4 inline-block" /> malaysia
            </p>
            <img src={minipink} className="h-[clamp(1.75rem,4vw,3.25rem)] w-auto shrink-0"/>
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
                className="w-8 h-1 bg-accent1-primary block"
              />

              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-8 h-1 bg-accent1-primary block"
              />

              <motion.span
                animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                className="w-8 h-1 bg-accent1-primary block"
              />
            </button>
          </motion.div>
        </div>

      {/* Mobile dropdown */}
      {isOpen && (

        <div className="md:hidden absolute z-50 pb-10 mt-2 left-0 w-full rounded-md bg-gray-50 
        ring-black ring-opacity-5 focus:outline-none">
          <div className="mx-8 flex flex-col py-10 gap-6 text-left whitespace-nowrap border-y
           border-accent1-primary/40">
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