'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Dropdown from './Dropdown';

const ThemeMenu = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  // Calcula el label solo después de montar
  const themeLabel = mounted
    ? theme === 'light'
      ? 'Light'
      : theme === 'dark'
      ? 'Dark'
      : 'System'
    : 'Theme';

  return (
    <Dropdown
      trigger={
        <span className="text-sm font-medium text-gray-300">
          {themeLabel}
        </span>
      }
    >
      <button
        onClick={() => handleThemeChange('light')}
        className="text-sm text-gray-300 hover:text-white"
        aria-label="Switch to Light theme"
        disabled={!mounted}
      >
        Light
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className="text-sm text-gray-300 hover:text-white"
        aria-label="Switch to Dark theme"
        disabled={!mounted}
      >
        Dark
      </button>
      <button
        onClick={() => handleThemeChange('system')}
        className="text-sm text-gray-300 hover:text-white"
        aria-label="Use system theme"
        disabled={!mounted}
      >
        System
      </button>
    </Dropdown>
  );
};

export default ThemeMenu;