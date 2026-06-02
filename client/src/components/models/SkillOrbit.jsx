import React, { useEffect, useRef, useState } from 'react';
import './SkillOrbit.css';

const planetsData = [
    { id: 'python', name: 'Python', color1: '#3776AB', color2: '#1e3c5a', orbitWidth: 230, orbitHeight: 150, orbitTime: 10, info: 'Core language for AI/ML and Data Science' },
    { id: 'react', name: 'React', color1: '#61DAFB', color2: '#2d6a7a', orbitWidth: 290, orbitHeight: 210, orbitTime: 20, info: 'Modern frontend library for UI development' },
    { id: 'ai', name: 'AI Models', color1: '#FF6E14', color2: '#b34d0e', orbitWidth: 350, orbitHeight: 270, orbitTime: 30, info: 'Neural networks, LLMs, and predictive analytics' },
    { id: 'cloud', name: 'Cloud', color1: '#0056D2', color2: '#003a8c', orbitWidth: 410, orbitHeight: 330, orbitTime: 40, info: 'Scalable infrastructure on AWS, Azure, GCP' },
    { id: 'devops', name: 'DevOps', color1: '#2496ED', color2: '#114a75', orbitWidth: 470, orbitHeight: 390, orbitTime: 50, info: 'CI/CD pipelines, Docker, and Kubernetes' },
    { id: 'uiux', name: 'UI/UX', color1: '#F24E1E', color2: '#a13514', orbitWidth: 530, orbitHeight: 450, orbitTime: 60, info: 'User Experience and Interface Design' },
];

const SkillOrbit = () => {
    const [hoverInfo, setHoverInfo] = useState({ visible: false, x: 0, y: 0, name: '', details: '' });
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);
    const requestRef = useRef();
    const anglesRef = useRef(planetsData.map(() => 0));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const animate = () => {
        anglesRef.current = anglesRef.current.map((angle, i) => {
            const planet = planetsData[i];
            // Increase speed by an additional 25% (1.5 * 1.25 = 1.875 multiplier)
            const newAngle = angle + ((360 / planet.orbitTime / 60) * 1.875);
            
            const element = document.getElementById(`planet-${planet.id}`);
            const label = document.getElementById(`label-${planet.id}`);
            
            if (element && label) {
                const radians = newAngle * (Math.PI / 180);
                const x = (planet.orbitWidth / 2) * Math.cos(radians);
                const y = (planet.orbitHeight / 2) * Math.sin(radians);
                
                element.style.left = `calc(50% + ${x}px)`;
                element.style.top = `calc(50% + ${y}px)`;
                
                label.style.left = `calc(50% + ${x}px)`;
                label.style.top = `calc(50% + ${y + 20}px)`;
            }
            
            return newAngle;
        });
        
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isInView) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [animate, isInView]);

    const handleMouseOver = (e, planet) => {
        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.closest('.solar-system-container').getBoundingClientRect();
        
        setHoverInfo({
            visible: true,
            x: rect.left - parentRect.left + 20,
            y: rect.top - parentRect.top + 20,
            name: planet.name,
            details: planet.info,
            color: planet.color1
        });
    };

    const handleMouseOut = () => {
        setHoverInfo({ ...hoverInfo, visible: false });
    };

    return (
        <div ref={containerRef} className="solar-system-container">
            {isInView ? (
                <>
                    <div className="solar-system">
                        {/* Sun */}
                        <div className="sun">Core</div>

                        {/* Orbits & Planets */}
                        {planetsData.map((planet) => (
                            <div key={planet.id}>
                                <div 
                                    className="orbit" 
                                    style={{ width: `${planet.orbitWidth}px`, height: `${planet.orbitHeight}px` }} 
                                />
                                <div 
                                    id={`planet-${planet.id}`}
                                    className="planet"
                                    style={{ 
                                        background: `radial-gradient(circle at 30% 30%, ${planet.color1}, ${planet.color2})`,
                                        '--planet-color': planet.color1 
                                    }}
                                    onMouseOver={(e) => handleMouseOver(e, planet)}
                                    onMouseOut={handleMouseOut}
                                />
                                <div 
                                    id={`label-${planet.id}`}
                                    className="planet-name-label"
                                    style={{ transform: 'translate(-50%, -50%)', '--planet-color': planet.color1 }}
                                >
                                    {planet.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hover Info Card */}
                    {hoverInfo.visible && (
                        <div 
                            className="planet-info-card"
                            style={{ left: hoverInfo.x, top: hoverInfo.y }}
                        >
                            <h5 style={{ color: hoverInfo.color }}>{hoverInfo.name}</h5>
                            <p>{hoverInfo.details}</p>
                        </div>
                    )}

                    <div style={{
                        position: 'absolute',
                        top: '40px',
                        left: '40px',
                        pointerEvents: 'none',
                        fontFamily: 'monospace',
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: '11px',
                        letterSpacing: '3px',
                        textTransform: 'uppercase'
                    }}>
                        [ Skill System Integration : Active ]<br />
                        [ Neural Cluster : Synced ]<br />
                        [ Visualization : Enhanced ]
                    </div>
                </>
            ) : (
                <div style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    pointerEvents: 'none'
                }}>
                    [ Loading Skill Orbit Visualization... ]
                </div>
            )}
        </div>
    );
};

export default SkillOrbit;
