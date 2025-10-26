import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminTermsForm = () => {
  const [formData, setFormData] = useState({
    section1: '',
    section2: '',
    section3: '',
    section4: '',
    contactEmail: '',
    contactWebsite: ''
  });

  const [message, setMessage] = useState('');

  // Load existing terms
  useEffect(() => {
    axios.get('/api/admin/terms')
      .then(res => {
        if (res.data.success && res.data.terms) {
          const t = res.data.terms;
          setFormData({
            section1: t.sections[0]?.paragraphs[0] || '',
            section2: t.sections[1]?.paragraphs[0] || '',
            section3: t.sections[2]?.paragraphs[0] || '',
            section4: t.sections[3]?.paragraphs[0] || '',
            contactEmail: t.contact.email || '',
            contactWebsite: t.contact.website || ''
          });
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/terms', formData);
      setMessage(res.data.success ? 'Terms saved successfully!' : 'Failed to save terms.');
    } catch (err) {
      console.error(err);
      setMessage('Error saving terms.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md rubik">
      <h1 className="text-2xl font-bold mb-6">Admin Terms & Conditions Form</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Acceptance of Terms', name: 'section1' },
          { label: 'User Obligations', name: 'section2' },
          { label: 'Limitation of Liability', name: 'section3' },
          { label: 'Governing Law', name: 'section4' }
        ].map(f => (
          <div key={f.name}>
            <label className="block font-medium mb-1">{f.label}</label>
            <textarea
              name={f.name}
              value={formData[f.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              rows={4}
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contact Website</label>
          <input
            type="url"
            name="contactWebsite"
            value={formData.contactWebsite}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Terms
        </button>
      </form>
    </div>
  );
};

export default AdminTermsForm;
