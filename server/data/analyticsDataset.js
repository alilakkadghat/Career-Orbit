/**
 * User profile seed data — realistic default profiles for demo/evaluation.
 */
const seedUserProfiles = {
  U1023: {
    id: "U1023",
    username: "Jatin Bhosale",
    email: "jatin@careerorbit.ai",
    education: "B.Tech Computer Science",
    institution: "Pillai College of Engineering",
    degree: "Bachelor of Technology",
    graduationYear: "2026",
    skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "Git"],
    skillLevels: { JavaScript: 85, React: 80, "Node.js": 75, Python: 70, MongoDB: 65, Git: 90 },
    experience: "Fresher",
    currentRole: "Student",
    targetRole: "Full Stack Developer",
    targetIndustry: "Technology",
    timeframe: "6 months",
    careerInterests: ["AI/ML Engineering", "Full Stack Development", "Cloud Architecture"],
    profileCompleted: true,
  },
};

module.exports = { seedUserProfiles };
