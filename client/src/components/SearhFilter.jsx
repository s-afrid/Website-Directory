import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Search, ChevronDown } from "lucide-react";

const SearchFilter = () => {
  const { register, control, watch, handleSubmit } = useForm({
    defaultValues: {
      searchQuery: "",
      industry: "Select Industry",
      type: "Type",
      style: "Style",
      stack: "Stack",
    },
  });

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "E-commerce",
    "Education",
  ];
  const types = [
    "Landing Page",
    "Dashboard",
    "Portfolio",
    "Blog",
    "E-commerce",
  ];
  const styles = ["Minimal", "Modern", "Colorful", "Dark", "Corporate"];
  const stacks = ["React", "Vue", "Angular", "Next.js", "Svelte"];

  const onSubmit = (data) => {
    console.log("Filter data:", data);
    // Handle filter submission logic here
  };

  // Watch form values for real-time filtering
  const formValues = watch();

  // You can use this effect to filter in real-time
  React.useEffect(() => {
    console.log("Current filters:", formValues);
    // Perform filtering logic here
  }, [formValues]);

  return (
    <div className="w-full bg-white py-8 px-6 md:px-12 lg:px-24 rubik">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Inspiring SaaS Website Examples
        </h1>
        <p className="text-gray-700 text-base md:text-lg">
          Explore stunning SaaS website designs for inspiration and creative
          ideas.
        </p>
      </div>

      {/* Search and Filters Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between">
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-gray-200 transition"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto lg:ml-auto">
  {/* Select Industry */}
  <div className="relative w-[calc(50%-6px)] sm:w-auto">
    <Controller
      name="industry"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition cursor-pointer bg-white w-full text-sm sm:text-base"
        >
          <option>Industry</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      )}
    />
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 pointer-events-none" />
  </div>

  {/* Type */}
  <div className="relative w-[calc(50%-6px)] sm:w-auto">
    <Controller
      name="type"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition cursor-pointer bg-white w-full text-sm sm:text-base"
        >
          <option>Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      )}
    />
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 pointer-events-none" />
  </div>

  {/* Style */}
  <div className="relative w-[calc(50%-6px)] sm:w-auto">
    <Controller
      name="style"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition cursor-pointer bg-white w-full text-sm sm:text-base"
        >
          <option>Style</option>
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      )}
    />
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 pointer-events-none" />
  </div>

  {/* Stack */}
  <div className="relative w-[calc(50%-6px)] sm:w-auto">
    <Controller
      name="stack"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition cursor-pointer bg-white w-full text-sm sm:text-base"
        >
          <option>Stack</option>
          {stacks.map((stack) => (
            <option key={stack} value={stack}>
              {stack}
            </option>
          ))}
        </select>
      )}
    />
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 pointer-events-none" />
  </div>
</div>
          
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
