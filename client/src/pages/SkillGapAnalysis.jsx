import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import './SkillGapAnalysis.css';

const SkillGapAnalysis = () => {
    const targetRole = 'Senior Software Engineer';

    const skillComparison = [
        { skill: 'JavaScript', yourLevel: 75, requiredLevel: 80, gap: 5, priority: 'Low' },
        { skill: 'React', yourLevel: 80, requiredLevel: 85, gap: 5, priority: 'Low' },
        { skill: 'Node.js', yourLevel: 65, requiredLevel: 80, gap: 15, priority: 'Medium' },
        { skill: 'System Design', yourLevel: 30, requiredLevel: 85, gap: 55, priority: 'Critical' },
        { skill: 'TypeScript', yourLevel: 40, requiredLevel: 75, gap: 35, priority: 'High' },
        { skill: 'Testing', yourLevel: 50, requiredLevel: 80, gap: 30, priority: 'High' },
        { skill: 'CI/CD', yourLevel: 45, requiredLevel: 70, gap: 25, priority: 'Medium' },
        { skill: 'Leadership', yourLevel: 70, requiredLevel: 75, gap: 5, priority: 'Low' },
        { skill: 'Mentoring', yourLevel: 60, requiredLevel: 80, gap: 20, priority: 'Medium' }
    ];

    const getPriorityColor = (priority) => {
        if (priority === 'Critical') return 'danger';
        if (priority === 'High') return 'warning';
        if (priority === 'Medium') return 'blue';
        return 'success';
    };

    const getGapColor = (gap) => {
        if (gap > 40) return 'danger';
        if (gap > 20) return 'warning';
        if (gap > 10) return 'blue';
        return 'success';
    };

    const criticalGaps = skillComparison.filter(s => s.priority === 'Critical' || s.priority === 'High');
    const averageGap = Math.round(skillComparison.reduce((sum, s) => sum + s.gap, 0) / skillComparison.length);

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="gap-analysis-page">
                <PageHeader
                    title="Skill Gap Analytics"
                    subtitle={`Precision diagnostics for your transition to: ${targetRole}`}
                    badge="Intelligence"
                />

                <section className="gap-content section-padding">
                    <div className="container">

                        <div className="gap-stats-grid grid-3 mb-8">
                            <div className="stat-card-ui glass-card">
                                <span className="sc-label">Average Gap</span>
                                <span className="sc-value">{averageGap}%</span>
                                <div className="sc-icon">📊</div>
                            </div>
                            <div className="stat-card-ui glass-card">
                                <span className="sc-label">Critical Sprints</span>
                                <span className="sc-value">{criticalGaps.length}</span>
                                <div className="sc-icon">⚡</div>
                            </div>
                            <div className="stat-card-ui glass-card">
                                <span className="sc-label">Readiness Score</span>
                                <span className="sc-value">{100 - averageGap}%</span>
                                <div className="sc-icon">🎯</div>
                            </div>
                        </div>

                        <div className="comparison-grid">
                            {skillComparison.map(item => (
                                <div key={item.skill} className="skill-comparison-card glass-card">
                                    <div className="skill-header mb-4">
                                        <div>
                                            <h3 className="skill-name">{item.skill}</h3>
                                            <span className={`priority-badge ${getPriorityColor(item.priority)}`}>
                                                {item.priority} Priority
                                            </span>
                                        </div>
                                        <div className={`gap-badge ${getGapColor(item.gap)}`}>
                                            {item.gap}% Gap
                                        </div>
                                    </div>

                                    <div className="comparison-bars mb-6">
                                        <div className="bar-row mb-2">
                                            <div className="bar-info">
                                                <span>Your Level</span>
                                                <strong>{item.yourLevel}%</strong>
                                            </div>
                                            <ProgressBar percentage={item.yourLevel} color="blue" showLabel={false} height="small" />
                                        </div>
                                        <div className="bar-row">
                                            <div className="bar-info">
                                                <span>Target Level</span>
                                                <strong>{item.requiredLevel}%</strong>
                                            </div>
                                            <ProgressBar percentage={item.requiredLevel} color="success" showLabel={false} height="small" />
                                        </div>
                                    </div>

                                    {item.gap > 0 ? (
                                        <Link to="/learning/courses" className="btn btn-primary full-width">
                                            Bridge This Gap →
                                        </Link>
                                    ) : (
                                        <div className="proficient-tag">✓ Fully Proficient</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="action-section glass-card mt-8 p-8 text-center">
                            <h2 className="mb-4">Ready to close the distance?</h2>
                            <div className="action-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                <Link to="/learning/courses" className="btn btn-primary btn-lg">
                                    Browse Curated Courses
                                </Link>
                                <Link to="/learning/duration" className="btn btn-outline btn-lg">
                                    Calculate Study Velocity
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SkillGapAnalysis;
