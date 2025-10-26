import express from "express";
import dotenv from 'dotenv';
dotenv.config(); 
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import About from "../models/About.js";

const router = express.Router();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "inspiro/about",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "left", maxCount: 1 },
    { name: "center", maxCount: 1 },
    { name: "right", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Parse body data
      let header = req.body.header ? JSON.parse(req.body.header) : [req.body.title];
      let content = req.body.content
        ? JSON.parse(req.body.content)
        : [{ sectionTitle: req.body.title, paragraphs: [req.body.content] }];

      // Images: use uploaded files if present
      const existingAbout = await About.findOne({});
      const images = {
        left: req.files["left"] ? req.files["left"][0].path : existingAbout?.images.left || "",
        center: req.files["center"] ? req.files["center"][0].path : existingAbout?.images.center || "",
        right: req.files["right"] ? req.files["right"][0].path : existingAbout?.images.right || "",
      };

      const about = await About.findOneAndUpdate(
        {},
        { header, content, images },
        { upsert: true, new: true }
      );

      res.json({ success: true, about });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// routes/about.js
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne({});
    if (!about) return res.status(404).json({ success: false, message: "No About data found" });
    res.json({ success: true, about });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


export default router;
