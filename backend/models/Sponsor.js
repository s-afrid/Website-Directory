import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true, unique: true },
    budget: { type: String, required: true, trim: true },
    duration: { type: String, required: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Sponsor = mongoose.model("Sponsor", sponsorSchema);
export default Sponsor;
