import React, { useState, useEffect } from 'react';
import { usePDF } from 'react-to-pdf';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import './ResumePreview.css';

const ResumePreview = () => {
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState(1);
    const [resumeData, setResumeData] = useState(null);

    const { toPDF, targetRef } = usePDF({
        filename: `${resumeData?.fullName?.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`,
        page: { margin: 0, format: 'a4' }
    });

    useEffect(() => {
        const stored = sessionStorage.getItem('resumeData');
        if (stored) {
            setResumeData(JSON.parse(stored));
        }
    }, []);

    const handleDownloadPDF = () => {
        toPDF();
    };

    if (!resumeData) {
        return (
            <div className="page-wrapper">
                <Navbar />
                <main className="resume-preview-page">
                    <PageHeader title="Resume Preview" subtitle="Preview and download your resume" badge="Resume" />
                    <section className="resume-preview-section section-padding">
                        <div className="container">
                            <div className="resume-no-data">
                                <div className="resume-no-data-icon">📄</div>
                                <h2>No Resume Data Found</h2>
                                <p>Please fill out the resume builder form first to generate your resume.</p>
                                <Link to="/resume/builder" className="btn btn-primary">Go to Resume Builder →</Link>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    // ── Template 1: Modern Minimal (Sidebar) ──
    const renderTemplate1 = () => (
        <div className="tpl1">
            {/* ── Sidebar ── */}
            <div className="tpl1-sidebar">
                {/* Photo */}
                {resumeData.photo && (
                    <div className="tpl1-photo-wrap">
                        <img src={resumeData.photo} alt={resumeData.fullName} className="tpl1-photo" />
                    </div>
                )}
                <h1>{resumeData.fullName}</h1>
                {resumeData.location && <div className="tpl1-tagline">{resumeData.location}</div>}

                {/* Contact */}
                <div className="tpl1-sidebar-section">
                    <h3>Contact</h3>
                    {resumeData.email && (
                        <div className="tpl1-contact-item">
                            <span className="tpl1-contact-icon">✉</span>
                            <span>{resumeData.email}</span>
                        </div>
                    )}
                    {resumeData.phone && (
                        <div className="tpl1-contact-item">
                            <span className="tpl1-contact-icon">☎</span>
                            <span>{resumeData.phone}</span>
                        </div>
                    )}
                    {resumeData.linkedin && (
                        <div className="tpl1-contact-item">
                            <span className="tpl1-contact-icon">🔗</span>
                            <span>{resumeData.linkedin}</span>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {resumeData.technicalSkills?.length > 0 && (
                    <div className="tpl1-sidebar-section">
                        <h3>Technical Skills</h3>
                        <div>
                            {resumeData.technicalSkills.map(s => (
                                <span key={s} className="tpl1-skill-tag">{s}</span>
                            ))}
                        </div>
                    </div>
                )}

                {resumeData.softSkills?.length > 0 && (
                    <div className="tpl1-sidebar-section">
                        <h3>Soft Skills</h3>
                        <div>
                            {resumeData.softSkills.map(s => (
                                <span key={s} className="tpl1-skill-tag">{s}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education in sidebar */}
                {resumeData.education?.filter(e => e.degree).length > 0 && (
                    <div className="tpl1-sidebar-section">
                        <h3>Education</h3>
                        {resumeData.education.filter(e => e.degree).map((edu, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <div style={{ fontWeight: 700, color: '#fff', fontSize: '11px' }}>{edu.degree}</div>
                                {edu.institution && <div style={{ fontSize: '10px', opacity: 0.8 }}>{edu.institution}</div>}
                                {edu.year && <div style={{ fontSize: '9px', opacity: 0.6 }}>{edu.year}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Certifications in sidebar */}
                {resumeData.certifications?.length > 0 && (
                    <div className="tpl1-sidebar-section">
                        <h3>Certifications</h3>
                        {resumeData.certifications.map((c, i) => (
                            <div key={i} className="tpl1-cert-item">{c}</div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Main ── */}
            <div className="tpl1-main">
                {/* Summary */}
                {resumeData.summary && (
                    <div className="tpl1-section">
                        <div className="tpl1-section-title">Professional Summary</div>
                        <p className="tpl1-summary">{resumeData.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {resumeData.experience?.filter(e => e.company || e.role).length > 0 && (
                    <div className="tpl1-section">
                        <div className="tpl1-section-title">Experience</div>
                        {resumeData.experience.filter(e => e.company || e.role).map((exp, i) => (
                            <div key={i} className="tpl1-entry">
                                <div className="tpl1-entry-header">
                                    <div>
                                        <div className="tpl1-entry-title">{exp.role}</div>
                                        <div className="tpl1-entry-sub">{exp.company}</div>
                                    </div>
                                    {exp.duration && <div className="tpl1-entry-date">{exp.duration}</div>}
                                </div>
                                {exp.description && <div className="tpl1-entry-desc">{exp.description}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {resumeData.projects?.filter(p => p.name).length > 0 && (
                    <div className="tpl1-section">
                        <div className="tpl1-section-title">Projects</div>
                        {resumeData.projects.filter(p => p.name).map((proj, i) => (
                            <div key={i} className="tpl1-entry">
                                <div className="tpl1-entry-header">
                                    <div className="tpl1-entry-title">{proj.name}</div>
                                </div>
                                {proj.description && <div className="tpl1-entry-desc">{proj.description}</div>}
                                {proj.technologies && (
                                    <div className="tpl1-tech-tags">
                                        {proj.technologies.split(',').map((t, j) => (
                                            <span key={j} className="tpl1-tech-tag">{t.trim()}</span>
                                        ))}
                                    </div>
                                )}
                                {proj.link && <a className="tpl1-link" href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    // ── Template 2: Professional Corporate (Single Column) ──
    const renderTemplate2 = () => (
        <div className="tpl2">
            {/* Header */}
            <div className="tpl2-header">
                {resumeData.photo && (
                    <div className="tpl2-photo-wrap">
                        <img src={resumeData.photo} alt={resumeData.fullName} className="tpl2-photo" />
                    </div>
                )}
                <h1>{resumeData.fullName}</h1>
                {resumeData.location && <div className="tpl2-header-subtitle">{resumeData.location}</div>}
                <div className="tpl2-contact-bar">
                    {resumeData.email && <span>✉ {resumeData.email}</span>}
                    {resumeData.phone && <span>☎ {resumeData.phone}</span>}
                    {resumeData.linkedin && <span>🔗 {resumeData.linkedin}</span>}
                </div>
            </div>

            {/* Body */}
            <div className="tpl2-body">
                {/* Summary */}
                {resumeData.summary && (
                    <div className="tpl2-section">
                        <div className="tpl2-section-title">Professional Summary</div>
                        <p className="tpl2-summary">{resumeData.summary}</p>
                    </div>
                )}

                {/* Skills */}
                {(resumeData.technicalSkills?.length > 0 || resumeData.softSkills?.length > 0) && (
                    <div className="tpl2-section">
                        <div className="tpl2-section-title">Skills</div>
                        <div className="tpl2-skills-grid">
                            {resumeData.technicalSkills?.map(s => (
                                <span key={s} className="tpl2-skill-chip">{s}</span>
                            ))}
                            {resumeData.softSkills?.map(s => (
                                <span key={s} className="tpl2-skill-chip soft">{s}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resumeData.education?.filter(e => e.degree).length > 0 && (
                    <div className="tpl2-section">
                        <div className="tpl2-section-title">Education</div>
                        {resumeData.education.filter(e => e.degree).map((edu, i) => (
                            <div key={i} className="tpl2-entry">
                                <div className="tpl2-entry-header">
                                    <div>
                                        <div className="tpl2-entry-title">{edu.degree}</div>
                                        {edu.institution && <div className="tpl2-entry-sub">{edu.institution}</div>}
                                    </div>
                                    {edu.year && <div className="tpl2-entry-date">{edu.year}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Experience */}
                {resumeData.experience?.filter(e => e.company || e.role).length > 0 && (
                    <div className="tpl2-section">
                        <div className="tpl2-section-title">Work Experience</div>
                        {resumeData.experience.filter(e => e.company || e.role).map((exp, i) => (
                            <div key={i} className="tpl2-entry">
                                <div className="tpl2-entry-header">
                                    <div>
                                        <div className="tpl2-entry-title">{exp.role}</div>
                                        <div className="tpl2-entry-sub">{exp.company}</div>
                                    </div>
                                    {exp.duration && <div className="tpl2-entry-date">{exp.duration}</div>}
                                </div>
                                {exp.description && <div className="tpl2-entry-desc">{exp.description}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {resumeData.projects?.filter(p => p.name).length > 0 && (
                    <div className="tpl2-section">
                        <div className="tpl2-section-title">Projects</div>
                        {resumeData.projects.filter(p => p.name).map((proj, i) => (
                            <div key={i} className="tpl2-entry">
                                <div className="tpl2-entry-header">
                                    <div className="tpl2-entry-title">{proj.name}</div>
                                </div>
                                {proj.description && <div className="tpl2-entry-desc">{proj.description}</div>}
                                {proj.technologies && (
                                    <div className="tpl2-tech-tags">
                                        {proj.technologies.split(',').map((t, j) => (
                                            <span key={j} className="tpl2-tech-tag">{t.trim()}</span>
                                        ))}
                                    </div>
                                )}
                                {proj.link && <a className="tpl2-link" href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Certifications */}
                {resumeData.certifications?.length > 0 && (
                    <div className="tpl2-section">
                        <div className="tpl2-section-title">Certifications</div>
                        <ul className="tpl2-cert-list">
                            {resumeData.certifications.map((c, i) => (
                                <li key={i}>{c}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="resume-preview-page">
                <PageHeader
                    title="Your Resume"
                    subtitle="Choose a template and download your professional resume as PDF"
                    badge="Preview"
                />

                <section className="resume-preview-section section-padding">
                    <div className="container">
                        {/* Template Selection */}
                        <div className="template-selection">
                            <h2>Choose a Template</h2>
                            <div className="template-cards">
                                {/* Template 1 Card */}
                                <div className={`template-card ${selectedTemplate === 1 ? 'selected' : ''}`} onClick={() => setSelectedTemplate(1)}>
                                    <div className="template-thumbnail template-thumb-1">
                                        <div className="thumb-sidebar">
                                            <div className="thumb-line short"></div>
                                            <div className="thumb-line medium"></div>
                                            <div className="thumb-block"></div>
                                            <div className="thumb-line"></div>
                                            <div className="thumb-line short"></div>
                                            <div className="thumb-block"></div>
                                        </div>
                                        <div className="thumb-main">
                                            <div className="thumb-line accent" style={{ width: '50%' }}></div>
                                            <div className="thumb-line dark"></div>
                                            <div className="thumb-line dark medium"></div>
                                            <div className="thumb-block dark"></div>
                                            <div className="thumb-line accent" style={{ width: '40%', marginTop: '8px' }}></div>
                                            <div className="thumb-line dark"></div>
                                            <div className="thumb-line dark short"></div>
                                        </div>
                                    </div>
                                    <div className="template-meta">
                                        <h3>Modern Minimal</h3>
                                        <p>Sidebar layout with clean sections</p>
                                    </div>
                                </div>

                                {/* Template 2 Card */}
                                <div className={`template-card ${selectedTemplate === 2 ? 'selected' : ''}`} onClick={() => setSelectedTemplate(2)}>
                                    <div className="template-thumbnail template-thumb-2">
                                        <div className="thumb-header-block"></div>
                                        <div className="thumb-line dark short" style={{ margin: '0 auto' }}></div>
                                        <div className="thumb-divider"></div>
                                        <div className="thumb-line dark"></div>
                                        <div className="thumb-line dark medium"></div>
                                        <div className="thumb-divider"></div>
                                        <div className="thumb-line dark"></div>
                                        <div className="thumb-line dark short"></div>
                                        <div className="thumb-block dark"></div>
                                        <div className="thumb-divider"></div>
                                        <div className="thumb-line dark"></div>
                                        <div className="thumb-line dark medium"></div>
                                    </div>
                                    <div className="template-meta">
                                        <h3>Professional Corporate</h3>
                                        <p>Single-column classic design</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="preview-actions">
                            <button className="btn btn-primary btn-lg" onClick={handleDownloadPDF}>
                                📥 Download as PDF
                            </button>
                            <Link to="/resume/builder" className="btn btn-outline">← Edit Resume</Link>
                        </div>

                        {/* Resume Render - Wrapped in a single ref container for react-to-pdf */}
                        <div className="resume-pdf-wrapper">
                            <div className="resume-container" ref={targetRef}>
                                {selectedTemplate === 1 ? renderTemplate1() : renderTemplate2()}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ResumePreview;
