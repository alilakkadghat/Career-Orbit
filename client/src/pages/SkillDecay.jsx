import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import './SkillDecay.css';

const SkillDecay = () => {
    const [context, setContext] = useState('modern-analytics');

    // Base skill data with context-specific modifiers
    const skillsData = [
        {
            skill: 'SQL',
            lastUsed: '1 week ago',
            baseDecay: 15,
            contexts: {
                'legacy-systems': { rate: 5, halfLife: '10 years', desc: 'Used in stable, long-term infrastructure maintenance.' },
                'modern-analytics': { rate: 45, halfLife: '2 years', desc: 'Rapidly evolving syntax (DuckDB, dbt, Streaming SQL).' },
                'fintech-core': { rate: 10, halfLife: '7 years', desc: 'Critical for ACID compliance on established ledgers.' }
            },
            trendBase: [
                { day: 'Day 0', value: 100 },
                { day: 'Day 30', value: 95 },
                { day: 'Day 60', value: 85 },
                { day: 'Day 90', value: 75 }
            ]
        },
        {
            skill: 'JavaScript',
            lastUsed: '1 week ago',
            baseDecay: 5,
            contexts: {
                'legacy-systems': { rate: 2, halfLife: '15 years', desc: 'ES5/jQuery systems have extremely high stability.' },
                'modern-analytics': { rate: 25, halfLife: '4 years', desc: 'Constantly shifting build tools and framework patterns.' },
                'fintech-core': { rate: 15, halfLife: '6 years', desc: 'Heavy emphasis on security-hardened patterns.' }
            },
            trendBase: [
                { day: 'Day 0', value: 100 },
                { day: 'Day 30', value: 98 },
                { day: 'Day 60', value: 95 },
                { day: 'Day 90', value: 92 }
            ]
        },
        {
            skill: 'React',
            lastUsed: '2 days ago',
            baseDecay: 3,
            contexts: {
                'legacy-systems': { rate: 1, halfLife: '12 years', desc: 'Class-based components still power massive enterprise apps.' },
                'modern-analytics': { rate: 35, halfLife: '3 years', desc: 'Server Components and Next.js evolution cycle is aggressive.' },
                'fintech-core': { rate: 20, halfLife: '5 years', desc: 'Focus on stable state management for transaction UI.' }
            },
            trendBase: [
                { day: 'Day 0', value: 100 },
                { day: 'Day 30', value: 99 },
                { day: 'Day 60', value: 97 },
                { day: 'Day 90', value: 96 }
            ]
        }
    ];

    const proficiencyTrendData = [
        { month: 'Jul', score: 92 },
        { month: 'Aug', score: 88 },
        { month: 'Sep', score: 90 },
        { month: 'Oct', score: 82 },
        { month: 'Nov', score: 78 },
        { month: 'Dec', score: 75 },
    ];

    const getStatus = (rate) => {
        if (rate <= 10) return 'healthy';
        if (rate <= 25) return 'warning';
        if (rate <= 40) return 'at-risk';
        return 'critical';
    };

    const getStatusColor = (status) => {
        if (status === 'healthy') return '#10b981';
        if (status === 'warning') return '#f59e0b';
        if (status === 'at-risk') return '#3b82f6';
        return '#ef4444';
    };

    const getProgressBarColor = (status) => {
        if (status === 'healthy') return 'success';
        if (status === 'warning') return 'warning';
        if (status === 'at-risk') return 'blue';
        return 'danger';
    };

    // Process skills based on selected context
    const skills = skillsData.map(item => {
        const contextData = item.contexts[context];
        const status = getStatus(contextData.rate);

        // Generate trend line based on context rate
        const trend = item.trendBase.map((t, i) => ({
            ...t,
            value: Math.max(0, 100 - (contextData.rate * (i * 0.3)))
        }));

        return {
            skill: item.skill,
            lastUsed: item.lastUsed,
            decayRate: contextData.rate,
            halfLife: contextData.halfLife,
            description: contextData.desc,
            status,
            trend
        };
    });

    const radarData = useMemo(() => {
        return skills.map(s => ({
            subject: s.skill,
            A: Math.round(s.trend[s.trend.length - 1].value),
            fullMark: 100,
        }));
    }, [skills]);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="decay-page">
                <PageHeader
                    title="Contextual Skill Half-Life"
                    subtitle="Visualize how your technical expertise decays differently across specific industries and roles."
                    badge="Market Intelligence"
                    gradient="dark"
                />

                <section className="decay-content section-padding">
                    <div className="container">

                        {/* Analytics Section */}
                        <div className="analytics-dashboard grid-2 mb-12">
                            <motion.div className="chart-card-premium glass-card" {...fadeIn}>
                                <div className="chart-header">
                                    <h3>Aggregate Proficiency Trend</h3>
                                    <p>Your overall knowledge retention over the last 6 months</p>
                                </div>
                                <div className="chart-container-ui" style={{ height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={proficiencyTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                                            <XAxis dataKey="month" stroke="#4F4F4F" axisLine={false} tickLine={false} dy={10} />
                                            <YAxis hide domain={[0, 100]} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'var(--bg-white)', border: '1px solid #e0e0e0', borderRadius: '12px' }}
                                                itemStyle={{ color: '#FF6E14' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="score"
                                                stroke="#FF6E14"
                                                strokeWidth={4}
                                                dot={{ fill: '#FF6E14', r: 6, strokeWidth: 2, stroke: '#fff' }}
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            <motion.div className="chart-card-premium glass-card" {...fadeIn} transition={{ delay: 0.2 }}>
                                <div className="chart-header">
                                    <h3>Knowledge Integrity Matrix</h3>
                                    <p>Relative health across your core competencies (Current Context)</p>
                                </div>
                                <div className="chart-container-ui" style={{ height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                            <PolarGrid stroke="#e0e0e0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4F4F4F', fontSize: 12, fontWeight: 600 }} />
                                            <Radar
                                                name="Integrity"
                                                dataKey="A"
                                                stroke="#FF6E14"
                                                fill="#FF6E14"
                                                fillOpacity={0.4}
                                            />
                                             <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'var(--bg-white)',
                                                    border: '1px solid var(--border-color)',
                                                    borderRadius: '12px',
                                                    color: 'var(--text-main)'
                                                }}
                                                itemStyle={{ color: 'var(--text-main)' }}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>

                        <div className="decay-insight-card p-8 mb-8 glass-card animate-in">
                            <h2 className="mb-4">Why Half-Life Matters</h2>
                            <p className="mb-6 text-secondary">
                                Skill decay is not global — it’s <strong>contextual</strong>. A skill may be alive in one sector but obsolete in another.
                                SQL for legacy systems has a slow decay, while SQL for modern high-speed analytics erodes rapidly as new standards emerge.
                                Use the selector below to calibrate your specific operational environment.
                            </p>

                            <div className="context-selector-box pt-6 border-top">
                                <h4 className="mb-3">Select Your Environment</h4>
                                <div className="context-chips">
                                    {['modern-analytics', 'legacy-systems', 'fintech-core'].map(c => (
                                        <button
                                            key={c}
                                            className={`context-chip ${context === c ? 'active' : ''}`}
                                            onClick={() => setContext(c)}
                                        >
                                            {c === 'modern-analytics' && '🚀 Modern Analytics'}
                                            {c === 'legacy-systems' && '🏛️ Legacy Infrastructure'}
                                            {c === 'fintech-core' && '🏦 FinTech Core'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="skills-decay-grid">
                            {skills.map((item, index) => (
                                <motion.div
                                    key={item.skill}
                                    className={`decay-card-ui glass-card p-6 animate-in`}
                                    {...fadeIn}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="dc-header">
                                        <div>
                                            <h3>{item.skill}</h3>
                                            <div className={`status-pill ${item.status}`}>
                                                {item.status === 'healthy' && 'Stable Proficiency'}
                                                {item.status === 'warning' && 'Erosion Detected'}
                                                {item.status === 'at-risk' && 'High Decay Risk'}
                                                {item.status === 'critical' && 'Rapid Obsolescence'}
                                            </div>
                                        </div>
                                        <div className="dc-icon">📉</div>
                                    </div>

                                    <div className="dc-context-explanation mt-4 mb-4 small opacity-80">
                                        <p>{item.description}</p>
                                    </div>

                                    <div className="dc-metrics">
                                        <div className="dc-metric">
                                            <span>Contextual Rate</span>
                                            <strong>{item.decayRate}% / Qtr</strong>
                                        </div>
                                        <div className="dc-metric">
                                            <span>Est. Half-Life</span>
                                            <strong>{item.halfLife}</strong>
                                        </div>
                                    </div>

                                    <div className="chart-container" style={{ height: '150px', marginBottom: '20px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={item.trend}>
                                                <defs>
                                                    <linearGradient id={`color-${item.skill}-${context}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor={getStatusColor(item.status)} stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor={getStatusColor(item.status)} stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Area
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke={getStatusColor(item.status)}
                                                    fillOpacity={1}
                                                    fill={`url(#color-${item.skill}-${context})`}
                                                    strokeWidth={3}
                                                    isAnimationActive={true}
                                                />
                                                <XAxis dataKey="day" hide />
                                                <YAxis hide domain={[0, 100]} />
                                                 <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'var(--bg-white)',
                                                        borderRadius: '12px',
                                                        border: '1px solid var(--border-color)',
                                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                                        color: 'var(--text-main)'
                                                    }}
                                                    itemStyle={{ color: 'var(--text-main)' }}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="dc-meter mb-6">
                                        <div className="meter-info mb-2">
                                            <span>Context Integrity</span>
                                            <strong>{Math.round(item.trend[3].value)}%</strong>
                                        </div>
                                        <ProgressBar
                                            percentage={item.trend[3].value}
                                            color={getProgressBarColor(item.status)}
                                            showLabel={false}
                                            height="medium"
                                        />
                                    </div>

                                    <Link
                                        to="/learning/courses"
                                        className={`btn full-width ${item.status === 'healthy' ? 'btn-outline' : 'btn-primary'}`}
                                    >
                                        {item.status === 'healthy' ? 'Shield Skill' : 'Emergency Refresh'}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div className="maintenance-section text-center mt-10 p-12 glass-card" {...fadeIn}>
                            <h2 className="mb-4">Maintain Peak Proficiency</h2>
                            <p className="mb-6 opacity-80">
                                Contextual modeling reveals that your skills may be at higher risk than standard benchmarks suggest.
                                Activate our predictive maintenance engine to stay ahead of market shifts.
                            </p>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => alert("Contextual Maintenance Mode activated! We'll monitor sector-specific shifts.")}
                            >
                                Activate Contextual Guard →
                            </button>
                        </motion.div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SkillDecay;
