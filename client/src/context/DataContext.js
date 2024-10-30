import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loadedData, setLoadedData] = useState();
  const [selectedTab, setSelectedTab] = useState();


  return (
    <DataContext.Provider value={{ loadedData, setLoadedData,selectedTab,setSelectedTab }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
export const useSelectedTab = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};