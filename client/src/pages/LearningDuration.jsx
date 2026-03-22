import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import './LearningDuration.css';

const LearningDuration = () => {
    const [weeklyHours, setWeeklyHours] = useState(10);

    const skillsToLearn = [
        { skill: 'System Design', hours: 60, category: 'Technical' },
        { skill: 'TypeScript', hours: 40, category: 'Technical' },
        { skill: 'Testing', hours: 30, category: 'Technical' },
        { skill: 'CI/CD', hours: 25, category: 'Tools' },
        { skill: 'Mentoring', hours: 20, category: 'Leadership' }
    ];

    const totalHours = skillsToLearn.reduce((sum, s) => sum + s.hours, 0);
    const weeksNeeded = Math.ceil(totalHours / weeklyHours);
    const monthsNeeded = Math.ceil(weeksNeeded / 4);
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + weeksNeeded * 7);

    const milestones = [
        { percentage: 25, label: 'Quarter Milestone', weeks: Math.ceil(weeksNeeded * 0.25) },
        { percentage: 50, label: 'Core Proficiency', weeks: Math.ceil(weeksNeeded * 0.5) },
        { percentage: 75, label: 'Transition Ready', weeks: Math.ceil(weeksNeeded * 0.75) },
        { percentage: 100, label: 'Peak Mastery', weeks: weeksNeeded }
    ];

    const getAIInsight = () => {
        if (weeklyHours <= 10) {
            return {
                title: 'Consistent Builder',
                advice:
                    'Your pace is sustainable for long-term retention. Focus on deep-work blocks to make every hour count.',
                risk: 'Momentum is moderate. Consider a 15-hour sprint next month to reach opportunities sooner.'
            };
        }
        if (weeklyHours <= 25) {
            return {
                title: 'Speed Accelerator',
                advice:
                    "This is an ideal balance for career transitions—strong momentum with manageable burnout risk.",
                risk:
                    "Avoid getting stuck in passive learning. Combine theory with real projects to escape 'tutorial purgatory'."
            };
        }
        return {
            title: 'High-Intensity Immersion',
            advice:
                'You are operating at a top learner velocity. This pace can significantly shorten your transition time.',
            risk:
                'Burnout risk is high. Schedule deliberate rest days to sustain this intensity across the full journey.'
        };
    };

    const insight = getAIInsight();

    const categoryAllocation = skillsToLearn.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.hours;
        return acc;
    }, {});

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="duration-page">
                <PageHeader
                    title="Study Velocity Engine"
                    subtitle="Tune your weekly commitment and see exactly how your path to mastery unfolds."
                    badge="Time Planning"
                />

                <section className="duration-content section-padding">
                    <div className="container duration-grid">

                        {/* Row 1: Commitment + AI Insight */}
                        <div className="duration-row duration-row-top">
                            <div className="glass-card commitment-card">
                                <div className="card-header-inline">
                                    <h2 className="card-title">Learning Commitment</h2>
                                    <span className="card-pill">Planner</span>
                                </div>
                                <p className="card-subtitle">
                                    Adjust your weekly hours to understand how your learning velocity impacts your career transition.
                                </p>

                                <div className="slider-box">
                                    <div className="slider-header">
                                        <span className="slider-label">Velocity Scale</span>
                                        <span className="slider-value">{weeklyHours} hrs / week</span>
                                    </div>
                                    <input
                                        type="range"
                                        id="weeklyHours"
                                        min="5"
                                        max="40"
                                        value={weeklyHours}
                                        onChange={e => setWeeklyHours(parseInt(e.target.value, 10))}
                                        className="velocity-slider"
                                        style={{
                                            background: `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${((weeklyHours - 5) / 35) * 100
                                                }%, rgba(0,0,0,0.05) ${((weeklyHours - 5) / 35) * 100}%, rgba(0,0,0,0.05) 100%)`
                                        }}
                                    />
                                    <div className="slider-labels">
                                        <span>5h • Standard</span>
                                        <span>40h • Intensive</span>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card ai-insight-card">
                                <div className="ai-insight-header">
                                    <div className="ai-status-pulse" />
                                    <div>
                                        <p className="ai-label">AI Learning Insight</p>
                                        <h2 className="ai-title">
                                            Strategy: <span className="text-primary">{insight.title}</span>
                                        </h2>
                                    </div>
                                </div>

                                <div className="ai-insight-body">
                                    <div className="insight-block">
                                        <h4 className="insight-heading">Recommended Approach</h4>
                                        <p className="insight-text">{insight.advice}</p>
                                    </div>
                                    <div className="insight-block">
                                        <h4 className="insight-heading">Risk Check</h4>
                                        <p className="insight-text">{insight.risk}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Summary + Allocation */}
                        <div className="duration-row">
                            <div className="glass-card summary-result-card bg-grad-dark">
                                <div className="summary-chip">Timeline Summary</div>

                                <div className="summary-item">
                                    <span className="res-dark-label">Target Mastery Window</span>
                                    <span className="res-value">
                                        {completionDate.toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>

                                <div className="summary-item">
                                    <span className="res-dark-label">Estimated Path Duration</span>
                                    <span className="res-value">{monthsNeeded} calendar months</span>
                                </div>

                                <div className="summary-meta">
                                    <span className="summary-tag">
                                        {totalHours}h total workload • {weeksNeeded} weeks at {weeklyHours}h/week
                                    </span>
                                </div>
                            </div>

                            <div className="glass-card allocation-card">
                                <div className="card-header-inline">
                                    <h3 className="card-title-sm">Time Allocation by Track</h3>
                                </div>
                                <p className="card-subtitle-sm">
                                    See how your effort distributes across technical, tools, and leadership capabilities.
                                </p>
                                <div className="allocation-list">
                                    {Object.entries(categoryAllocation).map(([cat, hours]) => (
                                        <div key={cat} className="allocation-item">
                                            <div className="allocation-meta">
                                                <span className="allocation-label">{cat}</span>
                                                <span className="allocation-value">
                                                    {Math.round((hours / totalHours) * 100)}% • {hours}h
                                                </span>
                                            </div>
                                            <ProgressBar
                                                percentage={(hours / totalHours) * 100}
                                                color="primary"
                                                height="tiny"
                                                showLabel={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Row 3: Backlog Analysis */}
                        <div className="duration-row">
                            <div className="row-header">
                                <div>
                                    <h2 className="section-title">Backlog Analysis</h2>
                                    <p className="section-subtitle">
                                        Break down each module to understand effort, duration, and impact on your transition.
                                    </p>
                                </div>
                                <span className="badge-pill">Total Effort: {totalHours} hours</span>
                            </div>

                            <div className="breakdown-grid">
                                {skillsToLearn.map(item => {
                                    const itemWeeks = Math.ceil(item.hours / weeklyHours);
                                    const impact = (item.hours / totalHours) * 100;
                                    return (
                                        <div key={item.skill} className="breakdown-card glass-card">
                                            <div className="b-header">
                                                <h3 className="b-title">{item.skill}</h3>
                                                <span className="b-tag">{item.category}</span>
                                            </div>

                                            <div className="b-stats bg-light-soft">
                                                <div className="b-stat">
                                                    <span className="b-label">Total Effort</span>
                                                    <strong className="b-value">{item.hours}h</strong>
                                                </div>
                                                <div className="b-stat">
                                                    <span className="b-label">Estimated Duration</span>
                                                    <strong className="b-value">{itemWeeks} weeks</strong>
                                                </div>
                                            </div>

                                            <div className="b-impact">
                                                <div className="b-impact-meta">
                                                    <span>Impact on Path</span>
                                                    <span>{Math.round(impact)}%</span>
                                                </div>
                                                <ProgressBar
                                                    percentage={impact}
                                                    color="primary"
                                                    height="medium"
                                                    showLabel={false}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Row 4: Milestones */}
                        <div className="duration-row">
                            <div className="section-center">
                                <h2 className="section-title">Growth Benchmarks</h2>
                                <p className="section-subtitle">
                                    Track key checkpoints that mark your progress from foundation to peak mastery.
                                </p>
                            </div>

                            <div className="milestones-grid">
                                {milestones.map(m => (
                                    <div key={m.percentage} className="milestone-ui-card glass-card">
                                        <div className="mu-header">
                                            <div className="mu-icon">
                                                {m.percentage === 100 ? '🏆' : '🎯'}
                                            </div>
                                            <div>
                                                <h3 className="mu-title">{m.label}</h3>
                                                <p className="mu-subtitle">Week {m.weeks}</p>
                                            </div>
                                        </div>
                                        <div className="mu-progress-meta">
                                            <span>Progress</span>
                                            <span>{m.percentage}%</span>
                                        </div>
                                        <ProgressBar
                                            percentage={m.percentage}
                                            color={m.percentage === 100 ? 'success' : 'primary'}
                                            height="large"
                                            showLabel={false}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Row 5: Career ROI */}
                        <div className="duration-row">
                            <div className="roi-card glass-card bg-grad-blue">
                                <div className="roi-grid">
                                    <div className="roi-copy">
                                        <h2 className="roi-title">Post‑Mastery Opportunity</h2>
                                        <p className="roi-text">
                                            Completing this learning path unlocks eligibility for roles with significant
                                            earning potential. Every week you move faster brings that opportunity closer.
                                        </p>
                                    </div>
                                    <div className="roi-figure">
                                        <div className="roi-stat-circle">
                                            <span className="roi-val">+42%</span>
                                            <span className="roi-lab">Estimated ROI</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LearningDuration;
