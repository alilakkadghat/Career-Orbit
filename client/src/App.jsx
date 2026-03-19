import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SkillsProvider } from './context/SkillsContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

import ProblemStatement from './pages/ProblemStatement';
import HowItWorks from './pages/HowItWorks';

// Profile Pages
import CreateProfile from './pages/CreateProfile';
import EditSkills from './pages/EditSkills';
import SkillLevels from './pages/SkillLevels';

// Career Path Pages
import RoleRecommendations from './pages/RoleRecommendations';
import CareerTimeline from './pages/CareerTimeline';
import SectorTransitions from './pages/SectorTransitions';
import CareerSimulator from './pages/CareerSimulator';

// Learning Path Pages
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import RecommendedCourses from './pages/RecommendedCourses';
import LearningDuration from './pages/LearningDuration';

// Dashboard Pages
import SkillDemandTrends from './pages/SkillDemandTrends';
import SkillDecay from './pages/SkillDecay';
import FairnessMetrics from './pages/FairnessMetrics';

// Placement Pages
import JobRecommendations from './pages/JobRecommendations';

// Resume Pages
import ResumeBuilder from './pages/ResumeBuilder';
import ResumePreview from './pages/ResumePreview';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <Preloader />;
  if (!token) return <Navigate to="/login" />;

  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds fake load time
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SkillsProvider>
            {loading ? (
              <Preloader />
            ) : (
              <Router>
                <ScrollToTop />
                <Chatbot />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/problem" element={<ProblemStatement />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/solution" element={<HowItWorks />} />

                  {/* Profile Routes */}
                  <Route path="/profile/create" element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />
                  <Route path="/profile/edit-skills" element={<ProtectedRoute><EditSkills /></ProtectedRoute>} />
                  <Route path="/profile/skill-levels" element={<ProtectedRoute><SkillLevels /></ProtectedRoute>} />

                  {/* Career Path Routes */}
                  <Route path="/career/recommendations" element={<ProtectedRoute><RoleRecommendations /></ProtectedRoute>} />
                  <Route path="/career/timeline" element={<ProtectedRoute><CareerTimeline /></ProtectedRoute>} />
                  <Route path="/career/transitions" element={<ProtectedRoute><SectorTransitions /></ProtectedRoute>} />
                  <Route path="/career/simulator" element={<ProtectedRoute><CareerSimulator /></ProtectedRoute>} />

                  {/* Learning Path Routes */}
                  <Route path="/learning/gap-analysis" element={<ProtectedRoute><SkillGapAnalysis /></ProtectedRoute>} />
                  <Route path="/learning/courses" element={<ProtectedRoute><RecommendedCourses /></ProtectedRoute>} />
                  <Route path="/learning/duration" element={<ProtectedRoute><LearningDuration /></ProtectedRoute>} />

                  {/* Placement Routes */}
                  <Route path="/placement/jobs" element={<ProtectedRoute><JobRecommendations /></ProtectedRoute>} />

                  {/* Resume Routes */}
                  <Route path="/resume/builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
                  <Route path="/resume/preview" element={<ProtectedRoute><ResumePreview /></ProtectedRoute>} />

                  {/* Dashboard Routes */}
                  <Route path="/dashboard/trends" element={<ProtectedRoute><SkillDemandTrends /></ProtectedRoute>} />
                  <Route path="/dashboard/decay" element={<ProtectedRoute><SkillDecay /></ProtectedRoute>} />
                  <Route path="/dashboard/fairness" element={<ProtectedRoute><FairnessMetrics /></ProtectedRoute>} />

                  {/* Catch-all route: Redirect unknown routes to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
            )}
          </SkillsProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
