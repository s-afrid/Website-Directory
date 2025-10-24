import React from "react";

const DetailsHeader = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-6 bg-[#00796B] font-sans text-white">

      {/* Header Section */}
      <div className="text-center mb-4 w-full max-w-3xl flex-shrink-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1">
          Endex Website Design
        </h1>
        <p className="text-sm sm:text-base md:text-lg opacity-80 mb-3">
          Introducing tars — a modern, trendy & playful multi-layout
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          <a
            href="https://www.endrex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-white bg-[#263238] hover:bg-[#37474F] transition duration-300 flex items-center justify-center text-sm font-medium"
          >
            www.endrex.com
          </a>
          <button className="px-4 py-2 rounded-lg text-white bg-white/10 hover:bg-white/20 border border-white/30 transition duration-300 flex items-center justify-center gap-1 text-sm font-medium">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Mockup Frame Section */}
      <div className="w-full max-w-4xl bg-[#263238] rounded-xl p-2 sm:p-3 shadow-xl flex flex-col justify-between h-[calc(100%-6rem)]">
        <div className="bg-[#1a2226] rounded-lg p-2 sm:p-3 text-[#E0E0E0] flex flex-col gap-3 h-full">

          {/* Mockup Navbar */}
          <div className="flex justify-between items-center border-b border-white/10 pb-2 text-xs sm:text-sm">
            <span className="font-bold text-white">Endex</span>
            <div className="bg-[#004D40] px-2 py-1 rounded-full text-[10px] sm:text-xs text-[#A7FFEB] text-center whitespace-nowrap overflow-hidden text-ellipsis">
              ANNOUNCING SEAM LED BY SNEHAL STARTUP FUND
            </div>
            <button className="px-2 py-1 rounded-md text-white bg-[#00796B] hover:bg-[#00695C] transition text-xs flex items-center gap-1">
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </button>
          </div>

          {/* Main Content */}
          <div className="text-center flex flex-col justify-center flex-shrink-0">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-1 text-white">
              AI Built For Excel
            </h2>
            <p className="text-xs sm:text-sm md:text-base opacity-80 mb-2 max-w-md mx-auto">
              An Excel-native AI Agent that accelerates financial modeling and data analysis
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
              <button className="px-4 py-1 rounded-lg text-white bg-[#00796B] hover:bg-[#00695C] transition duration-300 text-sm font-semibold">
                Join Waitlist
              </button>
              <button className="px-4 py-1 rounded-lg text-white bg-transparent border border-white/30 hover:bg-white/10 transition duration-300 text-sm font-semibold">
                Enterprise sales
              </button>
            </div>
          </div>

          {/* Mockup Image */}
          <div className="w-full flex justify-center flex-grow">
            <div className="relative w-full max-h-[35vh] sm:max-h-[40vh] md:max-h-[45vh] rounded-lg overflow-hidden shadow-md aspect-video">
              <div className="absolute inset-0 bg-[#37474F] flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/30 rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-white text-2xl sm:text-3xl ml-1">▶</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
