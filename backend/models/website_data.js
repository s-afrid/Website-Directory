import mongoose from 'mongoose';

// Define schema for website_data
const websiteDataSchema = new mongoose.Schema({
  id: String,
  title: String,
  oneLineDesc: String,
  url: String,
  imageURL: String,
  fullDesc: String,
  isFeatured: Boolean,
  isSponsored: Boolean,
  dateAdded: String,
  tags: {
    industry: String,
    type: String,
    style: String,
    stack: String
  },
  details: {
    founder: String,
    year: String,
    size: String,
    location: String,
    monRevenue: String,
    funding: String
  }
});

// Export model pointing to 'website_data' collection
const WebsiteData = mongoose.model('WebsiteData', websiteDataSchema, 'website_data');

export default WebsiteData;
