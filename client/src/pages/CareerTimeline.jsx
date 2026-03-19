import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import './CareerTimeline.css';

const CareerTimeline = () => {
    const timelineRef = React.useRef(null);
    const [lineHeight, setLineHeight] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            if (timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const elementTop = rect.top;
                const elementHeight = rect.height;

                // Calculate how much of the element is visible/scrolled past
                // We start animating when the top enters the middle of the screen
                const startOffset = windowHeight / 2;

                let progress = 0;

                if (elementTop < startOffset) {
                    const scrolled = startOffset - elementTop;
                    progress = (scrolled / elementHeight) * 100;
                }

                // Clamp between 0 and 100
                progress = Math.min(Math.max(progress, 0), 100);
                setLineHeight(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial calculation
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const milestones = [
        {
            id: 1,
            title: 'Current Position',
            role: 'Software Engineer',
            timeframe: 'Now',
            status: 'current',
            skills: ['JavaScript', 'React', 'Node.js'],
            description: 'Building web applications with modern tech stack'
        },
        {
            id: 2,
            title: 'Skill Development Phase',
            role: 'Learning & Growth',
            timeframe: '3-6 months',
            status: 'upcoming',
            skills: ['System Design', 'Architecture', 'Performance Optimization'],
            description: 'Focus on advanced technical skills and system design principles'
        },
        {
            id: 3,
            title: 'Senior Engineer',
            role: 'Senior Software Engineer',
            timeframe: '6-12 months',
            status: 'upcoming',
            skills: ['Leadership', 'Mentoring', 'Technical Strategy'],
            description: 'Take on more responsibility, mentor junior developers'
        },
        {
            id: 4,
            title: 'Leadership Transition',
            role: 'Tech Lead',
            timeframe: '12-18 months',
            status: 'upcoming',
            skills: ['Team Management', 'Project Planning', 'Stakeholder Communication'],
            description: 'Lead technical projects and guide team direction'
        },
        {
            id: 5,
            title: 'Target Role',
            role: 'Engineering Manager',
            timeframe: '18-24 months',
            status: 'target',
            skills: ['People Management', 'Strategic Planning', 'Budget Management'],
            description: 'Manage engineering team and drive organizational impact'
        }
    ];

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="timeline-page">
                <PageHeader
                    title="Career Trajectory Map"
                    subtitle="A visual roadmap of your professional evolution over the next 24 months."
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
                                // Progress thresholds for each milestone
                                // With 5 items, they are roughly at 0%, 25%, 50%, 75%, 100%
                                const threshold = (index / (milestones.length - 1)) * 100;
                                const isPassed = lineHeight >= threshold;
                                const isActive = lineHeight >= threshold - 5 && lineHeight <= threshold + 5;

                                return (
                                    <div 
                                        key={milestone.id} 
                                        className={`timeline-item ${milestone.status} ${isPassed ? 'passed' : ''} ${isActive ? 'active' : ''}`}
                                    >
                                        <div className="timeline-marker">
                                            <div className="marker-dot">
                                                {milestone.status === 'target' ? '⭐' : (index + 1)}
                                            </div>
                                            <div className="marker-pulse"></div>
                                        </div>

                                        <div className="timeline-card glass-card">
                                            <div className="timeline-header mb-4">
                                                <div>
                                                    <span className="timeline-timeframe">{milestone.timeframe}</span>
                                                    <h3 className="timeline-title">{milestone.title}</h3>
                                                    <p className="timeline-role">{milestone.role}</p>
                                                </div>
                                                <div className={`status-badge ${milestone.status}`}>
                                                    {milestone.status === 'current' ? '📍 Current' : 
                                                     milestone.status === 'upcoming' ? '🎯 Upcoming' : '🏆 Target'}
                                                </div>
                                            </div>

                                            <p className="timeline-description mb-6">{milestone.description}</p>

                                            <div className="timeline-skills">
                                                <h4 className="mb-2">Strategic Skills</h4>
                                                <div className="skills-list">
                                                    {milestone.skills.map(skill => (
                                                        <span key={skill} className="skill-badge">{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="timeline-actions text-center mt-8 pt-6">
                            <Link to="/learning/gap-analysis" className="btn btn-primary btn-lg">
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
