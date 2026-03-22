import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import './ProblemStatement.css';

// Import images
import img1 from '../assets/problem-1.png';
import img2 from '../assets/problem-2.png';
import img3 from '../assets/problem-3.png';

const ProblemStatement = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    const staggerContainer = {
        initial: { opacity: 0 },
        whileInView: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        },
        viewport: { once: true }
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="problem-page">
                <PageHeader
                    title="The Skill Crisis"
                    subtitle="Mapping the seismic shifts in the global labor market."
                    badge="Impact Thesis"
                    className="problem-header"
                />

                {/* 1. Core Problem: The Context */}
                <section className="core-problem section-padding">
                    <div className="container core-grid">
                        <motion.div
                            className="core-text"
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                        >
                            <motion.span className="badge-pill problem-badge" variants={fadeIn}>The Challenge</motion.span>
                            <motion.h2 variants={fadeIn}>A World in Continuous Flux</motion.h2>
                            <motion.p className="mb-10 text-lg" variants={fadeIn}>
                                We are witnessing the most rapid transformation of the professional landscape in human history.
                                The traditional models of steady career paths are collapsing under the weight of exponential technological growth.
                            </motion.p>

                            <div className="problem-blocks">
                                {[
                                    { icon: '⚡', title: 'Velocity of Change', desc: 'Technical skills now have a half-life of less than five years.' },
                                    { icon: '🤷‍♂️', title: 'The Ambiguity Gap', desc: 'Professionals lack the real-time data to navigate non-linear pivots.' },
                                    { icon: '🏛️', title: 'Systemic Lag', desc: 'Institutional strategies are reactive, leaving the workforce vulnerable.' }
                                ].map((item, idx) => (
                                    <motion.div key={idx} className="p-block" variants={fadeIn}>
                                        <div className="p-icon-wrapper">{item.icon}</div>
                                        <div>
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="core-visuals"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="visual-orbit">
                                <img src={img1} alt="Disruption Context 1" className="float-img img-1" />
                                <img src={img2} alt="Disruption Context 2" className="float-img img-2" />
                                <img src={img3} alt="Disruption Context 3" className="float-img img-3" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Impact Impact: High-Level Statistics (Alternative to Graphs) */}
                <section className="visual-impact section-padding bg-light">
                    <div className="container">
                        <motion.div className="text-center mb-16" {...fadeIn}>
                            <h2>Quantifying the Disruption</h2>
                            <p className="max-w-2xl mx-auto">Critical indicators of the widening chasm between heritage competence and future relevance.</p>
                        </motion.div>

                        <div className="impact-grid">
                            {[
                                { value: '85%', label: 'Job Transformation', desc: 'Of jobs that will exist in 2030 haven’t been invented yet.' },
                                { value: '2.5yr', label: 'Skill Half-life', desc: 'The average shelf-life of a technical skill in the AI era.' },
                                { value: '$8.5T', label: 'Global Revenue Gap', desc: 'Annual talent shortage impact predicted by 2030.' }
                            ].map((stat, idx) => (
                                <motion.div key={idx} className="impact-card glass-card" {...fadeIn} transition={{ delay: idx * 0.1 }}>
                                    <span className="impact-value">{stat.value}</span>
                                    <span className="impact-label">{stat.label}</span>
                                    <p>{stat.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Deep Dive: Key Challenges */}
                <section className="problem-breakdown section-padding">
                    <div className="container">
                        <motion.h2 className="text-center mb-16" {...fadeIn}>Core Structural Challenges</motion.h2>
                        <div className="breakdown-grid">
                            {[
                                { icon: '📉', title: 'Rapid Obsolescence', desc: 'Automation renders domain expertise obsolete at an exponential rate.' },
                                { icon: '🔀', title: 'Career Non-Linearity', desc: 'The career ladder is now a lattice requiring predictive navigation.' },
                                { icon: '🧩', title: 'Strategic Mismatch', desc: 'Market demand and individual capability are out of sync globally.' },
                                { icon: '⚖️', title: 'Equity Variance', desc: 'Disruption affects demographics unequally, widening the divide.' }
                            ].map((item, idx) => (
                                <motion.div key={idx} className="problem-card glass-card" {...fadeIn} transition={{ delay: idx * 0.1 }}>
                                    <span className="pc-icon">{item.icon}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Focus: Our Strategic Mandate */}
                <section className="focus-section section-padding">
                    <div className="container">
                        <motion.div className="focus-box" {...fadeIn}>
                            <h2>Our Strategic Focus</h2>
                            <p className="max-w-2xl mx-auto mb-12">CareerOrbit AI is engineered to tackle the most critical nodes of this talent crisis.</p>

                            <ul className="focus-list">
                                {[
                                    "Lifelong learning trajectory modeling",
                                    "Predictive non-linear pivot mapping",
                                    "Early-stage skill decay identification",
                                    "Algorithmic fairness & opportunity equity",
                                    "Long-term workforce architecture insights",
                                    "Dynamic skill acquisition tracking"
                                ].map((item, i) => (
                                    <motion.li key={i} variants={fadeIn}>
                                        <span className="check-icon">✓</span>
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* 5. Coda: Evolution */}
                <section className="solution-transition text-center">
                    <div className="container">
                        <motion.div
                            className="transition-content"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <p className="transition-text">
                                "The crisis is real, but the clarity is here. We map the future so you can own it."
                            </p>
                            <Link to="/solution" className="btn btn-primary btn-lg px-12 py-4">
                                Discover the Solution
                            </Link>
                        </motion.div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default ProblemStatement;
