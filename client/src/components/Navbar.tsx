import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

/* The two separators the frames put in the marquee, copied out of SPONSORS.svg:
   a chunky organic star in red and a four-point sparkle in pale pink. In the
   design they are 82-100px tall on a 54px strip — nearly twice its height — so
   they burst out of the band and get clipped by it rather than sitting neatly
   inside. Their sizes and vertical offsets vary, which is what stops the strip
   looking like a row of identical stamps. */
const SEPARATORS = [
  {
    d: "M97.9739 34C97.9739 34 99.0797 59.9829 111.186 65.7023C117.501 68.6858 129 67.1907 129 67.1907C129 67.1907 117.35 73.4959 115.639 80.7349C113.607 89.3386 125.14 101.274 125.14 101.274C125.14 101.274 115.491 92.3442 106.732 94.1302C97.9739 95.9163 72.4405 130 72.4405 130C72.4405 130 85.5041 100.084 81.3475 91.8977C77.1909 83.7116 38 76.2698 38 76.2698C38 76.2698 85.5041 72.6977 89.5122 65.7023C93.5204 58.707 97.9739 34 97.9739 34Z",
    box: "38 34 91 96",
    fill: "var(--color-accent2-primary)",
    scale: 1.85,
    shift: "-6%",
    spin: 26,
  },
  {
    d: "M528.623 51.4523L535.581 12L540.958 51.4523L560.566 37.5651L544.12 53.6616L569 59.1323L544.12 65.2343L560.566 84.2766L540.958 67.128L535.581 109L528.623 67.654L509.226 84.2766L525.355 65.2343L499 59.1323L525.355 53.6616L509.226 37.5651L528.623 51.4523Z",
    box: "499 12 70 97",
    fill: "var(--color-red-100)",
    scale: 1.7,
    shift: "-14%",
    spin: 0,
  },
  {
    d: "M968.935 40C968.935 40 967.975 67.0655 957.465 73.0233C951.983 76.131 942 74.5736 942 74.5736C942 74.5736 952.114 81.1416 953.599 88.6822C955.363 97.6444 945.351 110.078 945.351 110.078C945.351 110.078 953.728 100.775 961.331 102.636C968.935 104.496 991.101 140 991.101 140C991.101 140 979.76 108.837 983.369 100.31C986.977 91.7829 1021 84.031 1021 84.031C1021 84.031 979.76 80.3101 976.281 73.0233C972.801 65.7364 968.935 40 968.935 40Z",
    box: "942 40 79 100",
    fill: "var(--color-accent2-primary)",
    scale: 1.95,
    shift: "8%",
    spin: -32,
  },
  {
    d: "M1405.97 81.3514L1411.83 48L1416.36 81.3514L1432.89 69.6117L1419.03 83.2191L1440 87.8438L1419.03 93.0022L1432.89 109.1L1416.36 94.603L1411.83 130L1405.97 95.0477L1389.62 109.1L1403.21 93.0022L1381 87.8438L1403.21 83.2191L1389.62 69.6117L1405.97 81.3514Z",
    box: "1381 48 59 82",
    fill: "var(--color-red-100)",
    scale: 1.5,
    shift: "10%",
    spin: 0,
  },
];

function Separator({ index }: { index: number }) {
  const reduced = useReducedMotion();
  const sep = SEPARATORS[index % SEPARATORS.length];
  const [x, y, w, h] = sep.box.split(" ").map(Number);

  return (
    <motion.svg
      aria-hidden
      className="pointer-events-none shrink-0"
      viewBox={`${x} ${y} ${w} ${h}`}
      style={{ height: `${sep.scale * 100}%`, width: "auto", translateY: sep.shift }}
      animate={reduced || !sep.spin ? undefined : { rotate: 360 }}
      transition={
        reduced || !sep.spin
          ? undefined
          : { duration: Math.abs(sep.spin), repeat: Infinity, ease: "linear" }
      }
    >
      <path d={sep.d} fill={sep.fill} />
    </motion.svg>
  );
}

/* The blue marquee strip under the navbar. The home frame runs "I ♥ MALAYSIA";
   every other frame runs "WELCOME TO UMSA".

   The track has to be wider than the viewport or the -50% loop shows a gap, and
   a zoomed-out browser makes the viewport far wider than any fixed number of
   copies would cover. So one copy is measured and the count is derived from it. */
function Marquee() {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const home = pathname === "/";

  const viewport = useRef<HTMLDivElement>(null);
  const sample = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(4);

  useLayoutEffect(() => {
    const measure = () => {
      const unit = sample.current?.offsetWidth ?? 0;
      const width = viewport.current?.offsetWidth ?? 0;
      if (!unit || !width) return;
      // enough copies to fill the strip, then the same again so -50% is seamless
      setCopies(Math.max(2, Math.ceil(width / unit) + 1));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [home]);

  const unit = (i: number) => (
    <div className="flex h-full shrink-0 items-center gap-5 pr-5 sm:gap-7 sm:pr-7">
      <Separator index={i} />
      <span className="font-heading text-xs tracking-[0.22em] whitespace-nowrap text-white sm:text-sm">
        {home ? (
          <>
            I <span className="text-accent2-primary">&#9829;</span> Malaysia
          </>
        ) : (
          "Welcome to UMSA"
        )}
      </span>
    </div>
  );

  return (
    <div ref={viewport} className="relative flex h-9 items-center overflow-hidden bg-accent1-primary sm:h-11">
      {/* measured off-screen so the copy count can be derived from real widths */}
      <div ref={sample} className="pointer-events-none invisible absolute top-0 left-0 flex h-full">
        {unit(0)}
      </div>

      <motion.div
        className="flex h-full w-max"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduced ? undefined : { duration: copies * 3.2, repeat: Infinity, ease: "linear" }
        }
      >
        {/* the track, then an identical second half for the -50% wrap */}
        {Array.from({ length: copies * 2 }, (_, i) => (
          <div key={i} className="flex h-full shrink-0">
            {unit(i)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const LINK_BASE = "font-heading text-[13px] tracking-[0.12em] uppercase transition-colors";

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
          active ? "text-accent2-primary" : "text-accent1-primary hover:text-accent2-primary"
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
      isActive ? "text-accent2-primary" : "text-accent1-primary hover:text-accent2-primary"
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
                {ABOUT_MENU.concat(LINKS.filter((l) => l.to !== "/")).map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`py-2 ${LINK_BASE} text-accent1-primary`}
                  >
                    {link.label}
                  </NavLink>
                ))}
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
