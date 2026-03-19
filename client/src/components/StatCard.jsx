import React from 'react';
import './StatCard.css';

const StatCard = ({ icon, title, value, subtitle, trend, color = 'primary' }) => {
    return (
        <div className={`stat-card ${color}`}>
            <div className="stat-icon-wrapper">
                <div className="stat-icon">{icon}</div>
            </div>
            <div className="stat-content">
                <h3 className="stat-title">{title}</h3>
                <div className="stat-value">{value}</div>
                {subtitle && <p className="stat-subtitle">{subtitle}</p>}
                {trend && (
                    <div className={`stat-trend ${trend.direction}`}>
                        <span className="trend-icon">{trend.direction === 'up' ? '↑' : '↓'}</span>
                        <span className="trend-value">{trend.value}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
