import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchWithDropdowns = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState("");
  const [style, setStyle] = useState("");
  const [stack, setStack] = useState("");

  const options = ["Option 1", "Option 2", "Option 3"]; // Sample options

  const handleSearch = () => {
    console.log("Search:", search);
    console.log("Filters:", { industry, type, style, stack });
  };

  return (
    <div className="flex justify-center items-center p-4 space-x-2 flex-wrap">
      {/* Search Bar with Icon on Right */}
      <div className="relative w-[30%] min-w-[200px]">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-full pr-10 pl-3 py-2 focus:outline-none"
        />
        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={handleSearch}
          size={20}
        />
      </div>

      {/* Dropdowns */}
      <select
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        className="rounded-md px-2 py-2 focus:outline-none"
      >
        <option value="">Industry</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded-md px-2 py-2 focus:outline-none"
      >
        <option value="">Type</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="rounded-md px-2 py-2 focus:outline-none"
      >
        <option value="">Style</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <select
        value={stack}
        onChange={(e) => setStack(e.target.value)}
        className="rounded-md px-2 py-2 focus:outline-none"
      >
        <option value="">Stack</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchWithDropdowns;
