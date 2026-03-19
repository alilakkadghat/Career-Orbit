import React from 'react';

const AnimatedLogo = () => {
    return (
        <div className="orbit-logo-container" style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" style={{ stopColor: 'var(--primary-color, #ff6b00)', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: 'var(--primary-color, #ff6b00)', stopOpacity: 0 }} />
                    </radialGradient>
                </defs>

                {/* Central Core */}
                <circle cx="50" cy="50" r="12" fill="var(--primary-color, #ff6b00)" className="logo-core">
                    <animate attributeName="r" values="12;14;12" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite" />
                </circle>

                {/* Inner Ring */}
                <ellipse cx="50" cy="50" rx="25" ry="10" stroke="var(--secondary-color, #1a237e)" strokeWidth="3" fill="none" transform="rotate(45 50 50)" className="logo-orbit-1">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
                </ellipse>
                {/* Electron on Inner Ring - Animated using motion path concept manually simplified for React/SVG */}
                <circle r="4" fill="var(--secondary-color, #1a237e)">
                    <animateMotion dur="10s" repeatCount="indefinite">
                        <mpath href="#path1" />
                    </animateMotion>
                </circle>
                {/* Hidden path for electron 1 */}
                <path id="path1" d="M28.033 71.967 A 25 10 45 1 0 71.967 28.033 A 25 10 45 1 0 28.033 71.967" stroke="none" fill="none" opacity="0" />


                {/* Outer Ring */}
                <ellipse cx="50" cy="50" rx="35" ry="12" stroke="var(--primary-color, #ff6b00)" strokeWidth="2" strokeDasharray="5,5" fill="none" transform="rotate(-45 50 50)" className="logo-orbit-2">
                    <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="15s" repeatCount="indefinite" />
                </ellipse>
            </svg>
            <style>{`
        .logo-core { filter: drop-shadow(0 0 8px var(--primary-color, #ff6b00)); }
      `}</style>
        </div>
    );
};

export default AnimatedLogo;
