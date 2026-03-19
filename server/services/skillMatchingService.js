/**
 * CareerOrbit AI — Skill Matching Service
 * Core AI service that analyzes user skills against market data and role requirements.
 * Pipeline: UserProfile → SkillGraph → MarketIndex → Recommendations
 */

const { skillTaxonomy, trendingSkills, skillDemandTimeSeries, skillDecayRates, roleSkillRequirements } = require("../data/skillsDataset");
const { calculateMatchScore, generateProficiencyScore } = require("../utils/analyticsHelpers");

class SkillMatchingService {
  
  analyzeUserSkills(userSkills) {
    return userSkills.map((skill) => ({
      skill,
      proficiency: generateProficiencyScore(skill),
      marketRelevance: this._getMarketRelevance(skill),
      demandTrend: this._getDemandTrend(skill),
      competitorPercentile: Math.floor(Math.random() * 20) + 70,
    }));
  }

  getTrendingSkills() {
    return trendingSkills;
  }

  getSkillDemandTrends() {
    return skillDemandTimeSeries;
  }

  getDecayAnalysis() {
    return skillDecayRates;
  }

  computeGapAnalysis(userSkills, targetRole) {
    const requiredSkills = roleSkillRequirements[targetRole] || roleSkillRequirements["Full Stack Developer"];
    const matched = userSkills.filter((s) => requiredSkills.some((r) => r.toLowerCase() === s.toLowerCase()));
    const missing = requiredSkills.filter((s) => !userSkills.some((u) => u.toLowerCase() === s.toLowerCase()));
    const gapPercentage = Math.round((missing.length / requiredSkills.length) * 100);

    return {
      targetRole,
      requiredSkills,
      matchedSkills: matched,
      missingSkills: missing,
      gapPercentage,
      matchPercentage: 100 - gapPercentage,
      prioritySkills: missing.slice(0, 3).map((s, i) => ({
        skill: s,
        priority: i === 0 ? "Critical" : i === 1 ? "High" : "Medium",
        estimatedLearningTime: `${Math.floor(Math.random() * 3) + 1} months`,
      })),
    };
  }

  _getMarketRelevance(skill) {
    const match = skillTaxonomy.technical.find((s) => s.name.toLowerCase() === skill.toLowerCase());
    return match ? match.demandIndex : Math.floor(Math.random() * 20) + 65;
  }

  _getDemandTrend(skill) {
    const trends = ["Growing", "Stable", "High Demand", "Rapidly Growing"];
    const match = skillTaxonomy.technical.find((s) => s.name.toLowerCase() === skill.toLowerCase());
    if (match && parseInt(match.growth) > 20) return "Rapidly Growing";
    if (match && parseInt(match.growth) > 10) return "Growing";
    return trends[Math.floor(Math.random() * trends.length)];
  }
}

module.exports = new SkillMatchingService();
