import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SkillsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSkills = () => useContext(SkillsContext);

export const SkillsProvider = ({ children }) => {
    const { user } = useAuth();
    const storageKey = user ? `user_skills_${user.id}` : 'guest_skills';

    const [skills, setSkills] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : {
            technical: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
            soft: ['Communication', 'Leadership', 'Problem Solving'],
            tools: ['Git', 'Docker', 'VS Code'],
            languages: ['English', 'Spanish']
        };
    });

    // Sync from user object (database) or localStorage if storageKey/user changes
    useEffect(() => {
        if (user && user.skills && Array.isArray(user.skills)) {
            // Group the flat skills array from database
            const SKILL_KEYWORDS_TAXONOMY = {
                tools: [
                    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Docker', 'Kubernetes', 'Terraform',
                    'AWS', 'Azure', 'GCP', 'Heroku', 'Netlify', 'Vercel', 'Linux', 'CI/CD',
                    'Jenkins', 'GitHub Actions', 'CircleCI', 'Travis CI', 'Ansible', 'Puppet',
                    'Jira', 'Confluence', 'Figma', 'Sketch', 'Adobe XD', 'Postman', 'Swagger',
                    'VS Code', 'IntelliJ', 'Eclipse', 'Vim', 'Webpack', 'Vite', 'Babel',
                    'Elasticsearch', 'Kafka', 'RabbitMQ', 'Nginx', 'Apache', 'DevOps', 'MLOps'
                ],
                soft: [
                    'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Collaboration',
                    'Project Management', 'Time Management', 'Critical Thinking', 'Creativity',
                    'Adaptability', 'Mentoring', 'Public Speaking', 'Agile', 'Scrum', 'Kanban'
                ],
                languages: [
                    'English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Arabic',
                    'Japanese', 'Korean', 'Portuguese', 'Italian', 'Russian', 'Dutch'
                ]
            };

            const grouped = {
                technical: [],
                soft: [],
                tools: [],
                languages: []
            };

            user.skills.forEach(skill => {
                const lower = skill.toLowerCase().trim();
                if (SKILL_KEYWORDS_TAXONOMY.tools.some(s => s.toLowerCase() === lower)) {
                    grouped.tools.push(skill);
                } else if (SKILL_KEYWORDS_TAXONOMY.soft.some(s => s.toLowerCase() === lower)) {
                    grouped.soft.push(skill);
                } else if (SKILL_KEYWORDS_TAXONOMY.languages.some(s => s.toLowerCase() === lower)) {
                    grouped.languages.push(skill);
                } else {
                    grouped.technical.push(skill);
                }
            });

            setSkills(grouped);
        } else {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                setSkills(JSON.parse(saved));
            } else {
                setSkills({
                    technical: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
                    soft: ['Communication', 'Leadership', 'Problem Solving'],
                    tools: ['Git', 'Docker', 'VS Code'],
                    languages: ['English', 'Spanish']
                });
            }
        }
    }, [user, storageKey]);

    // Save to localStorage whenever skills change
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(skills));
    }, [skills, storageKey]);

    const handleAddSkill = (category, skill) => {
        const trimmed = skill.trim();
        if (!trimmed) return;

        setSkills(prev => {
            const current = prev[category] || [];
            if (!current.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
                return { ...prev, [category]: [...current, trimmed] };
            }
            return prev;
        });
    };

    const handleRemoveSkill = (category, skill) => {
        setSkills(prev => ({
            ...prev,
            [category]: (prev[category] || []).filter(s => s !== skill)
        }));
    };

    const handleBatchSkills = (groupedSkills) => {
        setSkills(prev => {
            const updated = { ...prev };
            Object.entries(groupedSkills).forEach(([category, newSkills]) => {
                if (updated[category]) {
                    const combined = [...updated[category], ...newSkills];
                    const unique = [];
                    const seen = new Set();
                    combined.forEach(s => {
                        const lower = s.toLowerCase().trim();
                        if (!seen.has(lower)) {
                            seen.add(lower);
                            unique.push(s);
                        }
                    });
                    updated[category] = unique;
                }
            });
            return updated;
        });
    };

    const setFlatSkills = (flatSkills) => {
        const SKILL_KEYWORDS_TAXONOMY = {
            tools: [
                'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Docker', 'Kubernetes', 'Terraform',
                'AWS', 'Azure', 'GCP', 'Heroku', 'Netlify', 'Vercel', 'Linux', 'CI/CD',
                'Jenkins', 'GitHub Actions', 'CircleCI', 'Travis CI', 'Ansible', 'Puppet',
                'Jira', 'Confluence', 'Figma', 'Sketch', 'Adobe XD', 'Postman', 'Swagger',
                'VS Code', 'IntelliJ', 'Eclipse', 'Vim', 'Webpack', 'Vite', 'Babel',
                'Elasticsearch', 'Kafka', 'RabbitMQ', 'Nginx', 'Apache', 'DevOps', 'MLOps'
            ],
            soft: [
                'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Collaboration',
                'Project Management', 'Time Management', 'Critical Thinking', 'Creativity',
                'Adaptability', 'Mentoring', 'Public Speaking', 'Agile', 'Scrum', 'Kanban'
            ],
            languages: [
                'English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Arabic',
                'Japanese', 'Korean', 'Portuguese', 'Italian', 'Russian', 'Dutch'
            ]
        };

        const grouped = {
            technical: [],
            soft: [],
            tools: [],
            languages: []
        };

        flatSkills.forEach(skill => {
            const lower = skill.toLowerCase().trim();
            if (SKILL_KEYWORDS_TAXONOMY.tools.some(s => s.toLowerCase() === lower)) {
                grouped.tools.push(skill);
            } else if (SKILL_KEYWORDS_TAXONOMY.soft.some(s => s.toLowerCase() === lower)) {
                grouped.soft.push(skill);
            } else if (SKILL_KEYWORDS_TAXONOMY.languages.some(s => s.toLowerCase() === lower)) {
                grouped.languages.push(skill);
            } else {
                grouped.technical.push(skill);
            }
        });

        setSkills(grouped);
    };

    // Flatten all skills for pages that just need a list
    const allSkillsList = Object.values(skills).flat();

    return (
        <SkillsContext.Provider value={{ 
            skills, 
            setSkills, 
            allSkillsList, 
            handleAddSkill, 
            handleRemoveSkill,
            handleBatchSkills,
            setFlatSkills
        }}>
            {children}
        </SkillsContext.Provider>
    );
};
