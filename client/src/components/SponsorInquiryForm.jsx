import React, { useState } from 'react';
// Note: In a real environment, you would need to install and import useForm:
// import { useForm } from 'react-hook-form';

// Mock implementation of useForm for environment compatibility.
// In a real project, this would be the actual RHF import.
const useForm = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  
  const register = (name, rules = {}) => ({
    name,
    onChange: (e) => {
      setData(prev => ({ ...prev, [name]: e.target.value }));
      // Simple validation for required fields on change
      if (rules.required && !e.target.value) {
        setErrors(prev => ({ ...prev, [name]: { type: 'required', message: rules.required.message || 'This field is required' } }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    value: data[name] || '',
  });

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    // Simulate full validation on submit
    const finalErrors = {};
    // This mock is intentionally simple and only checks if the field is present in state
    // and if the RHF `required` rule was passed. A real RHF would handle this better.
    // We will rely on RHF's logic being present in a true environment.
    
    // For this example, we proceed directly to submission for demo purposes.
    callback(data);
  };

  return { register, handleSubmit, formState: { errors } };
};

// Reusable Input Field Component
const InputField = ({ label, name, register, required, errors, type = 'text', placeholder, initialValue, pattern }) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={name} className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      className={`
        p-3 border rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out
        ${errors?.[name] ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}
      `}
      // The register function from RHF is spread onto the input
      {...register(name, { required: required ? 'This field is required' : false, pattern })}
      defaultValue={initialValue}
    />
    {errors?.[name] && (
      <p className="text-xs text-red-500 font-medium">{errors[name].message || 'This field is invalid'}</p>
    )}
  </div>
);

// Reusable Textarea Field Component
const TextareaField = ({ label, name, register, required, errors, placeholder }) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={name} className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      rows="4"
      placeholder={placeholder}
      className={`
        p-3 border rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-none
        ${errors?.[name] ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}
      `}
      {...register(name, { required: required ? 'This field is required' : false })}
    ></textarea>
    {errors?.[name] && (
      <p className="text-xs text-red-500 font-medium">{errors[name].message || 'This field is invalid'}</p>
    )}
  </div>
);

const SponsorInquiryForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'submitting'

  const onSubmit = (data) => {
    setSubmissionStatus('submitting');
    console.log('Form Data Submitted:', data);

    // Simulate API call delay
    setTimeout(() => {
      // In a real app, check API response for success/failure
      setSubmissionStatus('success');
      // Optionally reset form: reset();
    }, 1500);
  };

  const closeModal = () => {
    // Logic to close the modal or hide the form
    console.log("Close button clicked or form submitted successfully.");
    setSubmissionStatus(null); // Clear status to show form again (for demo)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-gray-100">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close Form"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Sponsor Inquiry Form</h1>
          <p className="text-gray-500 text-sm">
            Know a great design you think we should feature? Fill out the form below and we'll review it ASAP!
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Two-Column Section 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Name"
              name="name"
              register={register}
              required
              errors={errors}
              placeholder="Your Full Name"
              initialValue="Your Full Name"
            />
            <InputField
              label="Email Id"
              name="email"
              register={register}
              required
              errors={errors}
              type="email"
              placeholder="email23@gmail.com"
              initialValue="email23@gmail.com"
              // Simple pattern for email validation (RHF handles proper email type validation, but this adds a fallback)
              pattern={{
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              }}
            />
          </div>

          {/* Two-Column Section 2: Brand & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Brand / Company Name"
              name="companyName"
              register={register}
              required
              errors={errors}
              placeholder="Brand / Company Name"
            />
            <InputField
              label="Website / Product Link"
              name="website"
              register={register}
              required
              errors={errors}
              type="url"
              placeholder="https://"
              initialValue="https://example.com"
            />
          </div>

          {/* Two-Column Section 3: Budget & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Expected Budget"
              name="expectedBudget"
              register={register}
              required
              errors={errors}
              placeholder="Enter text (e.g., $5,000 USD)"
              initialValue="Enter text"
            />
            <InputField
              label="Preferred Duration"
              name="preferredDuration"
              register={register}
              required
              errors={errors}
              placeholder="e.g., 3 month, 1 year"
              initialValue="3 month"
            />
          </div>

          {/* Full Width Section: Message */}
          <TextareaField
            label="Message / Goal of Sponsorship"
            name="message"
            register={register}
            required
            errors={errors}
            placeholder="Text"
            initialValue="Text"
          />

          {/* Submission Button & Status */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 text-lg font-bold text-white rounded-xl shadow-lg transition duration-200 ease-in-out
                       bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
                       disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={submissionStatus === 'submitting'}
            >
              {submissionStatus === 'submitting' && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>Send Inquiry</span>
            </button>
          </div>
        </form>

        {/* Success/Error Message Box (Instead of alert()) */}
        {submissionStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl" role="alert">
            <p className="font-bold">Inquiry Sent!</p>
            <p className="text-sm">Thank you for your interest. We have received your submission and will review it shortly.</p>
          </div>
        )}
        {submissionStatus === 'error' && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl" role="alert">
            <p className="font-bold">Submission Failed!</p>
            <p className="text-sm">There was an issue sending your inquiry. Please check your network connection and try again.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SponsorInquiryForm;
