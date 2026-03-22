import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SkillsContext = createContext();

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

    // Sync from localStorage if storageKey changes (e.g. on login/logout)
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setSkills(JSON.parse(saved));
        } else {
            // Default skills for new user or guest
            setSkills({
                technical: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
                soft: ['Communication', 'Leadership', 'Problem Solving'],
                tools: ['Git', 'Docker', 'VS Code'],
                languages: ['English', 'Spanish']
            });
        }
    }, [storageKey]);

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

    // Flatten all skills for pages that just need a list
    const allSkillsList = Object.values(skills).flat();

    return (
        <SkillsContext.Provider value={{ 
            skills, 
            setSkills, 
            allSkillsList, 
            handleAddSkill, 
            handleRemoveSkill,
            handleBatchSkills
        }}>
            {children}
        </SkillsContext.Provider>
    );
};
