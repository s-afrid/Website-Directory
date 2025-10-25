import React from 'react';
import { Mail, Globe } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-8 lg:px-12 bg-white font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
            Terms and Conditions – Inpiro
          </h1>
          <p className="text-lg text-gray-600">
            Updated On – 25/10/2025
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10 text-lg text-gray-800 leading-relaxed">
          <p>
            Welcome to Inpiro. By accessing or using our website [<a href="https://inpiro.com" className="text-blue-600 hover:underline">inpiro.com</a>], you agree to comply with and be bound by the following Terms and Conditions. These terms govern your use of our services and the rights, responsibilities, and limitations applicable to your interaction with our platform.
          </p>
        </section>

        {/* Use of Service */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Use of Service</h2>
          <div className="text-lg text-gray-800 leading-relaxed space-y-4">
            <p>
              Inpiro provides a digital directory of startups, SaaS tools, and online services. You agree to use our services responsibly and for lawful purposes only. You must not engage in activities that may harm, disrupt, or interfere with the functionality of our platform or compromise the privacy and security of other users.
            </p>
            <p>
              By creating listings, submitting content, or interacting with other users, you represent that you have the right to do so and that your contributions do not infringe on any third-party rights.
            </p>
          </div>
        </section>

        {/* Account Registration */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Account Registration</h2>
          <div className="text-lg text-gray-800 leading-relaxed space-y-4">
            <p>
              Certain features of Inpiro may require you to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account. Inpiro is not liable for any unauthorized access to your account or loss of data resulting from your failure to secure your account.
            </p>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
          <div className="text-lg text-gray-800 leading-relaxed space-y-4">
            <p>
              All content on Inpiro, including text, graphics, logos, images, and software, is the property of Inpiro or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.
            </p>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
          <div className="text-lg text-gray-800 leading-relaxed space-y-4">
            <p>
              Inpiro provides its services “as is” and makes no warranties or guarantees regarding accuracy, reliability, or availability. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our platform or reliance on any content provided therein.
            </p>
          </div>
        </section>

        {/* Modifications */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Modifications</h2>
          <div className="text-lg text-gray-800 leading-relaxed space-y-4">
            <p>
              Inpiro reserves the right to modify, update, or discontinue any part of its services, content, or these Terms and Conditions at any time without prior notice. Continued use of the platform constitutes your acceptance of such changes.
            </p>
          </div>
        </section>

        {/* Contact Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="text-lg text-gray-800 leading-relaxed space-y-6">
            <p>If you have any questions or concerns about these Terms and Conditions, please reach out to us at:</p>
            <ul className="list-none p-0 space-y-2 text-lg font-medium">
              <li className="flex items-center text-gray-800">
                <Mail className="w-5 h-5 mr-3 text-gray-500" />
                <span>terms@inpiro.com</span>
              </li>
              <li className="flex items-center text-blue-600 hover:text-blue-700">
                <Globe className="w-5 h-5 mr-3" />
                <a href="https://www.inpiro.com" target="_blank" rel="noopener noreferrer" className="underline">
                  www.inpiro.com
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
