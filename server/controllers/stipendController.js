/**
 * CareerOrbit AI — Stipend Benchmarking Controller
 * Helps students compare internship stipends using Gemini AI + static benchmarks.
 */

const gemini = require("../integrations/GeminiClient");
const response = require("../utils/responseFormatter");
const logger = require("../middleware/requestLogger");
const { withAIMetadata } = require("../utils/responseFormatter");

// Static benchmark data as fallback (INR/month)
const STATIC_BENCHMARKS = {
  "Software Engineer": {
    tier1: { min: 40000, max: 80000, median: 60000 }, // Google, Microsoft, etc.
    tier2: { min: 20000, max: 45000, median: 30000 }, // Mid-size product cos
    tier3: { min: 8000, max: 20000, median: 12000 },  // Service companies / startups
    locations: { Bangalore: 1.0, Mumbai: 0.95, Hyderabad: 0.9, Pune: 0.85, Chennai: 0.85, Delhi: 0.9, Remote: 0.8 }
  },
  "Data Scientist": {
    tier1: { min: 45000, max: 90000, median: 65000 },
    tier2: { min: 25000, max: 50000, median: 35000 },
    tier3: { min: 10000, max: 25000, median: 15000 },
    locations: { Bangalore: 1.0, Mumbai: 0.95, Hyderabad: 0.9, Pune: 0.85, Chennai: 0.85, Delhi: 0.9, Remote: 0.85 }
  },
  "Product Manager": {
    tier1: { min: 50000, max: 100000, median: 70000 },
    tier2: { min: 20000, max: 45000, median: 30000 },
    tier3: { min: 5000, max: 20000, median: 10000 },
    locations: { Bangalore: 1.0, Mumbai: 1.0, Hyderabad: 0.9, Pune: 0.85, Chennai: 0.85, Delhi: 0.95, Remote: 0.8 }
  },
  "UI/UX Designer": {
    tier1: { min: 35000, max: 70000, median: 50000 },
    tier2: { min: 15000, max: 35000, median: 22000 },
    tier3: { min: 5000, max: 15000, median: 8000 },
    locations: { Bangalore: 1.0, Mumbai: 1.0, Hyderabad: 0.85, Pune: 0.85, Chennai: 0.8, Delhi: 0.95, Remote: 0.85 }
  },
  "Marketing": {
    tier1: { min: 25000, max: 60000, median: 40000 },
    tier2: { min: 10000, max: 25000, median: 15000 },
    tier3: { min: 3000, max: 10000, median: 6000 },
    locations: { Bangalore: 1.0, Mumbai: 1.05, Hyderabad: 0.85, Pune: 0.85, Chennai: 0.8, Delhi: 1.0, Remote: 0.8 }
  }
};

const getCompanyTier = (companyName) => {
  if (!companyName) return "tier2";
  const lower = companyName.toLowerCase();
  const tier1 = ["google", "microsoft", "amazon", "meta", "apple", "netflix", "uber", "airbnb", "stripe", "goldman", "mckinsey", "bain", "bcg", "flipkart", "zepto", "meesho", "cred", "razorpay", "groww"];
  const tier3 = ["tcs", "infosys", "wipro", "hcl", "tech mahindra", "capgemini", "accenture", "cognizant"];
  if (tier1.some(c => lower.includes(c))) return "tier1";
  if (tier3.some(c => lower.includes(c))) return "tier3";
  return "tier2";
};

/**
 * POST /api/stipend/analyze
 * Body: { role, company, stipendAmount, location, skills }
 */
