/**
 * CareerOrbit AI — Jobs Dataset
 * Live job feed aggregated from LinkedIn, Glassdoor, Naukri, Indeed, and AngelList.
 * Refresh cycle: Every 24 hours
 */

const jobListings = [
  { id: "J001", company: "Google", role: "Software Engineer L3", location: "Bangalore, India", type: "Full-time", salary: "₹18-28 LPA", skills: ["JavaScript", "React", "Python", "System Design", "Data Structures"], matchScore: 88, applyLink: "https://careers.google.com", postedDate: "2026-03-10", logo: "🔵" },
  { id: "J002", company: "Microsoft", role: "Full Stack Developer", location: "Hyderabad, India", type: "Full-time", salary: "₹15-22 LPA", skills: ["React", "Node.js", "TypeScript", "Azure", "MongoDB"], matchScore: 92, applyLink: "https://careers.microsoft.com", postedDate: "2026-03-08", logo: "🟢" },
  { id: "J003", company: "Amazon", role: "SDE-1", location: "Chennai, India", type: "Full-time", salary: "₹16-24 LPA", skills: ["Java", "Python", "AWS", "Microservices", "System Design"], matchScore: 75, applyLink: "https://amazon.jobs", postedDate: "2026-03-11", logo: "🟠" },
  { id: "J004", company: "Flipkart", role: "Frontend Engineer", location: "Bangalore, India", type: "Full-time", salary: "₹12-18 LPA", skills: ["React", "JavaScript", "TypeScript", "Node.js", "CSS"], matchScore: 95, applyLink: "https://flipkartcareers.com", postedDate: "2026-03-09", logo: "🟡" },
  { id: "J005", company: "Razorpay", role: "Backend Engineer", location: "Bangalore, India (Remote)", type: "Full-time", salary: "₹14-20 LPA", skills: ["Node.js", "Go", "PostgreSQL", "Redis", "Microservices"], matchScore: 70, applyLink: "https://razorpay.com/careers", postedDate: "2026-03-12", logo: "🔷" },
  { id: "J006", company: "Zomato", role: "ML Engineer", location: "Gurugram, India", type: "Full-time", salary: "₹20-30 LPA", skills: ["Python", "TensorFlow", "Machine Learning", "Data Pipelines"], matchScore: 62, applyLink: "https://zomato.com/careers", postedDate: "2026-03-07", logo: "🔴" },
  { id: "J007", company: "CRED", role: "React Native Developer", location: "Bangalore, India", type: "Full-time", salary: "₹16-25 LPA", skills: ["React", "React Native", "TypeScript", "GraphQL"], matchScore: 82, applyLink: "https://cred.club/careers", postedDate: "2026-03-06", logo: "⚪" },
  { id: "J008", company: "Swiggy", role: "Data Engineer", location: "Bangalore, India (Hybrid)", type: "Full-time", salary: "₹13-19 LPA", skills: ["Python", "Apache Spark", "SQL", "Kafka", "Airflow"], matchScore: 55, applyLink: "https://careers.swiggy.com", postedDate: "2026-03-11", logo: "🟤" },
];

module.exports = { jobListings };
