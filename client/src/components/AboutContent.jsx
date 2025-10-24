import React from 'react';

const AboutContent = () => {
  return (
    // Main container for the content, centered and constrained
    <div className="w-full py-16 px-4 sm:px-8 lg:px-12 bg-white font-sans">
      <div className="max-w-3xl mx-auto text-gray-800 leading-relaxed space-y-8">
        
        {/* Main Body Paragraphs (Based on image_337b20.png) */}
        <section className="text-lg space-y-6">
          <p>
            At Inpiro, we bring together the world's best web designs, UI elements, and creative patterns — all in one place. Our goal is simple: to inspire designers, developers, and creators to build better digital experiences through real-world examples.
          </p>
          <p>
            We believe inspiration should be accessible, practical, and beautifully curated. That's why every design on Inpiro is handpicked for its creativity, usability, and modern aesthetic. From animations and menus to layouts and buttons, each element tells a story of thoughtful design.
          </p>
          <p>
            Whether you're crafting a new interface, exploring creative trends, or just looking for your next big idea, Inpiro helps you turn inspiration into creation — one design at a time.
          </p>
        </section>

        {/* The Vision Section (Based on image_337b20.png) */}
        <section className="pt-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            The Vision
          </h2>
          <div className="text-lg space-y-6">
            <p>
              At Inpiro, we believe great design should be shared, celebrated, and accessible to everyone. Our mission is to empower designers, developers, and creators with real-world inspiration — helping them craft better digital experiences through proven design patterns and modern UI components.
            </p>
            <p>
              We imagine a world where creativity isn't limited to closed portfolios or scattered screenshots, but openly available as living examples of innovation. Whether you're building a product, redesigning a website, or exploring creative trends, Inpiro helps you learn from the best — one pixel at a time.
            </p>
          </div>
        </section>

        {/* --- ADDED SECTION --- */}
        
        {/* The Makers Section (Based on image_337edd.png) */}
        <section className="pt-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            The Makers
          </h2>
          <div className="text-lg space-y-6">
            <p>
              Inpiro is built by a passionate team of designers, developers, and digital storytellers who understand the power of visual inspiration. With years of experience in design, branding, and web development, we've created a platform that bridges the gap between creativity and practicality.
            </p>
            <p>
              Our goal is simple — to make it easier for anyone to discover, learn from, and be inspired by exceptional web design. From elegant animations to thoughtful layouts, Inpiro curates the web's most inspiring design elements so you can bring your own creative vision to life.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutContent;