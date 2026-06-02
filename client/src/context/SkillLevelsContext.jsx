import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useSkills } from './SkillsContext';

const SkillLevelsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSkillLevels = () => useContext(SkillLevelsContext);

export const SkillLevelsProvider = ({ children }) => {
    const { user } = useAuth();
    const { allSkillsList } = useSkills();

    const storageKey = user
        ? `user_skill_levels_${user.id}`
        : 'guest_skill_levels';

    const [skillLevels, setSkillLevels] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : {};
    });

    // Load when user changes
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);

        if (saved) {
            setSkillLevels(JSON.parse(saved));
        } else {
            setSkillLevels({});
        }
    }, [storageKey]);

    // Keep skill levels synced with skills list
    useEffect(() => {
        setSkillLevels(prev => {
            const updated = { ...prev };

            // Add new skills automatically
            allSkillsList.forEach(skill => {
                if (updated[skill] === undefined) {
                    updated[skill] = 50;
                }
            });

            // Remove deleted skills automatically
            Object.keys(updated).forEach(skill => {
    const exists = allSkillsList.some(
        s => s.toLowerCase() === skill.toLowerCase()
    );

    if (!exists) {
        delete updated[skill];
    }
});

            return updated;
        });
    }, [allSkillsList]);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem(
            storageKey,
            JSON.stringify(skillLevels)
        );
    }, [skillLevels, storageKey]);

    const setSkillLevel = (skill, level) => {
        setSkillLevels(prev => ({
            ...prev,
            [skill]: Number(level)
        }));
    };

    return (
        <SkillLevelsContext.Provider
            value={{
                skillLevels,
                setSkillLevel
            }}
        >
            {children}
        </SkillLevelsContext.Provider>
    );
};

export default SkillLevelsContext;