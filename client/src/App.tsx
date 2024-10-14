import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SigninScreeen } from "./screens/SignIn";
import { DashboardScreen } from "./screens/(logged-in)/DashboardScreen";
import { RegisterScreen } from "./screens/(logged-in)/RegisterScreen";

import { PrivateRoute } from "./routes/privateRoutes";

export function App() {
  return (
    <div>
      {/* <Router>
        <Routes>
          <Route path="/" element={<SigninScreeen />} />
          <Route path="/home" element={<DashboardScreen />} />
          <Route path="/history" element={<RegisterScreen />} />
        </Routes>
      </Router> */}

      <Router>
        <Routes>
          <Route path="/" element={<SigninScreeen />} />
          {/* Rota protegidas para o  acesso restrito*/}
          <Route
            path="/home"
            element={
              <PrivateRoute allowedRoles={["3"]}>
                <DashboardScreen />
              </PrivateRoute>
            }
          />
          {/* Rotas protegidas para o acesso intermediario */}
          <Route
            path="/history"
            element={
              <PrivateRoute allowedRoles={["2"]}>
                <RegisterScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
