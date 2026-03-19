import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import './SectorTransitions.css';

const SectorTransitions = () => {
    const currentSector = {
        name: 'Technology',
        icon: '💻',
        skills: ['JavaScript', 'React', 'Node.js', 'Problem Solving', 'Communication']
    };

    const transitions = [
        {
            id: 1,
            sector: 'FinTech',
            icon: '💳',
            matchScore: 88,
            difficulty: 'Medium',
            transferableSkills: ['JavaScript', 'Problem Solving', 'Communication'],
            newSkillsNeeded: ['Financial Systems', 'Compliance', 'Security'],
            salaryChange: '+15%',
            timeframe: '6-9 months',
            successRate: '78%',
            description: 'Your technical skills translate well to FinTech. Learn financial domain knowledge to excel.'
        },
        {
            id: 2,
            sector: 'HealthTech',
            icon: '🏥',
            matchScore: 82,
            difficulty: 'Medium',
            transferableSkills: ['React', 'Node.js', 'Problem Solving'],
            newSkillsNeeded: ['HIPAA Compliance', 'Healthcare Systems', 'Data Privacy'],
            salaryChange: '+10%',
            timeframe: '8-12 months',
            successRate: '72%',
            description: 'Healthcare technology is growing rapidly. Your web development skills are in high demand.'
        },
        {
            id: 3,
            sector: 'E-Commerce',
            icon: '🛒',
            matchScore: 90,
            difficulty: 'Low',
            transferableSkills: ['JavaScript', 'React', 'Node.js', 'Communication'],
            newSkillsNeeded: ['Payment Integration', 'Inventory Systems', 'Analytics'],
            salaryChange: '+8%',
            timeframe: '3-6 months',
            successRate: '85%',
            description: 'Easiest transition with your current skillset. E-commerce platforms need your expertise.'
        },
        {
            id: 4,
            sector: 'EdTech',
            icon: '📚',
            matchScore: 85,
            difficulty: 'Low',
            transferableSkills: ['React', 'JavaScript', 'Communication', 'Problem Solving'],
            newSkillsNeeded: ['Learning Management Systems', 'Accessibility', 'Content Delivery'],
            salaryChange: '+5%',
            timeframe: '4-8 months',
            successRate: '80%',
            description: 'Education technology values your skills. Focus on user experience and accessibility.'
        }
    ];

    const getDifficultyColor = (difficulty) => {
        if (difficulty === 'Low') return 'success';
        if (difficulty === 'Medium') return 'warning';
        return 'danger';
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="transitions-page">
                <PageHeader
                    title="Cross-Sector Mobility"
                    subtitle="Discover how your current skills unlock high-growth roles in diverging industries."
                    badge="Career Exploration"
                />

                <section className="transitions-content section-padding">
                    <div className="container">

                        <div className="current-sector-card glass-card mb-8">
                            <h2 className="mb-4">Your Base Industry</h2>
                            <div className="sector-info">
                                <div className="sector-icon-container">
                                    <div className="sector-icon-large">{currentSector.icon}</div>
                                </div>
                                <div className="si-details">
                                    <h3>{currentSector.name}</h3>
                                    <div className="current-skills">
                                        {currentSector.skills.map(skill => (
                                            <span key={skill} className="skill-chip">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="transitions-grid">
                            {transitions.map(transition => (
                                <div key={transition.id} className="transition-card glass-card">
                                    <div className="transition-header mb-4">
                                        <div className="sector-badge-ui">
                                            <span className="sector-icon">{transition.icon}</span>
                                            <span className="sector-name">{transition.sector}</span>
                                        </div>
                                        <div className="match-score-badge"><span className="notranslate">{transition.matchScore}</span>% Match</div>
                                    </div>

                                    <p className="transition-description mb-6">{transition.description}</p>

                                    <div className="transition-metrics grid-3 mb-6">
                                        <div className="metric">
                                            <div className="metric-label">Difficulty</div>
                                            <div className={`metric-value ${getDifficultyColor(transition.difficulty)}`}>
                                                {transition.difficulty}
                                            </div>
                                        </div>
                                        <div className="metric">
                                            <div className="metric-label">Success Rate</div>
                                            <div className="metric-value">{transition.successRate}</div>
                                        </div>
                                        <div className="metric">
                                            <div className="metric-label">Expected Upside</div>
                                            <div className="metric-value salary">{transition.salaryChange}</div>
                                        </div>
                                    </div>

                                    <div className="skills-breakdown mb-6">
                                        <div className="skills-column">
                                            <h4 className="mb-2">Transferable Base</h4>
                                            <div className="skills-tags">
                                                {transition.transferableSkills.map(skill => (
                                                    <span key={skill} className="skill-tag transferable">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="skills-column">
                                            <h4 className="mb-2">Bridge Skills Needed</h4>
                                            <div className="skills-tags">
                                                {transition.newSkillsNeeded.map(skill => (
                                                    <span key={skill} className="skill-tag new">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Link to="/learning/gap-analysis" className="btn btn-primary full-width mt-2">
                                        Analyze Pivot Roadmaps
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SectorTransitions;
