import React, { useState } from 'react';
import axios from 'axios';

const AdminPrivacyForm = () => {
  const [sections, setSections] = useState([{ heading: '', paragraphs: [''] }]);
  const [contact, setContact] = useState({ email: '', website: '' });
  const [message, setMessage] = useState('');

  const handleSectionChange = (idx, field, value) => {
    const newSections = [...sections];
    if (field === 'heading') newSections[idx].heading = value;
    else newSections[idx].paragraphs[0] = value;
    setSections(newSections);
  };

  const addSection = () => setSections([...sections, { heading: '', paragraphs: [''] }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/privacy', { sections, contact });
      if (res.data.success) setMessage('Privacy Policy saved successfully!');
      else setMessage('Failed to save policy.');
    } catch (err) {
      console.error('Error:', err);
      setMessage('Error saving policy.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md rubik">
      <h1 className="text-2xl font-bold mb-6">Admin Privacy Policy Form</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {sections.map((sec, idx) => (
          <div key={idx} className="border p-4 rounded space-y-2">
            <input
              type="text"
              placeholder="Section Heading"
              value={sec.heading}
              onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              placeholder="Paragraph"
              value={sec.paragraphs[0]}
              onChange={(e) => handleSectionChange(idx, 'paragraph', e.target.value)}
              className="w-full border p-2 rounded"
              rows={4}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addSection} className="bg-gray-200 px-3 py-1 rounded">
          Add Section
        </button>

        <input
          type="email"
          placeholder="Contact Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="url"
          placeholder="Contact Website"
          value={contact.website}
          onChange={(e) => setContact({ ...contact, website: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Policy
        </button>
      </form>
    </div>
  );
};

export default AdminPrivacyForm;
