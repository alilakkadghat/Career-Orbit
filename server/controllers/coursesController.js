/**
 * CareerOrbit AI — Courses Controller
 * Handles course recommendation requests.
 * Data flow: Route → Controller → MarketDataService → CoursesDataset
 */

const marketDataService = require("../services/marketDataService");
const response = require("../utils/responseFormatter");
const { withAIMetadata } = require("../utils/responseFormatter");

exports.getRecommendations = (req, res) => {
  const { skill } = req.query;
  const courses = marketDataService.getCourseRecommendations(skill);

  return response.success(res, {
    totalCourses: courses.length,
    courses,
    aiNote: "Courses are ranked by CareerOrbit AI based on your skill gap analysis, market relevance, and learner success rates.",
    ...withAIMetadata("courseRecommender"),
  });
};
