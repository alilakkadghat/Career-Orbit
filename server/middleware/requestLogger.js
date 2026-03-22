/**
 * CareerOrbit AI — Request Logger
 * Structured logging for all API requests, responses, and system events.
 */

const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "..", "logs");
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

const getTimestamp = () => new Date().toISOString();

const formatLog = (level, message, meta = {}) => {
  return JSON.stringify({
    timestamp: getTimestamp(),
    level,
    service: "careerorbit-api",
    message,
    ...meta,
  });
};

const writeToFile = (entry) => {
  const today = new Date().toISOString().split("T")[0];
  const logFile = path.join(LOG_DIR, `api-${today}.log`);
  fs.appendFileSync(logFile, entry + "\n");
};

const logger = {
  info: (message, meta) => {
    const entry = formatLog("INFO", message, meta);
    console.log(`ℹ️  ${message}`);
    writeToFile(entry);
  },
  warn: (message, meta) => {
    const entry = formatLog("WARN", message, meta);
    console.warn(`⚠️  ${message}`);
    writeToFile(entry);
  },
  error: (message, meta) => {
    const entry = formatLog("ERROR", message, meta);
    console.error(`❌ ${message}`);
    writeToFile(entry);
  },
  request: (message, meta) => {
    const entry = formatLog("REQUEST", message, meta);
    writeToFile(entry);
  },
};

// Express middleware — logs every incoming request
const requestLoggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logLine = `${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`;

    if (res.statusCode >= 400) {
      logger.warn(logLine, { ip: req.ip, userAgent: req.get("User-Agent") });
    } else {
      logger.request(logLine, { duration, statusCode: res.statusCode });
    }
  });

  next();
};

module.exports = logger;
module.exports.middleware = requestLoggerMiddleware;
