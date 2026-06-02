import React from 'react';
import { Link } from 'react-router-dom';
import './FeatureSection.css';

const FeatureSection = () => {
    const featureGroups = [
    {
        title: "Smart Profile",
        items: [
            { icon: '👤', title: 'Dynamic Profiling', path: '/profile/create', desc: 'Build a rich, AI-driven professional profile.' },
            { icon: '🛠️', title: 'Skill Management', path: '/profile/edit-skills', desc: 'Organize and update your skill portfolio.' },
            { icon: '📈', title: 'Proficiency Levels', path: '/profile/skill-levels', desc: 'Track your growth from beginner to expert.' }
        ]
    },
    {
        title: "Career Trajectory",
        items: [
            { icon: '📅', title: 'Growth Timeline', path: '/career/timeline', desc: 'Visualize your career journey over years.' },
            { icon: '🎯', title: 'Role Matching', path: '/career/recommendations', desc: 'Find roles that match your unique skill set.' },
            { icon: '🔄', title: 'Sector Pivots', path: '/career/transitions', desc: 'See how your skills transfer to other industries.' }
        ]
    },
    {
        title: "Intelligent Learning",
        items: [
            { icon: '🎓', title: 'Curated Courses', path: '/learning/courses', desc: 'Precision learning paths to bridge gaps.' },
            { icon: '⏱️', title: 'Learning Velocity', path: '/learning/duration', desc: 'Calculate the time to reach your next goal.' },
            { icon: '🔍', title: 'Gap Analytics', path: '/learning/gap-analysis', desc: 'Identify exactly what you need to learn.' }
        ]
    },
    {
        title: "Market Intelligence",
        items: [
            { icon: '📉', title: 'Skill Decay', path: '/dashboard/decay', desc: 'Monitor the half-life of your expertise.' },
            { icon: '📊', title: 'Demand Trends', path: '/dashboard/trends', desc: 'Real-time market demand for your skills.' },
            { icon: '⚖️', title: 'Fairness Metrics', path: '/dashboard/fairness', desc: 'Ensuring equitable growth opportunities.' }
        ]
    }
];

    return (
        <section className="features section-padding">
            <div className="container">
                <div className="section-header text-center mb-8">
                    <span className="badge-pill">The Platform</span>
                    <h2>Architecture of Your Future</h2>
                    <p>A comprehensive ecosystem designed to navigate the complexities of modern employment.</p>
                </div>

                {featureGroups.map((group, gi) => (
                    <div className="feature-group mb-8" key={gi}>
                        <h3 className="group-title mb-4">{group.title}</h3>
                        <div className="feature-grid">
                            {group.items.map((f, i) => (
                                <Link
                                    to={f.path}
                                    className={`feature-card ${
    ['Dynamic Profiling', 'Role Matching', 'Gap Analytics', 'Skill Decay'].includes(f.title)
        ? 'feature-card-highlight'
        : ''
}`}
                                    key={i}
                                >
                                    <div className="feature-icon">{f.icon}</div>
                                    <div className="feature-content">
                                        <h4>{f.title}</h4>
                                        <p>{f.desc}</p>
                                    </div>
                                    <div className="feature-arrow">→</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureSection;
