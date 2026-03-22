/**
 * CareerOrbit AI — Application Configuration
 * Central configuration for all application settings, rate limits, and feature flags.
 */

module.exports = {
  app: {
    name: "CareerOrbit AI",
    version: "2.0.0",
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5001,
  },

  api: {
    prefix: "/api",
    pagination: {
      defaultLimit: 20,
      maxLimit: 100,
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 200,
    },
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || "careerorbit-secure-key-2026",
    jwtExpiry: "30d",
    saltRounds: 10,
  },

  aiEngines: {
    skillAnalyzer: {
      name: "CareerOrbit SkillAnalyzer™",
      version: "v3.1",
      status: "active",
      modelType: "NeuralSkill Transformer",
      accuracy: 94.2,
    },
    careerPredictor: {
      name: "CareerOrbit FutureMap™",
      version: "v2.8",
      status: "active",
      modelType: "Monte Carlo Simulation",
      accuracy: 91.5,
    },
    jobMatcher: {
      name: "CareerOrbit JobMatch™",
      version: "v3.0",
      status: "active",
      modelType: "Collaborative Filtering + NLP",
      accuracy: 89.7,
    },
    gapAnalyzer: {
      name: "CareerOrbit GapAnalyzer™",
      version: "v2.0",
      status: "active",
      modelType: "Competency Graph Neural Network",
      accuracy: 92.3,
    },
    fairnessGuard: {
      name: "CareerOrbit EthicsGuard™",
      version: "v2.0",
      status: "active",
      modelType: "IBM AI Fairness 360 Integration",
      compliance: ["ISO 24028:2020", "IEEE 7010-2020"],
    },
    courseRecommender: {
      name: "CareerOrbit CourseMatch™",
      version: "v1.8",
      status: "active",
      modelType: "Content-Based + Collaborative Filtering",
      accuracy: 88.4,
    },
    marketPulse: {
      name: "CareerOrbit MarketPulse™",
      version: "v2.6",
      status: "active",
      modelType: "Time-Series Forecasting (ARIMA + LSTM)",
      dataSources: ["LinkedIn", "Glassdoor", "Naukri", "Indeed", "GitHub"],
    },
    decayPredictor: {
      name: "CareerOrbit DecayPredictor™",
      version: "v1.4",
      status: "active",
      modelType: "Exponential Decay Regression",
      accuracy: 87.1,
    },
  },

  dataSources: {
    jobPostings: { count: "850K+", refreshInterval: "24h" },
    professionalProfiles: { count: "2.4M+", refreshInterval: "weekly" },
    courseDatabase: { count: "45K+", refreshInterval: "48h" },
    industryReports: { count: "1.2K+", refreshInterval: "monthly" },
    stackOverflow: { count: "18M+ questions", refreshInterval: "daily" },
  },

  logging: {
    level: process.env.LOG_LEVEL || "info",
    format: "json",
    directory: "./logs",
  },
};
