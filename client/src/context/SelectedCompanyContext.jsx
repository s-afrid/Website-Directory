import React, { createContext, useState, useContext } from "react";

// Create the context
const SelectedCompanyContext = createContext();

// Provider component
export const SelectedCompanyProvider = ({ children }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <SelectedCompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </SelectedCompanyContext.Provider>
  );
};

// Custom hook for easy access
export const useSelectedCompany = () => useContext(SelectedCompanyContext);
