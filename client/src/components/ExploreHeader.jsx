import React, { useContext, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Search, ChevronDown } from "lucide-react";
import { FilterContext } from "../context/FilterContext";

const SearchFilterHeader = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const { register, control, watch, handleSubmit, setValue, reset } = useForm({
    defaultValues: filters,
  });

  const prevValues = useRef(filters); // store previous form values

  // ✅ Update context only when user changes something (watch is stable)
  useEffect(() => {
    const currentValues = watch(); // safely inside effect
    const changed =
      JSON.stringify(prevValues.current) !== JSON.stringify(currentValues);

    if (changed) {
      prevValues.current = currentValues;
      setFilters(currentValues);
      console.log("✅ Context updated:", currentValues);
    }
  }, [watch, setFilters]);

  // ✅ Sync form with context only when context changes externally
  useEffect(() => {
    const changed =
      JSON.stringify(filters) !== JSON.stringify(prevValues.current);
    if (changed) {
      reset(filters);
      prevValues.current = filters;
    }
  }, [filters, reset]);

  // --- filter options ---
  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce"];
  const types = ["Landing Page", "Dashboard", "Portfolio", "Blog"];
  const styles = ["Minimal", "Modern", "Colorful", "Dark"];
  const stacks = ["React", "Vue", "Angular", "Next.js"];
  const timeframes = ["All", "Newest", "Relevant", "Popular"];

  // --- handlers ---
  const onSubmit = (data) => {
    setFilters(data);
  };

  const handleTimeframeChange = (value) => {
    setValue("timeframe", value);
  };

  // --- reusable select ---
  const FilterPill = ({ name, options, placeholder }) => (
    <div className="relative w-full sm:w-auto">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-200 transition cursor-pointer bg-white text-gray-700 w-full text-sm font-medium"
          >
            <option disabled value={placeholder}>
              {placeholder}
            </option>
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

  // --- UI ---
  return (
    <div className="w-full bg-white py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-10 leading-tight">
          Inpiro - Website Library
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* 🔍 Search bar */}
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

            {/* 🕒 Timeframes + Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Timeframes */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    type="button"
                    onClick={() => handleTimeframeChange(timeframe)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                      watch("timeframe") === timeframe
                        ? "bg-teal-500 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>

              {/* Dropdown Filters */}
              <div className="flex flex-wrap items-center gap-3 w-full justify-center sm:w-auto mt-2 sm:mt-0">
                <FilterPill name="industry" options={industries} placeholder="Industry" />
                <FilterPill name="type" options={types} placeholder="Type" />
                <FilterPill name="style" options={styles} placeholder="Style" />
                <FilterPill name="stack" options={stacks} placeholder="Stack" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchFilterHeader;
