import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import './RecommendedCourses.css';

const RecommendedCourses = () => {
    const [filters, setFilters] = useState({
        skill: 'all',
        platform: 'all',
        duration: 'all',
        price: 'all'
    });
 
    const courses = [
        {
            id: 1,
            title: 'System Design Fundamentals',
            platform: 'Udemy',
            skill: 'System Design',
            duration: '12 hours',
            rating: 4.8,
            students: '45,000',
            price: '$89.99',
            level: 'Intermediate',
            description: 'Master the fundamentals of system design and architecture',
            courseUrl: 'https://www.udemy.com/course/system-design-fundamentals/'
        },
        {
            id: 2,
            title: 'TypeScript Complete Guide',
            platform: 'Coursera',
            skill: 'TypeScript',
            duration: '8 hours',
            rating: 4.7,
            students: '32,000',
            price: '$49.99',
            level: 'Beginner',
            description: 'Learn TypeScript from scratch to advanced concepts',
            courseUrl: 'https://www.coursera.org/learn/learn-typescript'
        },
        {
            id: 3,
            title: 'Testing React Applications',
            platform: 'Frontend Masters',
            skill: 'Testing',
            duration: '6 hours',
            rating: 4.9,
            students: '18,000',
            price: 'Subscription',
            level: 'Intermediate',
            description: 'Comprehensive testing strategies for React apps',
            courseUrl: 'https://frontendmasters.com/courses/complete-react-v9/'
        },
        {
            id: 4,
            title: 'CI/CD with GitHub Actions',
            platform: 'LinkedIn Learning',
            skill: 'CI/CD',
            duration: '4 hours',
            rating: 4.6,
            students: '25,000',
            price: 'Subscription',
            level: 'Intermediate',
            description: 'Automate your deployment pipeline with GitHub Actions',
            courseUrl: 'https://www.linkedin.com/learning/learning-github-actions-2/'
        },
        {
            id: 5,
            title: 'Advanced Node.js Development',
            platform: 'Udemy',
            skill: 'Node.js',
            duration: '16 hours',
            rating: 4.8,
            students: '55,000',
            price: '$94.99',
            level: 'Advanced',
            description: 'Deep dive into Node.js performance and scalability',
            courseUrl: 'https://www.udemy.com/course/node-js-advanced-concepts/'
        },
        {
            id: 6,
            title: 'Leadership for Engineers',
            platform: 'Pluralsight',
            skill: 'Leadership',
            duration: '5 hours',
            rating: 4.5,
            students: '12,000',
            price: 'Subscription',
            level: 'All Levels',
            description: 'Develop leadership skills for technical roles',
            courseUrl: 'https://www.pluralsight.com/courses/introduction-leadership-management-developers'
        }
    ];

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="courses-page">
                <PageHeader
                    title="Curated Learning Paths"
                    subtitle="High-impact resources selected by AI to close your specific gaps in record time."
                    badge="Academy"
                />

                <section className="courses-content section-padding">
                    <div className="container">

                        <div className="courses-layout">
                            <aside className="filters-sidebar glass-card">
                                <h3>Precision Filters</h3>

                                <div className="filter-group">
                                    <label>Target Skill</label>
                                    <select value={filters.skill} onChange={(e) => setFilters({ ...filters, skill: e.target.value })}>
                                        <option value="all">All Skills</option>
                                        <option value="System Design">System Design</option>
                                        <option value="TypeScript">TypeScript</option>
                                        <option value="Testing">Testing</option>
                                        <option value="CI/CD">CI/CD</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Learning Provider</label>
                                    <select value={filters.platform} onChange={(e) => setFilters({ ...filters, platform: e.target.value })}>
                                        <option value="all">All Platforms</option>
                                        <option value="Udemy">Udemy</option>
                                        <option value="Coursera">Coursera</option>
                                        <option value="LinkedIn Learning">LinkedIn Learning</option>
                                        <option value="Pluralsight">Pluralsight</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Time Commitment</label>
                                    <select value={filters.duration} onChange={(e) => setFilters({ ...filters, duration: e.target.value })}>
                                        <option value="all">Any Duration</option>
                                        <option value="short">Under 5 hours</option>
                                        <option value="medium">5-10 hours</option>
                                        <option value="long">10+ hours</option>
                                    </select>
                                </div>

                                <div className="cl-cta mt-6 p-4 bg-light rounded text-center">
                                    <p className="small mb-3">Want to know when you'll finish?</p>
                                    <Link to="/learning/duration" className="btn btn-outline full-width">Velocity Calc</Link>
                                </div>
                            </aside>

                            <div className="courses-grid">
                                {courses.map(course => (
                                    <div key={course.id} className="course-card glass-card">
                                        <div className="course-header mb-4">
                                            <div className="platform-ui-badge">{course.platform}</div>
                                            <div className="level-ui-badge">{course.level}</div>
                                        </div>

                                        <h3 className="course-title mb-2">{course.title}</h3>
                                        <p className="course-description mb-4">{course.description}</p>

                                        <div className="course-meta mb-6">
                                            <div className="meta-item">
                                                <span className="meta-icon">⭐</span>
                                                <strong>{course.rating}</strong>
                                            </div>
                                            <div className="meta-item">
                                                <span className="meta-icon">👥</span>
                                                <span>{course.students}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="meta-icon">⏱️</span>
                                                <span>{course.duration}</span>
                                            </div>
                                        </div>

                                        <div className="course-footer">
                                            <div className="course-price">{course.price}</div>
                                            <a
                                                href={course.courseUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary"
                                            >
                                                Enroll Path →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default RecommendedCourses;
