import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SponsorInquiryForm from "./SponsorInquiryForm";
import SubmitToGetFeatured from "./SubmitForm";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // "sponsor" | "submit" | null
  const location = useLocation();

  const closeModal = () => setActiveModal(null);

  const navItems = [
    { name: "Explore", to: "/explore" },
    { name: "Sponsor", to: "#" },
    { name: "About", to: "/about" },
    { name: "Submit", to: "#" },
  ];

  const baseLinkClass =
    "transition-colors duration-300 font-medium tracking-wide";
  const mobileLinkClass = "py-3 w-full text-center";

  return (
    <>
      {/* 🔹 Navbar */}
      <nav className="sticky top-0 z-50 shadow-sm border-b border-gray-200 transition-all duration-300">
        <div
          className={`${
            isMenuOpen
              ? "bg-white"
              : "bg-white/70 backdrop-blur-lg"
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
                  SaaS Examples
                </Link>
              </div>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center space-x-6 w-auto">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to;

                  if (item.name === "Sponsor") {
                    return (
                      <button
                        key={item.name}
                        onClick={() => setActiveModal("sponsor")}
                        className={`${baseLinkClass} text-gray-700 hover:text-green-500`}
                      >
                        {item.name}
                      </button>
                    );
                  }

                  if (item.name === "Submit") {
                    return (
                      <button
                        key={item.name}
                        onClick={() => setActiveModal("submit")}
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white w-auto transition"
                      >
                        {item.name}
                      </button>
                    );
                  }

                  return (
                    <a
  key={item.name}
  href={item.to}
  className={`${baseLinkClass} ${
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-700 hover:text-green-500"
  }`}
>
  {item.name}
</a>

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

                if (item.name === "Sponsor") {
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveModal("sponsor");
                        setIsMenuOpen(false);
                      }}
                      className={`${baseLinkClass} ${mobileLinkClass} border-b border-gray-200 text-gray-700 hover:text-green-500`}
                    >
                      {item.name}
                    </button>
                  );
                }

                if (item.name === "Submit") {
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveModal("submit");
                        setIsMenuOpen(false);
                      }}
                      className={`${baseLinkClass} w-11/12 text-center my-2 py-2 bg-black text-white rounded-md hover:bg-gray-800 hover:text-white`}
                    >
                      {item.name}
                    </button>
                  );
                }

                return (
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

      {/* 🔹 Popup Modals */}
      {activeModal === "sponsor" && (
        <SponsorInquiryForm closeModal={closeModal} />
      )}
      {activeModal === "submit" && (
        <SubmitToGetFeatured closeModal={closeModal} />
      )}
    </>
  );
};

export default Navbar;
