import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle state for mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = ["Explore", "Sponsor", "About", "Submit"];

  return (
    <nav className="mx-3 mt-3">
      <div className="flex items-center justify-between px-4 py-3 bg-[#adb5bd] rounded-t-xl md:px-8">
        {/* Left: Logo/Title */}
        <div className="bg-black px-6 py-2 rounded-full font-medium text-white font-['Rubik'] text-lg">
          Website Directory
        </div>

        {/* Right: Desktop Nav Links (Visible on md and up) */}
        <div className="hidden space-x-4 md:flex font-['Rubik']">
          {navItems.map((item) => (
            <button
              key={item}
              className="px-5 py-2 font-medium text-gray-700 transition bg-white rounded-full hover:bg-gray-100"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button (Visible only on small screens) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {/* Hamburger/Close Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {/* Show Close icon when menu is open */}
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                /* Show Hamburger icon when menu is closed */
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Conditionally displayed below the main nav bar) */}
      <div 
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100 p-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-stretch space-y-2 bg-gray-100 rounded-xl p-3 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item}
              className="w-full px-5 py-2 font-medium text-gray-700 transition bg-white rounded-lg hover:bg-gray-200 text-left"
              onClick={() => {
                // Add your navigation logic here
                setIsOpen(false); // Close menu after clicking
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
