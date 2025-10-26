import mongoose from 'mongoose';

const termSchema = new mongoose.Schema({
  sections: [
    {
      heading: { type: String, required: true },
      paragraphs: [{ type: String }]
    }
  ],
  contact: {
    email: { type: String },
    website: { type: String }
  },
  updatedOn: { type: Date, default: Date.now }
});

const Terms = mongoose.model('Terms', termSchema);

export default Terms;
