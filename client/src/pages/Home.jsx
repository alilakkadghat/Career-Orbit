import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PlatformSteps from '../components/PlatformSteps';
import FeatureSection from '../components/FeatureSection';
import PlatformIntelligence from '../components/PlatformIntelligence';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

// New Models
import SkillOrbit from '../components/models/SkillOrbit';
import PredictiveModel from '../components/models/PredictiveModel';
import MarketInsights from '../components/models/MarketInsights';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <main>
                <Hero />

                <section className="orbit-section" style={{ padding: '8rem 0', background: '#000', marginBottom: '4rem' }}>
                    <div className="container">
                        <div className="section-header text-center mb-16">
                            <span className="badge-pill" style={{ background: 'rgba(255,110,20,0.1)', color: '#FF6E14', border: '1px solid rgba(255,110,20,0.2)' }}>Neural Visualization</span>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', marginTop: '1rem' }}>Your Skills in 3D Space</h2>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '1rem auto' }}>
                                Interact with our dynamic, AI-trained skill cluster model to visualize how your expertise connects to the global market.
                            </p>
                        </div>
                        <SkillOrbit />
                    </div>
                </section>

                <PlatformSteps />

                <div style={{ margin: '6rem 0' }}>
                    <FeatureSection />
                </div>

                <section className="predictive-section" style={{ padding: '10rem 0', background: 'radial-gradient(circle at top, #0a0a0a 0%, #000 100%)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="container">
                        <div className="section-header text-center mb-16">
                            <span className="badge-pill" style={{ background: 'rgba(0,86,210,0.1)', color: '#0056D2', border: '1px solid rgba(0,86,210,0.2)' }}>AI Engine</span>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', marginTop: '1rem' }}>Predictive Career Analytics</h2>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '750px', margin: '1rem auto' }}>
                                Advanced neural models simulating the market relevance of your expertise and predicting your next career pivot.
                            </p>
                        </div>
                        <PredictiveModel />
                    </div>
                </section>

                <div style={{ margin: '4rem 0' }}>
                    <PlatformIntelligence />
                </div>

                <div className="container" style={{ paddingBottom: '10rem' }}>
                    <MarketInsights />
                </div>

                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
