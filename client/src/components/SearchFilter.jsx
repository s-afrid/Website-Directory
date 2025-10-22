import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

// --- Search and Filters Component (Responsive and Styled) ---
const SearchAndFilters = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState("");
  const [style, setStyle] = useState("");
  const [stack, setStack] = useState("");

  // Placeholder options
  const industryOptions = ["Fintech", "Health", "SaaS", "E-commerce"];
  const typeOptions = ["App", "Website", "Service"];
  const styleOptions = ["Minimalist", "Bold", "Retro"];
  const stackOptions = ["React", "Vue", "Next.js", "Ruby"];

  const handleSearch = () => {
    console.log("Search Query:", search);
    console.log("Filters Applied:", { industry, type, style, stack });
  };

  // Improved SelectInput component with custom arrow and no gap
  const SelectInput = ({ label, value, onChange, options }) => (
    // Relative wrapper for the custom arrow positioning
    <div className="relative w-full lg:w-auto flex-1 min-w-[120px] shadow-sm">
      <select
        value={value}
        onChange={onChange}
        // appearance-none hides the default browser arrow
        // pr-10 creates space inside the select for the custom icon
        className="w-full rounded-2xl px-4 py-3 pr-10 focus:ring-2 focus:ring-black focus:border-black appearance-none cursor-pointer transition text-gray-700 font-medium"
      >
        <option value="" disabled className="text-gray-400">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {/* Custom Arrow Icon - pointer-events-none ensures clicks fall through to the select element */}
      <ChevronDown
        size={18}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
      />
    </div>
  );

  return (
    // Responsive container: Stacks on mobile, wraps, and aligns center
    <div className="flex flex-col lg:flex-row items-center justify-center gap-3 p-4 mx-3 mb-6 font-['Rubik']">
      
      {/* Search Bar with Icon on Right (Made it fill more width on mobile) */}
      <div className="relative w-full lg:w-1/3 min-w-[250px]">
        <input
          type="text"
          placeholder="Search startups by name or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-xl pr-12 pl-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition text-gray-800 shadow-sm"
        />
        <Search
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-black transition"
          onClick={handleSearch}
          size={20}
        />
      </div>

      {/* Dropdowns Container: Wraps on smaller screens */}
      <div className="flex flex-wrap justify-center w-full lg:w-2/3 gap-3">
        <SelectInput 
          label="Industry" 
          value={industry} 
          onChange={(e) => setIndustry(e.target.value)} 
          options={industryOptions} 
        />
        <SelectInput 
          label="Type" 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          options={typeOptions} 
        />
        <SelectInput 
          label="Style" 
          value={style} 
          onChange={(e) => setStyle(e.target.value)} 
          options={styleOptions} 
        />
        <SelectInput 
          label="Stack" 
          value={stack} 
          onChange={(e) => setStack(e.target.value)} 
          options={stackOptions} 
        />
      </div>
    </div>
  );
};

export default SearchAndFilters;
