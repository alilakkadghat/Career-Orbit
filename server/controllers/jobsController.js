/**
 * CareerOrbit AI — Jobs Controller
 * Handles job matching and opportunities filtering.
 * Data flow: Route → Controller → MarketDataService → JobsDataset
 */

const marketDataService = require("../services/marketDataService");
const response = require("../utils/responseFormatter");
const { withAIMetadata } = require("../utils/responseFormatter");

exports.getRecommendations = (req, res) => {
  const { skill, location, minMatchScore } = req.query;
  const jobs = marketDataService.getJobListings({ skill, location, minMatchScore });
  const marketSnapshot = marketDataService.getMarketSnapshot();

  return response.success(res, {
    totalJobs: jobs.length,
    jobs,
    marketSnapshot,
    aiNote: "Job recommendations are ranked by CareerOrbit's AI matching algorithm using skill overlap and experience alignment scores.",
    ...withAIMetadata("jobMatcher"),
  });
};
