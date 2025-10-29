import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CreativeHero() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await axios.get("/api/about"); // 👈 your backend endpoint
        setAboutData(res.data[0]); // assuming the backend returns an array of documents
      } catch (err) {
        console.error("Failed to fetch about data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">No data available.</p>
      </div>
    );
  }

  const { header, images } = aboutData;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Dynamic Header */}
      <div className="text-center mb-16 px-2">
        {header?.map((line, index) => (
          <h1
            key={index}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
          >
            {line}
          </h1>
        ))}
      </div>

      {/* Dynamic Images */}
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Left Image */}
          <div className="flex-shrink-0 w-24 sm:w-44 md:w-60 lg:w-72 -ml-4 sm:-ml-6 md:-ml-8 lg:-ml-12">
            <img
              src={images?.left}
              alt="Left Image"
              className="w-full h-auto shadow-xl rounded-lg"
            />
          </div>

          {/* Center Image */}
          <div className="flex-shrink-0 w-40 sm:w-72 md:w-96 lg:w-[480px]">
            <img
              src={images?.center}
              alt="Center Image"
              className="w-full h-auto shadow-2xl rounded-lg"
            />
          </div>

          {/* Right Image */}
          <div className="shrink-0 w-24 sm:w-44 md:w-60 lg:w-72 -mr-4 sm:-mr-6 md:-mr-8 lg:-mr-12">
            <img
              src={images?.right}
              alt="Right Image"
              className="w-full h-auto shadow-xl rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
