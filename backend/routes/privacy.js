import express from 'express';
import PrivacyPolicy from '../models/PrivacyPolicy.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne();
    if (!policy) return res.json({ success: false, message: 'No policy found' });
    res.json({ success: true, policy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
