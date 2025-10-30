import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// ✅ Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// ✅ Utility to hash passwords using SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function LoginPopup({ onClose, onSuccess }) {
  const [apiError, setApiError] = useState("");
   const navigate = useNavigate();

  // disable body scroll while popup is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div
        className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-10 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
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

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Admin Login
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mb-8 text-center">
          Please login to access the Admin Dashboard
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
  setApiError("");

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ Login success (backend verified)");

      // Save token + session info
      sessionStorage.setItem("adminToken", data.token);
      sessionStorage.setItem("adminLoggedIn", "true");

      // Decode expiry (2h) → save timestamp
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const expiry = payload.exp * 1000;
      sessionStorage.setItem("adminTokenExpiry", expiry.toString());

      setTimeout(() => {
        onSuccess?.();
      }, 100);
    } else {
      console.warn("❌ Invalid credentials:", data.message);
      setApiError(data.message || "Login failed");
    }
  } catch (err) {
    console.error("💥 Login error:", err);
    setApiError("Server unreachable. Try again later.");
  } finally {
    setSubmitting(false);
  }
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
                  placeholder="Email"
                  className="p-3 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition border-gray-200"
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
                  className="p-3 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition border-gray-200"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              {apiError && (
                <div className="text-center text-red-600 text-sm font-medium">
                  {apiError}
                </div>
              )}

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
