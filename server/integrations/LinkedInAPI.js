/**
 * CareerOrbit AI — LinkedIn & Job Board Integration (Simulated)
 * Simulates external API calls to LinkedIn Economic Graph and Job Search APIs.
 */

const { jobListings } = require("../data/jobsDataset");
const logger = require("../middleware/requestLogger");

class LinkedInIntegration {
  constructor() {
    this.apiBase = "https://api.linkedin.com/v2";
  }

  /**
   * Simulates fetching live job postings.
   */
  async fetchLiveJobs(query = {}, limit = 10) {
    logger.info(`[MARKET-INTEGRATION] Fetching live jobs from LinkedIn API | Query: ${JSON.stringify(query)}`);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 600));

    let filtered = [...jobListings];
    if (query.keywords) {
      filtered = filtered.filter(j => 
        j.role.toLowerCase().includes(query.keywords.toLowerCase()) ||
        j.skills.some(s => s.toLowerCase().includes(query.keywords.toLowerCase()))
      );
    }

    return filtered.slice(0, limit);
  }

  /**
   * Simulates fetching industry salary benchmarks.
   */
  async getSalaryBenchmarks(role, location = "India") {
    logger.info(`[MARKET-INTEGRATION] Querying salary benchmarks for ${role} in ${location}`);
    return {
      role,
      location,
      currency: "INR",
      percentiles: { p10: 600000, p50: 1400000, p90: 2800000 },
      trend: "Rising",
      confidence: 0.94
    };
  }
}

module.exports = new LinkedInIntegration();
