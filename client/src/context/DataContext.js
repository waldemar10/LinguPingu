import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedGrammarLessonData, setSelectedGrammarLessonData] = useState();
  const [selectedTab, setSelectedTab] = useState();


  return (
    <DataContext.Provider value={{ selectedGrammarLessonData,setSelectedGrammarLessonData,selectedTab,setSelectedTab }}>
      {children}
    </DataContext.Provider>
  );
};
