import express from 'express';
import About from '../models/About.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create/Update About
router.post('/', upload.fields([
  { name: 'left', maxCount: 1 },
  { name: 'center', maxCount: 1 },
  { name: 'right', maxCount: 1 },
]), async (req, res) => {
  try {
    const { header, content } = req.body;

    // Upload images to Cloudinary
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'about_section' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const leftUrl = req.files.left ? await uploadToCloudinary(req.files.left[0].buffer) : null;
    const centerUrl = req.files.center ? await uploadToCloudinary(req.files.center[0].buffer) : null;
    const rightUrl = req.files.right ? await uploadToCloudinary(req.files.right[0].buffer) : null;

    // Save or update About
    let about = await About.findOne(); // single About doc
    if (!about) {
      about = new About({
        header: JSON.parse(header),
        images: { left: leftUrl, center: centerUrl, right: rightUrl },
        content: JSON.parse(content),
      });
    } else {
      about.header = JSON.parse(header);
      if (leftUrl) about.images.left = leftUrl;
      if (centerUrl) about.images.center = centerUrl;
      if (rightUrl) about.images.right = rightUrl;
      about.content = JSON.parse(content);
    }

    await about.save();
    res.status(200).json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get About data
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
