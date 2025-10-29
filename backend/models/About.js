import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    header: [String],
    content: [
      {
        sectionTitle: String,
        paragraphs: [String],
      },
    ],
    images: {
      left: String,
      center: String,
      right: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", AboutSchema);
