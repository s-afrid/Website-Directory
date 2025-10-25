import express from "express";
import WebsiteData from "../models/website_data.js";

const router = express.Router();

// GET companies with filters, random order, pagination + search
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9; // batch size
    const skip = parseInt(req.query.skip) || 0;

    // Build query only with meaningful filters
    const query = {};

    // 🎯 Search filter (case-insensitive partial match)
    if (req.query.searchQuery && req.query.searchQuery.trim() !== "") {
      const searchRegex = new RegExp(req.query.searchQuery, "i");
      query.$or = [
        { title: searchRegex },
        { oneLineDesc: searchRegex },
        { fullDesc: searchRegex },
      ];
    }

    // 🎯 Tag-based filters
    if (req.query.stack && req.query.stack !== "Stack") query["tags.stack"] = req.query.stack;
    if (req.query.industry && req.query.industry !== "Select Industry") query["tags.industry"] = req.query.industry;
    if (req.query.type && req.query.type !== "Type") query["tags.type"] = req.query.type;
    if (req.query.style && req.query.style !== "Style") query["tags.style"] = req.query.style;

    // Count total documents after filtering
    const total = await WebsiteData.countDocuments(query);

    // Use aggregation to get random order and batch pagination
    const companies = await WebsiteData.aggregate([
      { $match: query },                  // Apply filters
      { $sample: { size: total } },       // Shuffle all matching documents
      { $skip: skip },                    // Skip for pagination
      { $limit: limit },                  // Limit for batch
    ]);

    res.json({ companies, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single company by id
router.get("/:id", async (req, res) => {
  try {
    const company = await WebsiteData.findById(req.params.id).lean();
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
