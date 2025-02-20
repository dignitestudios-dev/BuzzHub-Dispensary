import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = (data) => {
    setUserId(data?.data?._id);
    setToken(data?.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", data?.token);
    localStorage.setItem("userId", data?.data?._id);
    localStorage.setItem("userData", JSON.stringify(data?.data));
  };

  const signOut = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, signIn, signOut, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
