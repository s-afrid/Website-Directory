import express from 'express';
import PrivacyPolicy from '../../models/PrivacyPolicy.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { sections, contact } = req.body;

    if (!sections || !contact) {
      return res.status(400).json({ success: false, message: 'Sections and contact are required' });
    }

    // Check if a policy already exists
    let policy = await PrivacyPolicy.findOne();
    if (policy) {
      policy.sections = sections;
      policy.contact = contact;
      policy.updatedOn = new Date();
    } else {
      policy = new PrivacyPolicy({ sections, contact });
    }

    await policy.save();
    return res.json({ success: true, policy });
  } catch (err) {
    console.error('Error saving policy:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
