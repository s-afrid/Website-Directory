import React from 'react';
import { Mail, Globe } from 'lucide-react'; // <-- CORRECTED: Mail and Globe must be imported here

const PrivacyPolicy = () => {
  return (
    // Main container: Ensures the policy takes full width, with responsive padding.
    <div className="w-full py-16 px-4 sm:px-8 lg:px-12 bg-white font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Policy Header */}
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
            Privacy Policy – Inpiro
          </h1>
          <p className="text-lg text-gray-600">
            Updated On–24/10/2025
          </p>
        </header>

        {/* Introductory Text */}
        <section className="mb-10 text-lg text-gray-800 leading-relaxed">
          <p>
            Welcome to Inpiro. Your privacy is of utmost importance to us, and we are fully committed to protecting the personal information that you share while using our website [<a href="https://inpiro.com" className="text-blue-600 hover:underline">inpiro.com</a>]. This Privacy Policy outlines how we collect, use, store, and protect your personal data, as well as the rights you have in relation to your information. By accessing or using Inpiro, you agree to the terms described in this policy.
          </p>
        </section>

        {/* Introduction Section (From previous request) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Introduction
          </h2>
          <div className="text-lg text-gray-800 leading-relaxed">
            <p>
              At Inpiro, we operate as a digital directory platform dedicated to showcasing startups, SaaS tools, and online services to a global audience of innovators, creators, and professionals. In the process of providing these services, we collect certain information from our users — including visitors, sponsors, and registered members — to ensure a smooth and personalized experience. This Privacy Policy explains the types of data we collect, how we use it, and how we safeguard it. We encourage you to read it carefully to understand our practices and your rights.
            </p>
          </div>
        </section>

        {/* Information We Collect Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Information We Collect
          </h2>
          <div className="text-lg text-gray-800 leading-relaxed space-y-6">
            <p>
              When you interact with Inpiro, we may collect both personal and non-personal data. Personal information refers to any data that can identify you as an individual, such as your name, email address, company name, or website URL. You may voluntarily provide this information when you create a profile, submit a listing, fill out sponsorship or contact forms, subscribe to newsletters, or communicate with us through any of our contact channels.
            </p>
            <p>
              In addition to personal information, we also collect non-personal data automatically through technologies such as cookies, analytics tools, and server logs. This data includes your IP address, browser type, operating system, device information, geographic location (approximate), and details of how you use and navigate our website. Such information helps us understand usage trends, improve functionality, and enhance your overall experience on our platform.
            </p>
          </div>
        </section>

        {/* How We Use Your Information Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How We Use Your Information
          </h2>
          <div className="text-lg text-gray-800 leading-relaxed space-y-6">
            <p>
              The information collected on Inpiro is used primarily to operate and enhance our website’s functionality, deliver our services effectively, and maintain smooth communication with our users. Specifically, we may use your information to create and manage listings, process sponsorship applications, publish featured content, respond to inquiries, and provide relevant updates.
            </p>
            <p>
              We may also use your information to send newsletters, promotional materials, or important announcements — but only if you have opted in to receive them. Non-personal data is analyzed to improve site performance, understand visitor behavior, and optimize content or advertising placements. Our aim is to deliver a more tailored and relevant experience for every visitor and sponsor engaging with Inpiro.
            </p>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <div className="text-lg text-gray-800 leading-relaxed space-y-6">
            <p>
              If you have any questions, feedback, or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>

            {/* Contact Details */}
            <ul className="list-none p-0 space-y-2 text-lg font-medium">
              <li className="flex items-center text-gray-800">
                <Mail className="w-5 h-5 mr-3 text-gray-500" />
                <span>privacy@inpiro.com</span>
              </li>
              <li className="flex items-center text-blue-600 hover:text-blue-700">
                <Globe className="w-5 h-5 mr-3" />
                <a href="https://www.inpiro.com" target="_blank" rel="noopener noreferrer" className="underline">
                  www.inpiro.com
                </a>
              </li>
            </ul>

            <p>
              We value your trust and are committed to ensuring that your experience on Inpiro remains transparent, secure, and respectful of your privacy at all times.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;