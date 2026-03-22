/**
 * CareerOrbit AI — Resume Controller (Gemini Enhanced)
 * Handles resume saving, parsing, and AI-powered roast/optimization.
 */

const resumeService = require("../services/resumeService");
const gemini = require("../integrations/GeminiClient");
const response = require("../utils/responseFormatter");
const logger = require("../middleware/requestLogger");
const { withAIMetadata } = require("../utils/responseFormatter");

// In-memory storage for resume drafts
const resumeStore = {};

exports.saveResume = (req, res) => {
  const { userId, resumeData } = req.body;
  const id = userId || "U1023";
  resumeStore[id] = { ...resumeData, lastSaved: new Date().toISOString() };
  logger.info(`[RESUME] Saved resume draft for user: ${id}`);
  return response.success(res, { message: "Resume draft saved successfully", resumeId: "RES-" + Date.now() });
};

exports.getResume = (req, res) => {
  const userId = req.query.userId || "U1023";
  const resume = resumeStore[userId];
  if (!resume) return response.error(res, "No resume draft found", 404, "RESUME_NOT_FOUND");
  return response.success(res, { resume });
};

exports.optimizeResume = async (req, res) => {
  const { userId, targetRole } = req.body;
  const id = userId || "U1023";
  logger.info(`[RESUME] AI Optimization for user: ${id} | Target: ${targetRole}`);
  const optimization = await resumeService.optimizeForRole(id, targetRole);
  return response.success(res, {
    ...optimization,
    ...withAIMetadata("skillAnalyzer", { engine: "CareerOrbit ResumeOpt™ v2.0 (Gemini)" }),
  });
};

/**
 * POST /api/resume/parse
 * Accepts resumeText (string extracted client-side from PDF) + optional targetRole.
 * Returns a Gemini AI roast of the resume.
 */
exports.parseResume = async (req, res) => {
  try {
    const { resumeText, targetRole = "Software Engineering internship" } = req.body;

    if (!resumeText || resumeText.trim().length < 50) {
      return response.error(res, "Resume text is too short or missing", 400, "NO_RESUME_TEXT");
    }

    logger.info(`[RESUME] Sending to Gemini for roast | Target: ${targetRole} | Length: ${resumeText.length}`);
    const aiRoast = await gemini.roastResume(resumeText, targetRole);

    return response.success(res, {
      roast: aiRoast,
      targetRole,
      analyzedLength: resumeText.length,
      message: "Resume analyzed by Orbit AI",
      ...withAIMetadata("resumeRoaster", { engine: "Gemini 1.5 Flash" }),
    });
  } catch (err) {
    logger.error(`[RESUME] Parse error: ${err.message}`);
    return response.error(res, "Resume analysis failed", 500, "PARSE_ERROR");
  }
};
