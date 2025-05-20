import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRemoteConfigData } from "../firebase/firestoreService";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const test = "";
    const [stateNames, setStateNames] = useState();


  const fetchData = async () => {
      try {
        const remoteData = await getRemoteConfigData();
        setStateNames(remoteData);
  
      } catch (err) {
        console.log(err, "error in fetching remote config data");
      }
  
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  return (
    <GlobalContext.Provider value={{ test, navigate, stateNames }}>
      {children}
    </GlobalContext.Provider>
  );
};