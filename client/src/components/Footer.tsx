import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/about-us/badge.svg";
import footerWave from "../assets/about-us/Vector 27.svg";

const LEFT_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/events", label: "Our Events" },
  { to: "/team", label: "Meet the Team" },
];

const RIGHT_LINKS = [
  { to: "/gallery", label: "Photos" },
  { to: "/contact", label: "Contact Us" },
];

const SOCIALS = [
  { href: "https://www.facebook.com/", Icon: FaFacebookF, label: "Facebook" },
  { href: "https://www.instagram.com/", Icon: FaInstagram, label: "Instagram" },
  { href: "https://twitter.com/", Icon: FaTwitter, label: "Twitter" },
];

const LINK =
  "block font-heading text-[13px] tracking-[0.1em] uppercase transition-opacity " +
  "hover:opacity-70 md:text-base";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-accent1-primary pt-12 pb-14 text-white">
      <img
        src={footerWave}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-full h-10 w-full object-cover object-top"
      />
      <div
        className="mx-auto grid max-w-5xl items-center gap-8 px-6
          md:grid-cols-[1fr_auto_1fr] md:gap-12"
      >
        <nav className="space-y-2 md:justify-self-end md:text-right">
          {LEFT_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={LINK}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          aria-label="UMSA home"
          className="justify-self-start md:justify-self-center"
        >
          <img src={logo} alt="" className="w-28 md:w-40" />
        </Link>

        <div className="space-y-2">
          <nav className="space-y-2">
            {RIGHT_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={LINK}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4 pt-3">
            {SOCIALS.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white
                  text-accent1-primary transition-transform hover:scale-110 md:h-11 md:w-11"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
