import React from 'react';

const ContactHeader = () => {
  return (
    <div className="text-center pt-8 pb-4"> {/* Added padding for spacing */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Contact us.
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          We'd love to hear from you! Whether you have questions, feedback, partnership
          inquiries, or sponsorship opportunities, our team is ready to help.
        </p>
    </div>
  );
};

export default ContactHeader;