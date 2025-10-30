import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOut,
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Settings,
  FileText,
  Mail,
  Users,
  UserStar,
} from "lucide-react";

const SIDEBAR_WIDTH = 240;

export default function SidePanel({ navbarHeight = 64, isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Stats", icon: <BarChart2 className="w-4 h-4 mr-2" />, path: "/admin/stats" },
    { name: "Manage", icon: <Settings className="w-4 h-4 mr-2" />, path: "/admin/manage" },
    { name: "Update Privacy & Terms", icon: <FileText className="w-4 h-4 mr-2" />, path: "/admin/privacy" },
    { name: "Newsletter", icon: <Mail className="w-4 h-4 mr-2" />, path: "/admin/newsletter" },
    { name: "Sponsors & Featured", icon: <Users className="w-4 h-4 mr-2" />, path: "/admin/sponsors" },
    { name: "Update About", icon: <FileText className="w-4 h-4 mr-2" />, path: "/admin/about" },
    { name: "Update Admin", icon: <UserStar className="w-4 h-4 mr-2" />, path: "/admin/updateadmin" },
  ];

  const commonMenuItemClasses =
    "text-left text-sm p-2 rounded-lg flex items-center w-full transition-all";

  // ✅ Logout clears token + resets state + returns to login popup
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminTokenExpiry");
    navigate('/');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="fixed z-50 p-2 bg-white border rounded-full shadow-md md:hidden transition-all duration-300"
        style={{
          top: `${navbarHeight + 8}px`,
          left: isOpen ? "190px" : "10px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 bg-white shadow-xl p-4 font-sans flex flex-col transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:shadow-lg`}
        style={{
          top: `${navbarHeight}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
          width: `${SIDEBAR_WIDTH}px`,
        }}
      >
        <h1 className="text-xl font-semibold mb-6 text-gray-800">Admin</h1>

        {/* Menu Items */}
        <div className="flex flex-col gap-1 flex-grow overflow-y-auto">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={false} // so active works for nested routes
              className={({ isActive }) =>
                `${commonMenuItemClasses} ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-900 hover:text-gray-200"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-4">
          <button
            className={`${commonMenuItemClasses} text-gray-700 hover:bg-red-50 hover:text-red-600`}
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
