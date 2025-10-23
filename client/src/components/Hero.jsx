import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Hero = () => {
  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  // State for success message
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onSubmit = (data) => {
    console.log("Subscription Data:", data.email);
    
    // Simulate successful subscription
    setIsSubscribed(true);
    reset(); // Clear the input field
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

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

      {/* Form for Newsletter Subscription */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full gap-3 mb-3">
          
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email to get daily updates"
            // Register the input with react-hook-form, adding required validation
            {...register("email", {  
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address"
              }
            })}
            className={`w-full sm:flex-1 px-5 py-3 outline-none bg-white border-2 transition duration-200 rounded-xl text-gray-800 placeholder-gray-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-black'
            }`}
          />
          
          {/* Subscribe Button */}
          <button 
            type="submit"
            className="w-full sm:w-auto bg-gray-800 text-white font-semibold px-6 py-3 hover:bg-black transition duration-200 rounded-xl shadow-md hover:shadow-lg"
          >
            Subscribe
          </button>
        </div>

        {/* Error Message */}
        {errors.email && (
          <p className="text-red-600 text-sm mt-1 mb-2 text-left">{errors.email.message}</p>
        )}
        
        {/* Success Message */}
        {isSubscribed && (
          <p className="text-green-600 font-semibold text-sm mt-1 mb-2">Thank you for subscribing!</p>
        )}
      </form>
      
      <p className="text-sm text-gray-800 font-medium">
        Join 1000+ other inspiring readers 👩‍💻
      </p>
    </section>
  );
};

export default Hero;