exports.analyzeStipend = async (req, res) => {
  const { role = "Software Engineer", company, stipendAmount, location = "Bangalore", skills = [] } = req.body;

  if (!stipendAmount || isNaN(stipendAmount)) {
    return response.error(res, "stipendAmount is required and must be a number", 400, "INVALID_STIPEND");
  }

  const amount = parseInt(stipendAmount);
  logger.info(`[STIPEND] Analyzing ₹${amount}/month for ${role} at ${company || "Unknown"} in ${location}`);

  // Static benchmark as base
  const benchmarkRole = Object.keys(STATIC_BENCHMARKS).find(r => role.toLowerCase().includes(r.toLowerCase())) || "Software Engineer";
  const benchmark = STATIC_BENCHMARKS[benchmarkRole];
  const tier = getCompanyTier(company);
  const tierData = benchmark[tier];
  const locationMultiplier = benchmark.locations[location] || 0.9;

  const adjustedMin = Math.round(tierData.min * locationMultiplier);
  const adjustedMax = Math.round(tierData.max * locationMultiplier);
  const adjustedMedian = Math.round(tierData.median * locationMultiplier);

  // Calculate percentile
  const percentile = Math.min(100, Math.max(0,
    Math.round(((amount - adjustedMin) / (adjustedMax - adjustedMin)) * 100)
  ));

  let verdict = "fair";
  if (amount < adjustedMin * 0.8) verdict = "below_market";
  else if (amount < adjustedMedian * 0.9) verdict = "below_market";
  else if (amount > adjustedMax * 1.1) verdict = "excellent";
  else if (amount > adjustedMedian * 1.1) verdict = "above_market";

  // Try Gemini for richer analysis
  let geminiAnalysis = null;
  try {
    geminiAnalysis = await gemini.analyzeStipend(role, company, amount, location, skills);
  } catch (err) {
    logger.warn(`[STIPEND] Gemini analysis failed, using static: ${err.message}`);
  }

  const finalResult = geminiAnalysis || {
    verdict,
    marketRange: { min: adjustedMin, max: adjustedMax, median: adjustedMedian },
    percentile,
    analysis: `For a ${role} ${tier === "tier1" ? "at a top-tier company" : tier === "tier3" ? "at a service company" : "at a mid-size company"} in ${location}, ₹${amount.toLocaleString("en-IN")}/month is ${verdict.replace("_", " ")}. The typical range is ₹${adjustedMin.toLocaleString("en-IN")} – ₹${adjustedMax.toLocaleString("en-IN")}.`,
    negotiationTip: amount < adjustedMedian
      ? `You can reasonably ask for ₹${adjustedMedian.toLocaleString("en-IN")} — the market median for this role and location.`
      : "Your offer is competitive. You can still negotiate for perks like remote work, flexible hours, or a PPO (Pre-Placement Offer).",
    companyTierBenchmark: `${tier === "tier1" ? "Top-tier companies" : tier === "tier3" ? "Service companies" : "Mid-size product companies"} in ${location} typically offer ₹${adjustedMin.toLocaleString("en-IN")}–₹${adjustedMax.toLocaleString("en-IN")}/month for ${role} interns.`
  };

  return response.success(res, {
    input: { role, company: company || "Not specified", stipendAmount: amount, location, skills },
    ...finalResult,
    staticBenchmark: { min: adjustedMin, max: adjustedMax, median: adjustedMedian, tier },
    ...withAIMetadata("stipendAnalyzer", { engine: geminiAnalysis ? "Gemini 1.5 Flash" : "Static Benchmark v1.0" }),
  });
};

/**
 * GET /api/stipend/benchmarks
 * Returns all static benchmark data for the frontend to display.
 */
exports.getBenchmarks = (req, res) => {
  const { role, location = "Bangalore" } = req.query;

  if (role && STATIC_BENCHMARKS[role]) {
    const benchmark = STATIC_BENCHMARKS[role];
    const multiplier = benchmark.locations[location] || 0.9;
    return response.success(res, {
      role,
      location,
      tiers: {
        tier1: {
          label: "Top-tier (Google, Microsoft, Flipkart, etc.)",
          min: Math.round(benchmark.tier1.min * multiplier),
          max: Math.round(benchmark.tier1.max * multiplier),
          median: Math.round(benchmark.tier1.median * multiplier),
        },
        tier2: {
          label: "Mid-size product companies",
          min: Math.round(benchmark.tier2.min * multiplier),
          max: Math.round(benchmark.tier2.max * multiplier),
          median: Math.round(benchmark.tier2.median * multiplier),
        },
        tier3: {
          label: "Service companies (TCS, Infosys, etc.)",
          min: Math.round(benchmark.tier3.min * multiplier),
          max: Math.round(benchmark.tier3.max * multiplier),
          median: Math.round(benchmark.tier3.median * multiplier),
        },
      }
    });
  }

  // Return all roles summary
  return response.success(res, {
    availableRoles: Object.keys(STATIC_BENCHMARKS),
    availableLocations: ["Bangalore", "Mumbai", "Hyderabad", "Pune", "Chennai", "Delhi", "Remote"],
    note: "Pass ?role=Software Engineer&location=Bangalore for role-specific data"
  });
};
