const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController");

// @route GET /api/career/recommendations
router.get("/recommendations", careerController.getRecommendations);

// @route GET /api/career/timeline
router.get("/timeline", careerController.getTimeline);

// @route GET /api/career/transitions
router.get("/transitions", careerController.getTransitions);

// @route GET /api/career/simulator
router.get("/simulator", careerController.getSimulator);

module.exports = router;
