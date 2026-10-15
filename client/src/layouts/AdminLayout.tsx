import { useState } from "react";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  FiCalendar,
  FiExternalLink,
  FiHelpCircle,
  FiHome,
  FiImage,
  FiLogOut,
  FiMenu,
  FiTag,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { useLogout, useMe } from "../hooks/useAuth";
import logo from "../assets/brand/umsa-logo.png";

// Adding an admin page = one entry here + one route in main.tsx.
const MENU: { to: string; label: string; Icon: IconType }[] = [
  { to: "/admin/home-content", label: "Homepage text", Icon: FiHome },
  { to: "/admin/events", label: "Events", Icon: FiCalendar },
  { to: "/admin/team", label: "Team members", Icon: FiUsers },
  { to: "/admin/sponsors", label: "Sponsors", Icon: FiTag },
  { to: "/admin/gallery", label: "Gallery", Icon: FiImage },
  { to: "/admin/faqs", label: "FAQs", Icon: FiHelpCircle },
];

export default function AdminLayout() {
  const { data: me, isPending } = useMe();
  const logout = useLogout();
  const [navOpen, setNavOpen] = useState(false);

  if (isPending) {
    return (
      <div className="grid min-h-screen place-items-center bg-background-secondary text-sm text-foreground-secondary">
        Checking login…
      </div>
    );
  }

  if (!me) return <Navigate to="/admin/login" replace />;

  const nav = (
    <>
      <nav className="flex flex-1 flex-col gap-1">
        {MENU.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setNavOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-accent1-primary font-semibold text-white"
                  : "text-foreground-secondary hover:bg-blue-50 hover:text-accent1-primary"
              }`
            }
          >
            <Icon size={16} className="shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 space-y-1 border-t border-gray-150 pt-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground-secondary
            transition-colors hover:bg-blue-50 hover:text-accent1-primary"
        >
          <FiExternalLink size={16} className="shrink-0" /> View site
        </Link>
        <button
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm
            text-accent2-primary transition-colors hover:bg-red-50 disabled:opacity-50"
        >
          <FiLogOut size={16} className="shrink-0" />
          {logout.isPending ? "Logging out…" : "Log out"}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background-secondary lg:flex">
      {/* mobile bar: the sidebar collapses behind it below lg */}
      <div className="flex items-center justify-between border-b border-gray-150 bg-white px-4 py-3 lg:hidden">
        <span className="flex items-center gap-2">
          <img src={logo} alt="" className="h-8 w-8 object-contain" />
          <span className="font-heading text-base text-accent1-primary">
            UMSA Admin
          </span>
        </span>
        <button
          onClick={() => setNavOpen((v) => !v)}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          className="text-accent1-primary"
        >
          {navOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {navOpen && (
        <div className="flex flex-col border-b border-gray-150 bg-white p-4 lg:hidden">
          {nav}
        </div>
      )}

      <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-150 bg-white p-4 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div className="mb-6 flex items-center gap-3 px-1">
          <img
            src={logo}
            alt=""
            className="h-10 w-10 shrink-0 object-contain"
          />
          <div className="min-w-0">
            <p className="font-heading text-base leading-tight text-accent1-primary">
              UMSA Admin
            </p>
            <p className="truncate text-xs text-foreground-tertiary">
              {me.email}
            </p>
          </div>
        </div>
        {nav}
      </aside>

      <main className="min-w-0 flex-1 px-5 py-6 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
