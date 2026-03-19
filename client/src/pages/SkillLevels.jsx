import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import './SkillLevels.css';

const SkillLevels = () => {
    const [skillLevels, setSkillLevels] = useState({
        'JavaScript': 75,
        'React': 80,
        'Node.js': 65,
        'Python': 50,
        'SQL': 60,
        'Communication': 85,
        'Leadership': 70,
        'Problem Solving': 90,
        'Git': 75,
        'Docker': 55,
        'VS Code': 80
    });

    const handleLevelChange = (skill, value) => {
        setSkillLevels(prev => ({
            ...prev,
            [skill]: parseInt(value)
        }));
    };

    const getLevelLabel = (value) => {
        if (value < 25) return 'Beginner';
        if (value < 50) return 'Learning';
        if (value < 75) return 'Intermediate';
        if (value < 90) return 'Advanced';
        return 'Expert';
    };

    const getLevelColor = (value) => {
        if (value < 25) return 'danger';
        if (value < 50) return 'warning';
        if (value < 75) return 'blue';
        return 'success';
    };

    const averageLevel = Math.round(
        Object.values(skillLevels).reduce((a, b) => a + b, 0) / Object.keys(skillLevels).length
    );

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="skill-levels-page">
                <PageHeader
                    title="Define Your Proficiency"
                    subtitle="Calibrate your skills to receive hyper-personalized career and learning trajectories."
                    badge="Assessment"
                />

                <section className="levels-content section-padding">
                    <div className="container">

                        <div className="overall-stats-bar glass-card mb-8">
                            <div className="os-info">
                                <h3>Overall Proficiency</h3>
                                <p>Aggregate matching score based on current market standards.</p>
                            </div>
                            <div className="os-value-box">
                                <div className="os-value">{averageLevel}%</div>
                                <div className={`os-badge ${getLevelColor(averageLevel)}`}>{getLevelLabel(averageLevel)}</div>
                            </div>
                        </div>

                        <div className="levels-guide glass-card mb-8">
                            <h4 className="mb-4">Proficiency Guide</h4>
                            <div className="guide-items">
                                <div className="guide-item">
                                    <div className="guide-badge beginner">0-25%</div>
                                    <span>Beginner</span>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-badge learning">25-50%</div>
                                    <span>Learning</span>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-badge intermediate">50-75%</div>
                                    <span>Intermediate</span>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-badge advanced">75-90%</div>
                                    <span>Advanced</span>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-badge expert">90-100%</div>
                                    <span>Expert</span>
                                </div>
                            </div>
                        </div>

                        <div className="skills-levels-grid">
                            {Object.entries(skillLevels).map(([skill, level]) => (
                                <div key={skill} className="skill-level-card glass-card">
                                    <div className="skill-header mb-4">
                                        <h3 className="skill-name">{skill}</h3>
                                        <span className={`level-badge ${getLevelColor(level)}`}>
                                            {getLevelLabel(level)}
                                        </span>
                                    </div>

                                    <div className="skill-slider-container mb-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={level}
                                            onChange={(e) => handleLevelChange(skill, e.target.value)}
                                            className="skill-slider"
                                            style={{
                                                background: `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${level}%, var(--bg-light) ${level}%, var(--bg-light) 100%)`
                                            }}
                                        />
                                        <div className="slider-value">{level}%</div>
                                    </div>

                                    <ProgressBar
                                        percentage={level}
                                        color={getLevelColor(level)}
                                        showLabel={false}
                                        height="small"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="levels-actions text-center mt-8 pt-6">
                            <Link to="/career/recommendations" className="btn btn-primary btn-lg">
                                Discover Career Recommendations →
                            </Link>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SkillLevels;
