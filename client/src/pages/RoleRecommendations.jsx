import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import { useSkills } from '../context/SkillsContext';
import { useSkillLevels } from '../context/SkillLevelsContext';
import { useSelectedRole } from '../context/SelectedRoleContext';
import './RoleRecommendations.css';

const RoleRecommendations = () => {
    const [expandedRoleId, setExpandedRoleId] = useState(null);

    const { allSkillsList } = useSkills();
    const { skillLevels } = useSkillLevels();
    const { setSelectedRole } = useSelectedRole();

    const normalize = (skill) =>
        skill.toLowerCase().replace(/[^a-z0-9]/g, '');

    const hasSkill = (skill) =>
        allSkillsList.some(s => normalize(s) === normalize(skill));

    const getSkillLevel = (skill) => {
        const matchingKey = Object.keys(skillLevels).find(
            key => normalize(key) === normalize(skill)
        );

        return matchingKey ? skillLevels[matchingKey] : 0;
    };

    const roleTemplates = [
        {
            id: 1,
            title: 'Senior Software Engineer',
            salaryRange: '$120k - $180k',
            industry: 'Technology',
            requiredSkills: ['JavaScript', 'React', 'Node.js', 'System Design'],
            requiredLevels: {
                JavaScript: 80,
                React: 85,
                'Node.js': 80,
                'System Design': 85
            },
            reason: 'Strong engineering foundations with frontend and backend expertise.',
            timeToReady: '3-6 months'
        },
        {
            id: 2,
            title: 'Full Stack Team Lead',
            salaryRange: '$130k - $190k',
            industry: 'Technology',
            requiredSkills: ['JavaScript', 'Leadership', 'Architecture', 'Mentoring'],
            requiredLevels: {
                JavaScript: 80,
                Leadership: 80,
                Architecture: 85,
                Mentoring: 75
            },
            reason: 'Leadership combined with technical depth creates a strong management path.',
            timeToReady: '6-12 months'
        },
        {
            id: 3,
            title: 'Frontend Architect',
            salaryRange: '$140k - $200k',
            industry: 'Technology',
            requiredSkills: ['React', 'JavaScript', 'UI/UX', 'Performance Optimization'],
            requiredLevels: {
                React: 90,
                JavaScript: 85,
                'UI/UX': 70,
                'Performance Optimization': 80
            },
            reason: 'Strong frontend expertise can evolve into architecture responsibilities.',
            timeToReady: '4-8 months'
        },
        {
            id: 4,
            title: 'Engineering Manager',
            salaryRange: '$150k - $210k',
            industry: 'Technology',
            requiredSkills: ['Leadership', 'Project Management', 'Communication'],
            requiredLevels: {
                Leadership: 85,
                'Project Management': 80,
                Communication: 85
            },
            reason: 'Communication and leadership are essential for engineering management.',
            timeToReady: '12-18 months'
        },
        {
            id: 5,
            title: 'Solutions Architect',
            salaryRange: '$135k - $195k',
            industry: 'Technology',
            requiredSkills: ['System Design', 'Cloud Architecture', 'Technical Communication'],
            requiredLevels: {
                'System Design': 90,
                'Cloud Architecture': 85,
                'Technical Communication': 80
            },
            reason: 'Architecture and system-level thinking drive this role.',
            timeToReady: '8-12 months'
        }
    ];

    const recommendations = roleTemplates
        .map(role => {
            const missingSkills = role.requiredSkills.filter(skill => !hasSkill(skill));

            const totalRequired = role.requiredSkills.reduce((sum, skill) => {
                return sum + (role.requiredLevels[skill] || 75);
            }, 0);

            const totalUserScore = role.requiredSkills.reduce((sum, skill) => {
                const userLevel = getSkillLevel(skill);
                const requiredLevel = role.requiredLevels[skill] || 75;

                return sum + Math.min(userLevel, requiredLevel);
            }, 0);

            const matchScore = Math.round((totalUserScore / totalRequired) * 100);

            return {
                ...role,
                matchScore,
                missingSkills
            };
        })
        .sort((a, b) => b.matchScore - a.matchScore);

    const getMatchColor = (score) => {
        if (score >= 90) return 'success';
        if (score >= 80) return 'primary';
        if (score >= 70) return 'blue';
        return 'warning';
    };

    const handleSelectRole = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="recommendations-page">
                <PageHeader
                    title="Role Recommendations"
                    subtitle="Our AI has mapped your DNA to these high-growth opportunities. Select a role to view the roadmap."
                    badge="Career Intelligence"
                />

                <section className="recommendations-content section-padding">
                    <div className="container">
                        <div className="recommendations-grid">
                            {recommendations.map((role) => (
                                <div
                                    key={role.id}
                                    className={`role-card glass-card ${
                                        expandedRoleId === role.id ? 'selected' : ''
                                    }`}
                                    onClick={() =>
                                        setExpandedRoleId(
                                            expandedRoleId === role.id ? null : role.id
                                        )
                                    }
                                >
                                    <div className="role-header mb-4">
                                        <div>
                                            <h3 className="role-title">{role.title}</h3>
                                            <p className="role-industry">{role.industry}</p>
                                        </div>

                                        <div className={`match-circle ${getMatchColor(role.matchScore)}`}>
                                            <div className="match-score">{role.matchScore}%</div>
                                            <div className="match-label">Fit</div>
                                        </div>
                                    </div>

                                    <div className="role-salary mb-4">
                                        <span className="salary-icon">💰</span>
                                        <span className="salary-range">{role.salaryRange}</span>
                                    </div>

                                    <div className="mb-4">
                                        <ProgressBar
                                            percentage={role.matchScore}
                                            color={getMatchColor(role.matchScore)}
                                            showLabel={false}
                                            height="small"
                                        />
                                    </div>

                                    <div className="role-details">
                                        <div className="detail-section mb-4">
                                            <h4>Why this role?</h4>
                                            <p>{role.reason}</p>
                                        </div>

                                        <div className="detail-section mb-4">
                                            <h4>Required Skills</h4>

                                            <div className="skills-tags">
                                                {role.requiredSkills.map(skill => (
                                                    <span
                                                        key={skill}
                                                        className={`skill-tag-small ${
                                                            role.missingSkills.includes(skill)
                                                                ? 'missing'
                                                                : 'have'
                                                        }`}
                                                    >
                                                        {skill}
                                                        {role.missingSkills.includes(skill)
                                                            ? ' ⚠️'
                                                            : ' ✓'}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="detail-section mb-6">
                                            <h4>Preparation window</h4>
                                            <p className="time-estimate">
                                                <span className="time-icon">⏱️</span>
                                                {role.timeToReady} to peak readiness
                                            </p>
                                        </div>

                                        <div className="role-actions">
                                            <Link
                                                to="/learning/gap-analysis"
                                                className="btn btn-primary"
                                                onClick={() => handleSelectRole(role)}
                                            >
                                                View Learning Path
                                            </Link>

                                            <Link
                                                to="/career/timeline"
                                                className="btn btn-outline"
                                                onClick={() => handleSelectRole(role)}
                                            >
                                                See Timeline
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="explore-more glass-card mt-8 text-center p-8">
                            <h2 className="mb-4">Beyond the Horizon?</h2>

                            <p className="mb-6">
                                Explore how your skills translate to entirely different industries and sectors.
                            </p>

                            <Link
                                to="/career/transitions"
                                className="btn btn-primary btn-lg"
                            >
                                Explore Sector transitions →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default RoleRecommendations;