import React, { createContext, useState } from 'react';

// Create Context
export const SettingsContext = createContext();

// Provider Component
export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(20); // Default font size
  const [speechRate, setSpeechRate] = useState(1.0); // Default speech rate
  const [favorites, setFavorites] = useState([]); // Favorites list

  return (
    <SettingsContext.Provider value={{
      fontSize,
      setFontSize,
      speechRate,
      setSpeechRate,
      favorites,
      setFavorites,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
