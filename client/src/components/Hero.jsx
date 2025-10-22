import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center bg-[#e9ddf6] py-5 px-4">
      <h1 className="text-4xl font-bold mb-2">Heading</h1>
      <p className="text-lg text-gray-700 mb-6">Subheading</p>

      {/* Newsletter Box */}
      <div className="flex items-center overflow-hidden mb-6 gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 outline-none bg-white rounded-md"
        />
        <button className="bg-gray-800 text-white px-4 py-2 hover:bg-black transition rounded-md">
          Subscribe
        </button>
      </div>

      <p className="text-gray-900 font-medium text-lg">
        Join 1000+ other inspiring readers 👩‍💻
      </p>
    </section>
  );
};

export default Hero;
