/**
 * CareerOrbit AI — Centralized Error Handler
 * Catches all unhandled errors and returns consistent API error responses.
 */

const logger = require("./requestLogger");

class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 404 Handler
const notFoundHandler = (req, res) => {
  logger.warn(`[404] Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: "Resource not found",
    path: req.originalUrl,
    method: req.method,
    suggestion: "Visit / to see all available API endpoints",
    timestamp: new Date().toISOString(),
  });
};

// Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || "INTERNAL_ERROR";

  logger.error(`[${errorCode}] ${err.message}`, {
    path: req.originalUrl,
    method: req.method,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    error: err.message || "An internal server error occurred",
    code: errorCode,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
};

module.exports = { AppError, notFoundHandler, globalErrorHandler };
