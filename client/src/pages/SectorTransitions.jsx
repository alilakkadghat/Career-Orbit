import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { useSkills } from '../context/SkillsContext';
import './SectorTransitions.css';

const SectorTransitions = () => {
    const { allSkillsList } = useSkills();

    const normalize = (skill) =>
        skill.toLowerCase().replace(/[^a-z0-9]/g, '');

    const hasSkill = (skill) =>
        allSkillsList.some(userSkill => normalize(userSkill) === normalize(skill));

    const currentSector = {
        name: 'Technology',
        icon: '💻',
        skills:
            allSkillsList.length > 0
                ? allSkillsList.slice(0, 8)
                : ['Add skills to personalize this']
    };

    const sectorTemplates = [
    {
        id: 1,
        sector: 'FinTech',
        icon: '💳',
        coreSkills: [
            'JavaScript',
            'Node.js',
            'SQL',
            'Security'
        ],
        bridgeSkills: [
            'Financial Systems',
            'Compliance',
            'Risk Management'
        ],
        salaryChange: '+15%',
        description:
            'Strong backend and data skills transition well into finance.'
    },

    {
        id: 2,
        sector: 'HealthTech',
        icon: '🏥',
        coreSkills: [
            'Healthcare Systems',
            'Data Privacy',
            'Accessibility',
            'Communication'
        ],
        bridgeSkills: [
            'HIPAA',
            'Patient Data',
            'Clinical Workflows'
        ],
        salaryChange: '+10%',
        description:
            'Healthcare technology rewards privacy, compliance, and accessibility.'
    },

    {
        id: 3,
        sector: 'E-Commerce',
        icon: '🛒',
        coreSkills: [
            'JavaScript',
            'React',
            'Node.js',
            'Analytics'
        ],
        bridgeSkills: [
            'Payment Integration',
            'Inventory Systems',
            'Conversion Optimization'
        ],
        salaryChange: '+8%',
        description:
            'Your web development skills transfer naturally into e-commerce.'
    },

    {
        id: 4,
        sector: 'Cloud Computing',
        icon: '☁️',
        coreSkills: [
            'AWS',
            'Docker',
            'Kubernetes',
            'DevOps'
        ],
        bridgeSkills: [
            'Terraform',
            'CI/CD',
            'Monitoring'
        ],
        salaryChange: '+20%',
        description:
            'Cloud infrastructure remains one of the fastest-growing areas.'
    },

    {
        id: 5,
        sector: 'AI Products',
        icon: '🤖',
        coreSkills: [
            'Python',
            'Machine Learning',
            'Statistics',
            'Data Analysis'
        ],
        bridgeSkills: [
            'Prompt Engineering',
            'LLMs',
            'AI Ethics'
        ],
        salaryChange: '+18%',
        description:
            'AI-focused companies value data and machine learning skills.'
    },

    {
        id: 6,
        sector: 'Engineering Management',
        icon: '👥',
        coreSkills: [
            'Leadership',
            'Communication',
            'Mentoring',
            'Project Management'
        ],
        bridgeSkills: [
            'Stakeholder Management',
            'Roadmapping',
            'Team Strategy'
        ],
        salaryChange: '+25%',
        description:
            'Ideal for professionals with strong people and leadership skills.'
    }
];

    const transitions = sectorTemplates
        .map(sector => {
            const transferableSkills = sector.coreSkills.filter(skill =>
                hasSkill(skill)
            );

            const ownedBridgeSkills = sector.bridgeSkills.filter(skill =>
                hasSkill(skill)
            );

            const newSkillsNeeded = sector.bridgeSkills.filter(skill =>
                !hasSkill(skill)
            );

            const coreScore =
                (transferableSkills.length / sector.coreSkills.length) * 70;

            const bridgeScore =
                (ownedBridgeSkills.length / sector.bridgeSkills.length) * 30;

            const matchScore = Math.round(coreScore + bridgeScore);

            const difficulty =
                matchScore >= 80
                    ? 'Low'
                    : matchScore >= 55
                        ? 'Medium'
                        : 'High';

            const timeframe =
                difficulty === 'Low'
                    ? '3-6 months'
                    : difficulty === 'Medium'
                        ? '6-9 months'
                        : '9-12 months';

            const successRate = `${Math.max(
                45,
                Math.min(90, matchScore + 8)
            )}%`;

            return {
                ...sector,
                matchScore,
                difficulty,
                transferableSkills,
                newSkillsNeeded,
                timeframe,
                successRate
            };
        })
        .sort((a, b) => b.matchScore - a.matchScore);

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
                    title="Sector Transitions"
                    subtitle="Discover how your current skills unlock high-growth roles in diverging industries."
                    badge="Career Exploration"
                />

                <section className="transitions-content section-padding">
                    <div className="container">
                        <div className="current-sector-card glass-card mb-8">
                            <h2 className="mb-4">Your Base Skill Profile</h2>

                            <div className="sector-info">
                                <div className="sector-icon-container">
                                    <div className="sector-icon-large">
                                        {currentSector.icon}
                                    </div>
                                </div>

                                <div className="si-details">
                                    <h3>{currentSector.name}</h3>

                                    <div className="current-skills">
                                        {currentSector.skills.map(skill => (
                                            <span
                                                key={skill}
                                                className="skill-chip"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="transitions-grid">
                            {transitions.map(transition => (
                                <div
                                    key={transition.id}
                                    className="transition-card glass-card"
                                >
                                    <div className="transition-header mb-4">
                                        <div className="sector-badge-ui">
                                            <span className="sector-icon">
                                                {transition.icon}
                                            </span>
                                            <span className="sector-name">
                                                {transition.sector}
                                            </span>
                                        </div>

                                        <div className="match-score-badge">
                                            <span className="notranslate">
                                                {transition.matchScore}
                                            </span>
                                            % Match
                                        </div>
                                    </div>

                                    <p className="transition-description mb-6">
                                        {transition.description}
                                    </p>

                                    <div className="transition-metrics grid-3 mb-6">
                                        <div className="metric">
                                            <div className="metric-label">
                                                Difficulty
                                            </div>
                                            <div
                                                className={`metric-value ${getDifficultyColor(
                                                    transition.difficulty
                                                )}`}
                                            >
                                                {transition.difficulty}
                                            </div>
                                        </div>

                                        <div className="metric">
                                            <div className="metric-label">
                                                Success Rate
                                            </div>
                                            <div className="metric-value">
                                                {transition.successRate}
                                            </div>
                                        </div>

                                        <div className="metric">
                                            <div className="metric-label">
                                                Expected Upside
                                            </div>
                                            <div className="metric-value salary">
                                                {transition.salaryChange}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="skills-breakdown mb-6">
                                        <div className="skills-column">
                                            <h4 className="mb-2">
                                                Transferable Base
                                            </h4>

                                            <div className="skills-tags">
                                                {transition.transferableSkills.length > 0 ? (
                                                    transition.transferableSkills.map(skill => (
                                                        <span
                                                            key={skill}
                                                            className="skill-tag transferable"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="skill-tag new">
                                                        No strong overlap yet
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="skills-column">
                                            <h4 className="mb-2">
                                                Bridge Skills Needed
                                            </h4>

                                            <div className="skills-tags">
                                                {transition.newSkillsNeeded.length > 0 ? (
                                                    transition.newSkillsNeeded.map(skill => (
                                                        <span
                                                            key={skill}
                                                            className="skill-tag new"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="skill-tag transferable">
                                                        Bridge complete
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/learning/gap-analysis"
                                        className="btn btn-primary full-width mt-2"
                                    >
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