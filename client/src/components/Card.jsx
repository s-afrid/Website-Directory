import React from "react";

const Card = ({
  title = "Ragged Edge",
  description = "Intelligent robotics transforming manufacturing.",
  tags = ["SaaS", "Landing Page"],
  price = "$10K/Month",
  image = "",
  featured = false,
  sponsored = false,
  link = "#",
}) => {
  return (
   <div className="flex flex-col max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden font-[Rubik] cursor-pointer h-[45vh] border border-gray-200 m-2">
      {/* 🔹 Image Section - 70% height */}
      <a href={link} target="_blank" rel="noopener noreferrer" className="relative w-[95%] h-[73%] block m-3">
        <div className="relative w-full h-full overflow-hidden rounded-3xl self-center border border-gray-200 flex flex-col ">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 mx-3 rounded-3xlshadow-sm hover:shadow-md self-center"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-b from-gray-900 to-gray-700 m-3" />
          )}

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2 m-2">
            {featured && (
              <div className="bg-white text-gray-800 text-[13px] font-medium px-3 py-1 rounded-full shadow-sm">
                Featured
              </div>
            )}
            {sponsored && (
              <div className="bg-green-400 text-white text-[13px] font-medium px-3 py-1 rounded-full shadow-sm border border-white">
                Sponsored
              </div>
            )}
          </div>

          {/* Overlay Text */}
          {description && (
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <p className="text-white text-[15px] sm:text-[16px] text-center leading-snug">
                {description}
              </p>
            </div>
          )}
        </div>
      </a>

      {/* 🔹 Info Section - 30% height */}
      <div className="p-4 flex flex-col gap-2 flex-1 h-[30%]">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        {/* Tags & Price Row */}
        <div className="flex justify-between items-center mt-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-[13px] bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          {price && (
            <span className="text-[14px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap ml-2">
              {price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
