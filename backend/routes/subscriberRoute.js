import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// POST: Add new subscriber
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscribed successfully!", email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all subscriber emails
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}, "email");
    res.status(200).json(subscribers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
