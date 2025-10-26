import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutDynamic = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/about')
      .then((res) => {
        if (res.data.success && res.data.about) {
          setAboutData(res.data.about);
        } else {
          console.error('No About data found');
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500 text-lg rubik">Loading...</div>;
  }

  if (!aboutData) {
    return <div className="text-center py-10 text-red-500 text-lg rubik">No About data found</div>;
  }

  const { title, images, content } = aboutData;

  return (
    // Set the background to white/off-white and handle main padding
    <div className="min-h-screen bg-white rubik pt-16 pb-20"> 
      
      {/* 1. Title - TOP SECTION */}
      {title && (
        <div className="text-center px-4 mb-16 sm:mb-20 md:mb-24"> 
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight">
              {title}
            </h1>
          </div>
        </div>
      )}

      {/* 2. Images - MIDDLE SECTION */}
      {images && (
        <div className="max-w-7xl mx-auto mb-16 sm:mb-20 md:mb-24 px-4 overflow-hidden">
          <div className="flex items-center justify-center relative"> 
            
            {/* Left Image: Smaller width and less negative margin */}
            {images.left && (
              <div className="absolute left-0 transform -translate-x-1/3 md:relative md:transform-none flex-shrink-0 w-20 sm:w-28 md:w-40 lg:w-48 -ml-2 sm:-ml-4 md:-ml-8 lg:-ml-12">
                <img
                  src={images.left}
                  alt="Left"
                  className="w-full h-auto shadow-xl rounded-lg transform translate-y-4 md:translate-y-0"
                />
              </div>
            )}
            
            {/* Center Image: Significantly smaller width */}
            {images.center && (
              <div className="flex-shrink-0 w-32 sm:w-56 md:w-72 lg:w-96 xl:w-[420px] z-10 mx-2 sm:mx-4">
                <img
                  src={images.center}
                  alt="Center"
                  className="w-full h-auto shadow-2xl rounded-lg"
                />
              </div>
            )}
            
            {/* Right Image: Smaller width and less negative margin */}
            {images.right && (
              <div className="absolute right-0 transform translate-x-1/3 md:relative md:transform-none flex-shrink-0 w-20 sm:w-28 md:w-40 lg:w-48 -mr-2 sm:-mr-4 md:-mr-8 lg:-mr-12">
                <img
                  src={images.right}
                  alt="Right"
                  className="w-full h-auto shadow-xl rounded-lg transform -translate-y-4 md:-translate-y-0"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Content - BOTTOM SECTION: TEXT JUSTIFIED CENTER */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Added text-center here to center the text within the content block */}
          <div className="text-gray-700 leading-relaxed space-y-8 text-center"> 
            {content?.map((section, idx) => (
              <section key={idx} className="text-lg space-y-4">
                {section.sectionTitle && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {section.sectionTitle}
                  </h2>
                )}
                <div className="space-y-6">
                  {section.paragraphs?.map((p, i) => (
                    // Tailwind doesn't have a 'text-justify-center' class. 
                    // 'text-center' is used to align the text block to the center.
                    <p key={i} className="text-base sm:text-lg">{p}</p> 
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDynamic;