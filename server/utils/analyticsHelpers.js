/**
 * CareerOrbit AI — Math & Analytics Helpers
 * Utility functions for scoring, percentile calculations, and statistical operations.
 */

const calculateMatchScore = (userSkills, requiredSkills) => {
  if (!requiredSkills || requiredSkills.length === 0) return 0;
  const matched = userSkills.filter((s) =>
    requiredSkills.some((r) => r.toLowerCase() === s.toLowerCase())
  );
  return Math.round((matched.length / requiredSkills.length) * 100);
};

const calculatePercentile = (value, dataset) => {
  const sorted = [...dataset].sort((a, b) => a - b);
  const index = sorted.findIndex((v) => v >= value);
  return Math.round((index / sorted.length) * 100);
};

const generateProficiencyScore = (skill, base = 60) => {
  // Deterministic pseudo-random based on skill name
  const hash = skill.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return base + (hash % 35);
};

const calculateGrowthProjection = (currentSalary, yearsAhead, growthRate = 0.15) => {
  const projections = [];
  let salary = currentSalary;
  for (let y = 1; y <= yearsAhead; y++) {
    salary = Math.round(salary * (1 + growthRate));
    projections.push({ year: new Date().getFullYear() + y, salary });
  }
  return projections;
};

const weightedAverage = (values, weights) => {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const sum = values.reduce((acc, val, i) => acc + val * weights[i], 0);
  return Math.round((sum / totalWeight) * 100) / 100;
};

module.exports = {
  calculateMatchScore,
  calculatePercentile,
  generateProficiencyScore,
  calculateGrowthProjection,
  weightedAverage,
};
