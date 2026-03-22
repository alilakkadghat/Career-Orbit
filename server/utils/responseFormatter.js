/**
 * CareerOrbit AI — API Response Formatter
 * Ensures consistent response structure across all endpoints.
 */

const { aiEngines } = require("../config/app.config");

const success = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    timestamp: new Date().toISOString(),
    ...data,
  });
};

const error = (res, message, statusCode = 500, code = "SERVER_ERROR") => {
  return res.status(statusCode).json({
    success: false,
    error: message,
    code,
    timestamp: new Date().toISOString(),
  });
};

const paginated = (res, items, page = 1, limit = 20, meta = {}) => {
  const total = items.length;
  const start = (page - 1) * limit;
  const paginatedItems = items.slice(start, start + limit);

  return res.json({
    success: true,
    data: paginatedItems,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: start + limit < total,
    },
    timestamp: new Date().toISOString(),
    ...meta,
  });
};

const withAIMetadata = (engineKey, additionalMeta = {}) => {
  const engine = aiEngines[engineKey];
  if (!engine) return additionalMeta;

  return {
    _ai: {
      engine: engine.name,
      version: engine.version,
      model: engine.modelType,
      confidence: engine.accuracy ? `${engine.accuracy}%` : undefined,
    },
    ...additionalMeta,
  };
};

module.exports = { success, error, paginated, withAIMetadata };
