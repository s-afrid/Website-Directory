import React, { useState } from "react";
import { useForm } from "react-hook-form";
import heroBg from "../assets/heroBannerBg.png";

const HeroBanner = () => {
  const [apiMessage, setApiMessage] = useState(""); // store API message
  const [isError, setIsError] = useState(false); // track if message is error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setApiMessage(""); // reset previous message
      setIsError(false);

      const response = await fetch("http://localhost:5000/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiMessage(result.message || "Subscription failed");
        setIsError(true);
        return;
      }

      setApiMessage(result.message || "Subscribed successfully!");
      setIsError(false);

      reset(); // clear form
      setTimeout(() => setApiMessage(""), 3000); // hide message after 3s
    } catch (error) {
      console.error(error);
      setApiMessage("Server error. Try again later.");
      setIsError(true);
    }
  };

  return (
    <section
      className="w-full bg-cover bg-center flex items-center justify-center"
    >
      <div className="flex flex-col justify-center p-8 md:p-16 text-center rounded-3xl max-w-full self-start">
        {/* Heading */}
        <h1 className="text-3xl xl:text-[6rem] lg:text-[4rem] md:text-[3rem] font-bold text-gray-900 mb-4 cabinetgrotesk">
          Inspiro<span className="text-gray-900"> – website gallery</span>
        </h1>

        {/* Subheading */}
        <p className="text-black mb-8 leading-relaxed text-sm font-semibold">
          Find the best hand-picked website design inspiration. We’re a curated
          website design gallery for creatives, updated daily.
        </p>

        {/* Newsletter Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full max-w-lg mx-auto
                     md:flex-row md:items-center md:justify-center md:bg-white/50 md:rounded-full md:p-2 md:border md:border-gray-200/50"
        >
          <input
            type="email"
            placeholder="Enter your work email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className="bg-white/50 backdrop-blur-sm px-4 py-3 rounded-full w-full text-gray-900 placeholder:text-gray-700 outline-none border border-gray-300 focus:ring-2 transition
                       md:flex-1 md:bg-transparent md:backdrop-blur-none md:border-none md:rounded-none md:p-2 md:focus:ring-0 md:px-4"
          />

          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition w-fit self-center
                       md:w-auto md:py-2"
          >
            Subscribe
          </button>
        </form>

        {/* Error or Success Message */}
        {(errors.email || apiMessage) && (
          <p
            className={`text-sm mt-2 ${
              errors.email || isError ? "text-red-500" : "text-green-600 font-semibold"
            }`}
          >
            {errors.email ? errors.email.message : apiMessage}
          </p>
        )}

        {/* CTA message */}
        <p className="text-gray-800 text-[15px] md:text-[17px] font-bold mt-6 w-fit self-center">
          Join 1000+ Inspiring Readers
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;
