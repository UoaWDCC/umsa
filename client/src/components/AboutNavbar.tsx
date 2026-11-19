import { Link, NavLink } from "react-router-dom";
import mascot from "../assets/about-us/mascot.png";

const BLUE = "#2727DC";
const FONT = "'Sekuya', sans-serif";

const links = [
  { to: "/", label: "home", end: true },
  { to: "/about", label: "about" },
  { to: "/events", label: "events" },
  { to: "/sponsors", label: "sponsors" },
];

export default function AboutNavbar() {
  return (
    <header
  className="relative z-20 flex h-[55px] items-center justify-between px-6 lg:px-16"
  style={{ backgroundColor: "#F9F9FB" }}
    >
      <Link to="/" aria-label="UMSA home" className="shrink-0">
        <img src={mascot} alt="UMSA" className="h-10 w-auto" />
      </Link>

      <nav className="flex flex-1 items-center justify-around gap-2 px-4 md:px-12">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }: { isActive: boolean }) =>
              `text-xs md:text-xl ${isActive ? "underline underline-offset-4" : ""}`
            }
            style={{ fontFamily: FONT, color: BLUE, letterSpacing: "2px" }}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* TODO: there is no login page yet, so this points at sign-up */}
      <Link
        to="/sign-up"
        className="flex h-9 w-[136px] shrink-0 items-center justify-center rounded-[15px] text-lg"
        style={{
          backgroundColor: "#FF5252",
          color: "#F9F9FB",
          fontFamily: FONT,
          letterSpacing: "1.6px",
          boxShadow: "4px 4px 0 #990000",
        }}
      >
        login
      </Link>
    </header>
  );
}
