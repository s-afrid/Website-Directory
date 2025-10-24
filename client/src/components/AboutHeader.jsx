import React from 'react';
import ImageLeft from '../assets/about_header_imgs/left.png';
import ImageCenter from '../assets/about_header_imgs/center.png';
import ImageRight from '../assets/about_header_imgs/right.png';

export default function CreativeHero() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Hero Header */}
      <div className="text-center mb-16 px-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
          Where design
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
          inspiration meets real
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
          creativity.
        </h1>
      </div>

      {/* Images Grid */}
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Left Image */}
          <div className="flex-shrink-0 w-24 sm:w-44 md:w-60 lg:w-72 -ml-4 sm:-ml-6 md:-ml-8 lg:-ml-12">
            <img
              src={ImageLeft}
              alt="VALKY"
              className="w-full h-auto shadow-xl rounded-lg"
            />
          </div>

          {/* Center Image */}
          <div className="flex-shrink-0 w-40 sm:w-72 md:w-96 lg:w-[480px]">
            <img
              src={ImageCenter}
              alt="VIVIEN'S"
              className="w-full h-auto shadow-2xl rounded-lg"
            />
          </div>

          {/* Right Image */}
          <div className="shrink-0 w-24 sm:w-44 md:w-60 lg:w-72 -mr-4 sm:-mr-6 md:-mr-8 lg:-mr-12">
            <img
              src={ImageRight}
              alt="STUDIO OF"
              className="w-full h-auto shadow-xl rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
