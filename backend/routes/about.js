import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import About from "../models/About.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 🔧 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🧩 Multer setup (store files temporarily in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST route — upload & save About data
router.post("/", upload.fields([
  { name: "left", maxCount: 1 },
  { name: "center", maxCount: 1 },
  { name: "right", maxCount: 1 },
]), async (req, res) => {
  try {
    console.log("🔥 POST /api/about hit");
    console.log("Body:", req.body);
    console.log("Files:", Object.keys(req.files));

    // 🧠 Parse JSON fields safely
    const header = JSON.parse(req.body.header || "[]");
    const content = JSON.parse(req.body.content || "[]");

    // ✅ Upload each image to Cloudinary
    const uploadToCloudinary = async (fileBuffer, folder) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "about_section" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });
    };

    // 📸 Upload images if they exist
    const uploadedImages = {};
    for (const key of ["left", "center", "right"]) {
      if (req.files[key]) {
        uploadedImages[key] = await uploadToCloudinary(req.files[key][0].buffer, key);
      }
    }

    console.log("✅ Uploaded Images:", uploadedImages);

    // 💾 Save or Update in MongoDB
    let about = await About.findOne({});
    if (about) {
      // Update existing document
      about.header = header;
      about.content = content;
      about.images = { ...about.images, ...uploadedImages };
      await about.save();
    } else {
      // Create new document
      about = new About({
        header,
        content,
        images: uploadedImages,
      });
      await about.save();
    }

    res.json({
      success: true,
      message: "✅ About section saved successfully!",
      data: about,
    });

  } catch (error) {
    console.error("❌ Error saving About section:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});


// ✅ GET route — fetch from DB
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne({});
    if (!about) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res.json(about);
  } catch (error) {
    console.error("❌ Error fetching About section:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
