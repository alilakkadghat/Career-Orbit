const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// @route GET /api/dashboard/trends
router.get("/trends", dashboardController.getTrends);

// @route GET /api/dashboard/decay
router.get("/decay", dashboardController.getDecay);

module.exports = router;
