import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthenticationRoutes } from "./routes/AuthenticationRoutes";
import { normalRoutes } from "./routes/NormalRoutes";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "./routes/ProtectedRoutes";
function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<PublicRoute token={token} />}>
        {AuthenticationRoutes.map((route) => {
          return (
            <Route path={route?.url} element={route?.page} key={route?.title} />
          );
        })}
      </Route>

      <Route element={<ProtectedRoute token={token} />}>
        {normalRoutes.map((route) => {
          return (
            <Route path={route?.url} element={route?.page} key={route?.title} />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
