/**
 * CareerOrbit AI — Resume Controller
 * Handles resume creation, parsing simulation, and AI optimization.
 * Data flow: Route → Controller → ResumeService → OpenAIClient
 */

const resumeService = require("../services/resumeService");
const response = require("../utils/responseFormatter");
const logger = require("../middleware/requestLogger");
const { withAIMetadata } = require("../utils/responseFormatter");

// Runtime storage for resume drafts
const resumeStore = {};

exports.saveResume = (req, res) => {
  const { userId, resumeData } = req.body;
  const id = userId || "U1023";
  
  resumeStore[id] = {
    ...resumeData,
    lastSaved: new Date().toISOString()
  };

  logger.info(`[RESUME] Saved resume draft for user: ${id}`);
  
  return response.success(res, {
    message: "Resume draft saved successfully",
    resumeId: "RES-" + Date.now(),
  });
};

exports.getResume = (req, res) => {
  const userId = req.query.userId || "U1023";
  const resume = resumeStore[userId];

  if (!resume) {
    return response.error(res, "No resume draft found", 404, "RESUME_NOT_FOUND");
  }

  return response.success(res, { resume });
};

exports.optimizeResume = async (req, res) => {
  const { userId, targetRole } = req.body;
  const id = userId || "U1023";

  logger.info(`[RESUME] AI Optimization requested for user: ${id} | Target: ${targetRole}`);
  
  const optimization = await resumeService.optimizeForRole(id, targetRole);

  return response.success(res, {
    ...optimization,
    ...withAIMetadata("skillAnalyzer", { engine: "CareerOrbit ResumeOpt™ v1.2" })
  });
};

exports.parseResume = async (req, res) => {
  // Simulating file upload handling
  const fileName = req.body.fileName || "resume.pdf";
  const dummyBuffer = Buffer.alloc(10);
  
  const parsedData = await resumeService.parseResume(dummyBuffer, fileName);

  return response.success(res, {
    ...parsedData,
    message: "Resume parsed successfully by CareerOrbit NLP",
    ...withAIMetadata("skillAnalyzer")
  });
};
