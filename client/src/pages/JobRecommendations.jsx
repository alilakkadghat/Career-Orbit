import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import './JobRecommendations.css';

import { useSkills } from '../context/SkillsContext';

const JobRecommendations = () => {
    const { allSkillsList: userSkills } = useSkills();

    const [filters, setFilters] = useState({
        location: 'all',
        jobType: 'all',
        experience: 'all',
        minMatch: 'all'
    });

    const [locationState, setLocationState] = useState({
        isDetecting: false,
        error: null,
        coords: null,
        detectedCity: null
    });

    const [showMap, setShowMap] = useState(false);

    const jobList = useMemo(() => [
        {
            id: 1,
            title: 'Frontend Developer',
            company: 'Google',
            location: 'Bangalore, India',
            salary: '\u20B912L \u2013 \u20B925L',
            jobType: 'Hybrid',
            experience: 'Mid-Level',
            requiredSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Git'],
            description: 'Build next-generation user interfaces for Google products, working with a world-class design team.',
            applyUrl: 'https://careers.google.com'
        },
        {
            id: 2,
            title: 'Full Stack Engineer',
            company: 'Microsoft',
            location: 'Hyderabad, India',
            salary: '\u20B915L \u2013 \u20B930L',
            jobType: 'Hybrid',
            experience: 'Mid-Level',
            requiredSkills: ['JavaScript', 'React', 'Node.js', 'REST APIs', 'SQL', 'Azure'],
            description: 'Design and implement scalable web applications on the Azure cloud platform.',
            applyUrl: 'https://careers.microsoft.com'
        },
        {
            id: 3,
            title: 'React Developer',
            company: 'Flipkart',
            location: 'Bangalore, India',
            salary: '\u20B910L \u2013 \u20B920L',
            jobType: 'On-site',
            experience: 'Junior',
            requiredSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'Redux', 'Git'],
            description: 'Build high-performance e-commerce experiences serving millions of users daily.',
            applyUrl: 'https://www.flipkartcareers.com'
        },
        {
            id: 4,
            title: 'Backend Engineer',
            company: 'Amazon',
            location: 'Pune, India',
            salary: '\u20B914L \u2013 \u20B928L',
            jobType: 'On-site',
            experience: 'Mid-Level',
            requiredSkills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'AWS', 'Docker'],
            description: "Build reliable, scalable backend services powering Amazon's marketplace infrastructure.",
            applyUrl: 'https://www.amazon.jobs'
        },
        {
            id: 5,
            title: 'Software Development Engineer',
            company: 'Razorpay',
            location: 'Bangalore, India',
            salary: '\u20B912L \u2013 \u20B922L',
            jobType: 'Remote',
            experience: 'Mid-Level',
            requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'REST APIs'],
            description: 'Build payment infrastructure that powers millions of businesses across India.',
            applyUrl: 'https://razorpay.com/careers'
        },
        {
            id: 6,
            title: 'MERN Stack Developer',
            company: 'Infosys',
            location: 'Mysore, India',
            salary: '\u20B96L \u2013 \u20B914L',
            jobType: 'Hybrid',
            experience: 'Junior',
            requiredSkills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'HTML'],
            description: 'Join a global consulting giant and work on digital transformation projects for Fortune 500 clients.',
            applyUrl: 'https://www.infosys.com/careers'
        },
        {
            id: 7,
            title: 'Frontend Engineer',
            company: 'Swiggy',
            location: 'Bangalore, India',
            salary: '\u20B911L \u2013 \u20B923L',
            jobType: 'Remote',
            experience: 'Mid-Level',
            requiredSkills: ['JavaScript', 'React', 'Redux', 'TypeScript', 'CSS', 'Performance Optimization'],
            description: "Craft delightful food ordering experiences for India's largest food delivery platform.",
            applyUrl: 'https://careers.swiggy.com'
        },
        {
            id: 8,
            title: 'Junior Web Developer',
            company: 'TCS',
            location: 'Mumbai, India',
            salary: '\u20B94L \u2013 \u20B98L',
            jobType: 'On-site',
            experience: 'Entry-Level',
            requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
            description: 'Start your career building enterprise web applications for global clients.',
            applyUrl: 'https://www.tcs.com/careers'
        },
        {
            id: 9,
            title: 'Python Full Stack Developer',
            company: 'Wipro',
            location: 'Hyderabad, India',
            salary: '\u20B96L \u2013 \u20B915L',
            jobType: 'Hybrid',
            experience: 'Junior',
            requiredSkills: ['Python', 'Django', 'React', 'JavaScript', 'PostgreSQL', 'REST APIs'],
            description: 'Build modern web applications using Python and React for enterprise clients worldwide.',
            applyUrl: 'https://careers.wipro.com'
        },
        {
            id: 10,
            title: 'DevOps Engineer',
            company: 'Zomato',
            location: 'Gurugram, India',
            salary: '\u20B913L \u2013 \u20B927L',
            jobType: 'Remote',
            experience: 'Senior',
            requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Python'],
            description: "Scale infrastructure for one of India's largest food-tech platforms.",
            applyUrl: 'https://www.zomato.com/careers'
        },
        {
            id: 11,
            title: 'Software Engineer',
            company: 'Atlassian',
            location: 'Bangalore, India',
            salary: '\u20B918L \u2013 \u20B935L',
            jobType: 'Remote',
            experience: 'Mid-Level',
            requiredSkills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'GraphQL', 'Git'],
            description: 'Build collaboration tools used by millions of teams worldwide, including Jira and Confluence.',
            applyUrl: 'https://www.atlassian.com/company/careers'
        },
        {
            id: 12,
            title: 'Associate Software Engineer',
            company: 'Accenture',
            location: 'Chennai, India',
            salary: '\u20B94L \u2013 \u20B99L',
            jobType: 'Hybrid',
            experience: 'Entry-Level',
            requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'SQL'],
            description: 'Launch your tech career with hands-on experience in digital transformation projects.',
            applyUrl: 'https://www.accenture.com/careers'
        },
        {
            id: 13,
            title: 'Senior Software Engineer',
            company: 'Meta',
            location: 'New York, USA',
            salary: '$160,000 – $220,000',
            jobType: 'Remote',
            experience: 'Senior',
            requiredSkills: ['React', 'JavaScript', 'System Design', 'GraphQL', 'Git'],
            description: 'Lead the development of immersive social experiences for billions of users.',
            applyUrl: 'https://metacareers.com'
        },
        {
            id: 14,
            title: 'Full Stack Developer',
            company: 'Atlassian',
            location: 'Sydney, Australia',
            salary: '$120,000 – $180,000',
            jobType: 'Hybrid',
            experience: 'Mid-Level',
            requiredSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Git'],
            description: 'Help build the future of team collaboration from our global headquarters.',
            applyUrl: 'https://atlassian.com/careers'
        },
        {
            id: 15,
            title: 'Frontend Lead',
            company: 'Spotify',
            location: 'London, UK',
            salary: '£80,000 – £120,000',
            jobType: 'Remote',
            experience: 'Senior',
            requiredSkills: ['JavaScript', 'React', 'Performance', 'Web Audio', 'Git'],
            description: 'Shape the future of music streaming for over 500 million listeners.',
            applyUrl: 'https://spotify.com/jobs'
        },
        {
            id: 16,
            title: 'Staff Engineer',
            company: 'Stripe',
            location: 'San Francisco, USA',
            salary: '$200,000 – $300,000',
            jobType: 'Remote',
            experience: 'Senior',
            requiredSkills: ['Ruby', 'Java', 'REST APIs', 'System Design', 'Security'],
            description: 'Build the economic infrastructure for the internet.',
            applyUrl: 'https://stripe.com/jobs'
        }
    ], []);

    // Calculate match score for each job
    const getMatchScore = useCallback((requiredSkills) => {
        const matched = requiredSkills.filter(s => userSkills.includes(s));
        return Math.round((matched.length / requiredSkills.length) * 100);
    }, [userSkills]);

    const getMatchColor = (score) => {
        if (score >= 90) return 'excellent';
        if (score >= 75) return 'good';
        if (score >= 55) return 'moderate';
        return 'low';
    };

    const getJobTypeBadgeClass = (type) => {
        if (type === 'Remote') return 'remote';
        if (type === 'Hybrid') return 'hybrid';
        return 'onsite';
    };

    // Calculate overall readiness
    const allRequiredSkills = useMemo(() => [...new Set(jobList.flatMap(j => j.requiredSkills))], [jobList]);
    const matchedOverallSkills = useMemo(() => allRequiredSkills.filter(s => userSkills.includes(s)), [allRequiredSkills, userSkills]);
    const readinessScore = Math.round((matchedOverallSkills.length / allRequiredSkills.length) * 100);

    // Filter and sort jobs
    const filteredJobs = useMemo(() => {
        return jobList
            .map(job => ({
                ...job,
                matchScore: getMatchScore(job.requiredSkills)
            }))
            .filter(job => {
                if (filters.location !== 'all' && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
                if (filters.jobType !== 'all' && job.jobType !== filters.jobType) return false;
                if (filters.experience !== 'all' && job.experience !== filters.experience) return false;
                if (filters.minMatch !== 'all' && job.matchScore < parseInt(filters.minMatch)) return false;
                return true;
            })
            .sort((a, b) => b.matchScore - a.matchScore);
    }, [filters, getMatchScore, jobList]);

    const circumference = 2 * Math.PI * 65;
    const dashOffset = circumference - (readinessScore / 100) * circumference;

    const resetFilters = () => {
        setFilters({ location: 'all', jobType: 'all', experience: 'all', minMatch: 'all' });
        setLocationState({ isDetecting: false, error: null, coords: null, detectedCity: null });
    };

    const handleFindNearMe = () => {
        if (!navigator.geolocation) {
            setLocationState(prev => ({ ...prev, error: 'Geolocation is not supported by your browser' }));
            return;
        }

        setLocationState(prev => ({ ...prev, isDetecting: true, error: null }));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocationState({
                    isDetecting: false,
                    error: null,
                    coords: { lat: latitude, lng: longitude },
                    detectedCity: 'Your Current Area'
                });
                setFilters(prev => ({ ...prev, location: 'Your Current Area' }));
                setShowMap(true);
            },
            (error) => {
                let msg = 'Unable to retrieve your location';
                if (error.code === 1) msg = 'Location permission denied';
                setLocationState(prev => ({ ...prev, isDetecting: false, error: msg }));
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="jobs-page">
                <PageHeader
                    title="AI Placement Hub"
                    subtitle="Smart job recommendations matched to your skills, experience, and career goals."
                    badge="Placement Intelligence"
                />

                <section className="jobs-content section-padding">
                    <div className="container">

                        {/* Placement Readiness Card */}
                        <div className="readiness-hero glass-card">
                            <div className="readiness-ring-container">
                                <svg viewBox="0 0 150 150">
                                    <defs>
                                        <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#FF6E14" />
                                            <stop offset="100%" stopColor="#FF8C42" />
                                        </linearGradient>
                                    </defs>
                                    <circle className="readiness-ring-bg" cx="75" cy="75" r="65" />
                                    <circle
                                        className="readiness-ring-fill"
                                        cx="75" cy="75" r="65"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashOffset}
                                    />
                                </svg>
                                <div className="readiness-score-text">
                                    <div className="score-number">{readinessScore}%</div>
                                    <div className="score-label">Ready</div>
                                </div>
                            </div>
                            <div className="readiness-info">
                                <h2>Placement Readiness</h2>
                                <p>
                                    Your skill profile matches <strong>{readinessScore}%</strong> of the overall skills demanded across top companies.
                                    Focus on the missing skills to boost your placement odds.
                                </p>
                                <div className="readiness-stats">
                                    <div className="readiness-stat">
                                        <div className="stat-value">{userSkills.length}</div>
                                        <div className="stat-key">Your Skills</div>
                                    </div>
                                    <div className="readiness-stat">
                                        <div className="stat-value">{matchedOverallSkills.length}</div>
                                        <div className="stat-key">Matched</div>
                                    </div>
                                    <div className="readiness-stat">
                                        <div className="stat-value">{allRequiredSkills.length - matchedOverallSkills.length}</div>
                                        <div className="stat-key">To Learn</div>
                                    </div>
                                    <div className="readiness-stat">
                                        <div className="stat-value">{filteredJobs.length}</div>
                                        <div className="stat-key">Jobs Found</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map Section */}
                        {showMap && locationState.coords && (
                            <div className="map-view-container glass-card animate-in">
                                <div className="map-header">
                                    <h3>📍 Jobs in your vicinity</h3>
                                    <button className="close-map-btn" onClick={() => setShowMap(false)}>✕</button>
                                </div>
                                <div className="map-wrapper">
                                    <iframe
                                        title="Job Locations Map"
                                        width="100%"
                                        height="350"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight="0"
                                        marginWidth="0"
                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationState.coords.lng - 0.1}%2C${locationState.coords.lat - 0.1}%2C${locationState.coords.lng + 0.1}%2C${locationState.coords.lat + 0.1}&layer=mapnik&marker=${locationState.coords.lat}%2C${locationState.coords.lng}`}
                                    ></iframe>
                                </div>
                                <div className="map-footer">
                                    <p>Showing placement opportunities within 10km of your current coordinates.</p>
                                </div>
                            </div>
                        )}

                        {/* Main Layout */}
                        <div className="jobs-layout">

                            {/* Filters */}
                            <aside className="jobs-filters glass-card">
                                <h3>Filters</h3>
                                <div className="filter-group">
                                    <label>Location</label>
                                    <button
                                        className={`location-detect-btn ${locationState.isDetecting ? 'loading' : ''} ${locationState.coords ? 'success' : ''}`}
                                        onClick={handleFindNearMe}
                                        disabled={locationState.isDetecting}
                                    >
                                        <span className="btn-icon">{locationState.isDetecting ? '⌛' : locationState.coords ? '📍' : '🎯'}</span>
                                        {locationState.isDetecting ? 'Detecting...' : (locationState.coords ? 'Area Detected' : 'Find Job opportunities near me')}
                                    </button>

                                    {locationState.error && <p className="filter-error-msg">{locationState.error}</p>}

                                    <div className="location-divider"><span>OR</span></div>

                                    <select value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
                                        <option value="all">Any City</option>
                                        <optgroup label="India">
                                            <option value="bangalore">Bangalore</option>
                                            <option value="hyderabad">Hyderabad</option>
                                            <option value="pune">Pune</option>
                                            <option value="mumbai">Mumbai</option>
                                            <option value="chennai">Chennai</option>
                                            <option value="gurugram">Gurugram</option>
                                        </optgroup>
                                        <optgroup label="International">
                                            <option value="new york">New York, USA</option>
                                            <option value="san francisco">San Francisco, USA</option>
                                            <option value="london">London, UK</option>
                                            <option value="sydney">Sydney, Australia</option>
                                            <option value="berlin">Berlin, Germany</option>
                                            <option value="singapore">Singapore</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Job Type</label>
                                    <select value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}>
                                        <option value="all">All Types</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="On-site">On-site</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Experience</label>
                                    <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })}>
                                        <option value="all">All Levels</option>
                                        <option value="Entry-Level">Entry Level</option>
                                        <option value="Junior">Junior</option>
                                        <option value="Mid-Level">Mid-Level</option>
                                        <option value="Senior">Senior</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Min Skill Match</label>
                                    <select value={filters.minMatch} onChange={(e) => setFilters({ ...filters, minMatch: e.target.value })}>
                                        <option value="all">Any Match %</option>
                                        <option value="90">90%+</option>
                                        <option value="75">75%+</option>
                                        <option value="50">50%+</option>
                                    </select>
                                </div>

                                <button className="filter-reset-btn" onClick={resetFilters}>
                                    Reset Filters
                                </button>

                                <div className="cl-cta mt-6 p-4 bg-light rounded text-center">
                                    <p className="small mb-3">Bridge your skill gaps</p>
                                    <Link to="/learning/gap-analysis" className="btn btn-outline full-width">Gap Analysis</Link>
                                </div>
                            </aside>

                            {/* Jobs Grid */}
                            <div className="jobs-grid">
                                {filteredJobs.length === 0 ? (
                                    <div className="no-results glass-card">
                                        <div className="no-results-icon">No results</div>
                                        <h3>No jobs match your filters</h3>
                                        <p className="mt-2">Try adjusting your filters to see more opportunities.</p>
                                        <button className="btn btn-outline mt-4" onClick={resetFilters}>Reset Filters</button>
                                    </div>
                                ) : (
                                    filteredJobs.map(job => (
                                        <div key={job.id} className="job-card glass-card">
                                            <div className="job-card-header">
                                                <div className="job-meta">
                                                    <h3 className="job-title">{job.title}</h3>
                                                    <div className="job-company">{job.company}</div>
                                                    <div className="job-location">{job.location}</div>
                                                </div>
                                                <div className={`skill-match-circle ${getMatchColor(job.matchScore)}`}>
                                                    <div className="skill-match-value">{job.matchScore}%</div>
                                                    <div className="skill-match-label">Match</div>
                                                </div>
                                            </div>

                                            <div className="job-badges">
                                                <span className={`job-badge ${getJobTypeBadgeClass(job.jobType)}`}>{job.jobType}</span>
                                                <span className="job-badge experience">{job.experience}</span>
                                                <span className="job-badge salary">{job.salary}</span>
                                            </div>

                                            <p className="mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{job.description}</p>

                                            <div className="job-skills-section">
                                                <h4>Required Skills</h4>
                                                <div className="job-skills-tags">
                                                    {job.requiredSkills.map(skill => (
                                                        <span
                                                            key={skill}
                                                            className={`job-skill-tag ${userSkills.includes(skill) ? 'matched' : 'missing'}`}
                                                        >
                                                            {userSkills.includes(skill) ? '\u2713' : '\u26A0'} {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="job-card-footer">
                                                <a
                                                    href={job.applyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary"
                                                >
                                                    Apply Now
                                                </a>
                                                <Link to="/learning/courses" className="btn btn-outline">
                                                    Learn Skills
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Interview Prep CTA */}
                        <div className="interview-cta glass-card">
                            <h2>Ace Your Placement</h2>
                            <p>Prepare for interviews with these key focus areas based on your target roles.</p>
                            <div className="interview-tips">
                                <div className="tip-card">
                                    <div className="tip-icon">DSA</div>
                                    <h4>Data Structures and Algorithms</h4>
                                    <p>Practice arrays, trees, graphs and dynamic programming on LeetCode.</p>
                                </div>
                                <div className="tip-card">
                                    <div className="tip-icon">SYS</div>
                                    <h4>System Design</h4>
                                    <p>Learn to design scalable systems like URL shorteners, chat apps and e-commerce.</p>
                                </div>
                                <div className="tip-card">
                                    <div className="tip-icon">PRJ</div>
                                    <h4>Project Showcase</h4>
                                    <p>Highlight 2-3 strong projects with clear problem statements and outcomes.</p>
                                </div>
                                <div className="tip-card">
                                    <div className="tip-icon">BEH</div>
                                    <h4>Behavioral Rounds</h4>
                                    <p>Use the STAR method to answer leadership and teamwork questions effectively.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default JobRecommendations;
