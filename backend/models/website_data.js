import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema({
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
    stack: String,
  },
  details: {
    founder: String,
    year: String,
    size: String,
    location: String,
    monRevenue: String,
    funding: String,
  }
});

// Use exact collection name
export default mongoose.model("WebsiteData", websiteSchema, "website_data");
