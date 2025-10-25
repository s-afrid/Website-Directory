import express from 'express';
import Analytics from '../models/Analytics.js';

const router = express.Router();

// Helper to get today's date key
const getTodayKey = () => new Date().toISOString().split('T')[0];

// POST /api/analytics/log - log a site visit
router.post('/log', async (req, res) => {
  const { deviceType } = req.body;
  const today = getTodayKey();

  if (!['desktop','mobile','tablet'].includes(deviceType)) {
    return res.status(400).json({ error: 'Invalid device type' });
  }

  try {
    const analytics = await Analytics.findOneAndUpdate(
      { date: today },
      { $inc: { totalViews: 1, [deviceType]: 1 }, $set: { lastUpdated: new Date() } },
      { new: true, upsert: true }
    );
    res.json(analytics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log visit' });
  }
});

// GET /api/analytics - get last 30 days analytics
router.get('/', async (req, res) => {
  try {
    const data = await Analytics.find()
      .sort({ date: -1 })
      .limit(30)
      .lean();
    res.json(data.reverse()); // oldest first
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
