import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-[#e9ddf6]">
      {/* Left: Logo */}
      <div className="bg-[#fbdcd4] px-6 py-2 rounded-full font-medium text-gray-700">
        Website Name
      </div>

      {/* Right: Nav Links */}
      <div className="flex space-x-4">
        {["Explore", "Sponsor", "About", "Submit"].map((item) => (
          <button
            key={item}
            className="bg-white hover:bg-gray-100 px-5 py-2 rounded-full text-gray-700 font-medium transition"
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
