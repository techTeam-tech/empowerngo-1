import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../src/components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Routes without Layout (for unauthenticated users) */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={!isAuthenticated ? <SignIn setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />

        {/* Routes with Layout (for authenticated users) */}
        <Route
          path="/"
          element={isAuthenticated ? <Layout setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/signin" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;