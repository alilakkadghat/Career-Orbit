const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const appConfig = require("./config/app.config");
const sequelize = require("./config/database");
const { middleware: requestLogger } = require("./middleware/requestLogger");
const { notFoundHandler, globalErrorHandler } = require("./middleware/errorHandler");
const { sanitizeInput } = require("./middleware/validateRequest");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);

// CORS Configuration
app.use(
    cors({
        origin: true, // Allow all origins in demo mode
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
        credentials: true
    })
);

// Structured Request Logging
app.use(requestLogger);

/* -------------------- GLOBAL SECURITY & DB -------------------- */
let pgConnected = false;

// Inject DB status into request for controllers that might check it
app.use((req, res, next) => {
    req.dbConnected = pgConnected;
    next();
});

/* -------------------- ROUTES -------------------- */

// Root API Discovery Endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: `🚀 ${appConfig.app.name} API is running`,
        version: appConfig.app.version,
        engine: "CareerOrbit Intelligence Platform™",
        endpoints: {
            auth: ["/api/auth/register", "/api/auth/login"],
            profile: ["/api/profile/create", "/api/profile", "/api/profile/update-skills"],
            skills: ["/api/skills/upload", "/api/skills/analysis", "/api/skills/trending", "/api/skills/gap-analysis"],
            courses: ["/api/courses/recommendations"],
            career: ["/api/career/recommendations", "/api/career/timeline", "/api/career/transitions", "/api/career/simulator"],
            learning: ["/api/learning/duration"],
            dashboard: ["/api/dashboard/trends", "/api/dashboard/decay", "/api/dashboard/fairness"],
            jobs: ["/api/jobs/recommendations"],
            resume: ["/api/resume/save", "/api/resume", "/api/resume/optimize", "/api/resume/parse"],
            system: ["/health", "/api/status"],
        },
        timestamp: new Date().toISOString()
    });
});

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        database: pgConnected ? "connected" : "mock_mode",
        uptime: process.uptime(),
        environment: appConfig.app.environment
    });
});

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/career", require("./routes/career"));
app.use("/api/learning", require("./routes/learning"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/resume", require("./routes/resume"));

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        status: "online",
        database: pgConnected ? "postgresql" : "mock_mode",
        platform: "CareerOrbit Intelligence v2.0",
        engines: ["SkillAnalyzer", "CareerPredictor", "JobMatch", "EthicsGuard"]
    });
});

/* -------------------- ERROR HANDLING -------------------- */
app.use(notFoundHandler);
app.use(globalErrorHandler);

/* -------------------- START SERVER -------------------- */
const startSystem = async () => {
    try {
        console.log("📡 Connecting to Platform Infrastructure...");
        
        const { initializePlatform } = require("./services/systemService");
        await initializePlatform();

        // Attempt DB link but proceed to mock mode if it fails
        await sequelize.authenticate().then(() => {
            pgConnected = true;
            console.log("✅ Main Database Connected");
        }).catch(() => {
            pgConnected = false;
            console.warn("⚠️ Main Database unavailable. Switching to Mock Data Intelligence.");
        });

        const PORT = appConfig.app.port;
        app.listen(PORT, () => {
            console.log(`🚀 ${appConfig.app.name} Server running on port ${PORT}`);
            console.log(`🔗 API Base: http://localhost:${PORT}/api`);
        });
    } catch (err) {
        console.error("❌ Critical System Failure:", err);
        process.exit(1);
    }
};

startSystem();