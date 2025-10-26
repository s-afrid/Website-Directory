import React, { useEffect, useState } from 'react';
import { Mail, Globe } from 'lucide-react';
import axios from 'axios';

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    axios.get('/api/privacy')
      .then(res => {
        if (res.data.success) setPolicy(res.data.policy);
      })
      .catch(err => console.error(err));
  }, []);

  if (!policy) return <div className="text-center py-10 rubik">Loading...</div>;

  return (
    <div className="w-full py-16 px-4 sm:px-8 lg:px-12 bg-white rubik">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy and Policy</h2>
          <p className="text-lg text-gray-600">
            Updated On–{new Date(policy.updatedOn).toLocaleDateString()}
          </p>
        </header>

        {policy.sections.map((sec, idx) => (
          <section key={idx} className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{sec.heading}</h2>
            <div className="text-lg text-gray-800 leading-relaxed space-y-4">
              {sec.paragraphs.map((p, pIdx) => <p key={pIdx}>{p}</p>)}
            </div>
          </section>
        ))}

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <ul className="list-none p-0 space-y-2 text-lg font-medium">
            <li className="flex items-center text-gray-800">
              <Mail className="w-5 h-5 mr-3 text-gray-500" /> {policy.contact.email}
            </li>
            <li className="flex items-center text-blue-600 hover:text-blue-700">
              <Globe className="w-5 h-5 mr-3" />
              <a href={policy.contact.website} target="_blank" rel="noopener noreferrer" className="underline">
                {policy.contact.website}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
