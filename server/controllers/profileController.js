/**
 * CareerOrbit AI — Profile Controller
 * Handles user profile CRUD operations.
 * Data flow: Route → Controller → DataLayer (seedUserProfiles)
 */

const { seedUserProfiles } = require("../data/analyticsDataset");
const response = require("../utils/responseFormatter");
const logger = require("../middleware/requestLogger");

// Runtime profile store (seeded from dataset)
const profileStore = { ...seedUserProfiles };

exports.createProfile = (req, res) => {
  const { userId, fullName, email, education, degree, institution, skills, experience, currentRole, targetRole, targetIndustry, timeframe, careerInterests } = req.body;

  const id = userId || "U" + Date.now();
  const profile = {
    id,
    username: fullName || "CareerOrbit User",
    email: email || "user@careerorbit.ai",
    education: education || "",
    institution: institution || "",
    degree: degree || "",
    skills: skills || [],
    skillLevels: {},
    experience: experience || "Fresher",
    currentRole: currentRole || "Student",
    targetRole: targetRole || "",
    targetIndustry: targetIndustry || "",
    timeframe: timeframe || "6 months",
    careerInterests: careerInterests || [],
    profileCompleted: true,
    createdAt: new Date().toISOString(),
  };

  if (profile.skills.length > 0) {
    profile.skills.forEach((s) => {
      profile.skillLevels[s] = Math.floor(Math.random() * 40) + 50;
    });
  }

  profileStore[id] = profile;
  logger.info(`[PROFILE] Created profile for user: ${id}`);

  return response.success(res, {
    message: "Profile created successfully",
    profile,
    aiInsight: `Based on your skills in ${profile.skills.slice(0, 3).join(", ")}, CareerOrbit AI has identified ${profile.targetRole || "Full Stack Developer"} as a high-match career path.`,
  }, 201);
};

exports.getProfile = (req, res) => {
  const userId = req.query.userId || "U1023";
  const profile = profileStore[userId] || profileStore["U1023"];

  return response.success(res, {
    profile,
    lastUpdated: new Date().toISOString(),
    completionScore: 92,
  });
};

exports.updateSkills = (req, res) => {
  const { userId, skills, skillLevels } = req.body;
  const id = userId || "U1023";

  if (profileStore[id]) {
    profileStore[id].skills = skills || profileStore[id].skills;
    if (skillLevels) profileStore[id].skillLevels = skillLevels;
  }

  logger.info(`[PROFILE] Updated skills for user: ${id}`);

  return response.success(res, {
    message: "Skills updated successfully",
    updatedSkills: profileStore[id]?.skills || [],
    skillLevels: profileStore[id]?.skillLevels || {},
    aiRecommendation: "Consider adding Machine Learning and Cloud Computing to increase your market competitiveness by 35%.",
  });
};
