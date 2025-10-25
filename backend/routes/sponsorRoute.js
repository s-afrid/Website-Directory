import express from "express";
import Sponsor from "../models/Sponsor.js";

const router = express.Router();

// POST: Submit a sponsor inquiry
router.post("/", async (req, res) => {
  const { name, email, company, website, budget, duration, message } = req.body;

  if (!name || !email || !company || !website || !budget || !duration || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for duplicate website
    const existing = await Sponsor.findOne({ website });
    if (existing) {
      return res.status(400).json({ message: "This website has already been submitted!" });
    }

    const newSponsor = new Sponsor({
      name,
      email,
      company,
      website,
      budget,
      duration,
      message,
    });

    await newSponsor.save();

    res.status(201).json({ message: "Sponsor inquiry submitted successfully!" });
  } catch (error) {
    console.error("Sponsor submission error:", error);
    res.status(500).json({ message: "Server error. Try again." });
  }
});

export default router;
