import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import ResumeParser from '../components/ResumeParser';
import './CreateProfile.css';

const CreateProfile = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        fullName: '',
        email: '',
        currentRole: '',
        location: '',
        yearsExperience: '',

        // Step 2: Skills
        selectedSkills: [],

        // Step 3: Experience & Education
        education: '',
        degree: '',
        institution: '',
        certifications: [],

        // Step 4: Career Goals
        targetRole: '',
        targetIndustry: '',
        timeframe: ''
    });

    const [newCert, setNewCert] = useState({ name: '', issuer: '', date: '' });
    const [errors, setErrors] = useState({});

    // Load previously saved profile data on mount
    useEffect(() => {
        const saved = localStorage.getItem('careerOrbitProfile');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFormData(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error('Failed to load saved profile:', e);
            }
        }
    }, []);

    // Save profile data to localStorage
    const saveProfileToStorage = (data) => {
        localStorage.setItem('careerOrbitProfile', JSON.stringify(data));
    };
    const totalSteps = 4;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleCertChange = (e) => {
        const { name, value } = e.target;
        setNewCert(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCertification = () => {
        if (newCert.name && newCert.issuer) {
            setFormData(prev => ({
                ...prev,
                certifications: [...prev.certifications, newCert]
            }));
            setNewCert({ name: '', issuer: '', date: '' });
        }
    };

    const handleRemoveCertification = (index) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index)
        }));
    };

    const handleSkillToggle = (skill) => {
        setFormData(prev => ({
            ...prev,
            selectedSkills: prev.selectedSkills.includes(skill)
                ? prev.selectedSkills.filter(s => s !== skill)
                : [...prev.selectedSkills, skill]
        }));
        if (errors.selectedSkills) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.selectedSkills;
                return newErrors;
            });
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
            if (!formData.currentRole) newErrors.currentRole = 'Please select your current role';
            if (!formData.yearsExperience) newErrors.yearsExperience = 'Please select your years of experience';
        }

        if (step === 2) {
            if (formData.selectedSkills.length === 0) {
                newErrors.selectedSkills = 'Please select at least one skill or upload a resume';
            }
        }

        if (step === 3) {
            if (!formData.education) newErrors.education = 'Please select your highest education level';
        }

        if (step === 4) {
            if (!formData.targetRole.trim()) newErrors.targetRole = 'Target role is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                // Save progress to localStorage on each step
                saveProfileToStorage(formData);
                setCurrentStep(currentStep + 1);
                window.scrollTo(0, 0);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleResumeSkills = (groupedSkills) => {
        // groupedSkills: { technical: [...], tools: [...], soft: [...], languages: [...] }
        const allSkills = Object.values(groupedSkills).flat();
        setFormData(prev => ({
            ...prev,
            selectedSkills: [...new Set([...prev.selectedSkills, ...allSkills])]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(4)) {
            // Save complete profile to localStorage
            saveProfileToStorage(formData);
            console.log('Profile created & saved:', formData);
            // Navigate to edit skills page
            navigate('/profile/edit-skills');
        }
    };

    const SKILLS_BY_ROLE = {
        'Software Engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'Cloud Computing', 'System Design'],
        'Data Scientist': ['Python', 'R', 'Machine Learning', 'Data Visualization', 'Statistics', 'SQL', 'Big Data'],
        'Teacher': ['Lesson Planning', 'Classroom Management', 'Student Assessment', 'Curriculum Development', 'Communication', 'Online Teaching'],
        'Doctor': ['Medical Diagnosis', 'Patient Care', 'Pharmacology', 'Medical Research', 'Emergency Medicine', 'Patient Education'],
        'Marketing Specialist': ['SEO', 'Content Strategy', 'Social Media Marketing', 'Analytics', 'Brand Management', 'Public Relations'],
        'Registered Nurse': ['Patient Monitoring', 'Wound Care', 'Medication Administration', 'Vital Signs', 'Nursing Ethics', 'Patient Advocacy'],
        'Other': ['Communication', 'Problem Solving', 'Leadership', 'Project Management', 'Data Analysis', 'Time Management', 'Teamwork']
    };

    const suggestedSkills = SKILLS_BY_ROLE[formData.currentRole] || SKILLS_BY_ROLE['Other'];

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="create-profile-page">
                <PageHeader
                    title="Create Your Profile"
                    subtitle="Let's build your career trajectory together with AI-driven precision."
                    badge="Onboarding"
                />

                <section className="profile-form-section section-padding">
                    <div className="container">
                        {/* Progress Indicator */}
                        <div className="step-progress">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`step-indicator ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
                                >
                                    <div className="step-number">{step}</div>
                                </div>
                            ))}
                            <div className="progress-line" style={{ '--progress-width': `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
                        </div>

                        {/* Form Card */}
                        <div className="form-card">
                            <form onSubmit={handleSubmit}>

                                {/* Step 1: Basic Information */}
                                {currentStep === 1 && (
                                    <div className="form-step">
                                        <h2 className="step-title">Tell us about yourself</h2>
                                        <p className="step-description">We'll use this to personalize your experience</p>

                                        <div className="form-grid">
                                            <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
                                                 <label htmlFor="fullName">Full Name *</label>
                                                 <input
                                                     type="text"
                                                     id="fullName"
                                                     name="fullName"
                                                     value={formData.fullName}
                                                     onChange={handleInputChange}
                                                     placeholder="John Doe"
                                                 />
                                                 {errors.fullName && <span className="error-message">⚠️ {errors.fullName}</span>}
                                             </div>

                                            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                                                 <label htmlFor="email">Email Address *</label>
                                                 <input
                                                     type="email"
                                                     id="email"
                                                     name="email"
                                                     value={formData.email}
                                                     onChange={handleInputChange}
                                                     placeholder="john@example.com"
                                                 />
                                                 {errors.email && <span className="error-message">⚠️ {errors.email}</span>}
                                             </div>

                                            <div className={`form-group ${errors.currentRole ? 'has-error' : ''}`}>
                                                 <label htmlFor="currentRole">Current Role *</label>
                                                 <select
                                                     id="currentRole"
                                                     name="currentRole"
                                                     value={formData.currentRole}
                                                     onChange={handleInputChange}
                                                 >
                                                     <option value="">Select Role...</option>
                                                     {Object.keys(SKILLS_BY_ROLE).map(role => (
                                                         <option key={role} value={role}>{role}</option>
                                                     ))}
                                                 </select>
                                                 {errors.currentRole && <span className="error-message">⚠️ {errors.currentRole}</span>}
                                             </div>

                                            <div className="form-group">
                                                <label htmlFor="location">Location</label>
                                                <input
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    placeholder="San Francisco, CA"
                                                />
                                            </div>

                                            <div className={`form-group full-width ${errors.yearsExperience ? 'has-error' : ''}`}>
                                                 <label htmlFor="yearsExperience">Years of Experience *</label>
                                                 <select
                                                     id="yearsExperience"
                                                     name="yearsExperience"
                                                     value={formData.yearsExperience}
                                                     onChange={handleInputChange}
                                                 >
                                                     <option value="">Select...</option>
                                                     <option value="0-1">0-1 years</option>
                                                     <option value="1-3">1-3 years</option>
                                                     <option value="3-5">3-5 years</option>
                                                     <option value="5-10">5-10 years</option>
                                                     <option value="10+">10+ years</option>
                                                 </select>
                                                 {errors.yearsExperience && <span className="error-message">⚠️ {errors.yearsExperience}</span>}
                                             </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Skills Selection */}
                                {currentStep === 2 && (
                                    <div className="form-step">
                                        <h2 className="step-title">What are your skills?</h2>
                                        <p className="step-description">Upload your resume to auto-detect skills, or select manually below.</p>

                                        <ResumeParser onSkillsDetected={handleResumeSkills} />

                                        <div className="skills-divider">
                                            <span>or select manually</span>
                                        </div>

                                        <div className="skills-selection">
                                            <div className="skills-grid">
                                                {suggestedSkills.map((skill) => (
                                                    <button
                                                        key={skill}
                                                        type="button"
                                                        className={`skill-pill ${formData.selectedSkills.includes(skill) ? 'selected' : ''}`}
                                                        onClick={() => handleSkillToggle(skill)}
                                                    >
                                                        {skill}
                                                        {formData.selectedSkills.includes(skill) && <span className="check-icon">✓</span>}
                                                    </button>
                                                ))}
                                            </div>

                                             <div className="selected-count">
                                                 {formData.selectedSkills.length} skills selected
                                             </div>
                                             {errors.selectedSkills && (
                                                 <div className="error-message" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                                                     ⚠️ {errors.selectedSkills}
                                                 </div>
                                             )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Experience & Education */}
                                {currentStep === 3 && (
                                    <div className="form-step">
                                        <h2 className="step-title">Your background</h2>
                                        <p className="step-description">Help us understand your educational journey</p>

                                        <div className="form-grid">
                                            <div className={`form-group full-width ${errors.education ? 'has-error' : ''}`}>
                                                 <label htmlFor="education">Highest Education Level *</label>
                                                 <select
                                                     id="education"
                                                     name="education"
                                                     value={formData.education}
                                                     onChange={handleInputChange}
                                                 >
                                                     <option value="">Select...</option>
                                                     <option value="high-school">High School</option>
                                                     <option value="associate">Associate Degree</option>
                                                     <option value="bachelor">Bachelor's Degree</option>
                                                     <option value="master">Master's Degree</option>
                                                     <option value="phd">PhD</option>
                                                     <option value="bootcamp">Bootcamp</option>
                                                     <option value="self-taught">Self-Taught</option>
                                                 </select>
                                                 {errors.education && <span className="error-message">⚠️ {errors.education}</span>}
                                             </div>

                                            <div className="form-group">
                                                <label htmlFor="degree">Degree/Field of Study</label>
                                                <input
                                                    type="text"
                                                    id="degree"
                                                    name="degree"
                                                    value={formData.degree}
                                                    onChange={handleInputChange}
                                                    placeholder="Computer Science"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="institution">Institution</label>
                                                <input
                                                    type="text"
                                                    id="institution"
                                                    name="institution"
                                                    value={formData.institution}
                                                    onChange={handleInputChange}
                                                    placeholder="University Name"
                                                />
                                            </div>
                                        </div>

                                        <div className="certifications-section">
                                            <h3 className="section-subtitle">Certifications & Online Courses</h3>
                                            <div className="cert-form-row">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Certification Name"
                                                    value={newCert.name}
                                                    onChange={handleCertChange}
                                                    className="cert-input-main"
                                                />
                                                <input
                                                    type="text"
                                                    name="issuer"
                                                    placeholder="Issuer"
                                                    value={newCert.issuer}
                                                    onChange={handleCertChange}
                                                    className="cert-input-sub"
                                                />
                                                <input
                                                    type="text"
                                                    name="date"
                                                    placeholder="Year"
                                                    value={newCert.date}
                                                    onChange={handleCertChange}
                                                    className="cert-input-date"
                                                />
                                                <button type="button" className="btn btn-primary btn-sm" onClick={handleAddCertification}>
                                                    Add
                                                </button>
                                            </div>

                                            {formData.certifications.length > 0 && (
                                                <div className="cert-list">
                                                    {formData.certifications.map((cert, index) => (
                                                        <div key={index} className="cert-item">
                                                            <div className="cert-details">
                                                                <strong>{cert.name}</strong>
                                                                <span>{cert.issuer} • {cert.date}</span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="remove-cert-btn"
                                                                onClick={() => handleRemoveCertification(index)}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Career Goals */}
                                {currentStep === 4 && (
                                    <div className="form-step">
                                        <h2 className="step-title">Where do you want to go?</h2>
                                        <p className="step-description">Define your career aspirations</p>

                                        <div className="form-grid">
                                            <div className={`form-group full-width ${errors.targetRole ? 'has-error' : ''}`}>
                                                 <label htmlFor="targetRole">Target Role *</label>
                                                 <input
                                                     type="text"
                                                     id="targetRole"
                                                     name="targetRole"
                                                     value={formData.targetRole}
                                                     onChange={handleInputChange}
                                                     placeholder="Senior Software Engineer, Tech Lead, etc."
                                                 />
                                                 {errors.targetRole && <span className="error-message">⚠️ {errors.targetRole}</span>}
                                             </div>

                                            <div className="form-group">
                                                <label htmlFor="targetIndustry">Target Industry</label>
                                                <input
                                                    type="text"
                                                    id="targetIndustry"
                                                    name="targetIndustry"
                                                    value={formData.targetIndustry}
                                                    onChange={handleInputChange}
                                                    placeholder="FinTech, Healthcare, etc."
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="timeframe">Desired Timeframe</label>
                                                <select
                                                    id="timeframe"
                                                    name="timeframe"
                                                    value={formData.timeframe}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="6-months">6 months</option>
                                                    <option value="1-year">1 year</option>
                                                    <option value="2-years">2 years</option>
                                                    <option value="3-years">3+ years</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="completion-message">
                                            <div className="completion-icon">🎯</div>
                                            <h3>You're almost there!</h3>
                                            <p>Complete your profile to unlock personalized career insights</p>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="form-actions">
                                    {currentStep > 1 && (
                                        <button type="button" className="btn btn-outline" onClick={prevStep}>
                                            ← Previous
                                        </button>
                                    )}

                                    <div className="spacer"></div>

                                    {currentStep < totalSteps ? (
                                        <button type="button" className="btn btn-primary" onClick={nextStep}>
                                            Next →
                                        </button>
                                    ) : (
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            Create Profile 🚀
                                        </button>
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

export default CreateProfile;
