import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Chatbot.css';

const ChatbotLaunchButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Do not show the floating orb on the actual chat page itself
    if (location.pathname === '/ai-chat') return null;

    return (
        <div className="chat-launcher-3d-wrapper">
            <button className="chat-launch-btn-3d" onClick={() => navigate('/ai-chat')} aria-label="Open AI Chat">
                <div className="bubble-back-orange"></div>
                <div className="bubble-front-glass">
                    <div className="inner-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default ChatbotLaunchButton;
