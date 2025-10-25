import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import footerLogo from "../assets/footerLogo.png";
import SponsorInquiryForm from "./SponsorInquiryForm";
import SubmitToGetFeatured from "./SubmitForm";

export default function Footer() {
  const [showMessage, setShowMessage] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // "sponsor" | "submit" | null

  const closeModal = () => setActiveModal(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = (data) => {
    console.log("Newsletter signup:", data);
    reset();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <>
      <footer className="bg-white border-t border-gray-200 font-[Rubik] relative z-40">
        <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
            {/* 🔹 Logo & Social Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">INSPIRO</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Discover curated SaaS website examples to inspire your next
                design project.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href="https://x.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
                    alt="X Logo"
                    className="w-5 h-5 hover:opacity-80 transition"
                  />
                </a>
                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/27/CIS-A2K_Instagram_Icon_%28Black%29.svg"
                    alt="Instagram Logo"
                    className="w-5 h-5 hover:opacity-80 transition"
                  />
                </a>
              </div>
            </div>

            {/* 🔹 Explore Links */}
            <div>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/explore"
                    className="font-semibold text-sm hover:text-gray-900 transition"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal("sponsor")}
                    className="font-semibold text-sm hover:text-gray-900 transition"
                  >
                    Sponsor
                  </button>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="font-semibold text-sm hover:text-gray-900 transition"
                  >
                    About
                  </Link>
                </li>
               
              </ul>
            </div>

            {/* 🔹 Policy Links */}
            <div>
              
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacyandpolicy"
                    className="font-semibold text-sm hover:text-gray-900 transition"
                  >
                    Privacy & Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/termsandconditions"
                    className="font-semibold text-sm hover:text-gray-900 transition"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="font-semibold text-sm hover:text-gray-900 transition"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* 🔹 Newsletter Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Join Our Newsletter
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-3
               md:flex-row md:items-center md:bg-gray-50 md:border md:border-gray-200 md:rounded-full md:overflow-hidden md:p-1"
              >
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="flex-1 min-w-0 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 text-sm 
               rounded-full outline-none border border-gray-300 focus:ring-1 focus:ring-gray-800
               md:border-none md:bg-transparent md:rounded-none md:focus:ring-0"
                />

                <button
                  type="submit"
                  className="shrink-0 bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-black transition"
                >
                  Subscribe
                </button>
              </form>

              {/* Error or Success Message */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
              {showMessage && (
                <p className="text-green-600 font-semibold mt-2">
                  You are subscribed!
                </p>
              )}
            </div>
          </div>

          {/* 🔹 Footer Logo Section */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <img
              src={footerLogo}
              alt="INSPIRO"
              className="w-full max-w-4xl mx-auto h-auto"
            />
          </div>
        </div>
      </footer>

      {/* 🔹 Popup Modals */}
      {activeModal === "sponsor" && (
        <SponsorInquiryForm closeModal={closeModal} />
      )}
      
    </>
  );
}
