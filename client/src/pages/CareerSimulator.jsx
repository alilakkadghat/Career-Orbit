import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, RadialBarChart, RadialBar, Legend
} from 'recharts';
import './CareerSimulator.css';


const CareerSimulator = () => {
    const [investment, setInvestment] = useState(20); // Hours/week
    const [path, setPath] = useState('tech-lead');
    const [timeHorizon, setTimeHorizon] = useState(5); // Years

    // Mock Data Generators based on state
    const generateOutcomeData = () => {
        const baseGrowth = path === 'tech-lead' ? 1.15 : 1.25; // Manager grows faster initially
        const outcomes = [];
        let currentSalary = 120000;
        let simulatorSalary = 120000;

        for (let year = 1; year <= timeHorizon; year++) {
            currentSalary *= 1.05; // Standard 5% raise
            // Simulation: More investment = higher growth
            simulatorSalary *= (baseGrowth + (investment * 0.002));

            outcomes.push({
                year: `Year ${year}`,
                standard: Math.round(currentSalary),
                simulated: Math.round(simulatorSalary)
            });
        }
        return outcomes;
    };

    const automationRiskData = [
        { name: 'Routine Coding', val: 65, fill: '#ff4d4f' },
        { name: 'System Design', val: 25, fill: '#ffec3d' },
        { name: 'Strategic Planning', val: 10, fill: '#52c41a' },
        { name: 'Team Leadership', val: 5, fill: '#52c41a' }
    ];

    const outcomeData = generateOutcomeData();

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="simulator-page">
                <PageHeader
                    title="Career Simulation & Forecasting"
                    subtitle="Run 'What-If' scenarios to predict the impact of skill acquisition and AI displacement."
                    badge="AI Powered"
                />

                <section className="section-padding">
                    <div className="container">
                        <div className="simulator-grid">

                            {/* Controls Panel */}
                            <div className="sim-controls glass-card animate-in">
                                <h3 className="sim-title">Simulation Parameters</h3>

                                <div className="control-group">
                                    <label>Target Path</label>
                                    <div className="path-toggle">
                                        <button
                                            className={`toggle-btn ${path === 'tech-lead' ? 'active' : ''}`}
                                            onClick={() => setPath('tech-lead')}
                                        >
                                            Technical Lead
                                        </button>
                                        <button
                                            className={`toggle-btn ${path === 'manager' ? 'active' : ''}`}
                                            onClick={() => setPath('manager')}
                                        >
                                            Engineering Manager
                                        </button>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label>Learning Investment (Hrs/Week): <span className="highlight-val">{investment}h</span></label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="40"
                                        value={investment}
                                        onChange={(e) => setInvestment(Number(e.target.value))}
                                        className="slider input-range"
                                    />
                                </div>

                                <div className="control-group">
                                    <label>Time Horizon: <span className="highlight-val">{timeHorizon} Years</span></label>
                                    <select
                                        value={timeHorizon}
                                        onChange={(e) => setTimeHorizon(Number(e.target.value))}
                                        className="select-input"
                                    >
                                        <option value="3">3 Years</option>
                                        <option value="5">5 Years</option>
                                        <option value="10">10 Years</option>
                                    </select>
                                </div>

                                <div className="impact-summary">
                                    <h4>Projected Impact</h4>
                                    <div className="impact-item positive">
                                        <span>Salary Upside</span>
                                        <strong>+{Math.round((investment * 1.5))}%</strong>
                                    </div>
                                    <div className="impact-item negative">
                                        <span>Burnout Risk</span>
                                        <strong>{investment > 25 ? 'High' : 'Low'}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Main Visualization */}
                            <div className="sim-visuals">

                                {/* Outcome Chart */}
                                <div className="visual-card glass-card animate-in delay-100">
                                    <div className="card-header">
                                        <h3>Financial & Stability Trajectory</h3>
                                        <span className="badge">Outcome Forecast</span>
                                    </div>
                                    <div style={{ height: 300, width: '100%' }}>
                                        <ResponsiveContainer>
                                            <AreaChart data={outcomeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#ff6b00" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="year" stroke="#888" />
                                                <YAxis stroke="#888" tickFormatter={(val) => `$${val / 1000}k`} />
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'var(--bg-white)',
                                                        borderColor: 'var(--border-color)',
                                                        borderRadius: '8px',
                                                        color: 'var(--text-main)'
                                                    }}
                                                    itemStyle={{ color: 'var(--text-main)' }}
                                                    formatter={(val) => `$${val.toLocaleString()}`}
                                                />
                                                <Area type="monotone" dataKey="simulated" stroke="#ff6b00" fillOpacity={1} fill="url(#colorSim)" name="Optimized Path" />
                                                <Area type="monotone" dataKey="standard" stroke="#ccc" fill="transparent" strokeDasharray="5 5" name="Standard Path" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Automation Risk & Volatility Grid */}
                                <div className="risk-grid">
                                    <div className="risk-card glass-card animate-in delay-200">
                                        <h3>AI Displacement Risk</h3>
                                        <div style={{ height: 200 }}>
                                            <ResponsiveContainer>
                                                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={automationRiskData}>
                                                    <RadialBar
                                                        minAngle={15}
                                                        background
                                                        clockWise
                                                        dataKey="val"
                                                    />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: 'var(--bg-white)',
                                                            borderColor: 'var(--border-color)',
                                                            borderRadius: '8px',
                                                            color: 'var(--text-main)'
                                                        }}
                                                        itemStyle={{ color: 'var(--text-main)' }}
                                                    />
                                                </RadialBarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="risk-legend">
                                            {automationRiskData.map((d, i) => (
                                                <div key={i} className="legend-item">
                                                    <span className="dot" style={{ background: d.fill }}></span>
                                                    <span>{d.name}: {d.val}% Risk</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="volatility-card glass-card animate-in delay-300">
                                        <h3>Career Volatility Score</h3>
                                        <div className="score-display">
                                            <div className="score-circle">
                                                <span className="score-val">{path === 'tech-lead' ? 'Low' : 'Med'}</span>
                                            </div>
                                            <p className="score-desc">
                                                {path === 'tech-lead'
                                                    ? 'Technical depth provides strong immunity against market shifts.'
                                                    : 'Management roles are stable but higher competition during downturns.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CareerSimulator;
