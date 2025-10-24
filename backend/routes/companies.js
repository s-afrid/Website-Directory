import express from 'express';
import WebsiteData from '../models/website_data.js';

const router = express.Router();

// GET first 20 companies
router.get('/', async (req, res) => {
  try {
    const companies = await WebsiteData.find().limit(20).lean();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
