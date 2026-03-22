import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { useResume } from '../context/useResume';
import './StipendBenchmark.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const ROLES = ['Software Engineer', 'Data Scientist', 'Product Manager', 'UI/UX Designer', 'Marketing'];
const LOCATIONS = ['Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Chennai', 'Delhi', 'Remote'];

const VERDICT_CONFIG = {
  below_market: { label: 'Below Market', color: '#ef4444', emoji: '⚠️', tip: 'You should negotiate up.' },
  fair:         { label: 'Fair Offer',   color: '#f59e0b', emoji: '✅', tip: 'Acceptable, but room to negotiate.' },
  above_market: { label: 'Above Market', color: '#3b82f6', emoji: '🎉', tip: 'Great offer! Consider accepting.' },
  excellent:    { label: 'Excellent!',   color: '#10b981', emoji: '🚀', tip: 'Top-tier — accept confidently.' },
};

const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

const StipendBenchmark = () => {
  const { resumeData, hasResume } = useResume();
  const [form, setForm] =  useState(() => {
  try {
    const saved = localStorage.getItem('careerOrbit_stipendForm');
    return saved ? JSON.parse(saved) : { role: 'Software Engineer', company: '', stipendAmount: '', location: 'Bangalore', skills: '' };
  } catch {
    return { role: 'Software Engineer', company: '', stipendAmount: '', location: 'Bangalore', skills: '' };
  }
});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-fill skills from saved resume
  useEffect(() => {
    if (hasResume && resumeData?.skills?.length > 0 && !form.skills) {
      setForm(prev => ({ ...prev, skills: resumeData.skills.slice(0, 6).join(', ') }));
    }
  }, [hasResume, resumeData]);

  const handleChange = (e) => {
  setForm(prev => {
    const updated = { ...prev, [e.target.name]: e.target.value };
    localStorage.setItem('careerOrbit_stipendForm', JSON.stringify(updated));
    return updated;
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.stipendAmount || isNaN(form.stipendAmount)) {
      setError('Please enter a valid stipend amount.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const skillsArray = form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
      const res = await axios.post(`${API_BASE}/api/stipend/analyze`, {
        ...form,
        stipendAmount: parseInt(form.stipendAmount),
        skills: skillsArray,
      });
      setResult(res.data);
    } catch (err) {
      setError('Analysis failed. Make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = result ? [
    { label: 'Min', amount: result.staticBenchmark?.min || result.marketRange?.min, fill: '#94a3b8' },
    { label: 'Median', amount: result.staticBenchmark?.median || result.marketRange?.median, fill: '#3b82f6' },
    { label: 'Your Offer', amount: result.input?.stipendAmount, fill: VERDICT_CONFIG[result.verdict]?.color || '#FF6E14' },
    { label: 'Max', amount: result.staticBenchmark?.max || result.marketRange?.max, fill: '#94a3b8' },
  ] : [];

  const verdict = result ? VERDICT_CONFIG[result.verdict] : null;

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="stipend-page">
        <PageHeader
          title="Stipend Benchmarker"
          subtitle="Find out if your internship offer is fair — powered by real market data and Gemini AI."
          badge="Campus Intel"
          gradient="dark"
        />

        <section className="stipend-content section-padding">
          <div className="container">
            <div className="stipend-layout">

              {/* Form Card */}
              <motion.div className="stipend-form-card glass-card" {...fadeIn}>
                <h2>Check Your Offer</h2>
                <p className="text-secondary mb-6">Enter your internship details below for an instant analysis.</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Role / Position</label>
                    <select name="role" value={form.role} onChange={handleChange}>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Company Name <span className="optional">(optional)</span></label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="e.g. Google, TCS, Razorpay..." />
                  </div>

                  <div className="form-group">
                    <label>Offered Stipend (₹ / month) *</label>
                    <input type="number" name="stipendAmount" value={form.stipendAmount} onChange={handleChange} placeholder="e.g. 25000" min="0" required />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <select name="location" value={form.location} onChange={handleChange}>
                      {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Your Skills <span className="optional">(comma separated, optional)</span>
                      {hasResume && <span style={{ color: '#10b981', fontSize: '0.75rem', marginLeft: '8px' }}>✅ Auto-filled from your resume</span>}
                    </label>
                    <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, Python..." />
                  </div>

                  {error && <p className="stipend-error">⚠️ {error}</p>}

                  <button type="submit" className="btn btn-primary full-width" disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze My Stipend →'}
                  </button>
                </form>
              </motion.div>

              {/* Results */}
              <div className="stipend-results">
                {!result && !loading && (
                  <motion.div className="stipend-empty glass-card" {...fadeIn}>
                    <div className="empty-icon">💰</div>
                    <h3>Ready to analyze</h3>
                    <p>Fill in your offer details on the left and we'll tell you exactly where it stands in the market.</p>
                    <div className="stipend-facts">
                      <div className="fact-item">📍 Location-adjusted benchmarks</div>
                      <div className="fact-item">🏢 Company-tier aware analysis</div>
                      <div className="fact-item">🤖 Gemini AI negotiation tips</div>
                    </div>
                  </motion.div>
                )}

                {loading && (
                  <div className="stipend-loading glass-card">
                    <div className="loading-spinner"></div>
                    <p>Consulting market data and Gemini AI...</p>
                  </div>
                )}

                {result && verdict && (
                  <motion.div className="results-stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

                    {/* Verdict Banner */}
                    <div className="verdict-banner glass-card" style={{ '--verdict-color': verdict.color }}>
                      <div className="verdict-emoji">{verdict.emoji}</div>
                      <div className="verdict-text">
                        <h2>{verdict.label}</h2>
                        <p>{verdict.tip}</p>
                      </div>
                      <div className="percentile-badge">
                        <span className="percentile-num">{result.percentile}th</span>
                        <span className="percentile-label">percentile</span>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="chart-card glass-card">
                      <h3>Market Comparison (₹/month)</h3>
                      <p className="text-secondary">Your offer vs market range for {result.input?.role} in {result.input?.location}</p>
                      <div style={{ height: '220px', marginTop: '16px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} barSize={48}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                            <XAxis dataKey="label" axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                            <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Stipend']} contentStyle={{ borderRadius: '12px', border: '1px solid #e0e0e0' }} />
                            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                              {chartData.map((entry, i) => (
                                <rect key={i} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Analysis */}
                    <div className="analysis-card glass-card">
                      <h3>📊 Analysis</h3>
                      <p>{result.analysis}</p>
                    </div>

                    {/* Negotiation Tip */}
                    <div className="negotiation-card glass-card">
                      <h3>🤝 Negotiation Tip</h3>
                      <p>{result.negotiationTip}</p>
                    </div>

                    {/* Company Tier Benchmark */}
                    <div className="tier-card glass-card">
                      <h3>🏢 Company Tier Benchmark</h3>
                      <p>{result.companyTierBenchmark}</p>
                    </div>

                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StipendBenchmark;
