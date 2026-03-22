import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: '2020', ai: 400, cloud: 240, salary: 110 },
    { name: '2021', ai: 600, cloud: 300, salary: 115 },
    { name: '2022', ai: 850, cloud: 450, salary: 130 },
    { name: '2023', ai: 1800, cloud: 600, salary: 155 },
    { name: '2024', ai: 2900, cloud: 850, salary: 185 },
    { name: '2025', ai: 4200, cloud: 1200, salary: 220 },
];

const MarketInsights = () => {
    return (
        <motion.div
            className="market-insights-model"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                background: 'linear-gradient(145deg, #050505 0%, #0c0c0c 100%)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                borderRadius: '48px',
                padding: '4rem',
                marginTop: '6rem',
                boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Grid Accent */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 1 }}>
                <div className="section-header" style={{ marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                        <span style={{ width: '40px', height: '1px', background: '#FF6E14' }}></span>
                        <span style={{ color: '#FF6E14', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>Live Intelligence</span>
                    </div>
                    <h2 style={{ color: '#fff', fontSize: '3.5rem', marginTop: '0.5rem', fontWeight: '900', letterSpacing: '-1px' }}>Global AI Momentum</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px', fontSize: '1.1rem', lineHeight: '1.7' }}>
                        Synthesizing millions of job data points to predict the next wave of industry transformation.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '3rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Avg. AI Salary Growth</div>
                        <div style={{ color: '#0056D2', fontSize: '2.5rem', fontWeight: 'bold' }}>+42%</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Demand Surge</div>
                        <div style={{ color: '#FF6E14', fontSize: '2.5rem', fontWeight: 'bold' }}>8.4x</div>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', height: '450px', position: 'relative', zIndex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF6E14" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#FF6E14" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCloud" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0056D2" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#0056D2" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.03)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(20,20,20,0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                backdropFilter: 'blur(10px)',
                                color: '#fff'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="ai"
                            stroke="#FF6E14"
                            fillOpacity={1}
                            fill="url(#colorAi)"
                            strokeWidth={4}
                            animationDuration={2000}
                        />
                        <Area
                            type="monotone"
                            dataKey="cloud"
                            stroke="#0056D2"
                            fillOpacity={1}
                            fill="url(#colorCloud)"
                            strokeWidth={3}
                            animationDuration={2500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#FF6E14', borderRadius: '50%', boxShadow: '0 0 10px #FF6E14' }}></div>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>Generative AI Specialization</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#0056D2', borderRadius: '50%', boxShadow: '0 0 10px #0056D2' }}></div>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>Cloud Architecture Flow</span>
                </div>
            </div>
        </motion.div>
    );
};

export default MarketInsights;
