import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import Splash from "./pages/onboarding/Splash";
import { AuthenticationRoutes } from "./routes/AuthenticationRoutes";
import { normalRoutes } from "./routes/NormalRoutes";
function App() {
  return (
    <Routes>
      {/* <Route path="/" exact element={<Splash />} /> */}
      {AuthenticationRoutes.map((route) => {
        return (
          <Route path={route?.url} element={route?.page} key={route?.title} />
        );
      })}
      {normalRoutes.map((route) => {
        return (
          <Route path={route?.url} element={route?.page} key={route?.title} />
        );
      })}
    </Routes>
  );
}

export default App;