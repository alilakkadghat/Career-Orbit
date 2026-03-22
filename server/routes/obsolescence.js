const express = require("express");
const router = express.Router();
const obsolescenceController = require("../controllers/obsolescenceController");

// @route POST /api/obsolescence/analyze
// @desc  Analyze skill obsolescence risk for a list of skills
router.post("/analyze", obsolescenceController.analyzeSkills);

// @route GET /api/obsolescence/watchlist
// @desc  Get the current high-risk skills watchlist
router.get("/watchlist", obsolescenceController.getWatchlist);

module.exports = router;
