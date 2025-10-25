import React, { useEffect, useState } from "react";

const useForm = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const register = (name, rules = {}) => ({
    name,
    onChange: (e) => {
      setData((prev) => ({ ...prev, [name]: e.target.value }));
      if (rules.required && !e.target.value) {
        setErrors((prev) => ({
          ...prev,
          [name]: {
            type: "required",
            message: rules.required.message || "This field is required",
          },
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    value: data[name] || "",
  });

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(data);
  };

  return { register, handleSubmit, formState: { errors } };
};

const InputField = ({
  label,
  name,
  register,
  required,
  errors,
  type = "text",
  placeholder,
  initialValue,
  pattern,
}) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={name} className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      className={`p-3 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition
        ${
          errors?.[name]
            ? "border-red-500 ring-1 ring-red-500"
            : "border-gray-200"
        }`}
      {...register(name, {
        required: required ? "This field is required" : false,
        pattern,
      })}
      defaultValue={initialValue}
    />
    {errors?.[name] && (
      <p className="text-xs text-red-500 font-medium">
        {errors[name].message}
      </p>
    )}
  </div>
);

export default function SubmitToGetFeatured({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const onSubmit = (data) => {
    setSubmissionStatus("submitting");
    console.log("Form Data Submitted:", data);

    setTimeout(() => {
      setSubmissionStatus("success");
    }, 1500);
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
        <div className="relative w-[90%] max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-gray-100 my-auto animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={closeModal}
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center">
            Submit to Get Featured
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mb-8 text-center">
            Know a great design you think we should feature? Fill out the form
            below and we'll review it ASAP!
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              label="Name"
              name="name"
              register={register}
              required
              errors={errors}
              placeholder="Your Full Name"
            />
            <InputField
              label="Email Id"
              name="email"
              register={register}
              required
              errors={errors}
              type="email"
              placeholder="email23@gmail.com"
              pattern={{
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              }}
            />
            <InputField
              label="Twitter Account"
              name="twitter"
              register={register}
              required
              errors={errors}
              placeholder="Twitter Id"
            />
            <InputField
              label="Website Url"
              name="website"
              register={register}
              required
              errors={errors}
              type="url"
              placeholder="https://"
              pattern={{
                value: /^(https?:\/\/[^\s]+)/i,
                message: "Invalid URL format",
              }}
            />

            <div className="pt-4">
              <button
                type="submit"
                disabled={submissionStatus === "submitting"}
                className="w-full py-3 text-lg font-bold text-white rounded-xl shadow-lg bg-indigo-900 hover:bg-indigo-800 disabled:bg-gray-400 flex items-center justify-center space-x-2 transition-all duration-300"
              >
                {submissionStatus === "submitting" && (
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
                <span>Submit Site</span>
              </button>
            </div>
          </form>

          {submissionStatus === "success" && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl text-center">
              <p className="font-bold">Submission Received!</p>
              <p className="text-sm">Thank you! We’ll review your site shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
