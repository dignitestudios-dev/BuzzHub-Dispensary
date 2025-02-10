import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [school, setSchool] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = (data) => {
        console.log("response`` ", data)
        setSchool(data?.school);
        setToken(data?.token);
        setIsAuthenticated(true);
    };

    const signOut = () => {
        setSchool(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    

    return (
        <AuthContext.Provider value={{ school, token, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };