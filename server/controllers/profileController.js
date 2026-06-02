/**
 * CareerOrbit AI — Profile Controller
 * Handles user profile CRUD operations with full SQL support.
 */

const User = require("../models/UserPG");
const { seedUserProfiles } = require("../data/analyticsDataset");
const response = require("../utils/responseFormatter");
const logger = require("../middleware/requestLogger");

// Runtime mock profile store points directly to shared memory reference
const profileStore = seedUserProfiles;

const SKILL_KEYWORDS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Rust',
  'Ruby', 'Swift', 'Kotlin', 'PHP', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell',
  'React', 'Vue', 'Angular', 'Next.js', 'Nuxt', 'Svelte', 'Node.js', 'Express',
  'Django', 'Flask', 'Spring', 'Laravel', 'Rails', 'FastAPI', 'GraphQL', 'REST',
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'DynamoDB', 'SQLite',
  'HTML', 'CSS', 'Sass', 'Tailwind', 'Bootstrap', 'Material UI', 'Styled Components',
  'Machine Learning', 'Deep Learning', 'AI', 'NLP', 'Computer Vision', 'TensorFlow',
  'PyTorch', 'Keras', 'Scikit-learn', 'Data Science', 'Pandas', 'NumPy', 'Matplotlib',
  'System Design', 'Microservices', 'API Design', 'WebSockets', 'gRPC',
  'Blockchain', 'Smart Contracts', 'Solidity', 'Web3', 'Cybersecurity',
  'Testing', 'Jest', 'Pytest', 'Selenium', 'Cypress', 'Unit Testing', 'TDD',
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Docker', 'Kubernetes', 'Terraform',
  'AWS', 'Azure', 'GCP', 'Heroku', 'Netlify', 'Vercel', 'Linux', 'CI/CD',
  'Jenkins', 'GitHub Actions', 'CircleCI', 'Travis CI', 'Ansible', 'Puppet',
  'Jira', 'Confluence', 'Figma', 'Sketch', 'Adobe XD', 'Postman', 'Swagger',
  'VS Code', 'IntelliJ', 'Eclipse', 'Vim', 'Webpack', 'Vite', 'Babel',
  'Elasticsearch', 'Kafka', 'RabbitMQ', 'Nginx', 'Apache', 'DevOps', 'MLOps',
  'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Collaboration',
  'Project Management', 'Time Management', 'Critical Thinking', 'Creativity',
  'Adaptability', 'Mentoring', 'Public Speaking', 'Agile', 'Scrum', 'Kanban',
  'English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Arabic',
  'Japanese', 'Korean', 'Portuguese', 'Italian', 'Russian', 'Dutch'
];

const matchSkills = (text) => {
  if (!text) return [];
  const normalizedText = text.toLowerCase();
  const matched = [];
  
  for (const skill of SKILL_KEYWORDS) {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let regexStr = `\\b${escaped}\\b`;
    if (skill.includes('+') || skill.includes('#')) {
      regexStr = `\\b${escaped}`;
    }
    const regex = new RegExp(regexStr, 'i');
    if (regex.test(normalizedText)) {
      matched.push(skill);
    }
  }
  return matched;
};

