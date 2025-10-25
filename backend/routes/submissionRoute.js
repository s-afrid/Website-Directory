import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

// POST: Submit a new site
router.post("/", async (req, res) => {
  const { name, email, twitter, website } = req.body;

  if (!name || !email || !website) {
    return res.status(400).json({ message: "Name, email, and website are required" });
  }

  try {
    const existing = await Submission.findOne({ website });
    if (existing) {
      return res.status(400).json({ message: "This website has already been submitted!" });
    }

    const newSubmission = new Submission({ name, email, twitter, website });
    await newSubmission.save();

    res.status(201).json({ message: "Submission received successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

export default router;
