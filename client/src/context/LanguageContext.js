import React, { createContext, useState, useContext } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [learningLanguage, setLearningLanguage] = useState();
  const [nativeLanguage, setNativeLanguage] = useState();
  const [appLanguage, setAppLanguage] = useState();

  return (
    <LanguageContext.Provider value={{ learningLanguage, nativeLanguage, setNativeLanguage, setLearningLanguage,appLanguage,setAppLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};