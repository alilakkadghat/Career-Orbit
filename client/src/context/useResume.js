/**
 * useResume — Central resume state manager
 * Stores resume text + metadata in localStorage keyed by user ID.
 * Any page can call this hook to get or save the resume — upload once, use everywhere.
 */

import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const STORAGE_KEY_PREFIX = 'careerOrbit_resume_';

export const useResume = () => {
    const { user } = useAuth();
    const storageKey = user?.id ? `${STORAGE_KEY_PREFIX}${user.id}` : STORAGE_KEY_PREFIX + 'guest';

    // Load saved resume from localStorage
    const loadSavedResume = useCallback(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    }, [storageKey]);

    const [resumeData, setResumeData] = useState(() => loadSavedResume());

    /**
     * Save resume data to localStorage + update state
     * @param {string} text - Extracted resume text
     * @param {string} fileName - Original file name
     * @param {string[]} skills - Detected skills array
     */
    const saveResume = useCallback((text, fileName, skills = []) => {
        const data = {
            text,
            fileName,
            skills,
            savedAt: new Date().toISOString(),
            userId: user?.id,
        };
        try {
            localStorage.setItem(storageKey, JSON.stringify(data));
            setResumeData(data);
        } catch (err) {
            console.error('Failed to save resume to localStorage:', err);
        }
        return data;
    }, [storageKey, user?.id]);

    /**
     * Clear saved resume
     */
    const clearResume = useCallback(() => {
        localStorage.removeItem(storageKey);
        setResumeData(null);
    }, [storageKey]);

    /**
     * Check if a resume is already saved
     */
    const hasResume = Boolean(resumeData?.text);

    return {
        resumeData,       // { text, fileName, skills, savedAt }
        hasResume,        // true if resume is saved
        saveResume,       // fn(text, fileName, skills)
        clearResume,      // fn()
        loadSavedResume,  // fn() → data
    };
};
