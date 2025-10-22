import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import Card from './Card';

// --- Individual Card Component (Included for self-containment and to resolve import error) ---
/**
 * Renders a single, responsive card component in the original requested style.
 * Includes robust overflow handling for tags and status badge logic.
 * @param {object} data - The startup data object ({ name, tags, revenue, status })
 */

// --- Data Structure Placeholder ---
const mockCards = Array.from({ length: 30 }).map((_, index) => {
  let status = 'normal';
  
  // Set explicit status for the first three cards (index 0, 1, 2)
  if (index === 0) {
    status = 'featured';   // Card 1: Featured
  } else if (index === 1) {
    status = 'normal';    // Card 2: Normal
  } else if (index === 2) {
    status = 'sponsored'; // Card 3: Sponsored
  } 
  // All other cards (index 3 and above) will default to 'normal', 
  // ensuring no random sponsored/featured cards appear in the grid after the first row.

  return {
    id: index + 1,
    name: `Startup Example ${index + 1}`,
    tags: [
      index % 4 === 0 ? "Fintech" : "SaaS",
      index % 2 === 0 ? "Website" : "App",
      index % 5 === 0 ? "Bold" : "Minimalist",
      "Longer Tag" 
    ].slice(0, 3), // Keep max 4 tags for consistency
    revenue: `$${Math.floor(Math.random() * 20 + 5)}k/Month`,
    status: status,
  }
});


// --- Card Container Component (Responsive Grid) ---
const CardContainer = () => {
  const [visibleCards, setVisibleCards] = useState(9);
  const totalCards = mockCards.length;

  const handleLoadMore = () => {
    // Increase by 9, but don't exceed the total card count
    setVisibleCards((prev) => Math.min(prev + 9, totalCards));
  };

  return (
    <div className="flex flex-col items-center justify-center px-3 mb-12 font-['Rubik']">
      
      {/* Responsive Grid Container */}
      <div className="
        grid gap-8 
        grid-cols-1            /* Default: 1 column */
        sm:grid-cols-2         /* Small screens (tablets): 2 columns */
        lg:grid-cols-3         /* Large screens (desktop): 3 columns */
        max-w-6xl w-full       /* Ensures content is centered and capped */
      ">
        {/* Render only the visible cards */}
        {mockCards.slice(0, visibleCards).map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </div>

      {/* Load More Button - Only display if there are more cards to load */}
      {visibleCards < totalCards && (
        <button
          onClick={handleLoadMore}
          className="
            mt-12 px-10 py-3
            bg-gray-800 text-white font-semibold
            rounded-xl
            shadow-lg
            hover:bg-black 
            transition duration-200
            transform hover:scale-[1.02]
          "
        >
          Load More Examples
        </button>
      )}
    </div>
  );
};

export default CardContainer;
