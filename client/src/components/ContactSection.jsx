import React from 'react';
import { FileText, Phone } from 'lucide-react'; // Using lucide-react for icons

const ContactSection = () => {
  return (
    // Main container: Centered content, padding, and subtle background
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Contact us.
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
          We'd love to hear from you! Whether you have questions, feedback, partnership
          inquiries, or sponsorship opportunities, our team is ready to help.
        </p>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Product Support */}
          <div className="bg-gray-50/50 p-6 sm:p-10 rounded-xl text-left border border-gray-100/80 shadow-sm">
            <div className="mb-6">
              {/* Icon Container: Dark border/stroke color from the image */}
              <FileText className="w-10 h-10 text-gray-900 stroke-1.5" /> 
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Product Support
            </h3>
            <p className="text-gray-600 mb-6">
              Get help from the community. If you're on a paid plan, submit a ticket to our support team.
            </p>
            
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg text-base font-medium hover:bg-gray-700 transition duration-150">
              Get Support
            </button>
          </div>

          {/* Card 2: Sales Team */}
          <div className="bg-gray-50/50 p-6 sm:p-10 rounded-xl text-left border border-gray-100/80 shadow-sm">
            <div className="mb-6">
              {/* Icon Container: Dark border/stroke color from the image */}
              <Phone className="w-10 h-10 text-gray-900 stroke-1.5" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Talk to our Sales team.
            </h3>
            <p className="text-gray-600 mb-6">
              Discuss your requirements, learn about custom pricing, or request a demonstration.
            </p>
            
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg text-base font-medium hover:bg-gray-700 transition duration-150">
              Contact Sales
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ContactSection;