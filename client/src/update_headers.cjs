const fs = require('fs');
const path = require('path');

const updates = [
  { file: 'pages/ProblemStatement.jsx', regex: /title="[^"]*"/, replacement: 'title="Problem Statement"' },
  { file: 'pages/HowItWorks.jsx', regex: /title="[^"]*"/, replacement: 'title="Our Solution"' },
  { file: 'pages/RoleRecommendations.jsx', regex: /title="[^"]*"/, replacement: 'title="Role Recommendations"' },
  { file: 'pages/CareerTimeline.jsx', regex: /title="[^"]*"/, replacement: 'title="Career Timeline"' },
  { file: 'pages/SectorTransitions.jsx', regex: /title="[^"]*"/, replacement: 'title="Sector Transitions"' },
  { file: 'pages/CareerSimulator.jsx', regex: /title="[^"]*"/, replacement: 'title="Career Simulator"' },
  { file: 'pages/SkillGapAnalysis.jsx', regex: /title="[^"]*"/, replacement: 'title="Skill Gap Analysis"' },
  { file: 'pages/RecommendedCourses.jsx', regex: /title="[^"]*"/, replacement: 'title="Recommended Courses"' },
  { file: 'pages/LearningDuration.jsx', regex: /title="[^"]*"/, replacement: 'title="Learning Duration"' },
  { file: 'pages/JobRecommendations.jsx', regex: /title="[^"]*"/, replacement: 'title="Job Recommendations"' },
  { file: 'pages/ResumeBuilder.jsx', regex: /title="[^"]*"/, replacement: 'title="Resume Creator"' },
  { file: 'pages/SkillDemandTrends.jsx', regex: /title="[^"]*"/, replacement: 'title="Skill Demand Trends"' },
  { file: 'pages/SkillDecay.jsx', regex: /title="[^"]*"/, replacement: 'title="Skill Decay"' },
  { file: 'pages/FairnessMetrics.jsx', regex: /title="[^"]*"/, replacement: 'title="Fairness Metrics"' }
];

updates.forEach(update => {
  const filePath = path.join(__dirname, update.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Ensure we specifically target the PageHeader component's title prop
    const parts = content.split('<PageHeader');
    if (parts.length > 1) {
        let firstPart = parts[0];
        let rest = '<PageHeader' + parts.slice(1).join('<PageHeader');
        
        // Find the first title attribute inside PageHeader
        if (rest.indexOf('title=') > -1) {
            rest = rest.replace(update.regex, update.replacement);
            content = firstPart + rest;
            fs.writeFileSync(filePath, content);
            console.log(`Updated: ${update.file} -> ${update.replacement}`);
        }
    }
  } else {
    console.log(`Not found: ${update.file}`);
  }
});
