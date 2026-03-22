import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import './RoleRecommendations.css';

const RoleRecommendations = () => {
    const [selectedRole, setSelectedRole] = useState(null);

    const recommendations = [
        {
            id: 1,
            title: 'Senior Software Engineer',
            matchScore: 92,
            salaryRange: '$120k - $180k',
            industry: 'Technology',
            requiredSkills: ['JavaScript', 'React', 'Node.js', 'System Design'],
            missingSkills: ['System Design'],
            reason: 'Your strong technical skills and experience align perfectly with this role. Focus on system design to maximize your potential.',
            timeToReady: '3-6 months'
        },
        {
            id: 2,
            title: 'Full Stack Team Lead',
            matchScore: 85,
            salaryRange: '$130k - $190k',
            industry: 'Technology',
            requiredSkills: ['JavaScript', 'Leadership', 'Architecture', 'Mentoring'],
            missingSkills: ['Architecture', 'Mentoring'],
            reason: 'Your leadership skills combined with technical expertise make you a great candidate. Develop architecture knowledge to excel.',
            timeToReady: '6-12 months'
        },
        {
            id: 3,
            title: 'Frontend Architect',
            matchScore: 88,
            salaryRange: '$140k - $200k',
            industry: 'Technology',
            requiredSkills: ['React', 'JavaScript', 'UI/UX', 'Performance Optimization'],
            missingSkills: ['Performance Optimization'],
            reason: 'Your React expertise is exceptional. Adding performance optimization skills will make you stand out.',
            timeToReady: '4-8 months'
        },
        {
            id: 4,
            title: 'Engineering Manager',
            matchScore: 78,
            salaryRange: '$150k - $210k',
            industry: 'Technology',
            requiredSkills: ['Leadership', 'Project Management', 'Technical Knowledge', 'Communication'],
            missingSkills: ['Project Management'],
            reason: 'Your leadership and communication skills are strong. Gain project management experience to transition into management.',
            timeToReady: '12-18 months'
        },
        {
            id: 5,
            title: 'Solutions Architect',
            matchScore: 82,
            salaryRange: '$135k - $195k',
            industry: 'Technology',
            requiredSkills: ['System Design', 'Cloud Architecture', 'Technical Communication'],
            missingSkills: ['Cloud Architecture', 'System Design'],
            reason: 'Your technical breadth is impressive. Focus on cloud and system design to become a solutions architect.',
            timeToReady: '8-12 months'
        }
    ];

    const getMatchColor = (score) => {
        if (score >= 90) return 'success';
        if (score >= 80) return 'primary';
        if (score >= 70) return 'blue';
        return 'warning';
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="recommendations-page">
                <PageHeader
                    title="Pathfinder Recommendations"
                    subtitle="Our AI has mapped your DNA to these high-growth opportunities. Select a role to view the roadmap."
                    badge="Career Intelligence"
                />

                <section className="recommendations-content section-padding">
                    <div className="container">

                        <div className="recommendations-grid">
                            {recommendations.map((role) => (
                                <div
                                    key={role.id}
                                    className={`role-card glass-card ${selectedRole === role.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
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
                                                        className={`skill-tag-small ${role.missingSkills.includes(skill) ? 'missing' : 'have'}`}
                                                    >
                                                        {skill}
                                                        {role.missingSkills.includes(skill) ? ' ⚠️' : ' ✓'}
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
                                            <Link to="/learning/gap-analysis" className="btn btn-primary">
                                                View Learning Path
                                            </Link>
                                            <Link to="/career/timeline" className="btn btn-outline">
                                                See Timeline
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="explore-more glass-card mt-8 text-center p-8">
                            <h2 className="mb-4">Beyond the Horizon?</h2>
                            <p className="mb-6">Explore how your skills translate to entirely different industries and sectors.</p>
                            <Link to="/career/transitions" className="btn btn-primary btn-lg">
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
