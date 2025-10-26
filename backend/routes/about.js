import express from "express";
import dotenv from "dotenv";
import About from "../models/About.js";

dotenv.config();

const router = express.Router();

// ✅ Create or Update About (plain text only)
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    const about = await About.findOneAndUpdate(
      {},
      { content },
      { upsert: true, new: true }
    );

    res.json({ success: true, about });
  } catch (err) {
    console.error("Error saving About content:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Get About Content
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne({});
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "No About data found",
      });
    }

    res.json({ success: true, about });
  } catch (error) {
    console.error("Error fetching About content:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
