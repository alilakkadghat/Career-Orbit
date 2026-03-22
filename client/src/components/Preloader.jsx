import React from 'react';
import './Preloader.css';

const Preloader = () => {
    return (
        <div className="preloader-container">
            <div className="preloader-content">
                <div className="orbit-spinner">
                    <div className="orbit orbit-1"></div>
                    <div className="orbit orbit-2"></div>
                    <div className="center-dot"></div>
                </div>
                <h2 className="loading-text">CareerOrbit AI</h2>
            </div>
        </div>
    );
};

export default Preloader;
