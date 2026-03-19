import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AnimatedLogo from './AnimatedLogo';
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
    label: 'Profile',
    dropdown: [
      { label: 'Create Profile', path: '/profile/create' },
      { label: 'Edit Skills', path: '/profile/edit-skills' },
      { label: 'Skill Levels', path: '/profile/skill-levels' }
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

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const handleDropdownTrigger = (label, isMobile) => {
    if (isMobile) {
      if (activeDropdown === label) {
        setActiveDropdown(null);
      } else {
        setActiveDropdown(label);
      }
    }
  };

  const handleMouseEnter = (label) => {
    if (window.innerWidth > 1240) {
      setActiveDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1240) {
      setActiveDropdown(null);
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="brand-logo">
          <AnimatedLogo />
          <span className="logo-text">CareerOrbit AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu desktop-menu">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`nav-item ${item.dropdown ? 'has-dropdown' : ''}`}
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.path ? (
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`nav-link ${activeDropdown === item.label ? 'active' : ''}`}>
                  {item.label}
                </span>
              )}

              {item.dropdown && (
                <div className={`dropdown-menu ${activeDropdown === item.label ? 'show' : ''}`}>
                  {item.dropdown.map((subItem) => (
                    <Link key={subItem.label} to={subItem.path} className="dropdown-item">
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="nav-actions desktop-actions">
          <LanguageSelector />
          {user ? (
            <>
              <span className="user-welcome">Hello, <strong>{user.username}</strong></span>
              <button onClick={logout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline mr-2">Login</Link>
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
            </>
          )}
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg className="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg className="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="mobile-nav-group">
                <div
                  className="mobile-nav-header"
                  onClick={() => handleDropdownTrigger(item.label, true)}
                >
                  {item.path ? (
                    <Link to={item.path} className="mobile-nav-link">{item.label}</Link>
                  ) : (
                    <span className="mobile-nav-link">{item.label}</span>
                  )}
                  {item.dropdown && (
                    <span className={`arrow ${activeDropdown === item.label ? 'up' : 'down'}`}>▼</span>
                  )}
                </div>

                {item.dropdown && (
                  <div className={`mobile-dropdown ${activeDropdown === item.label ? 'open' : ''}`}>
                    {item.dropdown.map((subItem) => (
                      <Link key={subItem.label} to={subItem.path} className="mobile-sub-link">
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mobile-actions">
              <div className="mobile-action-group">
                <span className="mobile-action-label">Language</span>
                <div className="mobile-language-container">
                  <LanguageSelector />
                  <span className="mobile-lang-name">Select Language</span>
                </div>
              </div>
              
              <div className="mobile-action-group">
                <span className="mobile-action-label">Appearance</span>
                <button onClick={toggleTheme} className="theme-toggle-btn-mobile btn full-width mb-2" aria-label="Toggle Theme">
                  <span className="mobile-theme-text">
                    {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </span>
                </button>
              </div>

              <div className="mobile-primary-action">
                <Link to="/profile/create" className="btn btn-primary full-width">Get Started</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
