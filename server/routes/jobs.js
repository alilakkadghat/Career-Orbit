const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobsController");

// @route GET /api/jobs/recommendations
router.get("/recommendations", jobsController.getRecommendations);

module.exports = router;
