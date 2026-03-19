const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");

// @route GET /api/courses/recommendations
router.get("/recommendations", coursesController.getRecommendations);

module.exports = router;
