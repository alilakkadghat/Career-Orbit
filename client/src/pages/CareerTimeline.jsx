import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { useSkillLevels } from '../context/SkillLevelsContext';
import { useSelectedRole } from '../context/SelectedRoleContext';
import './CareerTimeline.css';

const CareerTimeline = () => {
    const timelineRef = React.useRef(null);
    const [lineHeight, setLineHeight] = React.useState(0);

    const { skillLevels } = useSkillLevels();
    const { selectedRole } = useSelectedRole();

    const normalize = (skill) =>
        skill.toLowerCase().replace(/[^a-z0-9]/g, '');

    const getSkillLevel = (skill) => {
        const matchingSkill = Object.keys(skillLevels).find(
            existingSkill => normalize(existingSkill) === normalize(skill)
        );

        return matchingSkill ? skillLevels[matchingSkill] : 0;
    };

    const targetRole = selectedRole?.title || 'Senior Software Engineer';

    const roleRequirements = selectedRole?.requiredLevels || {
        JavaScript: 80,
        React: 85,
        'Node.js': 80,
        'System Design': 85
    };

    const skillGaps = Object.entries(roleRequirements)
        .map(([skill, requiredLevel]) => {
            const currentLevel = getSkillLevel(skill);
            const gap = Math.max(requiredLevel - currentLevel, 0);

            return {
                skill,
                currentLevel,
                requiredLevel,
                gap
            };
        })
        .filter(item => item.gap > 0)
        .sort((a, b) => b.gap - a.gap);

    const getTimeframe = (index, total) => {
        if (total <= 1) return '0-3 months';
        if (index === 0) return '0-3 months';
        if (index === 1) return '3-6 months';
        if (index === 2) return '6-9 months';
        return '9-12 months';
    };

    const getMilestoneTitle = (gap) => {
        if (gap.gap > 40) return `Master ${gap.skill}`;
        if (gap.gap > 25) return `Strengthen ${gap.skill}`;
        if (gap.gap > 10) return `Improve ${gap.skill}`;
        return `Polish ${gap.skill}`;
    };

    const developmentMilestones = skillGaps.map((gap, index) => ({
        id: index + 2,
        title: getMilestoneTitle(gap),
        role: 'Skill Development Sprint',
        timeframe: getTimeframe(index, skillGaps.length),
        status: 'upcoming',
        skills: [gap.skill],
        description: `Move from ${gap.currentLevel}% to ${gap.requiredLevel}% proficiency in ${gap.skill} to close a ${gap.gap}% readiness gap.`
    }));

    const milestones = [
        {
            id: 1,
            title: 'Current Position',
            role: 'Current Skill Profile',
            timeframe: 'Now',
            status: 'current',
            skills: Object.keys(skillLevels).length > 0
                ? Object.keys(skillLevels).slice(0, 4)
                : ['Profile Setup'],
            description:
                'Your current career baseline is calculated from your selected skills and self-assessed proficiency levels.'
        },
        ...developmentMilestones,
        {
            id: developmentMilestones.length + 2,
            title: 'Target Role',
            role: targetRole,
            timeframe:
                skillGaps.length === 0
                    ? 'Ready Now'
                    : skillGaps.length <= 2
                        ? '3-6 months'
                        : skillGaps.length <= 4
                            ? '6-12 months'
                            : '12+ months',
            status: 'target',
            skills: Object.keys(roleRequirements),
            description:
                skillGaps.length === 0
                    ? `Your current skill profile already aligns strongly with ${targetRole}. Focus on projects, applications, and interview preparation.`
                    : `Complete the required skill sprints to improve readiness for ${targetRole}.`
        }
    ];

    React.useEffect(() => {
        const handleScroll = () => {
            if (timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const elementTop = rect.top;
                const elementHeight = rect.height;
                const startOffset = windowHeight / 2;

                let progress = 0;

                if (elementTop < startOffset) {
                    const scrolled = startOffset - elementTop;
                    progress = (scrolled / elementHeight) * 100;
                }

                progress = Math.min(Math.max(progress, 0), 100);
                setLineHeight(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="timeline-page">
                <PageHeader
                    title="Career Timeline"
                    subtitle={`A visual roadmap from your current skill profile toward ${targetRole}.`}
                    badge="Your Journey"
                />

                <section className="timeline-content section-padding">
                    <div className="container">
                        <div className="timeline-wrapper" ref={timelineRef}>
                            <div className="timeline-line-background"></div>

                            <div
                                className="timeline-progress"
                                style={{ height: `${lineHeight}%` }}
                            >
                                <div className="timeline-traveler">🚀</div>
                            </div>

                            {milestones.map((milestone, index) => {
                                const threshold =
                                    milestones.length > 1
                                        ? (index / (milestones.length - 1)) * 100
                                        : 100;

                                const isPassed = lineHeight >= threshold;
                                const isActive =
                                    lineHeight >= threshold - 5 &&
                                    lineHeight <= threshold + 5;

                                return (
                                    <div
                                        key={milestone.id}
                                        className={`timeline-item ${milestone.status} ${
                                            isPassed ? 'passed' : ''
                                        } ${isActive ? 'active' : ''}`}
                                    >
                                        <div className="timeline-marker">
                                            <div className="marker-dot">
                                                {milestone.status === 'target'
                                                    ? '⭐'
                                                    : index + 1}
                                            </div>
                                            <div className="marker-pulse"></div>
                                        </div>

                                        <div className="timeline-card glass-card">
                                            <div className="timeline-header mb-4">
                                                <div>
                                                    <span className="timeline-timeframe">
                                                        {milestone.timeframe}
                                                    </span>
                                                    <h3 className="timeline-title">
                                                        {milestone.title}
                                                    </h3>
                                                    <p className="timeline-role">
                                                        {milestone.role}
                                                    </p>
                                                </div>

                                                <div className={`status-badge ${milestone.status}`}>
                                                    {milestone.status === 'current'
                                                        ? '📍 Current'
                                                        : milestone.status === 'upcoming'
                                                            ? '🎯 Upcoming'
                                                            : '🏆 Target'}
                                                </div>
                                            </div>

                                            <p className="timeline-description mb-6">
                                                {milestone.description}
                                            </p>

                                            <div className="timeline-skills">
                                                <h4 className="mb-2">
                                                    Strategic Skills
                                                </h4>

                                                <div className="skills-list">
                                                    {milestone.skills.map(skill => (
                                                        <span
                                                            key={skill}
                                                            className="skill-badge"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="timeline-actions text-center mt-8 pt-6">
                            <Link
                                to="/learning/gap-analysis"
                                className="btn btn-primary btn-lg"
                            >
                                Begin Upskilling Sprints →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CareerTimeline;