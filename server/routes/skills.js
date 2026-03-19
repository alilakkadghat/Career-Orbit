const express = require("express");
const router = express.Router();
const skillsController = require("../controllers/skillsController");
const { validateSkillsArray } = require("../middleware/validateRequest");

// @route POST /api/skills/upload
router.post(
  "/upload",
  validateSkillsArray,
  skillsController.uploadSkills
);

// @route GET /api/skills/analysis
router.get("/analysis", skillsController.getAnalysis);

// @route GET /api/skills/trending
router.get("/trending", skillsController.getTrending);

// @route GET /api/skills/gap-analysis
router.get("/gap-analysis", skillsController.getGapAnalysis);

module.exports = router;
