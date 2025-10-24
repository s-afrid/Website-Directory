import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Explore', href: '#explore' },
    { name: 'Sponsor', href: '#sponsor' },
    { name: 'About', href: '#about' },
    { name: 'Submit', href: '#submit' },
  ];

  const baseLinkClass = "text-gray-700 transition-colors duration-200 font-medium tracking-wide";
  const mobileLinkClass = "py-3 w-full text-center";

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-200">
      {/* Inner container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="shrink-0">
            <a href="#" className="text-2xl font-bold text-gray-900 tracking-tighter">
              INSPIRO
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 w-auto">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${baseLinkClass} ${
                  item.name === 'Submit'
                    ? 'bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white w-auto'
                    : 'hover:text-gray-900'
                }`}
              >
                {item.name}
              </a>
            ))}
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/80 backdrop-blur-lg shadow-lg py-2 border-t border-gray-100">
          <div className="flex flex-col items-center">
            {navItems.map((item) =>
              item.name === 'Submit' ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${baseLinkClass} w-11/12 text-center my-2 py-2 bg-black text-white rounded-md hover:bg-gray-800 hover:text-white`}
                >
                  {item.name}
                </a>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${baseLinkClass} ${mobileLinkClass} border-b border-gray-200 hover:text-gray-900`}
                >
                  {item.name}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
