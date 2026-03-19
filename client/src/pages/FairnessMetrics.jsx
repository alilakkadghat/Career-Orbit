import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import './FairnessMetrics.css';

const FairnessMetrics = () => {
    const overallScore = 78;

    const metrics = [
        {
            category: 'Gender Equity',
            score: 82,
            icon: '⚖️',
            description: 'Equal opportunity distribution across genders',
            insights: ['Female representation: 45%', 'Pay gap: 8% (industry avg: 15%)', 'Leadership roles: 38%']
        },
        {
            category: 'Geographic Diversity',
            score: 75,
            icon: '🌍',
            description: 'Access to opportunities across regions',
            insights: ['Remote opportunities: 65%', 'Global reach: 45 countries', 'Regional balance: Good']
        },
        {
            category: 'Experience Level',
            score: 88,
            icon: '📈',
            description: 'Fair distribution across career stages',
            insights: ['Entry-level: 30%', 'Mid-level: 45%', 'Senior: 25%']
        },
        {
            category: 'Educational Background',
            score: 70,
            icon: '🎓',
            description: 'Opportunities for diverse educational paths',
            insights: ['Traditional degree: 60%', 'Bootcamp: 25%', 'Self-taught: 15%']
        }
    ];

    const radarData = metrics.map(m => ({
        subject: m.category,
        A: m.score,
        fullMark: 100
    }));

    const historyData = [
        { name: 'Q1', score: 65 },
        { name: 'Q2', score: 68 },
        { name: 'Q3', score: 72 },
        { name: 'Q4', score: 78 },
    ];

    const recommendations = [
        {
            title: 'Increase Accessibility',
            priority: 'High',
            description: 'Expand remote learning options to reach underserved communities',
            impact: '+12% accessibility score'
        },
        {
            title: 'Mentorship Programs',
            priority: 'Medium',
            description: 'Create mentorship opportunities for underrepresented groups',
            impact: '+8% equity score'
        },
        {
            title: 'Skill-Based Hiring',
            priority: 'High',
            description: 'Promote skill-based hiring over credential requirements',
            impact: '+15% opportunity access'
        }
    ];

    const getScoreColor = (score) => {
        if (score >= 80) return 'success';
        if (score >= 60) return 'blue';
        if (score >= 40) return 'warning';
        return 'danger';
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const handleAuditRequest = () => {
        alert('Audit Request Submitted! Our compliance team will generate a detailed report for your trajectory within 48 hours.');
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="fairness-page">
                <PageHeader
                    title="Platform Equity Audit"
                    subtitle="Quantifying our commitment to radical transparency and equal opportunity access."
                    badge="Integrity 2.0"
                    gradient="black"
                />

                <section className="fairness-content section-padding pb-12">
                    <div className="container">

                        <div className="fairness-summary grid-3 mb-10">
                            <motion.div className="fs-main-card glass-card col-span-2 p-10" {...fadeIn}>
                                <div className="fsm-content">
                                    <div className="fsm-text">
                                        <div className="fsm-badge-live">
                                            <span className="live-dot"></span>
                                            LIVE AUDIT DATA
                                        </div>
                                        <h2 className="mb-4 mt-4">Systemic Fairness Score</h2>
                                        <p className="mb-6 opacity-80">Our proprietary <strong>Neuro-Equity™</strong> algorithms are continuously audited for demographic bias. We maintain a composite score that measures equitable distribution of career recommendations across all socio-economic vectors.</p>
                                        <button className="btn btn-primary" onClick={handleAuditRequest}>Request Personal Audit →</button>
                                    </div>
                                    <div className="fsm-score-circle">
                                        <svg viewBox="0 0 100 100">
                                            <circle className="fsm-circle-bg" cx="50" cy="50" r="45" />
                                            <circle
                                                className="fsm-circle-progress"
                                                cx="50" cy="50" r="45"
                                                style={{ strokeDashoffset: 283 - (283 * overallScore) / 100 }}
                                            />
                                        </svg>
                                        <div className="fsm-score-text">
                                            <span className="fsm-value">{overallScore}</span>
                                            <span className="fsm-label">Points</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div className="fs-stat-card glass-card p-10 text-center flex-center" {...fadeIn} transition={{ delay: 0.2 }}>
                                <div className="fss-rank-badge">
                                    <span className="rank-label">INDUSTRY RANK</span>
                                    <div className="rank-value">Top 5%</div>
                                    <p className="rank-desc mt-4">Outperforming 95% of recruitment platforms in bias mitigation protocols.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Analytics Dashboard */}
                        <div className="fairness-analytics grid-2 mb-12">
                            <motion.div className="chart-card-premium glass-card" {...fadeIn}>
                                <div className="chart-header">
                                    <h3>Equity Distribution Matrix</h3>
                                    <p>Fairness performance across key demographic pillars</p>
                                </div>
                                <div className="chart-container-ui" style={{ height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                            <PolarGrid stroke="#e0e0e0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4F4F4F', fontSize: 12, fontWeight: 600 }} />
                                            <Radar
                                                name="Equity Score"
                                                dataKey="A"
                                                stroke="#FF6E14"
                                                fill="#FF6E14"
                                                fillOpacity={0.4}
                                            />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e0e0e0' }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            <motion.div className="chart-card-premium glass-card" {...fadeIn} transition={{ delay: 0.2 }}>
                                <div className="chart-header">
                                    <h3>Progressive Improvement</h3>
                                    <p>Historical fairness index over time</p>
                                </div>
                                <div className="chart-container-ui" style={{ height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={historyData}>
                                            <defs>
                                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#FF6E14" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#FF6E14" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                                            <XAxis dataKey="name" stroke="#4F4F4F" axisLine={false} tickLine={false} dy={10} />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e0e0e0' }} />
                                            <Area type="monotone" dataKey="score" stroke="#FF6E14" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>

                        <div className="stats-overview grid-4 mb-10">
                            <StatCard icon="👥" title="Audited Paths" value="125K" subtitle="Global trajectories" color="blue" />
                            <StatCard icon="🌍" title="Served Nations" value="45" subtitle="Diverse clusters" color="success" />
                            <StatCard icon="📊" title="Equity Delta" value="+12" subtitle="vs last quarter" trend={{ direction: 'up', value: '5 pts' }} color="primary" />
                            <StatCard icon="🛡️" title="Bias Control" value="Active" subtitle="Continuous monitoring" color="success" />
                        </div>

                        <div className="section-header-block mb-8">
                            <h2 className="section-title">Diagnostic Breakdown</h2>
                            <p className="section-subtitle">Real-time performance metrics across protected characteristic vectors.</p>
                        </div>

                        <div className="metrics-grid mb-12">
                            {metrics.map((metric, index) => (
                                <motion.div
                                    key={metric.category}
                                    className="metric-ui-card glass-card p-8"
                                    {...fadeIn}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="mu-header mb-6">
                                        <div className="mu-title-with-icon">
                                            <span className="mu-icon-bg">{metric.icon}</span>
                                            <h3>{metric.category}</h3>
                                        </div>
                                        <div className={`mu-score ${getScoreColor(metric.score)}`}>
                                            {metric.score}%
                                        </div>
                                    </div>
                                    <p className="mu-desc mb-6">{metric.description}</p>
                                    <div className="mb-6">
                                        <ProgressBar percentage={metric.score} color={getScoreColor(metric.score)} showLabel={false} height="medium" />
                                    </div>
                                    <div className="mu-insights">
                                        <h5 className="mb-3 uppercase text-light extra-small letter-spacing-1">Key Insights</h5>
                                        {metric.insights.map((insight, idx) => (
                                            <div key={idx} className="mui-item">
                                                <span className="mui-dot"></span>
                                                <span>{insight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="recommendations-ui mb-12">
                            <div className="recommendations-header mb-8 bg-dark p-8 rounded-lg flex justify-between items-center text-white">
                                <div>
                                    <h2 className="mb-2 text-white">Integrity Roadmap</h2>
                                    <p className="mb-0 opacity-70">Strategic interventions queued for deployment in Q1 2026.</p>
                                </div>
                                <div className="shield-aura">🛡️</div>
                            </div>
                            <div className="grid-3">
                                {recommendations.map((rec, index) => (
                                    <motion.div
                                        key={index}
                                        className="rec-ui-card glass-card p-8 hover-lift"
                                        {...fadeIn}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="ru-header mb-6">
                                            <h3>{rec.title}</h3>
                                            <div className={`ru-priority-tag ${rec.priority.toLowerCase()}`}>{rec.priority}</div>
                                        </div>
                                        <p className="ru-desc mb-8">{rec.description}</p>
                                        <div className="ru-impact-box">
                                            <span className="impact-label">PROJECTED IMPACT</span>
                                            <strong className="impact-value">{rec.impact}</strong>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FairnessMetrics;
