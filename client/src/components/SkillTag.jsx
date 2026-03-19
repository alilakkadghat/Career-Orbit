import React from 'react';
import './SkillTag.css';

const SkillTag = ({ skill, onRemove, category = 'default', size = 'medium' }) => {
    return (
        <div className={`skill-tag ${category} ${size}`}>
            <span className="skill-name">{skill}</span>
            {onRemove && (
                <button
                    className="skill-remove"
                    onClick={() => onRemove(skill)}
                    aria-label={`Remove ${skill}`}
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default SkillTag;
