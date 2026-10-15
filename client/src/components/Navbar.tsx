import Marquee from "./Marquee";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/brand/umsa-logo.png";

/* The design groups the three "about the club" pages behind one ABOUT item that
   opens a panel; everything else stays top level. */
const ABOUT_MENU = [
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/team", label: "Our Team" },
];

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/events", label: "Events" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/gallery", label: "Photos" },
];

const LINK_BASE =
  "font-heading text-[13px] tracking-[0.12em] uppercase transition-colors";

/* The ABOUT item. The trigger is a real link to /about — hovering or tabbing
   into it opens the panel of sub-pages, so a click still goes somewhere useful
   and touch users get the same pages from the burger menu. */
function AboutMenu() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = ABOUT_MENU.some((item) => pathname === item.to);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <NavLink
        to="/about"
        onClick={() => setOpen(false)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`relative flex items-center gap-1 ${LINK_BASE} ${
          active
            ? "text-accent2-primary"
            : "text-accent1-primary hover:text-accent2-primary"
        }`}
      >
        About
        <FiChevronDown
          size={13}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-accent2-primary"
          />
        )}
      </NavLink>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute top-full left-1/2 z-50 w-44 -translate-x-1/2 rounded-lg
              bg-background-secondary py-2 shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
            style={{ marginTop: 8 }}
          >
            {ABOUT_MENU.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-2.5 ${LINK_BASE} ${
                    isActive
                      ? "text-accent2-primary"
                      : "text-accent1-primary hover:text-accent2-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative ${LINK_BASE} ${
      isActive
        ? "text-accent2-primary"
        : "text-accent1-primary hover:text-accent2-primary"
    }`;

  return (
    <header className="sticky top-0 z-50">
      <nav className="border-b-2 border-accent1-primary bg-background-primary">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2">
          <Link to="/" aria-label="UMSA home" className="shrink-0">
            <img src={logo} alt="UMSA" className="h-10 w-10 object-contain" />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <NavLink to="/" end className={linkClass}>
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-accent2-primary"
                    />
                  )}
                </>
              )}
            </NavLink>

            <AboutMenu />

            {LINKS.filter((l) => l.to !== "/").map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-accent2-primary"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* The design's pill, sitting on a hard offset shadow. Labelled
                "Sign up" — it is meant to point at the club's Google form; until
                that exists it goes to the CMS login so the demo has something
                behind it. Swap the `to` for an <a href> when the form is ready. */}
            <Link
              to="/admin/login"
              className="hidden rounded-full border-2 border-red-600 bg-accent2-primary px-5 py-1.5
                font-heading text-xs tracking-[0.12em] text-white uppercase
                shadow-[2px_2px_0_0_var(--color-red-600)] transition-transform
                hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none sm:block"
            >
              Sign up
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-accent1-primary lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-1 px-5 pb-4">
                <NavLink
                  to="/"
                  end
                  onClick={() => setOpen(false)}
                  className={`py-2 ${LINK_BASE} text-accent1-primary`}
                >
                  Home
                </NavLink>
                {ABOUT_MENU.concat(LINKS.filter((l) => l.to !== "/")).map(
                  (link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`py-2 ${LINK_BASE} text-accent1-primary`}
                    >
                      {link.label}
                    </NavLink>
                  ),
                )}
                <Link
                  to="/admin/login"
                  onClick={() => setOpen(false)}
                  className={`py-2 ${LINK_BASE} text-accent2-primary sm:hidden`}
                >
                  Sign up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Marquee />
    </header>
  );
}
