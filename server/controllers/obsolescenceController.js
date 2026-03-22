/**
 * CareerOrbit AI — Skill Obsolescence Controller
 * Warns students when their tech skills are becoming outdated.
 * Uses Gemini AI for dynamic analysis + static fallback data.
 */

const gemini = require("../integrations/GeminiClient");
const response = require("../utils/responseFormatter");
const logger = require("../middleware/requestLogger");
const { withAIMetadata } = require("../utils/responseFormatter");

// Static obsolescence data as fallback
const STATIC_OBSOLESCENCE = {
  // Dying / very high risk
  "jQuery": { status: "declining", risk: 85, yearsRelevant: "2-3 years", recommendation: "Migrate to vanilla JS or React; jQuery is being removed from most new projects." },
  "AngularJS": { status: "obsolete", risk: 95, yearsRelevant: "< 1 year", recommendation: "Switch to Angular 17+ or React immediately. AngularJS is end-of-life." },
  "Flash": { status: "obsolete", risk: 100, yearsRelevant: "Already dead", recommendation: "Remove this from your resume entirely." },
  "COBOL": { status: "declining", risk: 70, yearsRelevant: "5-10 years (banking niche only)", recommendation: "Only relevant for legacy banking. Not useful for campus placements." },
  "PHP": { status: "declining", risk: 60, yearsRelevant: "3-5 years", recommendation: "Focus on modern frameworks (Laravel) if you must use PHP. Pivot to Node.js or Python." },
  "Cordova": { status: "obsolete", risk: 90, yearsRelevant: "< 1 year", recommendation: "Switch to React Native or Flutter for cross-platform mobile." },
  "Backbone.js": { status: "obsolete", risk: 95, yearsRelevant: "Already dead", recommendation: "Remove from resume. No modern companies use this." },

  // Stable / safe
  "JavaScript": { status: "stable", risk: 5, yearsRelevant: "10+ years", recommendation: "Evergreen skill. Keep learning modern JS (ES2024+) and TypeScript." },
  "Python": { status: "growing", risk: 3, yearsRelevant: "10+ years", recommendation: "Extremely high demand. Double down — especially for AI/ML." },
  "React": { status: "stable", risk: 15, yearsRelevant: "5-7 years", recommendation: "Still dominant. Learn React 18+ features and Next.js for full-stack." },
  "SQL": { status: "stable", risk: 10, yearsRelevant: "10+ years", recommendation: "Fundamental skill. Add knowledge of cloud databases (BigQuery, Snowflake)." },
  "Git": { status: "stable", risk: 2, yearsRelevant: "10+ years", recommendation: "Essential skill. Learn GitHub Actions for CI/CD." },
  "Node.js": { status: "stable", risk: 15, yearsRelevant: "5-7 years", recommendation: "Good for backend. Consider learning Go or Rust as complementary skills." },
  "TypeScript": { status: "hot", risk: 5, yearsRelevant: "7+ years", recommendation: "Rapidly becoming the standard. High priority to learn if you don't know it." },
  "Docker": { status: "growing", risk: 8, yearsRelevant: "7+ years", recommendation: "DevOps essential. Learn Kubernetes basics alongside." },
  "AWS": { status: "growing", risk: 8, yearsRelevant: "7+ years", recommendation: "Cloud is the future. Get AWS Certified Cloud Practitioner." },
  "Machine Learning": { status: "hot", risk: 5, yearsRelevant: "10+ years", recommendation: "Extremely in demand. Focus on practical ML (not just theory)." },
  "React Native": { status: "stable", risk: 20, yearsRelevant: "4-5 years", recommendation: "Good for mobile. Flutter is gaining ground as an alternative." },
  "Flutter": { status: "growing", risk: 10, yearsRelevant: "5-7 years", recommendation: "Rising fast. Great differentiator for campus placements." },
  "Kubernetes": { status: "growing", risk: 10, yearsRelevant: "7+ years", recommendation: "High demand in DevOps/SRE roles. Good for PPO chances at product companies." },
  "GraphQL": { status: "stable", risk: 20, yearsRelevant: "4-6 years", recommendation: "Useful but REST remains dominant. Learn based on job requirements." },
  "Blockchain": { status: "declining", risk: 55, yearsRelevant: "2-3 years (niche)", recommendation: "Hype is fading. Only pursue if specifically targeting Web3 companies." },
  "Angular": { status: "stable", risk: 25, yearsRelevant: "4-6 years", recommendation: "Stable but React/Vue are more popular. Good for enterprise roles." },
  "Vue": { status: "stable", risk: 20, yearsRelevant: "5-7 years", recommendation: "Popular in startups. Vue 3 has improved significantly." },
  "Java": { status: "stable", risk: 10, yearsRelevant: "10+ years", recommendation: "Enterprise staple. Spring Boot + Microservices knowledge is very valuable." },
  "Hadoop": { status: "declining", risk: 65, yearsRelevant: "2-4 years", recommendation: "Being replaced by cloud-native solutions. Learn Spark + cloud data warehouses instead." },
  "Spark": { status: "stable", risk: 20, yearsRelevant: "5-7 years", recommendation: "Good for big data roles. Pair with cloud platforms (Databricks, EMR)." },
};

