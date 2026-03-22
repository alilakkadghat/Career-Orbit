/**
 * CareerOrbit AI — Request Validation Middleware
 * Validates incoming request bodies, query params, and headers.
 */

const { AppError } = require("./errorHandler");

const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missing = requiredFields.filter((field) => !req.body[field]);
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missing.join(", ")}`,
        code: "VALIDATION_ERROR",
        requiredFields,
        receivedFields: Object.keys(req.body),
      });
    }
    next();
  };
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email format",
      code: "INVALID_EMAIL",
    });
  }
  next();
};

const validateSkillsArray = (req, res, next) => {
  const { skills } = req.body;
  if (skills && !Array.isArray(skills)) {
    return res.status(400).json({
      success: false,
      error: "Skills must be provided as an array",
      code: "INVALID_SKILLS_FORMAT",
    });
  }
  next();
};

const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  next();
};

module.exports = { validateBody, validateEmail, validateSkillsArray, sanitizeInput };
