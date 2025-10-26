import express from 'express';
import Terms from '../models/Terms.js';

const router = express.Router();

// Get Terms for admin/frontend
router.get('/', async (req, res) => {
  try {
    const terms = await Terms.findOne({});
    res.json({ success: true, terms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch terms' });
  }
});

// Create or update Terms
router.post('/', async (req, res) => {
  try {
    const { section1, section2, section3, section4, contactEmail, contactWebsite } = req.body;

    let terms = await Terms.findOne({});

    const sections = [
      { heading: 'Acceptance of Terms', paragraphs: [section1] },
      { heading: 'User Obligations', paragraphs: [section2] },
      { heading: 'Limitation of Liability', paragraphs: [section3] },
      { heading: 'Governing Law', paragraphs: [section4] }
    ];

    if (terms) {
      terms.sections = sections;
      terms.contact = { email: contactEmail, website: contactWebsite };
      terms.updatedOn = new Date();
      await terms.save();
    } else {
      terms = new Terms({
        sections,
        contact: { email: contactEmail, website: contactWebsite }
      });
      await terms.save();
    }

    res.json({ success: true, terms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save terms' });
  }
});

export default router;
