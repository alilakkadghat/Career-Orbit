/**
 * CareerOrbit AI — Courses Dataset
 * Aggregated from Coursera, Udemy, AWS Training, Google Certificates, and edX.
 * Last sync: March 2026
 */

const courseCatalog = [
  { id: "C001", course: "Machine Learning Specialization", platform: "Coursera", instructor: "Andrew Ng", duration: "4 months", difficulty: "Intermediate", skill: "Machine Learning", rating: 4.9, enrollments: 245000, url: "https://coursera.org/specializations/machine-learning", thumbnail: "🤖" },
  { id: "C002", course: "The Complete React Developer Course", platform: "Udemy", instructor: "Maximilian Schwarzmüller", duration: "6 weeks", difficulty: "Beginner", skill: "React.js", rating: 4.7, enrollments: 180000, url: "https://udemy.com/react-complete-guide", thumbnail: "⚛️" },
  { id: "C003", course: "AWS Certified Solutions Architect", platform: "AWS Training", instructor: "Amazon Web Services", duration: "3 months", difficulty: "Advanced", skill: "Cloud Computing (AWS)", rating: 4.8, enrollments: 320000, url: "https://aws.amazon.com/certification", thumbnail: "☁️" },
  { id: "C004", course: "Deep Learning Specialization", platform: "Coursera", instructor: "Andrew Ng", duration: "5 months", difficulty: "Advanced", skill: "Deep Learning", rating: 4.9, enrollments: 198000, url: "https://coursera.org/specializations/deep-learning", thumbnail: "🧠" },
  { id: "C005", course: "Python for Data Science & AI", platform: "IBM / Coursera", instructor: "IBM Skills Network", duration: "2 months", difficulty: "Beginner", skill: "Python", rating: 4.6, enrollments: 410000, url: "https://coursera.org/professional-certificates/ibm-data-science", thumbnail: "🐍" },
  { id: "C006", course: "Docker & Kubernetes: The Practical Guide", platform: "Udemy", instructor: "Maximilian Schwarzmüller", duration: "5 weeks", difficulty: "Intermediate", skill: "DevOps & CI/CD", rating: 4.7, enrollments: 145000, url: "https://udemy.com/docker-kubernetes", thumbnail: "🐳" },
  { id: "C007", course: "Cybersecurity Professional Certificate", platform: "Google / Coursera", instructor: "Google Career Certificates", duration: "6 months", difficulty: "Beginner", skill: "Cybersecurity", rating: 4.8, enrollments: 275000, url: "https://coursera.org/professional-certificates/google-cybersecurity", thumbnail: "🔒" },
  { id: "C008", course: "Generative AI with Large Language Models", platform: "Coursera", instructor: "DeepLearning.AI & AWS", duration: "3 weeks", difficulty: "Intermediate", skill: "Generative AI", rating: 4.8, enrollments: 125000, url: "https://coursera.org/learn/generative-ai-with-llms", thumbnail: "✨" },
];

const learningDurations = [
  { skill: "Machine Learning", estimatedMonths: 4, prerequisite: "Python, Statistics", difficulty: "Hard" },
  { skill: "React.js", estimatedMonths: 2, prerequisite: "JavaScript, HTML/CSS", difficulty: "Medium" },
  { skill: "AWS Cloud", estimatedMonths: 3, prerequisite: "Networking basics", difficulty: "Medium" },
  { skill: "Docker & Kubernetes", estimatedMonths: 2, prerequisite: "Linux, Networking", difficulty: "Medium" },
  { skill: "Deep Learning", estimatedMonths: 5, prerequisite: "ML, Linear Algebra", difficulty: "Hard" },
  { skill: "System Design", estimatedMonths: 3, prerequisite: "Backend experience", difficulty: "Hard" },
  { skill: "TypeScript", estimatedMonths: 1, prerequisite: "JavaScript", difficulty: "Easy" },
  { skill: "Cybersecurity", estimatedMonths: 6, prerequisite: "Networking, Linux", difficulty: "Hard" },
  { skill: "Generative AI", estimatedMonths: 2, prerequisite: "Python, ML basics", difficulty: "Medium" },
];

module.exports = { courseCatalog, learningDurations };
