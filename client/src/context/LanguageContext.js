import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [targetLanguage, setTargetLanguage] = useState();
  const [nativeLanguage, setNativeLanguage] = useState();

  const setLanguages = (target, native) => {
    setTargetLanguage(target);
    setNativeLanguage(native);
  };

  return (
    <LanguageContext.Provider value={{ targetLanguage, nativeLanguage, setLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};