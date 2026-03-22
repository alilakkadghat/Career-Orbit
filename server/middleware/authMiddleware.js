/**
 * CareerOrbit AI — Authentication Middleware
 * Verifies JWT tokens and attaches user context to requests.
 */

const jwt = require("jsonwebtoken");
const { auth: authConfig } = require("../config/app.config");
const logger = require("./requestLogger");

const authenticate = (req, res, next) => {
  const token = req.header("x-auth-token") || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    logger.warn(`[AUTH] Unauthorized access attempt: ${req.method} ${req.originalUrl}`);
    return res.status(401).json({
      success: false,
      error: "Access denied. No authentication token provided.",
      code: "AUTH_TOKEN_MISSING",
    });
  }

  try {
    // Handle mock tokens from localStorage fallback
    if (token.startsWith("mock_token_")) {
      req.user = { id: "mock_user", role: "user", authType: "localStorage" };
      return next();
    }

    const decoded = jwt.verify(token, authConfig.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    logger.warn(`[AUTH] Invalid token provided for: ${req.method} ${req.originalUrl}`);
    return res.status(401).json({
      success: false,
      error: "Invalid or expired authentication token.",
      code: "AUTH_TOKEN_INVALID",
    });
  }
};

// Optional auth — doesn't block if token is missing, but attaches user if present
const optionalAuth = (req, res, next) => {
  const token = req.header("x-auth-token") || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return next();

  try {
    if (token.startsWith("mock_token_")) {
      req.user = { id: "mock_user", role: "user", authType: "localStorage" };
    } else {
      req.user = jwt.verify(token, authConfig.jwtSecret);
    }
  } catch (err) {
    // Token invalid but we don't block — just proceed without user context
  }

  next();
};

module.exports = { authenticate, optionalAuth };
