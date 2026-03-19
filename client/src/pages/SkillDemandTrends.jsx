import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';

import SkillTrendChart from '../components/SkillTrendChart';
import SkillGrowthChart from '../components/SkillGrowthChart';
import './SkillDemandTrends.css';

const SkillDemandTrends = () => {
    const [activeTab, setActiveTab] = useState('trending');
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [statsLoaded, setStatsLoaded] = useState(false);

    const trendingSkills = [
        { skill: 'AI/ML', growth: '+145%', demand: 95, trend: 'up', jobs: '2.1M', companies: 4500 },
        { skill: 'Cloud Architecture', growth: '+98%', demand: 90, trend: 'up', jobs: '1.8M', companies: 3800 },
        { skill: 'Cybersecurity', growth: '+87%', demand: 88, trend: 'up', jobs: '1.5M', companies: 4200 },
        { skill: 'DevOps', growth: '+76%', demand: 85, trend: 'up', jobs: '1.3M', companies: 3600 },
        { skill: 'Data Science', growth: '+65%', demand: 82, trend: 'up', jobs: '1.1M', companies: 3400 }
    ];

    const decliningSkills = [
        { skill: 'jQuery', growth: '-45%', demand: 35, trend: 'down', jobs: '12K', companies: 150 },
        { skill: 'PHP (Legacy)', growth: '-32%', demand: 40, trend: 'down', jobs: '45K', companies: 320 },
        { skill: 'Flash', growth: '-89%', demand: 5, trend: 'down', jobs: '1K', companies: 12 }
    ];

    const yourSkills = [
        { skill: 'JavaScript', marketDemand: 92, yourLevel: 75, status: 'strong', gap: 17 },
        { skill: 'React', marketDemand: 88, yourLevel: 80, status: 'strong', gap: 8 },
        { skill: 'Node.js', marketDemand: 85, yourLevel: 65, status: 'moderate', gap: 20 },
        { skill: 'Python', marketDemand: 90, yourLevel: 50, status: 'opportunity', gap: 40 }
    ];

    useEffect(() => {
        const timer = setTimeout(() => setStatsLoaded(true), 400);
        return () => clearTimeout(timer);
    }, []);

    const renderSkillsGrid = (skills, type) => (
        <div className={`skills-trend-grid ${type}`}>
            {skills.map(item => (
                <div
                    key={item.skill}
                    className={`trend-card glass-card ${item.trend} ${hoveredSkill === item.skill ? 'hovered' : ''
                        }`}
                    onMouseEnter={() => setHoveredSkill(item.skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                >
                    <div className="tc-header">
                        <div className="tc-title-block">
                            <h3 className="skill-title">{item.skill}</h3>
                            <span className={`skill-chip ${item.trend}`}>
                                {item.trend === 'up' ? 'High Velocity' : 'In Decline'}
                            </span>
                        </div>
                        <div className="tc-right">
                            <div className={`growth-pill ${item.trend === 'up' ? 'positive' : 'negative'}`}>
                                {item.growth}
                            </div>
                            <div className="skill-trend-icon">
                                {item.trend === 'up' ? '📈' : '📉'}
                            </div>
                        </div>
                    </div>

                    <div className="demand-bar-container">
                        <div className="demand-fill" style={{ width: `${item.demand}%` }} />
                    </div>

                    <div className="demand-meta">
                        <span>Current Market Demand</span>
                        <strong>{item.demand}%</strong>
                    </div>

                    <div className="skill-metrics">
                        <div className="metric-item">
                            <span className="metric-label">Open Jobs</span>
                            <strong>{item.jobs}</strong>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Hiring Companies</span>
                            <strong>{item.companies.toLocaleString()}</strong>
                        </div>
                    </div>

                    <Link
                        to={item.trend === 'up' ? '/career/recommendations' : '/learning/gap-analysis'}
                        className="skill-action-btn"
                    >
                        {hoveredSkill === item.skill ? 'Explore matching roles →' : 'View insights'}
                    </Link>
                </div>
            ))}
        </div>
    );

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="trends-page">
                <PageHeader
                    title="Market Demand Trends"
                    subtitle="See which skills are accelerating, stabilizing, or fading in the market."
                    badge="Live Market Data"
                />



                <section className="trends-content section-padding">
                    <div className="container">
                        {/* Row: Stats + simple macro chart */}
                        <div className={`top-row ${statsLoaded ? 'animate-in' : ''}`}>
                            <div className="stats-grid">
                                <StatCard
                                    icon="📈"
                                    title="Market Growth"
                                    value="+78%"
                                    subtitle="Aggregate demand"
                                    trend={{ direction: 'up', value: '12%' }}
                                    color="success"
                                />
                                <StatCard
                                    icon="🔥"
                                    title="Emergent Skills"
                                    value="15"
                                    subtitle="High velocity"
                                    color="primary"
                                />
                                <StatCard
                                    icon="⚠️"
                                    title="Legacy Risk"
                                    value="8"
                                    subtitle="Skills in decay"
                                    color="warning"
                                />
                                <StatCard
                                    icon="💼"
                                    title="Live Openings"
                                    value="2.4M"
                                    subtitle="Global tech"
                                    trend={{ direction: 'up', value: '18%' }}
                                    color="blue"
                                />
                            </div>

                            <div className="macro-chart-card glass-card">
                                <div className="macro-header">
                                    <h3 className="macro-title">Macro Skill Demand Curve</h3>
                                    <p className="macro-subtitle">
                                        Real-time demand velocity across key technology sectors (2020-2025).
                                    </p>
                                </div>
                                <div className="macro-chart-container" style={{ width: '100%', height: '100%', minHeight: '300px' }}>
                                    <SkillTrendChart />
                                </div>
                            </div>

                            <div className="growth-chart-card glass-card" style={{ padding: '1.5rem', marginTop: '1rem' }}>
                                <h3>Top 5 High-Growth Skills</h3>
                                <SkillGrowthChart />
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="trends-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`}
                                onClick={() => setActiveTab('trending')}
                            >
                                🚀 Trending Skills
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'declining' ? 'active' : ''}`}
                                onClick={() => setActiveTab('declining')}
                            >
                                📉 Declining Skills
                            </button>
                        </div>

                        {activeTab === 'trending' && renderSkillsGrid(trendingSkills, 'trending')}
                        {activeTab === 'declining' && renderSkillsGrid(decliningSkills, 'declining')}

                        {/* Your skills vs market */}
                        <div className="comparison-section glass-card">
                            <div className="section-header">
                                <div>
                                    <h2>Your Market Positioning</h2>
                                    <p className="section-subtitle">
                                        Compare your current proficiency against live market expectations for each focus area.
                                    </p>
                                </div>
                                <div className="section-badge">Personal Analytics</div>
                            </div>

                            <div className="market-comparison-grid">
                                {yourSkills.map(item => (
                                    <div
                                        key={item.skill}
                                        className={`comparison-item ${item.status} glass-card`}
                                    >
                                        <div className="ci-header">
                                            <h3>{item.skill}</h3>
                                            <div className={`ci-badge ${item.status}`}>
                                                {item.status === 'strong' && 'Optimal'}
                                                {item.status === 'moderate' && 'Developing'}
                                                {item.status === 'opportunity' && 'High Reward'}
                                            </div>
                                        </div>

                                        <div className="ci-bars">
                                            <div className="ci-bar-row">
                                                <div className="ci-bar-info">
                                                    <span>Market Demand</span>
                                                    <strong>{item.marketDemand}%</strong>
                                                </div>
                                                <div className="ci-bar">
                                                    <div
                                                        className="ci-fill market"
                                                        style={{ width: `${item.marketDemand}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="ci-bar-row">
                                                <div className="ci-bar-info">
                                                    <span>Your Proficiency</span>
                                                    <strong>{item.yourLevel}%</strong>
                                                </div>
                                                <div className="ci-bar">
                                                    <div
                                                        className="ci-fill personal"
                                                        style={{ width: `${item.yourLevel}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="skill-gap">
                                                <span>
                                                    Gap to close: <strong>{item.gap}%</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="dashboard-actions">
                            <Link to="/dashboard/decay" className="btn btn-primary btn-lg">
                                Analyze Skill Decay →
                            </Link>
                            <Link to="/skills/recommendations" className="btn btn-outline btn-lg">
                                Get Skill Recommendations
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default SkillDemandTrends;
