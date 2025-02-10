import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext.jsx";
import { AuthProvider } from './contexts/AuthContext';
import { ToasterContainer } from "./components/global/Toaster.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ToasterContainer/>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
     </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);