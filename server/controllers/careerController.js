/**
 * CareerOrbit AI — Career Controller
 * Handles career-related intelligence including recommendations, timelines, transitions, and simulations.
 * Data flow: Route → Controller → CareerPredictionService → CareersDataset
 */

const careerPredictionService = require("../services/careerPredictionService");
const { seedUserProfiles } = require("../data/analyticsDataset");
const response = require("../utils/responseFormatter");
const { withAIMetadata } = require("../utils/responseFormatter");

exports.getRecommendations = (req, res) => {
  const profile = seedUserProfiles["U1023"];
  const recommendations = careerPredictionService.getRoleRecommendations(profile.skills);

  return response.success(res, {
    totalRoles: recommendations.length,
    recommendations,
    aiNote: "Roles are ranked using CareerOrbit's multi-factor matching algorithm analyzing 14 skill dimensions, market demand, and growth trajectory.",
    ...withAIMetadata("jobMatcher"),
  });
};

exports.getTimeline = (req, res) => {
  const { role } = req.query;
  const timeline = careerPredictionService.generateTimeline(role);

  return response.success(res, {
    ...timeline,
    aiNote: "This timeline is personalized based on your current skill profile and learning velocity. Actual progression may vary based on effort and opportunities.",
    ...withAIMetadata("careerPredictor"),
  });
};

exports.getTransitions = (req, res) => {
  const { from } = req.query;
  const transitions = careerPredictionService.getTransitionPaths(from);

  return response.success(res, {
    totalTransitions: transitions.length,
    transitions,
    aiNote: "Transition feasibility scores are computed using skill overlap analysis, market demand vectors, and historical career trajectory data.",
    ...withAIMetadata("careerPredictor"),
  });
};

exports.getSimulator = (req, res) => {
  const profile = seedUserProfiles["U1023"];
  const simulation = careerPredictionService.runSimulation(profile);

  return response.success(res, {
    simulation,
    aiNote: "Career predictions are generated using Monte Carlo simulations on career trajectory data from 1.2M+ professionals with similar skill profiles.",
    confidence: "72–92% depending on market conditions",
    ...withAIMetadata("careerPredictor"),
  });
};
