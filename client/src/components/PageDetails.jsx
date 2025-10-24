import React from 'react';
import { User, Calendar, Users, MapPin, DollarSign, Briefcase } from 'lucide-react';

// Data for the details section
const statItems = [
  { icon: User, title: 'Founder', value: 'Tooba Durraze', color: 'text-[#12B76A]' }, // Green icon
  { icon: Calendar, title: 'Founded', value: '2024', color: 'text-[#12B76A]' },
  { icon: Users, title: 'Team Size', value: '8 Employees', color: 'text-[#12B76A]' },
  { icon: MapPin, title: 'Location', value: 'San Francisco, USA', color: 'text-[#12B76A]' },
  { icon: DollarSign, title: 'Monthly Revenue', value: '6 Figures', color: 'text-[#12B76A]' },
  { icon: Briefcase, title: 'Funding', value: '$1.25M', color: 'text-[#12B76A]' },
];

// Data for the additional details column
const additionalDetails = [
  { label: 'Industry', value: 'AI Product Base Website' },
  { label: 'Type', value: 'Web application, Mobile app' },
  { label: 'Style', value: 'AI Product Base Website' },
  { label: 'Stack', value: 'Node.js, React, Html' },
];

const PageDetails = () => {
  return (
    // Main container: Uses min-h-screen to ensure full viewability on all devices
    // Background is white/light gray to match the image structure.
    // Max width set for desktop view, but w-full for responsiveness.
    <div className="min-h-screen w-full bg-white flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Description and Key Stats */}
        <div className="lg:col-span-2">
          {/* Description Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Description
          </h2>
          <div className="space-y-6 text-gray-700 text-lg">
            <p>
              Introducing tars—a modern, trendy & playful multi-layout Framer template crafted for SaaS and startup businesses. Experience the freedom of choice with an impressive array of 3 unique homepage layouts & 24+ ready-to-use pages, allowing you to effortlessly convey your offerings, tell your brand story, and engage visitors.
            </p>
            <p>
              With full CMS support and two dynamic variations, you're equipped to navigate the ever-changing digital landscape with ease.
            </p>
          </div>

          {/* Key Stats Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {statItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Icon Circle - Matching the distinct style in the image */}
                <div className={`p-3 rounded-full bg-white mr-4 shadow-sm border border-gray-100`}>
                    {/* The icons are colored using the item.color prop (simulating the distinct color) */}
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">{item.title}</span>
                  <span className="text-base font-semibold text-gray-900">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Additional Details (Sidebar) */}
        <div className="lg:col-span-1 border-t pt-8 lg:border-t-0 lg:pt-0">
          <div className="bg-white p-6 rounded-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
              Additional Detail
            </h2>
            
            <div className="space-y-4">
              {additionalDetails.map((detail, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">{detail.label}</span>
                  {/* The value text is styled to look like a link/tag in the image */}
                  <span className="text-base font-medium text-black hover:text-gray-900 underline underline-offset-1 cursor-pointer">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetails;