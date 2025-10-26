import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraphs: [{ type: String, required: true }],
});

const PrivacyPolicySchema = new mongoose.Schema({
  sections: { type: [SectionSchema], required: true },
  contact: {
    email: { type: String, required: true },
    website: { type: String, required: true },
  },
  updatedOn: { type: Date, default: Date.now },
});

export default mongoose.model('PrivacyPolicy', PrivacyPolicySchema);
