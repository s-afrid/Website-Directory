import React from "react";
import { useSelectedCompany } from "../context/SelectedCompanyContext";

const DetailsHeader = () => {
  const { selectedCompany } = useSelectedCompany();

  if (!selectedCompany) return <div>Loading...</div>;

  const { title, oneLineDesc, url, imageURL } = selectedCompany;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-6 bg-[#00796B] font-sans text-white">

      {/* Header Section */}
      <div className="text-center mb-4 w-full max-w-3xl flex-shrink-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg opacity-80 mb-3">
          {oneLineDesc}
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-white bg-[#263238] hover:bg-[#37474F] transition duration-300 flex items-center justify-center text-sm font-medium"
            >
              Visit Website
            </a>
          )}

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

      {/* Responsive Image Section */}
      {imageURL && (
        <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg mt-6">
          <img
            src={imageURL}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
    </div>
  );
};

export default DetailsHeader;
