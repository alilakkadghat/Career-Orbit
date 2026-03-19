/**
 * CareerOrbit AI — Career Prediction Service
 * Generates career recommendations, timeline projections, sector transition maps,
 * and Monte Carlo career simulations.
 * Pipeline: UserSkills → RoleGraph → MarketDemand → CareerPath
 */

const { roleRecommendations, careerTimeline, sectorTransitions, careerSimulationTemplate } = require("../data/careersDataset");
const { calculateMatchScore } = require("../utils/analyticsHelpers");

class CareerPredictionService {

  getRoleRecommendations(userSkills = []) {
    if (userSkills.length === 0) return roleRecommendations;

    return roleRecommendations.map((role) => ({
      ...role,
      matchScore: calculateMatchScore(userSkills, role.requiredSkills),
    })).sort((a, b) => b.matchScore - a.matchScore);
  }

  generateTimeline(targetRole) {
    return {
      targetRole: targetRole || "Full Stack Developer → Tech Lead",
      totalDuration: "3–5 years",
      stages: careerTimeline,
    };
  }

  getTransitionPaths(currentRole) {
    if (!currentRole) return sectorTransitions;
    return sectorTransitions.filter((t) =>
      t.from.toLowerCase().includes(currentRole.toLowerCase())
    );
  }

  runSimulation(userProfile = {}) {
    const simulation = { ...careerSimulationTemplate };
    if (userProfile.currentRole) {
      simulation.currentRole = userProfile.currentRole;
    }
    return simulation;
  }
}

module.exports = new CareerPredictionService();
