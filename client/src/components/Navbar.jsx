import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import LanguageSelector from './LanguageSelector';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  {
    label: 'Overview',
    dropdown: [
      { label: 'Problem Statement', path: '/problem' },
      { label: 'Our Solution', path: '/solution' }
    ]
  },
  {
    label: 'Career Path',
    dropdown: [
      { label: 'Role Recommendations', path: '/career/recommendations' },
      { label: 'Career Timeline', path: '/career/timeline' },
      { label: 'Sector Transitions', path: '/career/transitions' },
      { label: 'Career Simulator', path: '/career/simulator' }
    ]
  },
  {
    label: 'Learning Path',
    dropdown: [
      { label: 'Skill Gap Analysis', path: '/learning/gap-analysis' },
      { label: 'Recommended Courses', path: '/learning/courses' },
      { label: 'Learning Duration', path: '/learning/duration' }
    ]
  },
  {
    label: 'Placement',
    dropdown: [
      { label: 'Job Recommendations', path: '/placement/jobs' },
      { label: 'Resume Creator', path: '/resume/builder' }
    ]
  },
  {
    label: 'Dashboard',
    dropdown: [
      { label: 'Skill Demand Trends', path: '/dashboard/trends' },
      { label: 'Skill Decay', path: '/dashboard/decay' },
      { label: 'Fairness Metrics', path: '/dashboard/fairness' }
    ]
  }
];

const SidebarMenuItem = ({ item, location }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasDropdown = Boolean(item.dropdown);
  const isActive = location.pathname === item.path || (hasDropdown && item.dropdown.some(i => location.pathname === i.path));

  // Auto expand if a child route is active
  useEffect(() => {
    if (hasDropdown && item.dropdown.some(i => location.pathname === i.path)) {
      setIsExpanded(true);
    }
  }, [location.pathname, item.dropdown, hasDropdown]);

  if (!hasDropdown) {
    return (
      <div className="sidebar-nav-item">
        <Link to={item.path} className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}>
          <span>{item.label}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={`sidebar-nav-item ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{item.label}</span>
        {/* Animated Chevron Arrow */}
        <svg className="sidebar-nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="sidebar-subnav">
        {item.dropdown.map(subItem => (
          <Link 
            key={subItem.path} 
            to={subItem.path}
            className={`sidebar-subnav-link ${location.pathname === subItem.path ? 'active' : ''}`}
          >
            {subItem.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Close profile dropdown when route changes
  useEffect(() => {
    setIsProfileDropdownOpen(false);
  }, [location]);

  return (
    <div className="global-sidebar-wrapper">
      <div className="global-sidebar-trigger">
          <div className="global-sidebar-hint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
          </div>
      </div>
      
      <aside className="global-sidebar">
        <div className="global-sidebar-header">
           <Link to="/" className="sidebar-brand-logo">
             <span className="logo-text">CareerOrbit</span>
           </Link>
        </div>
        
        <div className="global-sidebar-nav">
          {NAV_ITEMS.map((item) => (
             <SidebarMenuItem key={item.label} item={item} location={location} />
          ))}
        </div>
        
        <div className="global-sidebar-footer">
           <div className="footer-actions-row">
             <LanguageSelector />
             <button onClick={toggleTheme} className="sidebar-theme-toggle" aria-label="Toggle Theme">
                {theme === 'dark' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                )}
             </button>
           </div>
           
           {!user ? (
             <div className="auth-actions-sidebar">
               <Link to="/login" className="btn btn-outline full-width mb-2">Login</Link>
               <Link to="/signup" className="btn btn-primary full-width">Get Started</Link>
             </div>
           ) : (
             <div className="profile-container-sidebar">
               <div className="sidebar-user-info" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                  <div className="sidebar-avatar">
                     {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="sidebar-username">
                    <div className="name-text">{user?.username || 'User'}</div>
                    <div className="email-text">{user?.email || 'user@college.edu'}</div>
                  </div>
                  <div className={`profile-dropdown-arrow ${isProfileDropdownOpen ? 'open' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
               </div>
               
               {isProfileDropdownOpen && (
                 <div className="sidebar-profile-actions">
                    <Link to="/profile" className="profile-action-btn">Edit Profile</Link>
                    <button onClick={logout} className="profile-action-btn text-error">Sign out</button>
                 </div>
               )}
             </div>
           )}
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
