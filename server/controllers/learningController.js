/**
 * CareerOrbit AI — Learning Controller
 * Estimator for learning durations and skill acquisition timeframes.
 * Data flow: Route → Controller → MarketDataService → CoursesDataset
 */

const marketDataService = require("../services/marketDataService");
const response = require("../utils/responseFormatter");
const { withAIMetadata } = require("../utils/responseFormatter");

exports.getDuration = (req, res) => {
  const { skill } = req.query;
  const durations = marketDataService.getLearningEstimates(skill);
  const totalMonths = durations.reduce((sum, d) => sum + d.estimatedMonths, 0);

  return response.success(res, {
    totalSkills: durations.length,
    totalEstimatedMonths: totalMonths,
    durations,
    aiNote: `Based on your current proficiency and learning patterns, CareerOrbit AI estimates ${totalMonths} months of focused study to cover identified skill gaps.`,
    assumptions: [
      "10–15 hours of study per week",
      "Includes hands-on projects and practical exercises",
      "Based on average completion rates from 145K+ learners",
    ],
    ...withAIMetadata("careerPredictor"),
  });
};
