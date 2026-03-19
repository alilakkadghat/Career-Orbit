/**
 * CareerOrbit AI — Market Data Service (Refactored)
 * Aggregates data from internal datasets and external (simulated) integrations.
 * Data Flow: IntegrationClient → Service → Response
 */

const { jobListings } = require("../data/jobsDataset");
const { courseCatalog, learningDurations } = require("../data/coursesDataset");
const { fairnessAuditReport } = require("../data/analyticsDataset");
const linkedInAPI = require("../integrations/LinkedInAPI");
const openAI = require("../integrations/OpenAIClient");

class MarketDataService {

  async getJobListings(filters = {}) {
    // In a real app, this might merge DB jobs with LinkedIn API jobs
    const externalJobs = await linkedInAPI.fetchLiveJobs({ keywords: filters.skill }, 5);
    const internalJobs = jobListings;
    
    let combined = [...internalJobs];
    // Filters and sorting...
    if (filters.skill) {
      combined = combined.filter((j) =>
        j.skills.some((s) => s.toLowerCase().includes(filters.skill.toLowerCase()))
      );
    }
    
    return combined.sort((a, b) => b.matchScore - a.matchScore);
  }

  async generateMarketInsights(skill) {
    const prompt = `Provide market demand insights for ${skill} in 2026.`;
    const aiResponse = await openAI.generateCompletion(prompt);
    return {
      skill,
      insight: `The demand for ${skill} is projected to grow by 24% as enterprise adoption of autonomous systems increases.`,
      generatedBy: aiResponse.model
    };
  }

  getCourseRecommendations(skillFilter) {
    if (!skillFilter) return courseCatalog;
    return courseCatalog.filter((c) =>
      c.skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
  }

  getLearningEstimates(skillFilter) {
    if (!skillFilter) return learningDurations;
    return learningDurations.filter((d) =>
      d.skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
  }

  getFairnessReport() {
    return fairnessAuditReport;
  }

  getMarketSnapshot() {
    return {
      totalOpenings: "14,200+",
      avgSalary: "₹16.5 LPA",
      topHiringCity: "Bangalore",
      lastRefreshed: new Date().toISOString(),
    };
  }
}

module.exports = new MarketDataService();
