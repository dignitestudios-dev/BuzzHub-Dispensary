import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const test = "";
  return (
    <GlobalContext.Provider value={{ test, navigate }}>
      {children}
    </GlobalContext.Provider>
  );
};