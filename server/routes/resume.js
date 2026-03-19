const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

// @route POST /api/resume/save
router.post("/save", resumeController.saveResume);

// @route GET /api/resume
router.get("/", resumeController.getResume);

// @route POST /api/resume/optimize
router.post("/optimize", resumeController.optimizeResume);

// @route POST /api/resume/parse
router.post("/parse", resumeController.parseResume);

module.exports = router;
