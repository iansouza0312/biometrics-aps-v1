import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SigninScreeen } from "./screens/SignIn";
import { HomeScreen } from "./screens/(logged-in)/HomeScreen";

export function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SigninScreeen />} />
          <Route path="/home" element={<HomeScreen />} />
        </Routes>
      </Router>
    </div>
  );
}
