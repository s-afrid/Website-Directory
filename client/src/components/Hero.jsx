import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center bg-[#adb5bd] py-12 md:py-16 lg:py-20 px-4 mx-3 mb-3 rounded-b-xl font-['Rubik']">
      
      {/* Responsive Heading: Scales from text-3xl up to text-5xl */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 md:mb-4 max-w-4xl">
        Here are today's top startups
      </h1>
      
      {/* Subheading */}
      <p className="text-base md:text-lg text-gray-700 mb-8 md:mb-10 max-w-3xl">
        Discover the most innovative websites launching daily, from AI tools to unique e-commerce brands, curated just for you.
      </p>

      {/* Newsletter Box (Responsive Layout: Stacks on mobile, inline on small screens and up) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full max-w-md gap-3 mb-8">
        <input
          type="email"
          placeholder="Enter your email to get daily updates"
          className="w-full sm:flex-1 px-5 py-3 outline-none bg-white border-2 border-gray-300 focus:border-black transition duration-200 rounded-xl text-gray-800 placeholder-gray-500"
        />
        <button className="w-full sm:w-auto bg-gray-800 text-white font-semibold px-6 py-3 hover:bg-black transition duration-200 rounded-xl shadow-md hover:shadow-lg">
          Subscribe
        </button>
      </div>

      <p className="text-sm text-gray-800 font-medium">
        Join 1000+ other inspiring readers 👩‍💻
      </p>
    </section>
  );
};

export default Hero;
