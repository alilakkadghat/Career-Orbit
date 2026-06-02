import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { useSkillLevels } from '../context/SkillLevelsContext';
import { useSelectedRole } from '../context/SelectedRoleContext';
import './RecommendedCourses.css';

const RecommendedCourses = () => {
    const { skillLevels } = useSkillLevels();
    const { selectedRole } = useSelectedRole();

    const [filters, setFilters] = useState({
        skill: 'all',
        platform: 'all',
        duration: 'all',
        price: 'all'
    });

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
                requiredLevel,
                currentLevel,
                gap
            };
        })
        .filter(item => item.gap > 0)
        .sort((a, b) => b.gap - a.gap);

    const prioritySkills = skillGaps.map(item => item.skill);

    const courseLibrary = [
        {
            id: 1,
            title: 'System Design Fundamentals',
            platform: 'Udemy',
            skill: 'System Design',
            duration: '12 hours',
            durationHours: 12,
            rating: 4.8,
            students: '45,000',
            price: '$89.99',
            priceType: 'paid',
            level: 'Intermediate',
            description: 'Master the fundamentals of system design and scalable architecture.',
            courseUrl: 'https://www.udemy.com/course/system-design-fundamentals/'
        },
        {
            id: 2,
            title: 'TypeScript Complete Guide',
            platform: 'Coursera',
            skill: 'TypeScript',
            duration: '8 hours',
            durationHours: 8,
            rating: 4.7,
            students: '32,000',
            price: '$49.99',
            priceType: 'paid',
            level: 'Beginner',
            description: 'Learn TypeScript from scratch to advanced concepts.',
            courseUrl: 'https://www.coursera.org/learn/learn-typescript'
        },
        {
            id: 3,
            title: 'Testing React Applications',
            platform: 'Frontend Masters',
            skill: 'Testing',
            duration: '6 hours',
            durationHours: 6,
            rating: 4.9,
            students: '18,000',
            price: 'Subscription',
            priceType: 'subscription',
            level: 'Intermediate',
            description: 'Comprehensive testing strategies for React apps.',
            courseUrl: 'https://frontendmasters.com/courses/complete-react-v9/'
        },
        {
            id: 4,
            title: 'CI/CD with GitHub Actions',
            platform: 'LinkedIn Learning',
            skill: 'CI/CD',
            duration: '4 hours',
            durationHours: 4,
            rating: 4.6,
            students: '25,000',
            price: 'Subscription',
            priceType: 'subscription',
            level: 'Intermediate',
            description: 'Automate your deployment pipeline with GitHub Actions.',
            courseUrl: 'https://www.linkedin.com/learning/learning-github-actions-2/'
        },
        {
            id: 5,
            title: 'Advanced Node.js Development',
            platform: 'Udemy',
            skill: 'Node.js',
            duration: '16 hours',
            durationHours: 16,
            rating: 4.8,
            students: '55,000',
            price: '$94.99',
            priceType: 'paid',
            level: 'Advanced',
            description: 'Deep dive into Node.js performance and scalability.',
            courseUrl: 'https://www.udemy.com/course/node-js-advanced-concepts/'
        },
        {
            id: 6,
            title: 'Leadership for Engineers',
            platform: 'Pluralsight',
            skill: 'Leadership',
            duration: '5 hours',
            durationHours: 5,
            rating: 4.5,
            students: '12,000',
            price: 'Subscription',
            priceType: 'subscription',
            level: 'All Levels',
            description: 'Develop leadership skills for technical roles.',
            courseUrl: 'https://www.pluralsight.com/courses/introduction-leadership-management-developers'
        },
        {
            id: 7,
            title: 'React Advanced Patterns',
            platform: 'Frontend Masters',
            skill: 'React',
            duration: '7 hours',
            durationHours: 7,
            rating: 4.8,
            students: '28,000',
            price: 'Subscription',
            priceType: 'subscription',
            level: 'Advanced',
            description: 'Master advanced React concepts, hooks, and architecture patterns.',
            courseUrl: 'https://frontendmasters.com/courses/advanced-react-patterns/'
        },
        {
            id: 8,
            title: 'Modern JavaScript Deep Dive',
            platform: 'Udemy',
            skill: 'JavaScript',
            duration: '14 hours',
            durationHours: 14,
            rating: 4.7,
            students: '70,000',
            price: '$84.99',
            priceType: 'paid',
            level: 'Intermediate',
            description: 'Strengthen your JavaScript fundamentals and advanced concepts.',
            courseUrl: 'https://www.udemy.com/course/the-complete-javascript-course/'
        },
        {
            id: 9,
            title: 'Software Architecture Foundations',
            platform: 'LinkedIn Learning',
            skill: 'Architecture',
            duration: '5 hours',
            durationHours: 5,
            rating: 4.6,
            students: '21,000',
            price: 'Subscription',
            priceType: 'subscription',
            level: 'Intermediate',
            description: 'Learn core architecture principles for scalable software systems.',
            courseUrl: 'https://www.linkedin.com/learning/software-architecture-foundations/'
        },
        {
            id: 10,
            title: 'Project Management Basics',
            platform: 'Coursera',
            skill: 'Project Management',
            duration: '10 hours',
            durationHours: 10,
            rating: 4.7,
            students: '40,000',
            price: '$59.99',
            priceType: 'paid',
            level: 'Beginner',
            description: 'Learn planning, execution, and delivery practices for team projects.',
            courseUrl: 'https://www.coursera.org/learn/project-management-foundations'
        },
        {
            id: 11,
            title: 'Cloud Architecture Essentials',
            platform: 'Coursera',
            skill: 'Cloud Architecture',
            duration: '11 hours',
            durationHours: 11,
            rating: 4.8,
            students: '35,000',
            price: '$69.99',
            priceType: 'paid',
            level: 'Intermediate',
            description: 'Understand cloud infrastructure, deployment models, and architecture decisions.',
            courseUrl: 'https://www.coursera.org/learn/cloud-computing'
        },
        {
            id: 12,
            title: 'Technical Communication for Engineers',
            platform: 'LinkedIn Learning',
            skill: 'Technical Communication',
            duration: '3 hours',
            durationHours: 3,
            rating: 4.5,
            students: '16,000',
            price: 'Subscription',
            priceType: 'subscription',
            level: 'All Levels',
            description: 'Communicate technical decisions clearly with teams and stakeholders.',
            courseUrl: 'https://www.linkedin.com/learning/technical-writing-quick-start-guides/'
        }
    ];

    const recommendedCourses = courseLibrary
        .filter(course =>
            prioritySkills.some(skill => normalize(skill) === normalize(course.skill))
        )
        .sort((a, b) => {
            const gapA =
                skillGaps.find(g => normalize(g.skill) === normalize(a.skill))?.gap || 0;
            const gapB =
                skillGaps.find(g => normalize(g.skill) === normalize(b.skill))?.gap || 0;

            return gapB - gapA;
        });

    const fallbackCourses = courseLibrary.filter(
        course =>
            !recommendedCourses.some(
                recommended => recommended.id === course.id
            )
    );

    const coursesToShow =
        recommendedCourses.length > 0
            ? recommendedCourses
            : fallbackCourses;

    const availableSkills = [
        ...new Set(coursesToShow.map(course => course.skill))
    ];

    const availablePlatforms = [
        ...new Set(coursesToShow.map(course => course.platform))
    ];

    const filteredCourses = coursesToShow.filter(course => {
        const skillMatch =
            filters.skill === 'all' || course.skill === filters.skill;

        const platformMatch =
            filters.platform === 'all' ||
            course.platform === filters.platform;

        const durationMatch =
            filters.duration === 'all' ||
            (filters.duration === 'short' && course.durationHours < 5) ||
            (filters.duration === 'medium' &&
                course.durationHours >= 5 &&
                course.durationHours <= 10) ||
            (filters.duration === 'long' && course.durationHours > 10);

        const priceMatch =
            filters.price === 'all' ||
            course.priceType === filters.price;

        return skillMatch && platformMatch && durationMatch && priceMatch;
    });

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="courses-page">
                <PageHeader
                    title="Recommended Courses"
                    subtitle={`High-impact resources selected for your ${targetRole} skill gaps.`}
                    badge="Academy"
                />

                <section className="courses-content section-padding">
                    <div className="container">
                        <div className="courses-layout">
                            <aside className="filters-sidebar glass-card">
                                <h3>Precision Filters</h3>

                                <div className="filter-group">
                                    <label>Target Skill</label>
                                    <select
                                        value={filters.skill}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                skill: e.target.value
                                            })
                                        }
                                    >
                                        <option value="all">All Skills</option>

                                        {availableSkills.map(skill => (
                                            <option key={skill} value={skill}>
                                                {skill}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Learning Provider</label>
                                    <select
                                        value={filters.platform}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                platform: e.target.value
                                            })
                                        }
                                    >
                                        <option value="all">All Platforms</option>

                                        {availablePlatforms.map(platform => (
                                            <option
                                                key={platform}
                                                value={platform}
                                            >
                                                {platform}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Time Commitment</label>
                                    <select
                                        value={filters.duration}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                duration: e.target.value
                                            })
                                        }
                                    >
                                        <option value="all">Any Duration</option>
                                        <option value="short">Under 5 hours</option>
                                        <option value="medium">5-10 hours</option>
                                        <option value="long">10+ hours</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Price</label>
                                    <select
                                        value={filters.price}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                price: e.target.value
                                            })
                                        }
                                    >
                                        <option value="all">Any Price</option>
                                        <option value="paid">Paid</option>
                                        <option value="subscription">Subscription</option>
                                    </select>
                                </div>

                                <div className="cl-cta mt-6 p-4 bg-light rounded text-center">
                                    <p className="small mb-3">
                                        Want to know when you'll finish?
                                    </p>

                                    <Link
                                        to="/learning/duration"
                                        className="btn btn-outline full-width"
                                    >
                                        Velocity Calc
                                    </Link>
                                </div>
                            </aside>

                            <div className="courses-grid">
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map(course => {
                                        const relatedGap = skillGaps.find(
                                            gap =>
                                                normalize(gap.skill) ===
                                                normalize(course.skill)
                                        );

                                        return (
                                            <div
                                                key={course.id}
                                                className="course-card glass-card"
                                            >
                                                <div className="course-header mb-4">
                                                    <div className="platform-ui-badge">
                                                        {course.platform}
                                                    </div>

                                                    <div className="level-ui-badge">
                                                        {course.level}
                                                    </div>
                                                </div>

                                                <h3 className="course-title mb-2">
                                                    {course.title}
                                                </h3>

                                                <p className="course-description mb-4">
                                                    {course.description}
                                                </p>

                                                {relatedGap && (
                                                    <p className="course-description mb-4">
                                                        Recommended for your{' '}
                                                        <strong>
                                                            {relatedGap.gap}%
                                                        </strong>{' '}
                                                        gap in{' '}
                                                        <strong>
                                                            {relatedGap.skill}
                                                        </strong>
                                                        .
                                                    </p>
                                                )}

                                                <div className="course-meta mb-6">
                                                    <div className="meta-item">
                                                        <span className="meta-icon">
                                                            ⭐
                                                        </span>
                                                        <strong>
                                                            {course.rating}
                                                        </strong>
                                                    </div>

                                                    <div className="meta-item">
                                                        <span className="meta-icon">
                                                            👥
                                                        </span>
                                                        <span>
                                                            {course.students}
                                                        </span>
                                                    </div>

                                                    <div className="meta-item">
                                                        <span className="meta-icon">
                                                            ⏱️
                                                        </span>
                                                        <span>
                                                            {course.duration}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="course-footer">
                                                    <div className="course-price">
                                                        {course.price}
                                                    </div>

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
                                        );
                                    })
                                ) : (
                                    <div className="glass-card p-8 text-center">
                                        <h3>No courses match these filters.</h3>
                                        <p>
                                            Try selecting a different skill,
                                            provider, duration, or price.
                                        </p>
                                    </div>
                                )}
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