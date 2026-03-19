import React from 'react';
import './PageHeader.css';

const PageHeader = ({ title, subtitle, badge, gradient = 'black', style = {} }) => {
    return (
        <section className={`page-header section-padding text-center grad-${gradient}`} style={style}>
            <div className="container">
                <div className="header-content">
                    {badge && <span className="badge-pill">{badge}</span>}
                    <h1 className="section-title">{title}</h1>
                    {subtitle && <p className="section-subtitle">{subtitle}</p>}
                </div>
            </div>
            <div className="header-decoration"></div>
        </section>
    );
};

export default PageHeader;
