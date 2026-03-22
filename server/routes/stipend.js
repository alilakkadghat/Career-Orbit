const express = require("express");
const router = express.Router();
const stipendController = require("../controllers/stipendController");

// @route POST /api/stipend/analyze
// @desc  Analyze a stipend offer vs market benchmarks
router.post("/analyze", stipendController.analyzeStipend);

// @route GET /api/stipend/benchmarks
// @desc  Get raw benchmark data for a role + location
router.get("/benchmarks", stipendController.getBenchmarks);

module.exports = router;
