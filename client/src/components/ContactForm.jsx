import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, XCircle } from 'lucide-react'; // Icons for the toast/modal

// A simple Toast/Modal component to replace window.alert()
const SubmissionToast = ({ message, type, onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const Icon = isSuccess ? CheckCircle : XCircle;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className={`flex items-center p-4 rounded-lg shadow-xl ${bgColor} text-white max-w-sm`}>
        <Icon className="w-6 h-6 mr-3 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 -mr-1 p-1 rounded-full hover:bg-white/20 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};

// --- Main Component: ContactForm ---
const ContactForm = () => {
    // State for the custom toast/modal
    const [toast, setToast] = useState({ message: '', type: '' });
    
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            message: ''
        }
    });

    const onSubmit = async (data) => {
        console.log("Form Inquiry Submitted:", data);
        
        try {
            // Simulate an API call delay
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            // In a real application, replace this with your actual fetch call:
            // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
            // if (!response.ok) throw new Error('Network response was not ok');
            
            setToast({ message: "Success! Your inquiry has been sent.", type: 'success' });
            reset(); // Clear form fields on successful submission
        } catch (error) {
            console.error("Submission Error:", error);
            setToast({ message: "Failed to send inquiry. Please try again.", type: 'error' });
        }
    };
    
    const closeToast = () => setToast({ message: '', type: '' });

    // Style helper for fields
    const inputClasses = "w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#1F2937] focus:border-transparent transition duration-150 outline-none";

    return (
        <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 sm:p-10 rounded-2xl shadow-xl">
                
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your Full Name"
                        {...register("name", { required: "Name is required" })}
                        className={inputClasses}
                        disabled={isSubmitting}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>

                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                        Email Id <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="email23@gmail.com"
                        {...register("email", { 
                            required: "Email is required", 
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address"
                            }
                        })}
                        className={inputClasses}
                        disabled={isSubmitting}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Message / Goal of Sponsorship Textarea */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                        Message / Goal of Sponsorship
                    </label>
                    <textarea
                        id="message"
                        rows="6"
                        placeholder="Text"
                        {...register("message")}
                        className={`${inputClasses} resize-none`}
                        disabled={isSubmitting}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-6 py-4 bg-[#1F2937] text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        "Send Inquiry"
                    )}
                </button>
            </form>
            
            <SubmissionToast 
                message={toast.message} 
                type={toast.type} 
                onClose={closeToast} 
            />
        </div>
    );
};

export default ContactForm;
