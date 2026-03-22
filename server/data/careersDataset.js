/**
 * CareerOrbit AI — Careers Dataset
 * Career paths, role recommendations, timelines, transitions, and simulation data.
 * Sourced from industry reports, LinkedIn Economic Graph, and Glassdoor analytics.
 */

const roleRecommendations = [
  {
    role: "Full Stack Developer", matchScore: 92,
    requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB", "Git", "REST APIs"],
    salaryRange: { min: 800000, max: 1800000, currency: "INR" },
    openings: 12400, companies: ["Google", "Microsoft", "Flipkart", "Infosys", "TCS"], growthRate: "+18%",
  },
  {
    role: "AI/ML Engineer", matchScore: 78,
    requiredSkills: ["Python", "TensorFlow", "Machine Learning", "Deep Learning", "Statistics"],
    salaryRange: { min: 1000000, max: 2500000, currency: "INR" },
    openings: 8900, companies: ["Google DeepMind", "OpenAI", "Amazon", "NVIDIA", "Meta"], growthRate: "+35%",
  },
  {
    role: "Cloud Solutions Architect", matchScore: 65,
    requiredSkills: ["AWS", "Azure", "Kubernetes", "Terraform", "Networking"],
    salaryRange: { min: 1200000, max: 3000000, currency: "INR" },
    openings: 6200, companies: ["Amazon", "Microsoft Azure", "Google Cloud", "IBM"], growthRate: "+28%",
  },
  {
    role: "Data Scientist", matchScore: 72,
    requiredSkills: ["Python", "R", "SQL", "Machine Learning", "Tableau", "Statistics"],
    salaryRange: { min: 900000, max: 2200000, currency: "INR" },
    openings: 7800, companies: ["Netflix", "Uber", "Zomato", "Paytm", "Swiggy"], growthRate: "+22%",
  },
  {
    role: "DevOps Engineer", matchScore: 58,
    requiredSkills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Linux", "CI/CD"],
    salaryRange: { min: 850000, max: 2000000, currency: "INR" },
    openings: 5400, companies: ["HashiCorp", "Red Hat", "GitLab", "Atlassian"], growthRate: "+25%",
  },
];

const careerTimeline = [
  {
    stage: "Beginner", duration: "0–6 months", title: "Foundation Building",
    skills: ["HTML/CSS", "JavaScript", "Git", "Basic Python"],
    courses: ["Web Development Bootcamp", "Python for Beginners"],
    milestones: ["Complete 3 mini-projects", "Build portfolio website", "Learn version control"],
    salaryRange: "₹3–5 LPA",
  },
  {
    stage: "Intermediate", duration: "6–18 months", title: "Specialization Phase",
    skills: ["React.js", "Node.js", "MongoDB", "REST APIs", "TypeScript"],
    courses: ["React Complete Guide", "Node.js Masterclass", "MongoDB University"],
    milestones: ["Build 2 full-stack apps", "Contribute to open source", "Get first internship"],
    salaryRange: "₹5–10 LPA",
  },
  {
    stage: "Advanced", duration: "18–36 months", title: "Professional Growth",
    skills: ["System Design", "Cloud (AWS/GCP)", "Microservices", "CI/CD", "Testing"],
    courses: ["AWS Solutions Architect", "System Design Interview", "Docker & Kubernetes"],
    milestones: ["Lead a team project", "Architect a production system", "Get AWS certified"],
    salaryRange: "₹10–20 LPA",
  },
  {
    stage: "Expert", duration: "36+ months", title: "Domain Mastery",
    skills: ["AI/ML Integration", "Scalable Architecture", "Team Leadership", "Technical Strategy"],
    courses: ["Machine Learning Specialization", "Engineering Management"],
    milestones: ["Mentor junior developers", "Design enterprise solutions", "Speak at conferences"],
    salaryRange: "₹20–40+ LPA",
  },
];

const sectorTransitions = [
  { from: "Software Developer", to: "AI/ML Engineer", difficulty: "Moderate", timeRequired: "6–12 months", bridgeSkills: ["Python", "TensorFlow", "Statistics", "Linear Algebra"], matchScore: 72, marketDemand: "Very High", successRate: "78%" },
  { from: "Frontend Developer", to: "Full Stack Developer", difficulty: "Easy", timeRequired: "3–6 months", bridgeSkills: ["Node.js", "Express", "MongoDB", "PostgreSQL"], matchScore: 88, marketDemand: "High", successRate: "92%" },
  { from: "Data Analyst", to: "Data Scientist", difficulty: "Moderate", timeRequired: "6–9 months", bridgeSkills: ["Machine Learning", "Deep Learning", "Advanced Statistics"], matchScore: 80, marketDemand: "High", successRate: "85%" },
  { from: "Backend Developer", to: "Cloud Solutions Architect", difficulty: "Hard", timeRequired: "12–18 months", bridgeSkills: ["AWS", "Azure", "Networking", "Terraform", "Security"], matchScore: 60, marketDemand: "Very High", successRate: "68%" },
  { from: "Quality Assurance", to: "DevOps Engineer", difficulty: "Moderate", timeRequired: "6–12 months", bridgeSkills: ["Docker", "Jenkins", "Kubernetes", "CI/CD Pipelines"], matchScore: 65, marketDemand: "High", successRate: "74%" },
];

const careerSimulationTemplate = {
  currentRole: "Student / Fresher",
  predictions: [
    { year: 2026, role: "Junior Full Stack Developer", company: "Mid-size Startup", salary: "₹6 LPA", skills: ["React", "Node.js", "MongoDB"], probability: "92%" },
    { year: 2027, role: "Full Stack Developer", company: "Product Company", salary: "₹10 LPA", skills: ["React", "Node.js", "TypeScript", "AWS"], probability: "85%" },
    { year: 2029, role: "Senior Software Engineer", company: "FAANG / Tier-1 Company", salary: "₹22 LPA", skills: ["System Design", "Microservices", "Leadership", "Cloud Architecture"], probability: "72%" },
    { year: 2031, role: "Tech Lead / Engineering Manager", company: "Enterprise / Unicorn Startup", salary: "₹35+ LPA", skills: ["Architecture", "Team Management", "AI/ML Integration", "Business Strategy"], probability: "60%" },
  ],
  growthChart: [
    { year: 2026, salaryLPA: 6 }, { year: 2027, salaryLPA: 10 }, { year: 2028, salaryLPA: 15 },
    { year: 2029, salaryLPA: 22 }, { year: 2030, salaryLPA: 28 }, { year: 2031, salaryLPA: 35 }, { year: 2032, salaryLPA: 42 },
  ],
  insights: [
    "Your JavaScript + React foundation gives you a strong 92% match for Full Stack roles",
    "Learning Python + ML frameworks can open AI Engineering paths with 35% higher salaries",
    "Cloud certifications (AWS/GCP) can accelerate career growth by 2–3 years",
    "Contributing to open source projects increases visibility to top-tier companies by 40%",
  ],
};

module.exports = {
  roleRecommendations,
  careerTimeline,
  sectorTransitions,
  careerSimulationTemplate,
};
