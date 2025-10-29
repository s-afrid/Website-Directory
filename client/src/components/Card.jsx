import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedCompany } from "../context/SelectedCompanyContext";

const Card = ({ company }) => {
  const navigate = useNavigate();
  const { setSelectedCompany } = useSelectedCompany();

  if (!company) return null;

  const {
    title = "Untitled",
    imageURL = "",
    oneLineDesc = "",
    isFeatured = false,
    isSponsored = false,
    details = {},
    tags = {},
  } = company;

  const price = details?.monRevenue || "N/A";
  const tagList = [tags?.industry, tags?.type].filter(Boolean);
  const badge = isSponsored ? "Sponsored" : isFeatured ? "Featured" : null;

  const handleClick = () => {
    setSelectedCompany(company); // store clicked company
    navigate(`/details/${company._id}`, { state: { company }}); // navigate to details page
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col w-full sm:w-[45%] md:w-[30%] bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden font-[Rubik] cursor-pointer border border-gray-200"
    >
      {/* Image Section */}
      <div className="relative w-full h-64 md:h-72 lg:h-80">
        {imageURL ? (
          <img
            src={imageURL}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}

        {badge && (
          <div className="absolute top-3 right-3">
            <div
              className={`text-xs font-medium px-3 py-1 rounded-full shadow-sm ${
                isSponsored
                  ? "bg-green-500 text-white border border-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {badge}
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {oneLineDesc && (
          <p className="text-sm text-gray-600 line-clamp-2">{oneLineDesc}</p>
        )}

        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {tagList.map((tag, index) => (
              <span
                key={index}
                className="text-xs md:text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {price && (
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              {price}/Month
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
