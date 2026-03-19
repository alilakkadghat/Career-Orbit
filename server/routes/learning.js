const express = require("express");
const router = express.Router();
const learningController = require("../controllers/learningController");

// @route GET /api/learning/duration
router.get("/duration", learningController.getDuration);

module.exports = router;
