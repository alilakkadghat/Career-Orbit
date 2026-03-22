import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { useResume } from '../context/useResume';
import { extractFileText } from '../utils/pdfParser';
import './ResumeRoast.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';



const ROLES = [
    'Software Engineering internship',
    'Data Science internship',
    'Product Management internship',
    'UI/UX Design internship',
    'Full Stack Development internship',
    'Machine Learning internship',
    'DevOps internship',
    'Marketing internship',
    'Business Analyst internship',
];

const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

const ResumeRoast = () => {
    const { resumeData, hasResume, saveResume, clearResume } = useResume();
    const [status, setStatus] = useState('idle');
    const [targetRole, setTargetRole] = useState('Software Engineering internship');
    const [roast, setRoast] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef(null);



    const sendForRoast = async (resumeText, role) => {
        setStatus('analyzing');
        try {
            const res = await axios.post(`${API_BASE}/api/resume/parse`, {
                resumeText,
                targetRole: role,
            });
            const roastText = res.data?.roast || res.data?.data?.roast;
            if (roastText) {
                setRoast(roastText);
                setStatus('done');
            } else {
                setErrorMsg('Could not get AI analysis. Try again.');
                setStatus('error');
            }
        } catch (err) {
            console.error('Roast error:', err);
            setErrorMsg('Server error. Make sure the backend is running.');
            setStatus('error');
        }
    };

    // Use saved resume to get a new roast
    const roastSavedResume = () => {
        if (resumeData?.text) {
            sendForRoast(resumeData.text, targetRole);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setRoast('');
        setErrorMsg('');
        setStatus('extracting');

        let resumeText = '';
        try {
            resumeText = await extractFileText(file);

            if (!resumeText || resumeText.trim().length < 50) {
                setErrorMsg('Resume text is too short. Please upload a proper resume file.');
                setStatus('error');
                return;
            }

            // Save to localStorage via hook
            saveResume(resumeText, file.name, []);

        } catch (err) {
            setErrorMsg('Failed to read file. Please try again.');
            setStatus('error');
            return;
        }

        e.target.value = '';
        await sendForRoast(resumeText, targetRole);
    };

    const handleReset = () => {
        setStatus('idle');
        setRoast('');
        setErrorMsg('');
    };

    const parseRoast = (text) => {
        const sections = { strengths: '', weaknesses: '', quickFixes: '', raw: text };
        const strengthsMatch = text.match(/STRENGTHS[:\s]*([\s\S]*?)(?=WEAKNESSES|QUICK FIXES|$)/i);
        const weaknessesMatch = text.match(/WEAKNESSES[:\s]*([\s\S]*?)(?=QUICK FIXES|STRENGTHS|$)/i);
        const quickFixesMatch = text.match(/QUICK FIXES[:\s]*([\s\S]*?)(?=STRENGTHS|WEAKNESSES|$)/i);
        if (strengthsMatch) sections.strengths = strengthsMatch[1].trim();
        if (weaknessesMatch) sections.weaknesses = weaknessesMatch[1].trim();
        if (quickFixesMatch) sections.quickFixes = quickFixesMatch[1].trim();
        return sections;
    };

    const sections = roast ? parseRoast(roast) : null;

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="roast-page">
                <PageHeader
                    title="Resume Roast 🔥"
                    subtitle="Upload your resume and get brutally honest AI feedback for campus placements — powered by Gemini."
                    badge="AI Career Tool"
                    gradient="dark"
                />

                <section className="roast-content section-padding">
                    <div className="container">
                        <div className="roast-layout">

                            {/* Upload Panel */}
                            <motion.div className="roast-upload-panel glass-card" {...fadeIn}>
                                <h2>Get Your Resume Roasted</h2>
                                <p className="text-secondary mb-6">
                                    Gemini AI will review your resume like a senior engineer — pointing out what's good,
                                    what's bad, and what to fix before placement season.
                                </p>

                                <div className="form-group mb-4">
                                    <label>Target Role / Internship</label>
                                    <select
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        disabled={status === 'extracting' || status === 'analyzing'}
                                    >
                                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>

                                {/* Saved Resume Banner */}
                                {hasResume && status === 'idle' && (
                                    <div className="saved-resume-banner">
                                        <div className="saved-info">
                                            <span className="saved-icon">📄</span>
                                            <div>
                                                <strong>Resume on file</strong>
                                                <span>{resumeData.fileName}</span>
                                                <span className="saved-date">
                                                    Saved {new Date(resumeData.savedAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="saved-actions">
                                            <button className="btn btn-primary btn-sm" onClick={roastSavedResume}>
                                                Roast This →
                                            </button>
                                            <button className="btn-text" onClick={clearResume}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`roast-dropzone ${status !== 'idle' && status !== 'error' ? 'active' : ''}`}
                                    onClick={() => status === 'idle' || status === 'error' ? fileInputRef.current?.click() : null}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.txt"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    {(status === 'idle' || status === 'error') && (
                                        <>
                                            <div className="dropzone-icon">📤</div>
                                            <div className="dropzone-text">
                                                <strong>{hasResume ? 'Upload a different resume' : 'Upload Your Resume'}</strong>
                                                <span>PDF or TXT — click to browse</span>
                                            </div>
                                            {status === 'error' && <p className="error-text mt-2">{errorMsg}</p>}
                                        </>
                                    )}
                                    {status === 'extracting' && (
                                        <>
                                            <div className="roast-spinner"></div>
                                            <p>Reading your resume...</p>
                                        </>
                                    )}
                                    {status === 'analyzing' && (
                                        <>
                                            <div className="roast-spinner fire"></div>
                                            <p>Gemini is roasting your resume... 🔥</p>
                                            <span className="roast-subtext">This may take 10-15 seconds</span>
                                        </>
                                    )}
                                    {status === 'done' && (
                                        <>
                                            <div className="dropzone-icon">✅</div>
                                            <p><strong>{resumeData?.fileName}</strong> analyzed!</p>
                                        </>
                                    )}
                                </div>

                                {status === 'done' && (
                                    <button className="btn btn-outline full-width mt-4" onClick={handleReset}>
                                        Roast Again with Different Role
                                    </button>
                                )}

                                <div className="roast-tips mt-6">
                                    <h4>💡 For best results:</h4>
                                    <ul>
                                        <li>Upload your actual resume, not a template</li>
                                        <li>PDF format gives the most accurate analysis</li>
                                        <li>Select the role you're targeting for placement</li>
                                        <li>Your resume is saved — no need to re-upload next time</li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Results Panel */}
                            <div className="roast-results">
                                {status === 'idle' && (
                                    <motion.div className="roast-empty glass-card" {...fadeIn}>
                                        <div className="empty-icon">🔥</div>
                                        <h3>{hasResume ? 'Ready to roast again!' : 'Ready to roast'}</h3>
                                        <p>
                                            {hasResume
                                                ? `Your resume "${resumeData.fileName}" is saved. Click "Roast This" to get fresh AI feedback, or upload a new one.`
                                                : 'Upload your resume on the left and Gemini AI will give you honest feedback to help you stand out in campus placements.'
                                            }
                                        </p>
                                        <div className="roast-features">
                                            <div className="feature-item">✅ Strengths analysis</div>
                                            <div className="feature-item">🔥 Honest weakness roast</div>
                                            <div className="feature-item">⚡ Quick fixes you can implement today</div>
                                            <div className="feature-item">💾 Resume saved — upload once!</div>
                                        </div>
                                    </motion.div>
                                )}

                                {(status === 'extracting' || status === 'analyzing') && (
                                    <div className="roast-loading glass-card">
                                        <div className="loading-flames">🔥🔥🔥</div>
                                        <h3>{status === 'extracting' ? 'Reading your resume...' : 'Gemini is analyzing...'}</h3>
                                        <p className="text-secondary">
                                            {status === 'extracting'
                                                ? 'Extracting text from your file'
                                                : 'Getting brutally honest feedback for you'
                                            }
                                        </p>
                                    </div>
                                )}

                                {status === 'done' && sections && (
                                    <motion.div className="roast-sections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                        <div className="roast-header glass-card">
                                            <span className="roast-badge">🔥 AI Resume Roast</span>
                                            <h2>Your Resume for <span>{targetRole}</span></h2>
                                            <p className="text-secondary">Analyzed by Gemini AI — {resumeData?.fileName}</p>
                                        </div>

                                        {sections.strengths && (
                                            <div className="roast-section strengths glass-card">
                                                <div className="section-header"><span className="section-icon">💪</span><h3>STRENGTHS</h3></div>
                                                <p>{sections.strengths}</p>
                                            </div>
                                        )}
                                        {sections.weaknesses && (
                                            <div className="roast-section weaknesses glass-card">
                                                <div className="section-header"><span className="section-icon">🔥</span><h3>WEAKNESSES (The Roast)</h3></div>
                                                <p>{sections.weaknesses}</p>
                                            </div>
                                        )}
                                        {sections.quickFixes && (
                                            <div className="roast-section quick-fixes glass-card">
                                                <div className="section-header"><span className="section-icon">⚡</span><h3>QUICK FIXES</h3></div>
                                                <p>{sections.quickFixes}</p>
                                            </div>
                                        )}
                                        {!sections.strengths && !sections.weaknesses && !sections.quickFixes && (
                                            <div className="roast-section raw glass-card">
                                                <div className="section-header"><span className="section-icon">🤖</span><h3>AI Analysis</h3></div>
                                                <p style={{ whiteSpace: 'pre-wrap' }}>{sections.raw}</p>
                                            </div>
                                        )}

                                        <div className="roast-cta glass-card">
                                            <h3>Ready to improve?</h3>
                                            <p>Use the feedback above to update your resume, then upload it again to see how much you've improved!</p>
                                            <button className="btn btn-primary" onClick={handleReset}>
                                                Roast Again with Different Role →
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ResumeRoast;
