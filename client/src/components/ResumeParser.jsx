import React, { useState, useRef } from 'react';
import './ResumeParser.css';

// Load PDF.js from CDN at runtime — avoids all Vite/worker bundling issues
const getPDFJS = () =>
    new Promise((resolve) => {
        if (window.pdfjsLib) {
            resolve(window.pdfjsLib);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve(window.pdfjsLib);
        };
        document.head.appendChild(script);
    });

// Comprehensive skills keyword dictionary
const SKILL_KEYWORDS = {
    technical: [
        'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Rust',
        'Ruby', 'Swift', 'Kotlin', 'PHP', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell',
        'React', 'Vue', 'Angular', 'Next.js', 'Nuxt', 'Svelte', 'Node.js', 'Express',
        'Django', 'Flask', 'Spring', 'Laravel', 'Rails', 'FastAPI', 'GraphQL', 'REST',
        'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'DynamoDB', 'SQLite',
        'HTML', 'CSS', 'Sass', 'Tailwind', 'Bootstrap', 'Material UI', 'Styled Components',
        'Machine Learning', 'Deep Learning', 'AI', 'NLP', 'Computer Vision', 'TensorFlow',
        'PyTorch', 'Keras', 'Scikit-learn', 'Data Science', 'Pandas', 'NumPy', 'Matplotlib',
        'System Design', 'Microservices', 'API Design', 'WebSockets', 'gRPC',
        'Blockchain', 'Smart Contracts', 'Solidity', 'Web3', 'Cybersecurity',
        'Testing', 'Jest', 'Pytest', 'Selenium', 'Cypress', 'Unit Testing', 'TDD'
    ],
    tools: [
        'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Docker', 'Kubernetes', 'Terraform',
        'AWS', 'Azure', 'GCP', 'Heroku', 'Netlify', 'Vercel', 'Linux', 'CI/CD',
        'Jenkins', 'GitHub Actions', 'CircleCI', 'Travis CI', 'Ansible', 'Puppet',
        'Jira', 'Confluence', 'Figma', 'Sketch', 'Adobe XD', 'Postman', 'Swagger',
        'VS Code', 'IntelliJ', 'Eclipse', 'Vim', 'Webpack', 'Vite', 'Babel',
        'Elasticsearch', 'Kafka', 'RabbitMQ', 'Nginx', 'Apache', 'DevOps', 'MLOps'
    ],
    soft: [
        'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Collaboration',
        'Project Management', 'Time Management', 'Critical Thinking', 'Creativity',
        'Adaptability', 'Mentoring', 'Public Speaking', 'Agile', 'Scrum', 'Kanban'
    ],
    languages: [
        'English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Arabic',
        'Japanese', 'Korean', 'Portuguese', 'Italian', 'Russian', 'Dutch'
    ]
};

const ALL_SKILLS = Object.entries(SKILL_KEYWORDS).flatMap(([cat, skills]) =>
    skills.map(skill => ({ skill, category: cat }))
);

const ResumeParser = ({ onSkillsDetected }) => {
    const [status, setStatus] = useState('idle'); // idle | loading | done | error
    const [detectedSkills, setDetectedSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [fileName, setFileName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef(null);

    const extractTextFromPDF = async (file) => {
        const pdfjsLib = await getPDFJS();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            fullText += content.items.map(item => item.str).join(' ') + ' ';
        }
        return fullText;
    };

    const extractTextFromTxt = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    };

    const matchSkills = (text) => {
        const normalizedText = text.toLowerCase();
        const found = [];
        for (const { skill, category } of ALL_SKILLS) {
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            if (regex.test(normalizedText)) {
                found.push({ skill, category });
            }
        }
        return found;
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setStatus('loading');
        setDetectedSkills([]);
        setSelectedSkills([]);
        setErrorMsg('');

        try {
            let text = '';
            if (file.type === 'application/pdf') {
                text = await extractTextFromPDF(file);
            } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                text = await extractTextFromTxt(file);
            } else {
                setErrorMsg('Please upload a PDF or TXT file.');
                setStatus('error');
                return;
            }

            const matched = matchSkills(text);
            if (matched.length === 0) {
                setErrorMsg("We couldn't detect any skills. Try a different format or add manually.");
                setStatus('error');
                return;
            }

            setDetectedSkills(matched);
            setSelectedSkills(matched.map(s => s.skill));
            setStatus('done');
        } catch (err) {
            console.error('Resume parse error:', err);
            setErrorMsg('Failed to read the file. Please try again.');
            setStatus('error');
        }

        // Reset file input
        e.target.value = '';
    };

    const toggleSkill = (skill) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const handleApply = () => {
        const grouped = {};
        detectedSkills
            .filter(d => selectedSkills.includes(d.skill))
            .forEach(({ skill, category }) => {
                if (!grouped[category]) grouped[category] = [];
                grouped[category].push(skill);
            });
        onSkillsDetected(grouped);
        setStatus('idle');
        setDetectedSkills([]);
        setSelectedSkills([]);
        setFileName('');
    };

    const categoryColors = {
        technical: '#3b82f6',
        tools: '#8b5cf6',
        soft: '#10b981',
        languages: '#f59e0b'
    };

    return (
        <div className="resume-parser-wrapper">
            <div className="rp-upload-zone" onClick={() => fileInputRef.current?.click()}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="resume-upload-input"
                />
                <div className="rp-upload-icon">📄</div>
                <div className="rp-upload-text">
                    {fileName ? (
                        <span className="rp-filename">{fileName}</span>
                    ) : (
                        <>
                            <strong>Upload Resume / CV</strong>
                            <span>PDF or TXT — skills auto-extracted by AI</span>
                        </>
                    )}
                </div>
                <div className="rp-upload-cta">Click to Upload</div>
            </div>

            {status === 'loading' && (
                <div className="rp-status loading">
                    <div className="rp-spinner"></div>
                    <span>Scanning resume for skills...</span>
                </div>
            )}

            {status === 'error' && (
                <div className="rp-status error">
                    <span>⚠️ {errorMsg}</span>
                </div>
            )}

            {status === 'done' && detectedSkills.length > 0 && (
                <div className="rp-results">
                    <div className="rp-results-header">
                        <div>
                            <h3>🎯 {detectedSkills.length} Skills Detected</h3>
                            <p>Uncheck any skills you want to exclude, then click Apply.</p>
                        </div>
                        <button className="rp-select-all" onClick={() =>
                            setSelectedSkills(
                                selectedSkills.length === detectedSkills.length
                                    ? []
                                    : detectedSkills.map(d => d.skill)
                            )
                        }>
                            {selectedSkills.length === detectedSkills.length ? 'Deselect All' : 'Select All'}
                        </button>
                    </div>

                    <div className="rp-skills-list">
                        {detectedSkills.map(({ skill, category }) => (
                            <button
                                key={skill}
                                className={`rp-skill-pill ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                                style={{ '--pill-color': categoryColors[category] }}
                                onClick={() => toggleSkill(skill)}
                            >
                                {selectedSkills.includes(skill) ? '✓' : '+'} {skill}
                                <span className="rp-cat-badge">{category}</span>
                            </button>
                        ))}
                    </div>

                    <div className="rp-actions">
                        <button className="btn btn-outline" onClick={() => { setStatus('idle'); setFileName(''); }}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleApply}
                            disabled={selectedSkills.length === 0}
                        >
                            Apply {selectedSkills.length} Skills →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeParser;
