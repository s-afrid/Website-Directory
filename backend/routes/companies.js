// routes/companies.js
import express from 'express';
import WebsiteData from '../models/website_data.js';

const router = express.Router();

// GET companies with pagination
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 9; // default 9 per batch
  const skip = parseInt(req.query.skip) || 0;

  try {
    const companies = await WebsiteData.find()
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await WebsiteData.countDocuments(); // total entries

    res.json({ companies, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET single company by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const company = await WebsiteData.findById(id).lean();

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
