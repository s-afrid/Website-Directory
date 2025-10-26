// routes/about.js
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import About from "../models/About.js"; // adjust if different path

const router = express.Router();

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "inspiro/about",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// POST route to update About
router.post("/", upload.fields([
  { name: "left", maxCount: 1 },
  { name: "center", maxCount: 1 },
  { name: "right", maxCount: 1 },
]), async (req, res) => {
  try {
    const header = JSON.parse(req.body.header || "[]");
    const content = JSON.parse(req.body.content || "[]");

    const images = {
      left: req.files["left"] ? req.files["left"][0].path : null,
      center: req.files["center"] ? req.files["center"][0].path : null,
      right: req.files["right"] ? req.files["right"][0].path : null,
    };

    // Either create or update (upsert)
    const about = await About.findOneAndUpdate(
      {},
      { header, content, images },
      { upsert: true, new: true }
    );

    res.json({ success: true, about });
  } catch (error) {
    console.error("Error updating About:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
