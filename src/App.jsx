import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthenticationRoutes } from "./routes/AuthenticationRoutes";
import { normalRoutes } from "./routes/NormalRoutes";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "./routes/ProtectedRoutes";

function App() {
  const { token, userData } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public / Auth Routes */}
      <Route element={<PublicRoute token={token} userData={userData} />}>
        {AuthenticationRoutes.map((route) => (
          <Route path={route?.url} element={route?.page} key={route?.title} />
        ))}
      </Route>

      {/* Protected Routes (only accessible if token exists) */}
      <Route element={<ProtectedRoute token={token} />}>
        {normalRoutes.map((route) => (
          <Route path={route?.url} element={route?.page} key={route?.title} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
