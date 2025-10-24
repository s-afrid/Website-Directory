import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Search, ChevronDown } from 'lucide-react';

const SearchFilterHeader = () => {
  const { register, control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      searchQuery: "",
      // Dropdown fields start with placeholder values
      industry: "Select Industry",
      type: "Type",
      style: "Style",
      stack: "Stack",
      // Tab filter field
      timeframe: "All",
    },
  });

  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce"];
  const types = ["Landing Page", "Dashboard", "Portfolio", "Blog"];
  const styles = ["Minimal", "Modern", "Colorful", "Dark"];
  const stacks = ["React", "Vue", "Angular", "Next.js"];
  const timeframes = ["All", "Newest", "Relevant", "Popular"];

  const onSubmit = (data) => {
    // This is the explicit submission action (e.g., clicking the search icon)
    console.log("Form Submitted:", data);
  };

  // Watch ALL form values for real-time filtering/UI updates
  const formValues = watch();

  // Live filter effect: this runs whenever any form field changes
  React.useEffect(() => {
    console.log("Live Filters:", formValues);
    // In a real application, you would dispatch a fetch action here
    // to update the list of websites based on the filter criteria in 'formValues'.
  }, [formValues]);

  // Handler for the time frame tabs (All, Newest, etc.)
  const handleTimeframeChange = (value) => {
    setValue('timeframe', value);
  };

  // Reusable component for the styled dropdown pills
  const FilterPill = ({ name, options, placeholder }) => (
    <div className="relative w-full sm:w-auto">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            // Note: The first option should be set as disabled in the return block for the placeholder text to appear correctly when unselected
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-200 transition cursor-pointer bg-white text-gray-700 w-full text-sm font-medium"
          >
            <option disabled value={placeholder}>{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      />
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 pointer-events-none" />
    </div>
  );

  return (
    // Removed height and background image/overlay styles
    <div className="w-full bg-white py-16 px-4 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full z-10">
        
        {/* Header Section */}
        {/* Changed text color to dark gray since there is no background image */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-10 leading-tight">
          Inpiro - Website Library
        </h1>

        {/* Search and Filters Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            
            {/* Search Input Bar (White, Wide, with integrated Dark Button) */}
            <div className="w-full max-w-2xl mx-auto bg-white rounded-lg p-1 shadow-lg border border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search examples"
                  {...register("searchQuery")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(onSubmit)();
                    }
                  }}
                  className="flex-grow pl-5 py-2 text-lg text-gray-700 placeholder-gray-400 border-none rounded-l-lg outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="bg-[#1F2937] text-white p-3 rounded-md hover:bg-gray-800 transition duration-200"
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Filter Tabs and Dropdowns */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center justify-center gap-3">
                   {/* Timeframe Tabs (Buttons) */}
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  type="button"
                  onClick={() => handleTimeframeChange(timeframe)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition duration-200
                    ${formValues.timeframe === timeframe
                      ? "bg-teal-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }
                  `}
                >
                  {timeframe}
                </button>
              ))}
              </div>
             

              {/* Filter Dropdowns (Styled as White Pills) */}
              <div className="flex flex-wrap items-center gap-3 w-full justify-center sm:w-auto mt-2 sm:mt-0">
                <FilterPill 
                  name="industry" 
                  options={industries} 
                  placeholder="Industry" 
                />
                <FilterPill 
                  name="type" 
                  options={types} 
                  placeholder="Type" 
                />
                <FilterPill 
                  name="style" 
                  options={styles} 
                  placeholder="Style" 
                />
                <FilterPill 
                  name="stack" 
                  options={stacks} 
                  placeholder="Stack" 
                />
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchFilterHeader;
