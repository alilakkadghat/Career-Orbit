import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ percentage, label, color = 'primary', showLabel = true, height = 'medium' }) => {
    return (
        <div className="progress-bar-container">
            {showLabel && label && (
                <div className="progress-label">
                    <span>{label}</span>
                    <span className="progress-percentage">{percentage}%</span>
                </div>
            )}
            <div className={`progress-track ${height}`}>
                <div
                    className={`progress-fill ${color}`}
                    style={{ width: `${percentage}%` }}
                >
                    <div className="progress-shimmer"></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
