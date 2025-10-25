import React, { useEffect, useState } from "react";

export default function SponsorInquiryForm({ closeModal }) {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [apiMessage, setApiMessage] = useState("");

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");

    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      company: form.company.value,
      website: form.website.value,
      budget: form.budget.value,
      duration: form.duration.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setSubmissionStatus("success");
      setApiMessage(data.message || "✅ Sponsor inquiry submitted successfully!");
      form.reset();
    } catch (error) {
      setSubmissionStatus("error");
      setApiMessage(error.message || "❌ Something went wrong. Try again!");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center"
      onClick={closeModal}
    >
      {/* Scrollable container */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Name *</label>
                <input
                  name="name"
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
                  name="email"
                  type="email"
                  placeholder="email@gmail.com"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  title="Please enter a valid email address"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Brand / Company Name *</label>
                <input
                  name="company"
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
                  name="website"
                  type="url"
                  placeholder="https://"
                  required
                  pattern="https?://.+"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  title="Please enter a valid URL starting with http:// or https://"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Expected Budget *</label>
                <input
                  name="budget"
                  type="text"
                  placeholder="Enter amount"
                  required
                  pattern="^\d+(\.\d{1,2})?$"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  title="Please enter a valid amount (numbers only, optionally with up to 2 decimals)"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Preferred Duration *</label>
                <select
                  name="duration"
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
                name="message"
                rows="4"
                placeholder="Tell us about your sponsorship goals..."
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submissionStatus === "submitting"}
              className="w-full bg-indigo-900 text-white py-3 rounded-xl font-semibold hover:bg-indigo-800 transition-all duration-300"
            >
              {submissionStatus === "submitting" ? "Submitting..." : "Send Inquiry"}
            </button>
          </form>

          {/* Success / Error Message */}
          {submissionStatus && apiMessage && (
            <div
              className={`mt-4 p-4 rounded-xl text-center ${
                submissionStatus === "success"
                  ? "bg-green-100 text-green-700 border border-green-400"
                  : "bg-red-100 text-red-700 border border-red-400"
              }`}
            >
              {apiMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
