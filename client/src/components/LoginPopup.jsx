import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// ✅ Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPopup({ onClose, onSuccess }) {
  const navigate = useNavigate();

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // Handler for closing the modal and redirecting back
  const handleClose = () => {
    onClose?.(); // close the modal
    navigate(-1); // go back to the previous page
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose} // click outside to close and redirect back
    >
      <div
        className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-10 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Admin Login
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mb-8 text-center">
          Please login to access the Admin Dashboard
        </p>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              if (
                values.email === "admin@gmail.com" &&
                values.password === "admin123"
              ) {
                onSuccess(); // callback
              } else {
                alert("Invalid credentials");
              }
              setSubmitting(false);
            }, 1000);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="admin@gmail.com"
                  className="p-3 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition
                    border-gray-200"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="******"
                  className="p-3 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition
                    border-gray-200"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-lg font-bold text-white rounded-xl shadow-lg bg-indigo-900 hover:bg-indigo-800 disabled:bg-gray-400 flex items-center justify-center space-x-2 transition-all duration-300"
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                    ></path>
                  </svg>
                )}
                <span>{isSubmitting ? "Logging in..." : "Login"}</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
