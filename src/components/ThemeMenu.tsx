'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import Dropdown from './Dropdown';

const ThemeMenu = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <Dropdown
      trigger={
        <span className="text-sm font-medium text-gray-300">
          {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
        </span>
      }
    >
      <button
        onClick={() => handleThemeChange('light')}
        className="text-sm text-gray-300 hover:text-white"
        aria-label="Switch to Light theme"
      >
        Light
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className="text-sm text-gray-300 hover:text-white"
        aria-label="Switch to Dark theme"
      >
        Dark
      </button>
      <button
        onClick={() => handleThemeChange('system')}
        className="text-sm text-gray-300 hover:text-white"
        aria-label="Use system theme"
      >
        System
      </button>
    </Dropdown>
  );
};

export default ThemeMenu;