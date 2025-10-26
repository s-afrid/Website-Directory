import React, { useState } from 'react';
import axios from 'axios';

const AboutUpdate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // large text area content
  const [images, setImages] = useState({ left: null, center: null, right: null });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper component for styled form fields
  const InputField = ({ label, type = 'text', value, onChange, placeholder, required = false, isFullWidth = false }) => (
    <div className={isFullWidth ? 'col-span-full' : ''}>
      <label className="block mb-2 font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 transition duration-150 shadow-sm"
        required={required}
      />
    </div>
  );

  const FileUploadField = ({ label, pos }) => {
  const [fileName, setFileName] = useState(''); // local state for display

  return (
    <div className="flex flex-col">
      <label className="block mb-2 font-semibold text-gray-700 capitalize">
        {label}
      </label>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          setImages((prev) => ({ ...prev, [pos]: file }));
          setFileName(file?.name || '');
        }}
        className="w-full text-sm text-gray-700 bg-white border border-gray-300 p-2 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-150 shadow-sm"
      />
      {fileName && <p className="mt-1 text-sm text-gray-600">{fileName}</p>}
    </div>
  );
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: '', type: '' }); // Clear previous notification
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (images.left) formData.append('left', images.left);
    if (images.center) formData.append('center', images.center);
    if (images.right) formData.append('right', images.right);

    try {
      const res = await axios.post('/api/about', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
      setNotification({ message: 'Updated successfully ✅', type: 'success' });
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error updating ❌', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <form
        onSubmit={handleSubmit}
        // White card, large shadow, rounded corners
        className="max-w-3xl w-full space-y-6 p-8 sm:p-10 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100"
      >
        {/* Close Button Mockup for the modal look */}
        <div className="flex justify-end">
            <button type="button" className="text-gray-400 hover:text-gray-600 transition duration-150">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Update About Section</h2>
          <p className="text-gray-500 mt-2 text-md">
            Enter the new title, content, and optional images below.
          </p>
        </div>

        {/* Notification Alert (Replaces alert()) */}
        {notification.message && (
            <div
                className={`p-4 rounded-lg font-medium text-sm border ${
                    notification.type === 'success' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'
                }`}
                role="alert"
            >
                {notification.message}
            </div>
        )}

        {/* Form Fields - Title and a placeholder field (using a grid for paired fields) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
                label="Section Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                required={true}
            />
            {/* Using a placeholder field to maintain the paired layout from the reference image */}
            <div>
                <label className="block mb-2 font-semibold text-gray-700">
                    Category (Placeholder)
                </label>
                <select
                    className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 transition duration-150 shadow-sm appearance-none"
                    disabled
                >
                    <option>Select Section Type</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                </div>
            </div>
        </div>

        {/* Content (Textarea) */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the detailed about content here..."
            rows="8"
            className="w-full p-4 rounded-lg bg-white border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 transition duration-150 shadow-sm"
            required
          ></textarea>
        </div>

        {/* Image Uploads (Kept as grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          <FileUploadField label="Left Image" pos="left" />
          <FileUploadField label="Center Image" pos="center" />
          <FileUploadField label="Right Image" pos="right" />
        </div>

        {/* Submit Button - Deep Indigo style */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-lg py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isSubmitting ? 'Updating...' : 'Update Section'}
        </button>
      </form>
    </div>
  );
};

export default AboutUpdate;
