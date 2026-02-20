import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu } from "lucide-react";

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const baseLink = "block px-4 py-2 text-sm font-medium rounded-lg transition";

  const activeLink = "bg-gray-200 text-black";

  const normalLink = "text-gray-600 hover:bg-gray-100";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative z-40 bg-white border-r
          w-64 h-screen flex flex-col
          overflow-hidden   /* 🔥 Prevent sidebar scrolling */
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6">
          <div className="mb-10">
            <h1 className="text-xl font-semibold tracking-tight">
              Store Rating
            </h1>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>

          <nav className="space-y-2">
            {user?.role === "ADMIN" && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : normalLink}`
                }
              >
                Dashboard
              </NavLink>
            )}

            {user?.role === "USER" && (
              <NavLink
                to="/stores"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : normalLink}`
                }
              >
                Stores
              </NavLink>
            )}

            {user?.role === "OWNER" && (
              <NavLink
                to="/owner"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : normalLink}`
                }
              >
                Owner Dashboard
              </NavLink>
            )}
          </nav>
        </div>
        <div className="flex-1"></div>

        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-red-500 border border-red-200 rounded-lg px-4 py-2 transition hover:bg-red-50 hover:border-red-300"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b p-4 flex justify-between items-center z-50">
        <h1 className="text-lg font-semibold">Store Rating</h1>
        <button onClick={() => setOpen(!open)}>
          <Menu size={20} />
        </button>
      </div>

      <main className="flex-1 overflow-y-auto p-6 md:p-10 mt-16 md:mt-0">
        {children}
      </main>
    </div>
  );
}
