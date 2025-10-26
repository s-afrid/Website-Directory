import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutDynamic = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    axios.get('/api/about')
      .then(res => setAboutData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!aboutData) return <div>Loading...</div>;

  const { header, images, content } = aboutData;

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-16 px-2">
        {header.map((line, i) => (
          <h1 key={i} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            {line}
          </h1>
        ))}
      </div>

      {/* Images */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        <img src={images.left} alt="Left" className="w-24 sm:w-44 md:w-60 lg:w-72 rounded-lg shadow-xl" />
        <img src={images.center} alt="Center" className="w-40 sm:w-72 md:w-96 lg:w-[480px] rounded-lg shadow-2xl" />
        <img src={images.right} alt="Right" className="w-24 sm:w-44 md:w-60 lg:w-72 rounded-lg shadow-xl" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto text-gray-800 py-16 space-y-8">
        {content.map((section, idx) => (
          <section key={idx}>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{section.sectionTitle}</h2>
            <div className="space-y-4 text-lg">
              {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AboutDynamic;
