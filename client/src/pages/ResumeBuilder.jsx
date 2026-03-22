import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import './ResumeBuilder.css';

const INITIAL_FORM = {
    // Step 1: Personal Info
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    photo: '', // base64

    // Step 2: Summary & Skills
    summary: '',
    technicalSkills: [],
    softSkills: [],

    // Step 3: Education
    education: [{ degree: '', institution: '', year: '' }],

    // Step 4: Experience (optional)
    experience: [],

    // Step 5: Projects & Certifications
    projects: [{ name: '', description: '', technologies: '', link: '' }],
    certifications: [],
};

const SUGGESTED_TECH_SKILLS = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'SQL',
    'HTML/CSS', 'TypeScript', 'Git', 'MongoDB', 'AWS', 'Docker',
    'Machine Learning', 'Data Analysis', 'REST APIs', 'Firebase'
];

const SUGGESTED_SOFT_SKILLS = [
    'Leadership', 'Communication', 'Problem Solving', 'Teamwork',
    'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity'
];

const STEP_LABELS = ['Personal', 'Summary', 'Education', 'Experience', 'Projects'];

const ResumeBuilder = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [techInput, setTechInput] = useState('');
    const [softInput, setSoftInput] = useState('');
    const [certInput, setCertInput] = useState('');
    const [profileAvailable, setProfileAvailable] = useState(false);
    const [profileImported, setProfileImported] = useState(false);
    const totalSteps = 5;

    // Check for saved profile data & previously saved resume draft
    useEffect(() => {
        // Check if profile exists
        const saved = localStorage.getItem('careerOrbitProfile');
        if (saved) {
            try {
                JSON.parse(saved);
                setProfileAvailable(true);
            } catch (e) {
                // ignore
            }
        }

        // Load resume draft if exists
        const draft = localStorage.getItem('resumeBuilderDraft');
        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                setFormData(prev => ({ ...prev, ...parsed }));
                setProfileImported(true); // hide banner if draft already has data
            } catch (e) {
                // ignore
            }
        }
    }, []);

    // Import data from saved profile into resume form
    const importFromProfile = () => {
        const saved = localStorage.getItem('careerOrbitProfile');
        if (!saved) return;
        try {
            const profile = JSON.parse(saved);
            setFormData(prev => ({
                ...prev,
                fullName: profile.fullName || prev.fullName,
                email: profile.email || prev.email,
                location: profile.location || prev.location,
                // Map profile skills to technical skills
                technicalSkills: profile.selectedSkills?.length
                    ? [...new Set([...prev.technicalSkills, ...profile.selectedSkills])]
                    : prev.technicalSkills,
                // Map education fields
                education: (profile.degree || profile.institution)
                    ? [{
                        degree: profile.degree || '',
                        institution: profile.institution || '',
                        year: ''
                    }, ...prev.education.filter(e => e.degree)]
                    : prev.education,
                // Map certifications
                certifications: profile.certifications?.length
                    ? [
                        ...prev.certifications,
                        ...profile.certifications.map(c => `${c.name}${c.issuer ? ' – ' + c.issuer : ''}${c.date ? ' (' + c.date + ')' : ''}`)
                    ]
                    : prev.certifications,
            }));
            setProfileImported(true);
        } catch (e) {
            console.error('Failed to import profile:', e);
        }
    };

    // Auto-save resume draft to localStorage
    const saveDraft = (data) => {
        localStorage.setItem('resumeBuilderDraft', JSON.stringify(data));
    };

    // ── Handlers ──
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
        }
    };

    // Dynamic arrays (education, experience, projects)
    const handleArrayChange = (section, index, field, value) => {
        setFormData(prev => {
            const arr = [...prev[section]];
            arr[index] = { ...arr[index], [field]: value };
            return { ...prev, [section]: arr };
        });
    };

    const addEntry = (section, template) => {
        setFormData(prev => ({ ...prev, [section]: [...prev[section], { ...template }] }));
    };

    const removeEntry = (section, index) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    // Skills
    const addSkill = (type, value, setter) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        
        setFormData(prev => {
            const currentSkills = prev[type] || [];
            if (!currentSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
                return { ...prev, [type]: [...currentSkills, trimmed] };
            }
            return prev;
        });
        setter('');
    };

    const removeSkill = (type, skill) => {
        setFormData(prev => ({ ...prev, [type]: prev[type].filter(s => s !== skill) }));
    };

    // Certs
    const addCert = () => {
        const trimmed = certInput.trim();
        if (!trimmed) return;
        setFormData(prev => ({ ...prev, certifications: [...prev.certifications, trimmed] }));
        setCertInput('');
    };

    const removeCert = (index) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index)
        }));
    };

    // ── Validation ──
    const validate = (step) => {
        const errs = {};
        if (step === 1) {
            if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
            if (!formData.email.trim()) {
                errs.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                errs.email = 'Please enter a valid email';
            }
            if (!formData.phone.trim()) errs.phone = 'Phone number is required';
        }
        if (step === 2) {
            if (!formData.summary.trim()) errs.summary = 'Professional summary is required';
            if (formData.technicalSkills.length === 0) errs.technicalSkills = 'Add at least one technical skill';
        }
        if (step === 3) {
            const edu = formData.education[0];
            if (!edu || !edu.degree.trim()) errs.education = 'At least one degree is required';
        }
        // Step 4 (Experience) is optional
        if (step === 5) {
            const proj = formData.projects[0];
            if (!proj || !proj.name.trim()) errs.projects = 'At least one project is required';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const nextStep = () => {
        if (validate(currentStep) && currentStep < totalSteps) {
            saveDraft(formData);
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(currentStep)) {
            // Store data for preview page and save draft
            saveDraft(formData);
            sessionStorage.setItem('resumeData', JSON.stringify(formData));
            navigate('/resume/preview');
        }
    };

    const handleKeyDown = (e, callback) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            callback();
        }
    };

    // Photo upload handler
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('Photo must be less than 2MB');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, photo: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const removePhoto = () => {
        setFormData(prev => ({ ...prev, photo: '' }));
    };

    // Toggle suggested skill
    const toggleSuggestedSkill = (type, skill) => {
        const index = formData[type].findIndex(s => s.toLowerCase() === skill.toLowerCase());
        if (index !== -1) {
            removeSkill(type, formData[type][index]);
        } else {
            setFormData(prev => ({ ...prev, [type]: [...prev[type], skill] }));
        }
    };

    // ── Render Steps ──
    const renderStep1 = () => (
        <div className="rb-form-step">
            <h2 className="rb-step-title">Personal Information</h2>
            <p className="rb-step-description">Let's start with your contact details</p>

            <div className="rb-form-grid">
                <div className={`rb-form-group ${errors.fullName ? 'has-error' : ''}`}>
                    <label htmlFor="rb-fullName">Full Name *</label>
                    <input type="text" id="rb-fullName" name="fullName" value={formData.fullName} onChange={handleInput} placeholder="John Doe" />
                    {errors.fullName && <span className="rb-error-msg">⚠️ {errors.fullName}</span>}
                </div>
                <div className={`rb-form-group ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="rb-email">Email *</label>
                    <input type="email" id="rb-email" name="email" value={formData.email} onChange={handleInput} placeholder="john@example.com" />
                    {errors.email && <span className="rb-error-msg">⚠️ {errors.email}</span>}
                </div>
                <div className={`rb-form-group ${errors.phone ? 'has-error' : ''}`}>
                    <label htmlFor="rb-phone">Phone Number *</label>
                    <input type="tel" id="rb-phone" name="phone" value={formData.phone} onChange={handleInput} placeholder="+1-234-567-8900" />
                    {errors.phone && <span className="rb-error-msg">⚠️ {errors.phone}</span>}
                </div>
                <div className="rb-form-group">
                    <label htmlFor="rb-location">Location</label>
                    <input type="text" id="rb-location" name="location" value={formData.location} onChange={handleInput} placeholder="San Francisco, CA" />
                </div>
                <div className="rb-form-group full-width">
                    <label htmlFor="rb-linkedin">LinkedIn / Portfolio URL</label>
                    <input type="url" id="rb-linkedin" name="linkedin" value={formData.linkedin} onChange={handleInput} placeholder="https://linkedin.com/in/johndoe" />
                </div>

                {/* Photo Upload */}
                <div className="rb-form-group full-width">
                    <label>Profile Photo (Optional)</label>
                    <div className="rb-photo-upload">
                        {formData.photo ? (
                            <div className="rb-photo-preview">
                                <img src={formData.photo} alt="Profile" />
                                <button type="button" className="rb-photo-remove" onClick={removePhoto}>×</button>
                            </div>
                        ) : (
                            <label className="rb-photo-dropzone" htmlFor="rb-photo-input">
                                <span className="rb-photo-icon">📷</span>
                                <span>Click to upload photo</span>
                                <span className="rb-photo-hint">JPG, PNG • Max 2MB</span>
                            </label>
                        )}
                        <input type="file" id="rb-photo-input" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="rb-form-step">
            <h2 className="rb-step-title">Summary & Skills</h2>
            <p className="rb-step-description">Highlight your expertise and career focus</p>

            <div className={`rb-form-group full-width ${errors.summary ? 'has-error' : ''}`}>
                <label htmlFor="rb-summary">Professional Summary *</label>
                <textarea id="rb-summary" name="summary" value={formData.summary} onChange={handleInput} placeholder="A brief 3-4 line career summary highlighting your expertise, achievements and goals..." rows={4} />
                {errors.summary && <span className="rb-error-msg">⚠️ {errors.summary}</span>}
            </div>

            <div className="rb-skills-input-wrapper">
                <label>Technical Skills *</label>
                <div className="rb-suggested-skills">
                    {SUGGESTED_TECH_SKILLS.map(skill => (
                        <button
                            key={skill}
                            type="button"
                            className={`rb-suggested-pill ${formData.technicalSkills.includes(skill) ? 'selected' : ''}`}
                            onClick={() => toggleSuggestedSkill('technicalSkills', skill)}
                        >
                            {skill}
                            {formData.technicalSkills.includes(skill) && <span className="check-icon">✓</span>}
                        </button>
                    ))}
                </div>
                <div className="rb-skills-input-row" style={{ marginTop: '10px' }}>
                    <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e, () => addSkill('technicalSkills', techInput, setTechInput))} placeholder="Add custom skill..." />
                    <button type="button" className="rb-add-skill-btn" onClick={() => addSkill('technicalSkills', techInput, setTechInput)}>+ Add</button>
                </div>
                {errors.technicalSkills && <span className="rb-error-msg">⚠️ {errors.technicalSkills}</span>}
                <div className="rb-skills-tags">
                    {formData.technicalSkills.filter(s => !SUGGESTED_TECH_SKILLS.includes(s)).map(s => (
                        <span key={s} className="rb-skill-tag">{s} <button type="button" onClick={() => removeSkill('technicalSkills', s)}>×</button></span>
                    ))}
                </div>
            </div>

            <div className="rb-skills-input-wrapper">
                <label>Soft Skills</label>
                <div className="rb-suggested-skills">
                    {SUGGESTED_SOFT_SKILLS.map(skill => (
                        <button
                            key={skill}
                            type="button"
                            className={`rb-suggested-pill ${formData.softSkills.includes(skill) ? 'selected' : ''}`}
                            onClick={() => toggleSuggestedSkill('softSkills', skill)}
                        >
                            {skill}
                            {formData.softSkills.includes(skill) && <span className="check-icon">✓</span>}
                        </button>
                    ))}
                </div>
                <div className="rb-skills-input-row" style={{ marginTop: '10px' }}>
                    <input type="text" value={softInput} onChange={e => setSoftInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e, () => addSkill('softSkills', softInput, setSoftInput))} placeholder="Add custom skill..." />
                    <button type="button" className="rb-add-skill-btn" onClick={() => addSkill('softSkills', softInput, setSoftInput)}>+ Add</button>
                </div>
                <div className="rb-skills-tags">
                    {formData.softSkills.filter(s => !SUGGESTED_SOFT_SKILLS.includes(s)).map(s => (
                        <span key={s} className="rb-skill-tag">{s} <button type="button" onClick={() => removeSkill('softSkills', s)}>×</button></span>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="rb-form-step">
            <h2 className="rb-step-title">Education</h2>
            <p className="rb-step-description">Add your academic background</p>
            {errors.education && <span className="rb-error-msg" style={{ marginBottom: '1rem', display: 'block' }}>⚠️ {errors.education}</span>}

            <div className="rb-entries-section">
                {formData.education.map((edu, i) => (
                    <div className="rb-entry-card" key={i}>
                        {formData.education.length > 1 && (
                            <button type="button" className="rb-remove-entry" onClick={() => removeEntry('education', i)}>×</button>
                        )}
                        <div className="rb-form-grid">
                            <div className="rb-form-group">
                                <label>Degree *</label>
                                <input type="text" value={edu.degree} onChange={e => handleArrayChange('education', i, 'degree', e.target.value)} placeholder="B.Tech in Computer Science" />
                            </div>
                            <div className="rb-form-group">
                                <label>Institution</label>
                                <input type="text" value={edu.institution} onChange={e => handleArrayChange('education', i, 'institution', e.target.value)} placeholder="MIT" />
                            </div>
                            <div className="rb-form-group">
                                <label>Graduation Year</label>
                                <input type="text" value={edu.year} onChange={e => handleArrayChange('education', i, 'year', e.target.value)} placeholder="2024" />
                            </div>
                        </div>
                    </div>
                ))}
                <button type="button" className="rb-add-btn" onClick={() => addEntry('education', { degree: '', institution: '', year: '' })}>+ Add Education</button>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="rb-form-step">
            <h2 className="rb-step-title">Work Experience</h2>
            <p className="rb-step-description">Add your professional experience (optional)</p>

            <div className="rb-entries-section">
                {formData.experience.length === 0 && (
                    <div className="rb-no-entries">No experience added yet. This section is optional — feel free to skip it!</div>
                )}
                {formData.experience.map((exp, i) => (
                    <div className="rb-entry-card" key={i}>
                        <button type="button" className="rb-remove-entry" onClick={() => removeEntry('experience', i)}>×</button>
                        <div className="rb-form-grid">
                            <div className="rb-form-group">
                                <label>Company Name</label>
                                <input type="text" value={exp.company} onChange={e => handleArrayChange('experience', i, 'company', e.target.value)} placeholder="Google" />
                            </div>
                            <div className="rb-form-group">
                                <label>Role</label>
                                <input type="text" value={exp.role} onChange={e => handleArrayChange('experience', i, 'role', e.target.value)} placeholder="Software Engineer" />
                            </div>
                            <div className="rb-form-group">
                                <label>Duration</label>
                                <input type="text" value={exp.duration} onChange={e => handleArrayChange('experience', i, 'duration', e.target.value)} placeholder="Jan 2023 – Present" />
                            </div>
                            <div className="rb-form-group full-width">
                                <label>Description</label>
                                <textarea value={exp.description} onChange={e => handleArrayChange('experience', i, 'description', e.target.value)} placeholder="Describe your responsibilities and achievements..." rows={3} />
                            </div>
                        </div>
                    </div>
                ))}
                <button type="button" className="rb-add-btn" onClick={() => addEntry('experience', { company: '', role: '', duration: '', description: '' })}>+ Add Experience</button>
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="rb-form-step">
            <h2 className="rb-step-title">Projects & Certifications</h2>
            <p className="rb-step-description">Showcase your work and credentials</p>

            {/* Projects */}
            <div className="rb-entries-section">
                <div className="rb-section-header">
                    <h3 className="rb-section-subtitle">Projects *</h3>
                </div>
                {errors.projects && <span className="rb-error-msg" style={{ marginBottom: '1rem', display: 'block' }}>⚠️ {errors.projects}</span>}

                {formData.projects.map((proj, i) => (
                    <div className="rb-entry-card" key={i}>
                        {formData.projects.length > 1 && (
                            <button type="button" className="rb-remove-entry" onClick={() => removeEntry('projects', i)}>×</button>
                        )}
                        <div className="rb-form-grid">
                            <div className="rb-form-group">
                                <label>Project Name *</label>
                                <input type="text" value={proj.name} onChange={e => handleArrayChange('projects', i, 'name', e.target.value)} placeholder="CareerOrbit AI" />
                            </div>
                            <div className="rb-form-group">
                                <label>Technologies Used</label>
                                <input type="text" value={proj.technologies} onChange={e => handleArrayChange('projects', i, 'technologies', e.target.value)} placeholder="React, Node.js, MongoDB" />
                            </div>
                            <div className="rb-form-group full-width">
                                <label>Description</label>
                                <textarea value={proj.description} onChange={e => handleArrayChange('projects', i, 'description', e.target.value)} placeholder="Describe the project, your role, and key outcomes..." rows={3} />
                            </div>
                            <div className="rb-form-group full-width">
                                <label>GitHub / Live Link</label>
                                <input type="url" value={proj.link} onChange={e => handleArrayChange('projects', i, 'link', e.target.value)} placeholder="https://github.com/user/project" />
                            </div>
                        </div>
                    </div>
                ))}
                <button type="button" className="rb-add-btn" onClick={() => addEntry('projects', { name: '', description: '', technologies: '', link: '' })}>+ Add Project</button>
            </div>

            {/* Certifications */}
            <div className="rb-entries-section" style={{ marginTop: '2rem' }}>
                <div className="rb-section-header">
                    <h3 className="rb-section-subtitle">Certifications (Optional)</h3>
                </div>
                <div className="rb-skills-input-row">
                    <input type="text" value={certInput} onChange={e => setCertInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e, addCert)} placeholder="e.g. AWS Solutions Architect – Amazon (2024)" />
                    <button type="button" className="rb-add-skill-btn" onClick={addCert}>+ Add</button>
                </div>
                <div className="rb-skills-tags" style={{ marginTop: '10px' }}>
                    {formData.certifications.map((c, i) => (
                        <span key={i} className="rb-skill-tag">{c} <button type="button" onClick={() => removeCert(i)}>×</button></span>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(255,110,20,0.1), rgba(255,140,66,0.1))', borderRadius: 'var(--radius-md)', marginTop: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📄</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--secondary-color)' }}>Almost done!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Click "Generate Resume" to preview and download your professionally formatted resume.</p>
            </div>
        </div>
    );

    const STEPS = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5];

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="resume-builder-page">
                <PageHeader
                    title="Resume Creator"
                    subtitle="Build a professional resume in minutes with AI-driven precision."
                    badge="Resume Builder"
                />

                <section className="resume-builder-section section-padding">
                    <div className="container">
                        {/* Import from Profile Banner */}
                        {profileAvailable && !profileImported && (
                            <div className="rb-import-banner">
                                <div className="rb-import-banner-icon">⚡</div>
                                <div className="rb-import-banner-text">
                                    <strong>Profile data found!</strong>
                                    <span>Auto-fill your resume with your saved profile info — name, email, skills, education & more.</span>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={importFromProfile}>Import Profile Data</button>
                                <button type="button" className="rb-import-dismiss" onClick={() => setProfileImported(true)}>×</button>
                            </div>
                        )}

                        {/* Progress */}
                        <div className="rb-step-progress">
                            {[1, 2, 3, 4, 5].map((step) => (
                                <div key={step} className={`rb-step-indicator ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}>
                                    <div className="rb-step-number">{step}</div>
                                    <span className="rb-step-label">{STEP_LABELS[step - 1]}</span>
                                </div>
                            ))}
                            <div className="rb-progress-line" style={{ '--progress-width': `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
                        </div>

                        {/* Form Card */}
                        <div className="rb-form-card">
                            <form onSubmit={handleSubmit}>
                                {STEPS[currentStep - 1]()}

                                {/* Navigation */}
                                <div className="rb-form-actions">
                                    {currentStep > 1 && (
                                        <button type="button" className="btn btn-outline" onClick={prevStep}>← Previous</button>
                                    )}
                                    <div className="spacer"></div>
                                    {currentStep < totalSteps ? (
                                        <button type="button" className="btn btn-primary" onClick={nextStep}>Next →</button>
                                    ) : (
                                        <button type="submit" className="btn btn-primary btn-lg">Generate Resume 🚀</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ResumeBuilder;
