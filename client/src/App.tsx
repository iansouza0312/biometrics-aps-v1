import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SigninScreeen } from "./screens/SignIn";
import { DashboardScreen } from "./screens/(logged-in)/DashboardScreen";
import { RegisterScreen } from "./screens/(logged-in)/RegisterScreen";

export function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SigninScreeen />} />
          <Route path="/home" element={<DashboardScreen />} />
          <Route path="/history" element={<RegisterScreen />} />
        </Routes>
      </Router>
    </div>
  );
}
