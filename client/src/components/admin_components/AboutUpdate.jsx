import React, { useEffect, useState } from "react";
import axios from "axios";

const AboutUpdate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState({ left: null, center: null, right: null });
  const [preview, setPreview] = useState({ left: "", center: "", right: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Load About data (handle both array and single object)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about")
      .then((res) => {
        let data = res.data;

        if (Array.isArray(data)) data = data[0];
        if (data && data._doc) data = data._doc;

        if (data) {
          setTitle(data.header?.[0] || "");
          setContent(data.content?.[0]?.paragraphs?.[0] || "");
          setPreview({
            left: data.images?.left || "",
            center: data.images?.center || "",
            right: data.images?.right || "",
          });
        }
      })
      .catch((err) => console.error("❌ Fetch Error:", err));
  }, []);

  // ✅ Handle file selection
  const handleFileChange = (e, pos) => {
    const file = e.target.files[0];
    setImages((prev) => ({ ...prev, [pos]: file }));
    if (file) setPreview((prev) => ({ ...prev, [pos]: URL.createObjectURL(file) }));
  };

  // ✅ Submit handler (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("header", JSON.stringify([title]));
      formData.append(
        "content",
        JSON.stringify([{ sectionTitle: title, paragraphs: [content] }])
      );

      // Only append if new images are uploaded
      if (images.left) formData.append("left", images.left);
      if (images.center) formData.append("center", images.center);
      if (images.right) formData.append("right", images.right);

      const res = await axios.post("http://localhost:5000/api/about", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Server Response:", res.data);
      setNotification({ message: "Updated successfully ✅", type: "success" });
    } catch (err) {
      console.error("❌ Update Error:", err);
      setNotification({ message: "Error updating ❌", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-6 p-8 sm:p-10 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Update About Section</h2>
          <p className="text-gray-500 mt-2 text-md">
            Edit title, content, or replace images below.
          </p>
        </div>

        {notification.message && (
          <div
            className={`p-4 rounded-lg font-medium text-sm border ${
              notification.type === "success"
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-red-100 text-red-700 border-red-300"
            }`}
            role="alert"
          >
            {notification.message}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Section Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter section title"
            required
            className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Content *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Enter detailed content"
            required
            className="w-full p-4 rounded-lg bg-white border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          />
        </div>

        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          {["left", "center", "right"].map((pos) => (
            <div key={pos} className="flex flex-col items-center">
              <label className="block mb-2 font-semibold text-gray-700 capitalize">
                {pos} Image
              </label>
              {preview[pos] && (
                <img
                  src={preview[pos].startsWith("blob:") ? preview[pos] : `http://localhost:5000${preview[pos]}`}
                  alt={pos}
                  className="w-full h-40 object-cover mb-2 rounded-lg shadow-sm"
                />
              )}
              <input
                type="file"
                onChange={(e) => handleFileChange(e, pos)}
                className="w-full text-sm text-gray-700 bg-white border border-gray-300 p-2 rounded-lg cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-lg py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isSubmitting ? "Updating..." : "Update Section"}
        </button>
      </form>
    </div>
  );
};

export default AboutUpdate;
