import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkillTag from '../components/SkillTag';
import PageHeader from '../components/PageHeader';
import ResumeParser from '../components/ResumeParser';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../context/SkillsContext';
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Tooltip
} from 'recharts';
import './EditSkills.css';

const categoryConfig = {
    technical: { label: 'Technical', icon: '💻', color: 'technical' },
    soft: { label: 'Soft', icon: '🤝', color: 'soft' },
    tools: { label: 'Tools', icon: '🛠️', color: 'tools' },
    languages: { label: 'Languages', icon: '🌍', color: 'languages' }
};

const EditSkills = () => {
    const { user } = useAuth();
    const { skills, handleAddSkill, handleRemoveSkill, handleBatchSkills } = useSkills();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('technical');

    const suggestedSkills = {
        technical: ['TypeScript', 'Java', 'C++', 'Ruby', 'Go', 'Rust', 'PHP', 'Swift'],
        soft: ['Teamwork', 'Critical Thinking', 'Creativity', 'Adaptability', 'Time Management'],
        tools: ['Jira', 'Figma', 'Postman', 'AWS', 'Azure', 'Kubernetes'],
        languages: ['French', 'German', 'Mandarin', 'Japanese', 'Portuguese']
    };

    const handleAddCustomSkill = () => {
        if (searchTerm.trim()) {
            handleAddSkill(selectedCategory, searchTerm.trim());
            setSearchTerm('');
        }
    };

    const handleResumeSkills = (groupedSkills) => {
        handleBatchSkills(groupedSkills);
    };


    const radarData = useMemo(() => {
        return Object.entries(categoryConfig).map(([key, config]) => ({
            subject: config.label,
            A: (skills[key] || []).length,
            fullMark: Math.max(...Object.values(skills).map(s => s.length), 5) + 2
        }));
    }, [skills]);

    const totalSkills = Object.values(skills).reduce((acc, arr) => acc + arr.length, 0);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="edit-skills-page">
                <PageHeader
                    title="Manage Your Skills"
                    subtitle="Elevate your profile with precise skill mapping and AI-driven growth metrics."
                    badge="Premium Profile"
                />

                <section className="skills-management section-padding">
                    <div className="container">

                        <div className="skills-dashboard-grid mb-12">
                            <motion.div className="skills-status-card glass-card" {...fadeIn}>
                                <div className="stat-content">
                                    <span className="sc-label">Skill Velocity</span>
                                    <span className="sc-value">{totalSkills}</span>
                                    <p className="sc-subtext">Total verified competencies</p>
                                </div>
                                <div className="stat-icon-wrapper">
                                    <div className="stat-icon">⚡</div>
                                    <div className="icon-pulse"></div>
                                </div>
                            </motion.div>

                            <motion.div className="skill-analysis-card glass-card" {...fadeIn} transition={{ delay: 0.2 }}>
                                <div className="analysis-header">
                                    <h3>Competency Matrix</h3>
                                    <p>Distribution across domains</p>
                                </div>
                                <div className="radar-container">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                            <PolarGrid stroke="#e0e0e0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4F4F4F', fontSize: 12, fontWeight: 600 }} />
                                            <Radar
                                                name="Skills"
                                                dataKey="A"
                                                stroke="#FF6E14"
                                                fill="#FF6E14"
                                                fillOpacity={0.4}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'var(--bg-white)', border: '1px solid #e0e0e0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                itemStyle={{ color: 'var(--text-main)' }}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>

                        {/* Resume Parser */}
                        <motion.div className="resume-upload-card glass-card mb-8" {...fadeIn} transition={{ delay: 0.25 }}>
                            <div className="section-header-premium">
                                <h2>⚡ Auto-Import from Resume</h2>
                                <p>Upload your CV and we'll instantly detect and add all your skills.</p>
                            </div>
                            <div style={{ marginTop: '16px' }}>
                                <ResumeParser onSkillsDetected={handleResumeSkills} />
                            </div>
                        </motion.div>

                        {/* Add Skills Section */}
                        <motion.div className="add-skills-card glass-card mb-12" {...fadeIn} transition={{ delay: 0.3 }}>
                            <div className="section-header-premium">
                                <h2>Enhance Your Portfolio</h2>
                                <p>Select a category and add relevant skills to improve your marketability.</p>
                            </div>

                            <div className="add-skills-controls mt-8">
                                <div className="category-selector-premium mb-6">
                                    {Object.entries(categoryConfig).map(([key, config]) => (
                                        <button
                                            key={key}
                                            className={`category-btn-premium ${selectedCategory === key ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory(key)}
                                        >
                                            <span className="category-icon">{config.icon}</span>
                                            <span>{config.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="skill-search-premium">
                                    <div className="search-input-wrapper">
                                        <span className="search-icon">🔍</span>
                                        <input
                                            type="text"
                                            placeholder={`Add ${categoryConfig[selectedCategory].label} skill...`}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                                        />
                                    </div>
                                    <button className="btn-add-premium" onClick={handleAddCustomSkill}>
                                        Quick Add
                                    </button>
                                </div>
                            </div>

                            <div className="suggested-skills-premium">
                                <h3 className="mb-4">Trending Suggestions</h3>
                                <div className="skills-list">
                                    <AnimatePresence>
                                        {suggestedSkills[selectedCategory]
                                            .filter(skill => !skills[selectedCategory].some(s => s.toLowerCase() === skill.toLowerCase()))
                                            .map((skill, idx) => (
                                                <motion.button
                                                    key={skill}
                                                    className="skill-suggestion-premium"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    onClick={() => handleAddSkill(selectedCategory, skill)}
                                                >
                                                    {skill} <span className="add-icon">+</span>
                                                </motion.button>
                                            ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>

                        {/* Current Skills Section */}
                        <div className="current-skills-section">
                            <motion.h2 className="mb-8 text-center" {...fadeIn}>Knowledge Assets</motion.h2>

                            <div className="grid-3">
                                {Object.entries(categoryConfig).map(([category, config], idx) => (
                                    <motion.div
                                        key={category}
                                        className="skill-category-card-premium glass-card"
                                        {...fadeIn}
                                        transition={{ delay: 0.4 + (idx * 0.1) }}
                                    >
                                        <div className="category-header-premium mb-6">
                                            <div className="category-title-premium">
                                                <div className="category-icon-wrapper">
                                                    <span className="category-icon-large">{config.icon}</span>
                                                </div>
                                                <div>
                                                    <h3>{config.label}</h3>
                                                    <div className="badge-count">{skills[category].length} Skills</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="skills-container-premium">
                                            <AnimatePresence>
                                                {skills[category].length > 0 ? (
                                                    skills[category].map(skill => (
                                                        <motion.div
                                                            key={skill}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 10 }}
                                                        >
                                                            <SkillTag
                                                                skill={skill}
                                                                category={config.color}
                                                                onRemove={() => handleRemoveSkill(category, skill)}
                                                            />
                                                        </motion.div>
                                                    ))
                                                ) : (
                                                    <p className="empty-state">Awaiting skill input...</p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                            className="skills-actions mt-12 text-center pt-8 border-t border-white/5"
                            {...fadeIn}
                            transition={{ delay: 0.8 }}
                        >
                            <Link to="/profile/skill-levels" className="btn-next-premium">
                                Set Mastery Levels
                                <span className="arrow-icon">→</span>
                            </Link>
                        </motion.div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default EditSkills;
