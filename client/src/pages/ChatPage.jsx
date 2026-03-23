import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../context/useResume';
import { extractFileText } from '../utils/pdfParser';
import Navbar from '../components/Navbar';
import './ChatPage.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const ChatPage = () => {
    const { resumeData, hasResume, saveResume } = useResume();
    
    const [chatMode, setChatMode] = useState('mentor');
    const [chatResumeText, setChatResumeText] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to Orbit AI. Your dedicated campus placement intelligence.", type: 'ai' },
        { id: 2, text: "Upload your resume using the 📎 button below and select a persona at the top to begin.", type: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    // Voice Features State
    const [isListening, setIsListening] = useState(false);
    const [isVoiceResponseEnabled, setIsVoiceResponseEnabled] = useState(false);

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const historyRef = useRef([]);
    const recognitionRef = useRef(null);
    const baseInputRef = useRef(''); // Stores input value at moment recording starts
    const shouldListenRef = useRef(false); // Track if we INTEND to listen (to handle auto-restart)
    const latestInputRef = useRef(''); // Track latest input value for seamless restarts

    // Sync context resume to chat state
    useEffect(() => {
        if (hasResume && resumeData?.text) {
            setChatResumeText(resumeData.text);
        }
    }, [hasResume, resumeData]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Keep latestInputRef in sync with state for access inside closures
    useEffect(() => {
        latestInputRef.current = inputValue;
    }, [inputValue]);

    // --- Voice Input Logic (Dynamic Instantiation) ---
    // We do not initialize in useEffect anymore to prevent stale instances. 
    // Instead we create a fresh SpeechRecognition instance when the user clicks start.

    const startVoiceInput = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice input is not supported in this browser. Please try Chrome, Edge, or Safari.");
            return;
        }

        // 1. Cleanup previous instance if any
        if (recognitionRef.current) {
            try { recognitionRef.current.abort(); } catch { /* ignore */ }
        }

        // 2. Create new instance
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;

        // 3. Set up handlers
        recognition.onstart = () => {
            console.log("🎤 Voice Recognition Started");
            setIsListening(true);
            shouldListenRef.current = true;
        };

        recognition.onend = () => {
            console.log("🎤 Voice Recognition Ended");
            // Auto-restart pattern if the user didn't manually stop
            if (shouldListenRef.current) {
                console.log("↻ Restarting voice recognition...");
                baseInputRef.current = latestInputRef.current;
                try {
                    recognition.start();
                } catch (e) {
                    console.error("Restart failed", e);
                    setIsListening(false);
                    shouldListenRef.current = false;
                }
            } else {
                setIsListening(false);
            }
        };

        recognition.onresult = (event) => {
            // Robust result handling
            const results = Array.from(event.results);
            const currentSessionTranscript = results
                .map(result => result[0]?.transcript || '')
                .join('');

            // Only update if we have actual text
            if (currentSessionTranscript) {
                setInputValue(() => {
                    // We always build upon the base text that existed when THIS session started
                    // (or was updated during a restart)
                    const base = baseInputRef.current || '';
                    const cleanBase = base.trim();
                    const cleanTranscript = currentSessionTranscript.trim();
                    
                    if (!cleanTranscript) return base;

                    // Smart spacing
                    const spacer = (cleanBase.length > 0 && !base.endsWith(' ')) ? ' ' : '';
                    return base + spacer + cleanTranscript;
                });
            }
        };

        recognition.onerror = (event) => {
            console.error("Voice Error:", event.error);
            if (event.error === 'not-allowed') {
                alert("Microphone access blocked. Please allow permissions.");
                shouldListenRef.current = false;
                setIsListening(false);
            } else if (event.error === 'audio-capture') {
                alert("No microphone validation found.");
                shouldListenRef.current = false;
                setIsListening(false);
            }
            // 'no-speech' is common, we just let it restart via onend
        };

        // 4. Start
        try {
            // Important: Update baseInputRef to current input before we start listening
            baseInputRef.current = inputValue; 
            recognition.start();
            
            // Assign to ref for cleanup later
            recognitionRef.current = recognition;
        } catch (err) {
            console.error("Failed to start speech recognition:", err);
        }
    };

    const stopVoiceInput = () => {
        shouldListenRef.current = false;
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    };

    const toggleListening = () => {
        if (isListening) {
            stopVoiceInput();
        } else {
            // Cancel any AI speech first
            window.speechSynthesis.cancel();
            startVoiceInput();
        }
    };

    // Cleanup on unmount only
    useEffect(() => {
        return () => {
            shouldListenRef.current = false;
            if (recognitionRef.current) {
                try { recognitionRef.current.abort(); } catch { /* ignore */ }
            }
        };
    }, []);

    // --- Voice Output Logic ---
    useEffect(() => {
        if (isVoiceResponseEnabled && messages.length > 0) {
            const lastMsg = messages[messages.length - 1];
            // Only speak if it's an AI message and it was just added (checking specific ID or logic)
            // Ideally, we cancel previous speech to avoid overlap
            if (lastMsg.type === 'ai') {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(lastMsg.text);
                // Optional: Select a better voice if available
                const voices = window.speechSynthesis.getVoices();
                // Try to find a "Google US English" or similar generic pleasant voice
                const preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices[0];
                if (preferredVoice) utterance.voice = preferredVoice;
                
                utterance.rate = 1.0;
                window.speechSynthesis.speak(utterance);
            }
        } else {
            window.speechSynthesis.cancel(); // Stop speaking if toggled off
        }
    }, [messages, isVoiceResponseEnabled]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setIsUploading(true);
        setMessages(prev => [...prev, { id: Date.now(), text: `Processing document: ${file.name}...`, type: 'user' }]);
        
        try {
            const text = await extractFileText(file);
            if (text.length < 50) throw new Error("File content too short or unreadable.");
            
            setChatResumeText(text);
            if (saveResume) saveResume(text, file.name, []);
            
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                text: `✅ Document successfully parsed. Select a persona from the top navigation to begin roleplay.`, 
                type: 'ai' 
            }]);
        } catch (err) {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: `❌ Parsing failed: ${err.message}`, type: 'ai' }]);
        } finally {
            setIsUploading(false);
            e.target.value = null;
        }
    };

    const handleModeSelect = async (mode) => {
        if (!chatResumeText && mode !== 'mentor') {
            setMessages(prev => [...prev, { id: Date.now(), text: "⚠️ A resume PDF is required to activate this persona. Please attach one using the input bar below.", type: 'ai' }]);
            return;
        }

        setChatMode(mode);
        historyRef.current = []; // Clear history on persona switch

        if (mode === 'resume_roast') {
            setMessages(prev => [...prev, { id: Date.now(), text: "Initializing deep analysis... 🔥 Brace yourself.", type: 'ai' }]);
            setIsTyping(true);
            try {
                const res = await axios.post(`${API_BASE}/api/resume/parse`, {
                    resumeText: chatResumeText,
                    targetRole: 'General Software Engineering'
                });
                const roastText = res.data?.roast || res.data?.data?.roast || "Analysis failed due to server timeout.";
                setMessages(prev => [...prev, { id: Date.now() + 1, text: roastText, type: 'ai' }]);
            } catch {
                setMessages(prev => [...prev, { id: Date.now() + 1, text: "Server error connecting to Intelligence Matrix.", type: 'ai' }]);
            }
            setIsTyping(false);
            setChatMode('mentor');
        } 
        else if (mode === 'mock_interview') {
            setMessages(prev => [...prev, { id: Date.now(), text: "💼 Persona: Technical Interviewer.\n\nI have reviewed your resume in full. Please introduce yourself and highlight your most relevant project.", type: 'ai' }]);
        } 
        else if (mode === 'salary_negotiator') {
            setMessages(prev => [...prev, { id: Date.now(), text: "💰 Persona: Strict HR Manager.\n\nThank you for sitting down with me. Based on the profile you submitted, what are your exact compensation expectations for this cycle?", type: 'ai' }]);
        } 
        else {
            setMessages(prev => [...prev, { id: Date.now(), text: "🎓 Persona: Career Mentor.\n\nReturning to general assistance mode. What's on your mind?", type: 'ai' }]);
        }
    };

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        const text = inputValue.trim();
        if (!text) return;

        // Stop listening if user sends manual message while dictating
        // AND turn off the auto-restart flag
        if (shouldListenRef.current && recognitionRef.current) {
            shouldListenRef.current = false; 
            recognitionRef.current.stop();
        }

        const userMsg = { id: Date.now(), text, type: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        historyRef.current = [...historyRef.current, { role: 'user', text }].slice(-6);

        try {
            const res = await axios.post(`${API_BASE}/api/chatbot/message`, {
                message: text,
                history: historyRef.current.slice(0, -1),
                chatMode: chatMode,
                resumeText: chatResumeText
            });

            const aiText = res.data?.reply || "System anomaly detected in generation pipeline.";
            const aiMsg = { id: Date.now() + 1, text: aiText, type: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
            historyRef.current = [...historyRef.current, { role: 'ai', text: aiText }].slice(-6);
        } catch (err) {
            console.error('[ChatPage] API error:', err);
            const fallbackMsg = { id: Date.now() + 1, text: "Connection issue. Please ensure your GEMINI_API_KEY is configured correctly on the server backend.", type: 'ai' };
            setMessages(prev => [...prev, fallbackMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-page-root">
            <Navbar />
            
            <div className="chat-page-background">
                {/* Abstract ambient blurred orbs for ChatGPT-like aesthetic */}
                <div className="ambient-orb orb-1"></div>
                <div className="ambient-orb orb-2"></div>
                <div className="ambient-orb orb-3"></div>
            </div>

            <main className="chat-page-main">
                <motion.div 
                    className="chat-glass-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Top Mode Selector (Pill Style) */}
                    <header className="chat-glass-header">
                        <div className="chat-mode-pills">
                            <button className={`mode-pill ${chatMode === 'mentor' ? 'active' : ''}`} onClick={() => handleModeSelect('mentor')}>Mentor</button>
                            <button className={`mode-pill ${chatMode === 'mock_interview' ? 'active' : ''}`} onClick={() => handleModeSelect('mock_interview')}>Interview</button>
                            <button className={`mode-pill ${chatMode === 'salary_negotiator' ? 'active' : ''}`} onClick={() => handleModeSelect('salary_negotiator')}>Salary Negotiation</button>
                            <button className={`mode-pill ${chatMode === 'resume_roast' ? 'active' : ''}`} onClick={() => handleModeSelect('resume_roast')}>Roast</button>
                        </div>
                        
                        {/* Voice Output Toggle (Top Right) */}
                        <button 
                            className={`voice-toggle-top-btn ${isVoiceResponseEnabled ? 'active' : ''}`}
                            onClick={() => setIsVoiceResponseEnabled(!isVoiceResponseEnabled)}
                            title={isVoiceResponseEnabled ? "Mute AI Voice" : "Enable AI Voice Response"}
                        >
                            {isVoiceResponseEnabled ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            )}
                        </button>
                    </header>

                    {/* Chat Scroll Area */}
                    <div className="chat-glass-messages">
                        <AnimatePresence initial={false}>
                            {messages.map(msg => (
                                <motion.div 
                                    key={msg.id} 
                                    className={`glass-msg-row ${msg.type}`}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {msg.type === 'ai' && (
                                        <div className="ai-avatar-3d">
                                            <div className="mini-bubble-back"></div>
                                            <div className="mini-bubble-front">
                                                <span className="mini-dot"></span>
                                                <span className="mini-dot"></span>
                                                <span className="mini-dot"></span>
                                            </div>
                                        </div>
                                    )}
                                    <div className={`glass-bubble ${msg.type}`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        
                        {isTyping && (
                            <motion.div 
                                className="glass-msg-row ai"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="ai-avatar-3d">
                                    <div className="mini-bubble-back"></div>
                                    <div className="mini-bubble-front">
                                        <span className="mini-dot"></span>
                                        <span className="mini-dot"></span>
                                        <span className="mini-dot"></span>
                                    </div>
                                </div>
                                <div className="glass-bubble ai typing">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} className="scroll-anchor" />
                    </div>

                    {/* Bottom Wide Input Pill */}
                    <footer className="chat-glass-footer">
                        <form className="chat-input-pill-wrapper" onSubmit={handleSend}>
                            <input
                                type="file"
                                accept=".pdf,.txt"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                            
                            <button
                                type="button"
                                className={`chat-attach-btn ${chatResumeText ? 'has-file' : ''}`}
                                onClick={() => fileInputRef.current?.click()}
                                title={chatResumeText ? (resumeData?.fileName ? `Loaded: ${resumeData.fileName}` : 'Loaded') : 'Attach PDF Resume'}
                            >
                                {isUploading ? (
                                    <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="30 60"></circle></svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                )}
                            </button>

                            <input
                                type="text"
                                className="chat-text-input"
                                placeholder={isListening ? "Listening..." : (chatMode === 'mock_interview' ? "Answer the interviewer..." : "Message Orbit AI...")}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />

                            {/* New Voice Input Button (Transcribe) */}
                            <button 
                                type="button" 
                                className={`chat-mic-btn ${isListening ? 'listening' : ''}`}
                                onClick={toggleListening}
                                title="Voice Input"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            </button>

                            <button type="button" className={`chat-send-btn ${inputValue.trim() ? 'active' : ''}`} onClick={handleSend}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </form>
                        <div className="chat-legal-disclaimer">
                            Orbit AI can make mistakes. Consider verifying important information.
                        </div>
                    </footer>
                </motion.div>
            </main>
        </div>
    );
};

export default ChatPage;
