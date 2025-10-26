import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('About', AboutSchema);
