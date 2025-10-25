import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { LogOut, ArrowLeft, ArrowRight, BarChart2, Settings, FileText, Mail, Users } from "lucide-react";

const SIDEBAR_WIDTH = 240;
const BUTTON_SIZE = 40;

const SidePanel = ({ navbarHeight = 64, isOpen, setIsOpen }) => {
  const location = useLocation(); // to highlight active route
  const navigate = useNavigate();

  const menuItems = [
  { name: "Stats", icon: <BarChart2 className="w-4 h-4 mr-2"/>, path: "/admin/stats" },
  { name: "Manage", icon: <Settings className="w-4 h-4 mr-2"/>, path: "/admin/manage" },
  { name: "Update Privacy and Terms", icon: <FileText className="w-4 h-4 mr-2"/>, path: "/admin/privacy" },
  { name: "Newsletter", icon: <Mail className="w-4 h-4 mr-2"/>, path: "/admin/newsletter" },
  { name: "Sponsors and Featured", icon: <Users className="w-4 h-4 mr-2"/>, path: "/admin/sponsors" },
  { name: "Update About", icon: <FileText className="w-4 h-4 mr-2"/>, path: "/admin/about" },
];

  const commonMenuItemClasses =
    "text-left text-sm p-2 rounded-lg flex items-center w-full transition-all";

  const buttonTopStyle = { top: `${navbarHeight + 8}px` };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`fixed z-50 p-2 bg-white border rounded-full shadow-md md:hidden transition-all duration-300
          ${isOpen ? `left-[${SIDEBAR_WIDTH - BUTTON_SIZE}px]` : "left-2"}`}
        style={buttonTopStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 bg-white shadow-xl p-4 font-sans flex flex-col transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:shadow-lg`}
        style={{ top: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)`, width: `${SIDEBAR_WIDTH}px` }}
      >
        <h1 className="text-xl font-semibold mb-6 text-gray-800">Admin</h1>

        <div className="flex flex-col gap-1 flex-grow overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname.endsWith(item.path);
            return (
              <Link
  key={index}
  to={item.path} // relative path
  className={`${commonMenuItemClasses} ${location.pathname.endsWith(item.path) ? "bg-black text-white" : "text-gray-700 hover:bg-gray-900 hover:text-gray-200"}`}
  onClick={() => setIsOpen(false)}
>
  {item.icon}
  <span className="truncate">{item.name}</span>
</Link>

            );
          })}
        </div>

        <div className="mt-4">
          <button
            className={`${commonMenuItemClasses} text-gray-700 hover:bg-red-50 hover:text-red-600`}
            onClick={() => {
              console.log("Logging out...");
              setIsOpen(false);
               navigate("/");
            }}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
