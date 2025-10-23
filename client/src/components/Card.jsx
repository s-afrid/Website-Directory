import React from 'react';
import { Rocket } from 'lucide-react';

/**
 * Renders a single, responsive card component in the original requested style.
 * Includes robust overflow handling for tags and status badge logic.
 * @param {object} data - The startup data object ({ name, tags, revenue, status })
 */
const Card = ({ data = {} }) => {
  // Add safe defaults to prevent destructuring errors if data is incomplete
  const { 
    name = "Loading Website...", 
    tags = ["Tag 1", "Tag 2", "Tag 3"], 
    revenue = "$0/Month", 
    status = "normal" 
  } = data;

  // Determine the primary badge to display (FEATURED or SPONSORED)
  const isFeatured = status === 'featured';
  const isSponsored = status === 'sponsored';

  const getStatusBadge = () => {
    if (isFeatured) {
      return { text: "FEATURED", className: "bg-pink-600" };
    }
    if (isSponsored) {
      return { text: "SPONSORED", className: "bg-blue-600" };
    }
    return null;
  };

  const badge = getStatusBadge();

  return (
    <div className='flex flex-col max-w-xs w-full h-96 bg-gray-200 rounded-xl font-["Rubik"] shadow-md transition-shadow hover:shadow-xl'>
      
      {/* Image Placeholder - W:95%, H:75% of card height */}
      <div className="image w-[95%] h-[75%] bg-gray-500 mx-2 mt-2 rounded-xl self-center flex items-center justify-center relative">
        <Rocket size={40} className="text-gray-400" /> 
        
        {/* Status Badge (FEATURED/SPONSORED) */}
        {badge && (
          <span className={`absolute top-3 left-3 ${badge.className} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}>
            {badge.text}
          </span>
        )}
      </div>

      {/* Website Name */}
      <div className="name text-lg m-3 font-semibold text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
      </div>

      {/* Tags and Revenue Section */}
      <div className='flex justify-between items-end pb-3'> 
          
          {/* Tags Container with overflow hidden */}
          {/* Max-w-[65%] ensures space is reserved for the revenue tag */}
          <div className="tags ml-2 flex text-[7px] md:text-[10px] gap-2 overflow-hidden max-w-[65%]">
              {tags.map((tag, index) => ( 
                  <span key={index} className='py-1 px-3 text-white bg-black rounded-full shrink-0 whitespace-nowrap'>
                      {tag}
                  </span>
              ))}
          </div>
          
          {/* Revenue Tag */}
          <div className="revenue text-[9px] md:text-[11px] mr-2 my-1.5">
              <span className='font-bold text-green-500 py-2 px-3 bg-white rounded-full shadow-sm'>
                  {revenue}
              </span>
          </div>
      </div>
    </div>
  );
};

export default Card;
