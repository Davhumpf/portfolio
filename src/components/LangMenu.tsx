'use client';

import React, { createContext, useContext, useState } from 'react';
import Dropdown from './Dropdown';

// Create a simple context for language if store doesn't exist
const LangContext = createContext<{
  lang: 'en' | 'es';
  setLang: (lang: 'en' | 'es') => void;
} | null>(null);

// Hook to use language context
export const useLangContext = () => {
  const context = useContext(LangContext);
  // If no context provider, use local state as fallback
  const [localLang, setLocalLang] = useState<'en' | 'es'>('es');
  
  if (!context) {
    return { lang: localLang, setLang: setLocalLang };
  }
  return context;
};

const LangMenu = () => {
  const { lang, setLang } = useLangContext();

  const handleLanguageChange = (newLang: 'en' | 'es') => {
    setLang(newLang);
  };

  return (
    <Dropdown
      trigger={
        <span className="text-sm font-medium text-gray-300">
          {lang === 'en' ? 'English' : 'Español'}
        </span>
      }
    >
      <button
        onClick={() => handleLanguageChange('es')}
        className="text-sm text-gray-300 hover:text-white"
        aria-label="Cambiar a Español"
      >
        Español
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className="text-sm text-gray-300 hover:text-white"
        aria-label="Switch to English"
      >
        English
      </button>
    </Dropdown>
  );
};

export default LangMenu;
export { LangContext };