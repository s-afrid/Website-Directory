import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  header: {
    type: [String], // Array of lines for the header
    required: true,
  },
  images: {
    left: { type: String, required: true },
    center: { type: String, required: true },
    right: { type: String, required: true },
  },
  content: [
    {
      sectionTitle: String, // e.g., "The Vision", "The Makers"
      paragraphs: [String],
    },
  ],
}, { timestamps: true });

export default mongoose.model('About', AboutSchema);
