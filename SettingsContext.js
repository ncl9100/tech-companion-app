import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(18);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [favorites, setFavorites] = useState([]);
  const [completedGuides, setCompletedGuides] = useState([]);
  const [readGuides, setReadGuides] = useState([]);

  const markGuideAsCompleted = (guideId) => {
    setCompletedGuides(prev => {
      if (!prev.includes(guideId)) {
        return [...prev, guideId];
      }
      return prev;
    });
  };

  const markGuideAsRead = (guideId) => {
    setReadGuides(prev => {
      if (!prev.includes(guideId)) {
        return [...prev, guideId];
      }
      return prev;
    });
  };

  const isGuideCompleted = (guideId) => {
    return completedGuides.includes(guideId);
  };

  const isGuideRead = (guideId) => {
    return readGuides.includes(guideId);
  };

  const clearCompletedGuides = () => {
    setCompletedGuides([]);
    setReadGuides([]);
  };

  const value = {
    fontSize,
    setFontSize,
    speechRate,
    setSpeechRate,
    favorites,
    setFavorites,
    completedGuides,
    readGuides,
    markGuideAsCompleted,
    markGuideAsRead,
    isGuideCompleted,
    isGuideRead,
    clearCompletedGuides,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };
