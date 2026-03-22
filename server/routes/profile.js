const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { authenticate } = require("../middleware/authMiddleware");
const { validateBody, validateSkillsArray } = require("../middleware/validateRequest");

// @route POST /api/profile/create
router.post(
  "/create",
  validateBody(["fullName", "email"]),
  profileController.createProfile
);

// @route GET /api/profile
router.get("/", profileController.getProfile);

// @route PUT /api/profile/update-skills
router.put(
  "/update-skills",
  validateSkillsArray,
  profileController.updateSkills
);

module.exports = router;
