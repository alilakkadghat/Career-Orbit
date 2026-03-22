import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import './HowItWorks.css';

// Import images
import imgApp from '../assets/solution-app.png';
import imgConfidence from '../assets/solution-confidence.png';
import imgSuccess from '../assets/solution-success.png';

const HowItWorks = () => {

    // Simple scroll reveal effect
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        const hiddenElements = document.querySelectorAll('.scroll-reveal');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="how-it-works-page">
                <PageHeader
                    title="Your Orbit to Success"
                    subtitle="How we turn career ambiguity into a calculated growth path with AI precision."
                    badge="The Process"
                />

                {/* SECTION 2: The Journey */}
                <section className="journey-section">
                    <div className="journey-line"></div> {/* Vertical connecting line */}

                    <div className="container">

                        {/* Step 1 */}
                        <div className="journey-step scroll-reveal">
                            <div className="step-content">
                                <span className="step-number">01</span>
                                <h2>The Assessment</h2>
                                <h3>AI-Powered Diagnostics</h3>
                                <p>Upload your profile and get an instant breakdown of where you stand. We analyze your current skills against millions of data points to find your baseline.</p>
                            </div>
                            <div className="step-visual">
                                <div className="img-wrapper">
                                    <img src={imgApp} alt="AI Assessment" />
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="journey-step reverse scroll-reveal">
                            <div className="step-visual">
                                <div className="img-wrapper">
                                    <img src={imgConfidence} alt="Strategic Planning" />
                                </div>
                            </div>
                            <div className="step-content">
                                <span className="step-number">02</span>
                                <h2>The Roadmap</h2>
                                <h3>Gap Analysis & Planning</h3>
                                <p>We identify the exact skills you need for your target role. No more guessing—get a tailored curriculum to bridge the gap efficiently.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="journey-step scroll-reveal">
                            <div className="step-content">
                                <span className="step-number">03</span>
                                <h2>The Reward</h2>
                                <h3>Tangible Career Growth</h3>
                                <p>Execute the plan, bridge the gap, and unlock higher earning potential. Track your progress in real-time as you close in on your goals.</p>
                            </div>
                            <div className="step-visual">
                                <div className="img-wrapper">
                                    <img src={imgSuccess} alt="Career Success" />
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* SECTION 3: CTA */}
                <section className="works-cta section-padding text-center">
                    <div className="container">
                        <h2>Ready to launch your career?</h2>
                        <Link to="/profile/create" className="btn btn-primary btn-lg mt-4">
                            Create App Profile
                        </Link>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default HowItWorks;
