import React from 'react';
import { Link } from 'react-router-dom';
import { useSkillLevels } from '../context/SkillLevelsContext';
import { useSkills } from '../context/SkillsContext';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import './SkillLevels.css';

const SkillLevels = () => {
    const { skillLevels, setSkillLevel } = useSkillLevels();
    const { skills } = useSkills();

    const handleLevelChange = (skill, value) => {
        setSkillLevel(skill, value);
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

    const getMarketBenchmark = (skill) => {
        const benchmarks = {
            JavaScript: 78,
            React: 80,
            'Node.js': 76,
            Python: 75,
            SQL: 72,
            TypeScript: 74,
            'System Design': 82,
            Docker: 68,
            Git: 70,
            'VS Code': 65,
            Communication: 78,
            Leadership: 75,
            'Problem Solving': 80,
            Teamwork: 72,
            English: 70,
            Spanish: 62
        };

        return benchmarks[skill] || 65;
    };

    const skillValues = Object.values(skillLevels);

    const averageLevel =
        skillValues.length > 0
            ? Math.round(
                  skillValues.reduce((sum, level) => sum + level, 0) /
                      skillValues.length
              )
            : 0;

    const categoryTitles = {
        technical: 'Technical Skills',
        soft: 'Soft Skills',
        tools: 'Tools & Platforms',
        languages: 'Languages'
    };

    return (
        <main className="skill-levels-page" style={{ paddingTop: 0 }}>
            <PageHeader
                title="Define Your Proficiency"
                subtitle="Calibrate your skills against market benchmarks and personalize your career roadmap."
                badge="Assessment"
            />

            <section className="levels-content section-padding">
                <div className="container">
                    <div className="overall-stats-bar glass-card mb-8">
                        <div className="os-info">
                            <h3>Overall Proficiency</h3>
                            <p>
                                Your average self-assessed proficiency across all selected skills.
                            </p>
                        </div>

                        <div className="os-value-box">
                            <div className="os-value">{averageLevel}%</div>
                            <div className={`os-badge ${getLevelColor(averageLevel)}`}>
                                {getLevelLabel(averageLevel)}
                            </div>
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

                    {Object.entries(skills).map(([category, skillList]) => (
                        <div key={category} className="mb-8">
                            <h2 style={{ marginBottom: '20px' }}>
                                {categoryTitles[category] || category}
                            </h2>

                            <div className="skills-levels-grid">
                                {skillList.map((skill) => {
                                    const level = skillLevels[skill] ?? 50;
                                    const benchmark = getMarketBenchmark(skill);

                                    return (
                                        <div
                                            key={skill}
                                            className="skill-level-card glass-card"
                                        >
                                            <div className="skill-header mb-4">
                                                <h3 className="skill-name">{skill}</h3>

                                                <span
                                                    className={`level-badge ${getLevelColor(level)}`}
                                                >
                                                    {getLevelLabel(level)}
                                                </span>
                                            </div>

                                            <div className="skill-slider-container mb-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={level}
                                                    onChange={(e) =>
                                                        handleLevelChange(
                                                            skill,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="skill-slider"
                                                    style={{
                                                        background: `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${level}%, var(--bg-light) ${level}%, var(--bg-light) 100%)`
                                                    }}
                                                />

                                                <div className="slider-value">
                                                    {level}%
                                                </div>
                                            </div>

                                            <div style={{ marginTop: '14px' }}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: '0.85rem',
                                                        marginBottom: '6px',
                                                        opacity: 0.85
                                                    }}
                                                >
                                                    <span>Market Benchmark</span>
                                                    <strong>{benchmark}%</strong>
                                                </div>

                                                <ProgressBar
                                                    percentage={benchmark}
                                                    color="blue"
                                                    showLabel={false}
                                                    height="small"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className="levels-actions text-center mt-8 pt-6">
                        <Link
                            to="/career/recommendations"
                            className="btn btn-primary btn-lg"
                        >
                            Discover Career Recommendations →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SkillLevels;