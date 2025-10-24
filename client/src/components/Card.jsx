import React from "react";

const Card = ({
  title = "Ragged Edge",
  tags = ["SaaS", "Landing Page"],
  price = "$10K/Month",
  image = "",
  featured = false,
  sponsored = false,
  link = "#",
}) => {
  return (
    <div className="flex flex-col w-full sm:w-[45%] md:w-[30%] bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden font-[Rubik] cursor-pointer border border-gray-200">
      
      {/* Image Section */}
      <a href={link} target="_blank" rel="noopener noreferrer" className="relative w-full h-64 md:h-72 lg:h-80">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {featured && (
            <div className="bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
              Featured
            </div>
          )}
          {sponsored && (
            <div className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-white">
              Sponsored
            </div>
          )}
        </div>
      </a>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs md:text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          </div>
          {/* Price */}
        <div>
          {price && (
          <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit mt-2">
            {price}/Month
          </span>
        )}
        </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default Card;
