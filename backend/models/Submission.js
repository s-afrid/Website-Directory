import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    twitter: { type: String, trim: true },
    website: { type: String, trim: true, unique: true },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
