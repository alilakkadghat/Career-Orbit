const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// @route GET /api/dashboard/trends
router.get("/trends", dashboardController.getTrends);

// @route GET /api/dashboard/decay
router.get("/decay", dashboardController.getDecay);

// @route GET /api/dashboard/fairness
router.get("/fairness", dashboardController.getFairness);

module.exports = router;
