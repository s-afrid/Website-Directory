import React, { useState } from "react";
import { useForm } from "react-hook-form";
import heroBg from "../assets/heroBannerBg.png"; // your scenic image

const HeroBanner = () => {
  const [showMessage, setShowMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("📩 Email submitted:", data.email);
    reset();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <section
      className="w-full h-[91vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="flex flex-col justify-center p-8 md:p-16 text-center rounded-3xl max-w-full self-start">
        {/* Heading */}
        <h1 className="text-3xl xl:text-[7rem] lg:text-[4rem] md:text-[3rem] font-bold text-gray-900 mb-4 cabinetgrotesk">
          Inspiro<span className="text-gray-900"> – website gallery</span>
        </h1>

        {/* Subheading */}
        <p className="text-black mb-8 leading-relaxed font-bold">
          Find the best hand-picked website design inspiration. We’re a curated
          website design gallery for creatives, updated daily.
        </p>

        {/* Newsletter Form */}
        {/* Newsletter Form */}
<form
  onSubmit={handleSubmit(onSubmit)}
  // On small screens: flex-col.
  // On sm and up: becomes the blurred, pill-shaped container.
  className="flex flex-col gap-3 w-full max-w-lg mx-auto
             md:flex-row md:items-center md:justify-center md:bg-white/50 md:rounded-full md:p-2 md:border md:border-gray-200/50"
>
  <input
    type="email"
    placeholder="Enter your work email"
    {...register("email", {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    })}
    // Mobile styles: (default)
    className="bg-white/50 backdrop-blur-sm px-4 py-3 rounded-full w-full text-gray-900 placeholder:text-gray-700 outline-none border border-gray-300 focus:ring-2 transition
               md:flex-1 md:bg-transparent md:backdrop-blur-none md:border-none md:rounded-none md:p-2 md:focus:ring-0 md:px-4"
  />

  <button
    type="submit"
    // Mobile styles: (default)
    className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition w-fit self-center
               md:w-auto md:py-2"
  >
    Subscribe
  </button>
</form>

{/* Error or Success Message */}
{errors.email && (
  <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
)}
{showMessage && (
  <p className="text-green-600 font-semibold mt-2">
    🎉 You are subscribed!
  </p>
)}

        {/* CTA message */}
        <p className="text-gray-800 text-[15px] md:text-[17px] font-bold mt-6 bg-gray-100 border-gray-300 rounded-2xl py-1 px-3 w-fit self-center">
          Join 1000+ Inspiring Readers
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;
