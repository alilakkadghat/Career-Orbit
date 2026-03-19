import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PredictiveModel = () => {
    const [decay, setDecay] = useState(100);
    const [match, setMatch] = useState(45);
    const [scanPos, setScanPos] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDecay(prev => (prev > 20 ? prev - 0.5 : 100));
            setMatch(prev => (prev < 95 ? prev + 0.5 : 45));
            setScanPos(prev => (prev > 100 ? 0 : prev + 2));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '32px',
        padding: '2.5rem',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        transition: 'transform 0.3s ease'
    };

    const glowStyle = {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,110,20,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
    };

    const scanLineStyle = {
        position: 'absolute',
        top: `${scanPos}%`,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #FF6E14, transparent)',
        boxShadow: '0 0 15px #FF6E14',
        opacity: 0.3,
        pointerEvents: 'none'
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            padding: '2rem 1rem',
            marginTop: '2rem'
        }}>
            <motion.div
                className="model-card"
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,110,20,0.4)' }}
                style={cardStyle}
            >
                <div style={glowStyle} />
                <div style={scanLineStyle} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem', fontWeight: '800' }}>Skill Decay</h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: '4px 0 0 0' }}>Neural Market Forecasting</p>
                    </div>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,110,20,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6E14', fontSize: '1.2rem' }}>
                        📉
                    </div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'flex-end' }}>
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>GenAI Relevance</span>
                        <span style={{ color: '#FF6E14', fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.round(decay)}%</span>
                    </div>
                    <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', padding: '2px' }}>
                        <motion.div
                            animate={{ width: `${decay}%` }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #FF6E14, #FFB084)', borderRadius: '4px', boxShadow: '0 0 10px rgba(255,110,20,0.5)' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px' }}>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Market Value</div>
                        <div style={{ fontSize: '1.1rem', color: '#fff', marginTop: '4px' }}>$140k/yr</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px' }}>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Risk Level</div>
                        <div style={{ fontSize: '1.1rem', color: '#FF4136', marginTop: '4px' }}>HIGH</div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="model-card"
                whileHover={{ scale: 1.02, borderColor: 'rgba(0,86,210,0.4)' }}
                style={{ ...cardStyle, borderColor: 'rgba(0,86,210,0.2)' }}
            >
                <div style={{ ...glowStyle, background: 'radial-gradient(circle, rgba(0,86,210,0.05) 0%, transparent 70%)' }} />
                <div style={{ ...scanLineStyle, background: 'linear-gradient(90deg, transparent, #0056D2, transparent)', boxShadow: '0 0 15px #0056D2' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem', fontWeight: '800' }}>Role Match</h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: '4px 0 0 0' }}>AI Alignment Engine</p>
                    </div>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(0,86,210,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0056D2', fontSize: '1.2rem' }}>
                        🎯
                    </div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'flex-end' }}>
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>Solutions Architect</span>
                        <span style={{ color: '#0056D2', fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.round(match)}%</span>
                    </div>
                    <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', padding: '2px' }}>
                        <motion.div
                            animate={{ width: `${match}%` }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #0056D2, #5C9FFF)', borderRadius: '4px', boxShadow: '0 0 10px rgba(0,86,210,0.5)' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['PyTorch', 'System Design', 'LLM Ops'].map((skill, i) => (
                        <span key={i} style={{
                            padding: '6px 14px',
                            borderRadius: '20px',
                            background: 'rgba(0,86,210,0.1)',
                            color: '#5C9FFF',
                            fontSize: '0.8rem',
                            border: '1px solid rgba(0,86,210,0.2)'
                        }}>
                            + {skill}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default PredictiveModel;
