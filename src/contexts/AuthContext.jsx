import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = (data) => {
    setUserId(data?.data?._id);
    setToken(data?.token);
    setIsAuthenticated(true);
    setUserData(data?.data);
    localStorage.setItem("token", data?.token);
    localStorage.setItem("userId", data?.data?._id);
    localStorage.setItem("userData", JSON.stringify(data?.data));
  };

  const signOut = () => {
    setToken(null);
    setUserData(null)
    setIsAuthenticated(false);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, userData, isAuthenticated, signIn, signOut, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
