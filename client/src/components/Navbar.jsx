import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Explore", to: "/explore" },
    { name: "Sponsor", to: "/sponsor" },
    { name: "About", to: "/about" },
    { name: "Submit", to: "/submit" },
  ];

  const baseLinkClass =
    "transition-colors duration-300 font-medium tracking-wide";
  const mobileLinkClass = "py-3 w-full text-center";

  return (
    <nav className="sticky top-0 z-50 shadow-sm border-b border-gray-200 transition-all duration-300">
      {/* Top Navbar Bar */}
      <div
        className={`${
          isMenuOpen
            ? "bg-white" // solid white when menu open
            : "bg-white/70 backdrop-blur-lg" // glassy blur when closed
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="shrink-0">
              <Link
                to="/"
                className="text-2xl font-bold text-gray-900 tracking-tighter"
              >
                INSPIRO
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6 w-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`${baseLinkClass} ${
                      item.name === "Submit"
                        ? "bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white w-auto"
                        : `${
                            isActive
                              ? "text-green-500 font-semibold"
                              : "text-gray-700 hover:text-green-500"
                          }`
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-2 border-t border-gray-100 animate-fadeIn">
          <div className="flex flex-col items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return item.name === "Submit" ? (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${baseLinkClass} w-11/12 text-center my-2 py-2 bg-black text-white rounded-md hover:bg-gray-800 hover:text-white`}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${baseLinkClass} ${mobileLinkClass} border-b border-gray-200 ${
                    isActive
                      ? "text-green-500 font-semibold"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
