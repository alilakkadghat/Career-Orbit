import React, { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const LANGUAGES = [
  { code: 'en',    name: 'English',    nativeName: 'English',    flag: '🇬🇧' },
  { code: 'hi',    name: 'Hindi',      nativeName: 'हिन्दी',      flag: '🇮🇳' },
  { code: 'mr',    name: 'Marathi',    nativeName: 'मराठी',      flag: '🇮🇳' },
  { code: 'ur',    name: 'Urdu',       nativeName: 'اردو',       flag: '🇵🇰' },
  { code: 'es',    name: 'Spanish',    nativeName: 'Español',    flag: '🇪🇸' },
  { code: 'fr',    name: 'French',     nativeName: 'Français',   flag: '🇫🇷' },
  { code: 'de',    name: 'German',     nativeName: 'Deutsch',    flag: '🇩🇪' },
  { code: 'ar',    name: 'Arabic',     nativeName: 'العربية',    flag: '🇸🇦' },
  { code: 'it',    name: 'Italian',    nativeName: 'Italiano',   flag: '🇮🇹' },
  { code: 'pt',    name: 'Portuguese', nativeName: 'Português',  flag: '🇧🇷' },
  { code: 'ja',    name: 'Japanese',   nativeName: '日本語',      flag: '🇯🇵' },
  { code: 'zh-CN', name: 'Chinese',    nativeName: '中文',        flag: '🇨🇳' },
  { code: 'ru',    name: 'Russian',    nativeName: 'Русский',    flag: '🇷🇺' },
  { code: 'tr',    name: 'Turkish',    nativeName: 'Türkçe',     flag: '🇹🇷' },
  { code: 'id',    name: 'Indonesian', nativeName: 'Bahasa',     flag: '🇮🇩' },
  { code: 'vi',    name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'pl',    name: 'Polish',     nativeName: 'Polski',     flag: '🇵🇱' },
  { code: 'ro',    name: 'Romanian',   nativeName: 'Română',     flag: '🇷🇴' },
  { code: 'nl',    name: 'Dutch',      nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'uk',    name: 'Ukrainian',  nativeName: 'Українська', flag: '🇺🇦' },
];

const STORAGE_KEY = 'co_lang';

export function LanguageProvider({ children }) {
  const [selectedLang] = useState(() => localStorage.getItem(STORAGE_KEY) || 'en');

  const setLanguage = useCallback((code) => {
    if (code === 'en') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, code);
    }
    if (typeof window.doGTranslate === 'function') {
      window.doGTranslate('en|' + code);
    } else {
      window.location.reload();
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ selectedLang, setLanguage, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
