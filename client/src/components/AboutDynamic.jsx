import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutDynamic = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    axios
      .get('/api/about')
      .then((res) => setAboutData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!aboutData) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  const { title, content, images } = aboutData;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 text-center">
        {title}
      </h1>

      {/* Images Section */}
      {images && (
        <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
          {images.left && (
            <img
              src={images.left}
              alt="Left"
              className="w-28 sm:w-40 md:w-52 lg:w-64 rounded-xl shadow-xl"
            />
          )}
          {images.center && (
            <img
              src={images.center}
              alt="Center"
              className="w-40 sm:w-60 md:w-80 lg:w-[420px] rounded-xl shadow-2xl"
            />
          )}
          {images.right && (
            <img
              src={images.right}
              alt="Right"
              className="w-28 sm:w-40 md:w-52 lg:w-64 rounded-xl shadow-xl"
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl text-gray-800 text-lg leading-relaxed text-justify whitespace-pre-line">
        {content}
      </div>
    </div>
  );
};

export default AboutDynamic;
