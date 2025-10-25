import React, { useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Search, ChevronDown } from "lucide-react";
import { FilterContext } from "../context/FilterContext";

const SearchFilter = () => {
  const { filters, setFilters } = useContext(FilterContext);
  const { register, control, handleSubmit } = useForm({
    defaultValues: filters,
  });

  const industries = ["Technology", "Healthcare", "Finance", "E-commerce", "Education"];
  const types = ["Landing Page", "Dashboard", "Portfolio", "Blog", "E-commerce"];
  const styles = ["Minimal", "Modern", "Colorful", "Dark", "Corporate"];
  const stacks = ["React", "Vue", "Angular", "Next.js", "Svelte"];

  // Only update context on form submit (or Enter key)
  const onSubmit = (data) => {
    setFilters(data);
  };

  return (
    <div className="w-full bg-white py-8 px-6 md:px-12 lg:px-24 rubik">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Inspiring SaaS Website Examples
        </h1>
        <p className="text-gray-700 text-base md:text-lg">
          Explore stunning SaaS website designs for inspiration and creative ideas.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between">
          {/* Search */}
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

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto lg:ml-auto">
            {[
              { name: "industry", options: industries, placeholder: "Industry" },
              { name: "type", options: types, placeholder: "Type" },
              { name: "style", options: styles, placeholder: "Style" },
              { name: "stack", options: stacks, placeholder: "Stack" },
            ].map((filter) => (
              <div key={filter.name} className="relative w-[calc(50%-6px)] sm:w-auto">
                <Controller
                  name={filter.name}
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition cursor-pointer bg-white w-full text-sm sm:text-base"
                    >
                      <option>{filter.placeholder}</option>
                      {filter.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