exports.createProfile = async (req, res) => {
  try {
    const { 
      userId, fullName, email, education, degree, institution, skills, 
      experience, currentRole, targetRole, targetIndustry, timeframe, 
      careerInterests, collegeName, graduationYear, branch 
    } = req.body;

    const id = userId || "U1023";

    // MOCK MODE fallback
    if (!req.dbConnected) {
      const profile = {
        id,
        username: fullName || "CareerOrbit User",
        email: email || "user@careerorbit.ai",
        education: education || "",
        institution: institution || "",
        degree: degree || "",
        skills: skills || [],
        skillLevels: {},
        experience: experience || "Fresher",
        currentRole: currentRole || "Student",
        targetRole: targetRole || "",
        targetIndustry: targetIndustry || "",
        timeframe: timeframe || "6 months",
        careerInterests: careerInterests || [],
        collegeName: collegeName || "",
        graduationYear: graduationYear || null,
        branch: branch || "",
        profileCompleted: true,
        createdAt: new Date().toISOString(),
      };

      if (profile.skills.length > 0) {
        profile.skills.forEach((s) => {
          profile.skillLevels[s] = Math.floor(Math.random() * 40) + 50;
        });
      }

      profileStore[id] = profile;
      logger.info(`[PROFILE] Created mock profile for user: ${id}`);

      return response.success(res, {
        message: "Profile created successfully (Mock Store)",
        profile,
        aiInsight: `Based on your skills in ${profile.skills.slice(0, 3).join(", ")}, CareerOrbit AI has identified ${profile.targetRole || "Full Stack Developer"} as a high-match career path.`,
      }, 201);
    }

    // REAL SQL Database logic
    let user = await User.findByPk(id);
    if (!user && email) {
      user = await User.findOne({ where: { email } });
    }

    if (!user) {
      return response.error(res, "User not found. Register first.", 404, "USER_NOT_FOUND");
    }

    // Build skill levels
    const levels = {};
    if (skills && Array.isArray(skills)) {
      skills.forEach((s) => {
        levels[s] = Math.floor(Math.random() * 40) + 50;
      });
    }

    // Update user profile fields
    user.username = fullName || user.username;
    user.education = education || "";
    user.institution = institution || "";
    user.degree = degree || "";
    user.skills = skills || [];
    user.skillLevels = levels;
    user.experience = experience || "Fresher";
    user.currentRole = currentRole || "Student";
    user.targetRole = targetRole || "";
    user.targetIndustry = targetIndustry || "";
    user.timeframe = timeframe || "6 months";
    user.careerInterests = careerInterests || [];
    user.collegeName = collegeName || "";
    user.graduationYear = graduationYear || null;
    user.branch = branch || "";
    user.profileCompleted = true;

    await user.save();
    logger.info(`[PROFILE] Updated user SQL profile: ${user.id}`);

    return response.success(res, {
      message: "Profile created successfully",
      profile: user,
      aiInsight: `Based on your skills in ${user.skills.slice(0, 3).join(", ")}, CareerOrbit AI has identified ${user.targetRole || "Full Stack Developer"} as a high-match career path.`,
    }, 201);

  } catch (err) {
    logger.error(`[PROFILE] Create error: ${err.message}`);
    return response.error(res, "Server Error", 500);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.query.userId || "U1023";

    // MOCK MODE fallback
    if (!req.dbConnected) {
      const profile = profileStore[userId] || profileStore["U1023"];
      return response.success(res, {
        profile,
        lastUpdated: new Date().toISOString(),
        completionScore: 92,
        mock: true
      });
    }

    // REAL SQL Database logic
    let user = await User.findByPk(userId);
    if (!user) {
      // Fallback search or seed if requested default user ID is absent
      user = await User.findOne();
    }

    if (!user) {
      return response.error(res, "No registered profiles found.", 404);
    }

    return response.success(res, {
      profile: user,
      lastUpdated: user.updatedAt,
      completionScore: user.profileCompleted ? 100 : 30,
    });

  } catch (err) {
    logger.error(`[PROFILE] Get error: ${err.message}`);
    return response.error(res, "Server Error", 500);
  }
};

exports.updateSkills = async (req, res) => {
  try {
    const { userId, skills, skillLevels, resumeText } = req.body;
    const id = userId || "U1023";

    // MOCK MODE fallback
    if (!req.dbConnected) {
      if (!profileStore[id]) {
        profileStore[id] = { ...profileStore["U1023"], id, skills: [], skillLevels: {} };
      }

      let finalSkills = skills;
      if (resumeText) {
        finalSkills = matchSkills(resumeText);
      }

      if (finalSkills) {
        finalSkills = [...new Set(finalSkills)];
        profileStore[id].skills = finalSkills;

        const levels = skillLevels || profileStore[id].skillLevels || {};
        const updatedLevels = {};
        
        finalSkills.forEach((s) => {
          if (levels[s] !== undefined) {
            updatedLevels[s] = levels[s];
          } else {
            updatedLevels[s] = Math.floor(Math.random() * 35) + 55;
          }
        });
        profileStore[id].skillLevels = updatedLevels;
      }

      logger.info(`[PROFILE] Updated mock skills for user: ${id}`);
      return response.success(res, {
        message: "Skills updated successfully (Mock Store)",
        updatedSkills: profileStore[id]?.skills || [],
        skillLevels: profileStore[id]?.skillLevels || {},
        aiRecommendation: "Consider adding Machine Learning and Cloud Computing to increase your market competitiveness by 35%.",
      });
    }

    // REAL SQL Database logic
    let user = await User.findByPk(id);
    if (!user) {
      // Find first user if specific PK not matched
      user = await User.findOne();
    }

    if (!user) {
      return response.error(res, "User not found in SQL database.", 404);
    }

    let finalSkills = skills;
    if (resumeText) {
      finalSkills = matchSkills(resumeText);
    }

    if (finalSkills) {
      finalSkills = [...new Set(finalSkills)];
      user.skills = finalSkills;

      const levels = skillLevels || user.skillLevels || {};
      const updatedLevels = {};
      
      finalSkills.forEach((s) => {
        if (levels[s] !== undefined) {
          updatedLevels[s] = levels[s];
        } else {
          updatedLevels[s] = Math.floor(Math.random() * 35) + 55;
        }
      });

      user.skillLevels = updatedLevels;
      
      // Notify Sequelize of JSON field changes
      user.changed('skills', true);
      user.changed('skillLevels', true);
    }

    await user.save();
    logger.info(`[PROFILE] Updated user SQL skills: ${user.id}`);

    return response.success(res, {
      message: "Skills updated successfully",
      updatedSkills: user.skills || [],
      skillLevels: user.skillLevels || {},
      aiRecommendation: "Consider adding Machine Learning and Cloud Computing to increase your market competitiveness by 35%.",
    });

  } catch (err) {
    logger.error(`[PROFILE] Update skills error: ${err.message}`);
    return response.error(res, "Server Error", 500);
  }
};
