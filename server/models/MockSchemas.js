/**
 * CareerOrbit AI — Career Intelligence Models
 * Schemas and interfaces for simulated AI-driven data entities.
 */

const SkillModel = {
  id: "string",
  name: "string",
  category: "string",
  demandIndex: "number",
  growth: "string",
  avgSalary: "string",
  proficiency: "number (0-100)",
  marketRelevance: "number (0-100)",
};

const JobModel = {
  id: "string",
  company: "string",
  role: "string",
  location: "string",
  type: "Full-time | Part-time | Remote",
  salary: "string",
  skills: "string[]",
  matchScore: "number (0-100)",
  applyLink: "url",
  postedDate: "date",
};

const CourseModel = {
  id: "string",
  course: "string",
  platform: "string",
  instructor: "string",
  duration: "string",
  difficulty: "Beginner | Intermediate | Advanced",
  skill: "string",
  rating: "number",
  enrollments: "number",
  url: "url",
};

const TimelineStageModel = {
  stage: "string",
  duration: "string",
  title: "string",
  skills: "string[]",
  courses: "string[]",
  milestones: "string[]",
  salaryRange: "string",
};

module.exports = {
  SkillModel,
  JobModel,
  CourseModel,
  TimelineStageModel,
};
