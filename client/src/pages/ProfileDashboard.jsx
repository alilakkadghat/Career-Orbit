import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CreateProfile from './CreateProfile';
import EditSkills from './EditSkills';
import SkillLevels from './SkillLevels';
import { useAuth } from '../context/AuthContext';
import './ProfileDashboard.css';

const ProfileDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('basic-info');

  const tabs = [
    {
      id: 'basic-info',
      label: 'Profile Details',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'edit-skills',
      label: 'Edit Skills',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
        </svg>
      )
    },
    {
      id: 'skill-levels',
      label: 'Skill Levels',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      )
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'basic-info': return <CreateProfile onNext={() => setActiveTab('edit-skills')} />;
      case 'edit-skills': return <EditSkills onNext={() => setActiveTab('skill-levels')} />;
      case 'skill-levels': return <SkillLevels />;
      default: return <CreateProfile onNext={() => setActiveTab('edit-skills')} />;
    }
  };

  return (
    <div className="profile-dashboard">
      <Navbar />

      <div className="sidebar-wrapper">
        <div className="sidebar-hover-trigger">
            <div className="sidebar-hint-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
        </div>

        <aside className="profile-sidebar">
          <div className="sidebar-header">
              <div className="avatar-circle">
                 {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="user-info-text">
                <div className="user-name">{user?.username || 'User'}</div>
                <div className="user-email">{user?.email || 'user@example.com'}</div>
              </div>
          </div>

          <div className="sidebar-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="tab-icon-wrapper">{tab.icon}</div>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className="profile-layout">
        <main className="profile-content">
          {renderContent()}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileDashboard;
