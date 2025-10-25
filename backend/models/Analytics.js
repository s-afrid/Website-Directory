import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  totalViews: { type: Number, default: 0 },
  desktop: { type: Number, default: 0 },
  mobile: { type: Number, default: 0 },
  tablet: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('Analytics', analyticsSchema);
