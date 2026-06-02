import { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SkillLevelsProvider } from './context/SkillLevelsContext';
import { SkillsProvider } from './context/SkillsContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { SelectedRoleProvider } from './context/SelectedRoleContext';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import './App.css';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const ProblemStatement = lazy(() => import('./pages/ProblemStatement'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const ProfileDashboard = lazy(() => import('./pages/ProfileDashboard'));
const RoleRecommendations = lazy(() => import('./pages/RoleRecommendations'));
const CareerTimeline = lazy(() => import('./pages/CareerTimeline'));
const SectorTransitions = lazy(() => import('./pages/SectorTransitions'));
const CareerSimulator = lazy(() => import('./pages/CareerSimulator'));
const CareerComparison = lazy(() => import('./pages/CareerComparison'));
const SkillGapAnalysis = lazy(() => import('./pages/SkillGapAnalysis'));
const RecommendedCourses = lazy(() => import('./pages/RecommendedCourses'));
const LearningDuration = lazy(() => import('./pages/LearningDuration'));
const SkillDemandTrends = lazy(() => import('./pages/SkillDemandTrends'));
const SkillDecay = lazy(() => import('./pages/SkillDecay'));
const JobRecommendations = lazy(() => import('./pages/JobRecommendations'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const ResumePreview = lazy(() => import('./pages/ResumePreview'));
const StipendBenchmark = lazy(() => import('./pages/StipendBenchmark'));
const ResumeRoast = lazy(() => import('./pages/ResumeRoast'));

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
            <SkillLevelsProvider>
              <SelectedRoleProvider>
                {loading ? (
                  <Preloader />
                ) : (
                  <Router>
                    <ScrollToTop />
                    <Chatbot />
                    <Suspense fallback={<Preloader />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/problem" element={<ProblemStatement />} />
                        <Route path="/how-it-works" element={<HowItWorks />} />
                        <Route path="/solution" element={<HowItWorks />} />

                        <Route path="/ai-chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

                        <Route path="/profile" element={<ProtectedRoute><ProfileDashboard /></ProtectedRoute>} />
                        <Route path="/profile/create" element={<Navigate to="/profile" replace />} />
                        <Route path="/profile/edit-skills" element={<Navigate to="/profile" replace />} />
                        <Route path="/profile/skill-levels" element={<Navigate to="/profile" replace />} />

                        <Route path="/career/recommendations" element={<ProtectedRoute><RoleRecommendations /></ProtectedRoute>} />
                        <Route path="/career/timeline" element={<ProtectedRoute><CareerTimeline /></ProtectedRoute>} />
                        <Route path="/career/transitions" element={<ProtectedRoute><SectorTransitions /></ProtectedRoute>} />
                        <Route path="/career/simulator" element={<ProtectedRoute><CareerSimulator /></ProtectedRoute>} />
                        <Route path="/career/comparison" element={<ProtectedRoute><CareerComparison /></ProtectedRoute>} />

                        <Route path="/learning/gap-analysis" element={<ProtectedRoute><SkillGapAnalysis /></ProtectedRoute>} />
                        <Route path="/learning/courses" element={<ProtectedRoute><RecommendedCourses /></ProtectedRoute>} />
                        <Route path="/learning/duration" element={<ProtectedRoute><LearningDuration /></ProtectedRoute>} />

                        <Route path="/placement/jobs" element={<ProtectedRoute><JobRecommendations /></ProtectedRoute>} />

                        <Route path="/resume/builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
                        <Route path="/resume/preview" element={<ProtectedRoute><ResumePreview /></ProtectedRoute>} />

                        <Route path="/dashboard/trends" element={<ProtectedRoute><SkillDemandTrends /></ProtectedRoute>} />
                        <Route path="/dashboard/decay" element={<ProtectedRoute><SkillDecay /></ProtectedRoute>} />

                        <Route path="/stipend" element={<ProtectedRoute><StipendBenchmark /></ProtectedRoute>} />
                        <Route path="/resume/roast" element={<ProtectedRoute><ResumeRoast /></ProtectedRoute>} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Suspense>
                  </Router>
                )}
              </SelectedRoleProvider>
            </SkillLevelsProvider>
          </SkillsProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
