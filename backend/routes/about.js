import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 🧩 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ⚙️ Multer + Cloudinary setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "website_directory/about",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: file.fieldname + "-" + Date.now(),
  }),
});
const upload = multer({ storage }).fields([
  { name: "left", maxCount: 1 },
  { name: "center", maxCount: 1 },
  { name: "right", maxCount: 1 },
]);

// 🧠 Helper to log cleanly
const pretty = (obj) => JSON.stringify(obj, null, 2);

// 📨 POST route
router.post("/", upload, async (req, res) => {
  console.log("🔥 POST /api/about hit");

  try {
    console.log("🧾 Raw body:", req.body);

    // Parse header and content (if they come as strings)
    const header = JSON.parse(req.body.header || "[]");
    const content = JSON.parse(req.body.content || "[]");

    // Collect image URLs from Cloudinary
    const uploadedFiles = {};
    if (req.files) {
      for (const key of Object.keys(req.files)) {
        uploadedFiles[key] = req.files[key][0].path; // Cloudinary gives direct URL
      }
    }

    console.log("✅ Parsed body:", pretty({ header, content }));
    console.log("🖼️ Uploaded Files:", pretty(uploadedFiles));

    // Send clean JSON response
    res.status(200).json({
      success: true,
      message: "Data received and images uploaded successfully",
      data: {
        header,
        content,
        imageUrls: uploadedFiles,
      },
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