/**
 * POST /api/obsolescence/analyze
 * Body: { skills: string[], targetRole?: string }
 */
exports.analyzeSkills = async (req, res) => {
  const { skills, targetRole = "Software Engineer" } = req.body;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return response.error(res, "skills array is required", 400, "NO_SKILLS");
  }

  logger.info(`[OBSOLESCENCE] Analyzing ${skills.length} skills for ${targetRole}`);

  // Try Gemini first for dynamic analysis
  let geminiResults = null;
  try {
    geminiResults = await gemini.analyzeSkillObsolescence(skills, targetRole);
  } catch (err) {
    logger.warn(`[OBSOLESCENCE] Gemini failed, using static: ${err.message}`);
  }

  let results;

  if (geminiResults && Array.isArray(geminiResults)) {
    // Use Gemini results but fill in any missing skills with static data
    results = geminiResults;
    const coveredSkills = results.map(r => r.skill.toLowerCase());
    skills.forEach(skill => {
      if (!coveredSkills.includes(skill.toLowerCase())) {
        const staticData = STATIC_OBSOLESCENCE[skill];
        if (staticData) {
          results.push({ skill, ...staticData });
        } else {
          results.push({
            skill,
            status: "stable",
            obsolescenceRisk: 20,
            yearsRelevant: "Unknown",
            recommendation: "Research current demand for this skill in your target role."
          });
        }
      }
    });
  } else {
    // Fallback: use static data for all skills
    results = skills.map(skill => {
      const staticData = STATIC_OBSOLESCENCE[skill];
      if (staticData) {
        return { skill, ...staticData };
      }
      return {
        skill,
        status: "stable",
        obsolescenceRisk: 20,
        yearsRelevant: "Unknown — research recommended",
        recommendation: "This skill wasn't in our database. Check job postings to gauge demand."
      };
    });
  }

  // Sort: highest risk first
  results.sort((a, b) => (b.obsolescenceRisk || 0) - (a.obsolescenceRisk || 0));

  // Summary stats
  const critical = results.filter(r => r.obsolescenceRisk >= 70).length;
  const warning = results.filter(r => r.obsolescenceRisk >= 40 && r.obsolescenceRisk < 70).length;
  const safe = results.filter(r => r.obsolescenceRisk < 40).length;
  const avgRisk = Math.round(results.reduce((sum, r) => sum + (r.obsolescenceRisk || 0), 0) / results.length);

  return response.success(res, {
    skills: results,
    summary: {
      totalAnalyzed: results.length,
      critical,
      warning,
      safe,
      averageObsolescenceRisk: avgRisk,
      overallHealth: avgRisk < 30 ? "strong" : avgRisk < 55 ? "moderate" : "needs_attention",
    },
    targetRole,
    dataSource: geminiResults ? "Gemini AI + Static" : "Static Database",
    ...withAIMetadata("obsolescenceEngine", { engine: geminiResults ? "Gemini 1.5 Flash" : "Static v1.0" }),
  });
};

/**
 * GET /api/obsolescence/watchlist
 * Returns the list of skills currently flagged as high risk.
 */
exports.getWatchlist = (req, res) => {
  const highRisk = Object.entries(STATIC_OBSOLESCENCE)
    .filter(([, data]) => data.risk >= 60)
    .map(([skill, data]) => ({ skill, ...data }))
    .sort((a, b) => b.risk - a.risk);

  return response.success(res, {
    watchlist: highRisk,
    message: "Skills with obsolescence risk >= 60% — avoid investing heavily in these",
    lastUpdated: "March 2026",
  });
};
