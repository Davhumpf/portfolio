'use client';

import React from 'react';
import { useLang, type Lang } from '@/context/LanguageProvider';
import Dropdown from './Dropdown';

const LangMenu = () => {
  const { lang, setLang } = useLang();

  const handleLanguageChange = (newLang: Lang) => {
    setLang(newLang);
  };

  const getLangLabel = () => {
    switch (lang) {
      case 'en': return 'English';
      case 'es': return 'Español';
      case 'de': return 'Deutsch';
      default: return 'Español';
    }
  };

  return (
    <Dropdown
      trigger={
        <span className="text-sm font-medium text-gray-300">
          {getLangLabel()}
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
      <button
        onClick={() => handleLanguageChange('de')}
        className="text-sm text-gray-300 hover:text-white"
        aria-label="Zu Deutsch wechseln"
      >
        Deutsch
      </button>
    </Dropdown>
  );
};

export default LangMenu;