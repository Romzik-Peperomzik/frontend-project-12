/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

import ThemeContext from './themeContext';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      setLightTheme,
      setDarkTheme,
    }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
