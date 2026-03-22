import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LanguageSelector = () => {
  const { selectedLang, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Close on Escape key and lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    // Prevent body scroll while modal open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Click on backdrop (not modal panel) → close
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleSelectLanguage = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const currentLang = languages.find((l) => l.code === selectedLang) || languages[0];

  return (
    <>
      {/* Dynamic Flag Button (Linguise style) */}
      <button
        className="lang-btn"
        onClick={() => setIsOpen(true)}
        aria-label={`Select language (current: ${currentLang.name})`}
        title={`Language: ${currentLang.name}`}
      >
        <span className="lang-flag-current notranslate">{currentLang.flag}</span>
      </button>

      {/* Modal - rendered via Portal to avoid parent transform Issues */}
      {isOpen && createPortal(
        <div
          className="lang-modal-overlay"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Language selector"
        >
          {/* translate="no" prevents Google Translate from mangling the modal UI */}
          <div className="lang-modal notranslate" ref={modalRef}>
            {/* Header */}
            <div className="lang-modal-header">
              <div className="lang-modal-title">
                <GlobeIcon />
                <span>Choose Language</span>
              </div>
              <button
                className="lang-modal-close notranslate"
                onClick={() => setIsOpen(false)}
                aria-label="Close language selector"
              >
                ✕
              </button>
            </div>

            {/* Language Grid */}
            <div className="lang-grid">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-card notranslate${selectedLang === lang.code ? ' active' : ''}`}
                  onClick={() => handleSelectLanguage(lang.code)}
                  title={lang.name}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <span className="lang-name">{lang.name}</span>
                  <span className="lang-native">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default LanguageSelector;
