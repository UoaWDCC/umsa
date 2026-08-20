import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useLogout, useMe } from "../hooks/useAuth";

// Adding an admin page = one entry here + one route in main.tsx.
const MENU = [{ to: "/admin/home-content", label: "Homepage text" }];

export default function AdminLayout() {
  const { data: me, isPending } = useMe();
  const logout = useLogout();

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-950 grid place-items-center text-gray-400">
        Checking login…
      </div>
    );
  }

  // if not logged in -> redirect
  if (!me) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <aside className="w-64 flex flex-col border-r border-gray-800 p-4">
        <h2 className="text-lg font-bold mb-1">UMSA Admin</h2>
        <p className="text-xs text-gray-400 mb-6">{me.email}</p>
        <nav className="flex flex-col gap-1 flex-1">
          {MENU.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition ${isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="mt-4 rounded-lg px-3 py-2 text-sm text-left text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50"
        >
          {logout.isPending ? "Logging out…" : "Log out"}
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
