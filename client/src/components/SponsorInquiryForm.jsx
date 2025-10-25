import React, { useEffect } from "react";

export default function SponsorInquiryForm({ closeModal }) {
  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Sponsor inquiry submitted!");
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center"
      onClick={closeModal}
    >
      {/* 🧊 Scrollable container */}
      <div
        className="relative w-full h-full flex justify-center items-center overflow-y-auto py-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Box */}
        <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-2xl p-8 sm:p-10 my-auto">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-semibold"
          >
            ×
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Sponsor Inquiry Form
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Know a great design you think we should feature? Fill out the form below and we’ll review it ASAP!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Two-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Name *</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Brand / Company Name *</label>
                <input
                  type="text"
                  placeholder="Brand / Company Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Website / Product Link *</label>
                <input
                  type="url"
                  placeholder="https://"
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Expected Budget *</label>
                <input
                  type="text"
                  placeholder="Enter amount"
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Preferred Duration *</label>
                <select
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">Select duration</option>
                  <option value="1 month">1 month</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Message / Goal of Sponsorship *
              </label>
              <textarea
                rows="4"
                placeholder="Tell us about your sponsorship goals..."
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-900 text-white py-3 rounded-xl font-semibold hover:bg-indigo-800 transition-all duration-300"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
