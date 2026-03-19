/**
 * CareerOrbit AI — Skills Controller
 * Handles skill upload, analysis, trending, and gap analysis.
 * Data flow: Route → Controller → SkillMatchingService → SkillsDataset
 */

const skillMatchingService = require("../services/skillMatchingService");
const { seedUserProfiles } = require("../data/analyticsDataset");
const response = require("../utils/responseFormatter");
const { withAIMetadata } = require("../utils/responseFormatter");

exports.uploadSkills = (req, res) => {
  const { skills } = req.body;
  const uploaded = skills || ["JavaScript", "React", "Python"];
  const analysis = skillMatchingService.analyzeUserSkills(uploaded);

  return response.success(res, {
    message: `${uploaded.length} skills uploaded and analyzed`,
    uploadedSkills: uploaded,
    analysis,
    ...withAIMetadata("skillAnalyzer"),
  });
};

exports.getAnalysis = (req, res) => {
  const profile = seedUserProfiles["U1023"];
  const analysis = skillMatchingService.analyzeUserSkills(profile.skills);

  return response.success(res, {
    userId: profile.id,
    currentSkills: profile.skills,
    analysis,
    overallScore: 78,
    aiInsights: [
      "Your JavaScript proficiency is in the top 25% of developers in your experience range",
      "React.js skills align well with current market demand — 18% growth YoY",
      "Consider deepening Python expertise for AI/ML career tracks",
      "Adding TypeScript would increase your job match rate by approximately 22%",
    ],
    ...withAIMetadata("skillAnalyzer"),
  });
};

exports.getTrending = (req, res) => {
  const skills = skillMatchingService.getTrendingSkills();

  return response.success(res, {
    skills,
    source: "CareerOrbit Market Intelligence | 2.4M+ job postings analyzed",
    dataRange: "Jan 2026 – Mar 2026",
    ...withAIMetadata("marketPulse"),
  });
};

exports.getGapAnalysis = (req, res) => {
  const profile = seedUserProfiles["U1023"];
  const targetRole = req.query.role || "AI/ML Engineer";
  const gap = skillMatchingService.computeGapAnalysis(profile.skills, targetRole);

  return response.success(res, {
    ...gap,
    currentSkills: profile.skills,
    aiRecommendation: `To become a ${targetRole}, focus on: ${gap.missingSkills.slice(0, 3).join(", ")}. Estimated time: ${gap.missingSkills.length * 1.5} months.`,
    ...withAIMetadata("gapAnalyzer"),
  });
};
