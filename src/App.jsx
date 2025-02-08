import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../src/components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import AddStaff from "./components/Manage Staff/AddStaff";
import AddUpdateDonor from "./components/Manage Donor/AddDonor";
import SearchDonor from "./components/Manage Donor/SearchDonor";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes (Unauthenticated Users) */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={!isAuthenticated ? <SignIn setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes (Authenticated Users) */}
        <Route
          path="/"
          element={isAuthenticated ? <Layout setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/signin" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/addstaff" element={<AddStaff/>}/>
          <Route path="/adddonor" element={<AddUpdateDonor/>}/>
          <Route path="/searchDonor" element={<SearchDonor/>}/>
          {/* Add other protected routes here */}
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} />
      </Routes>
    </Router>
  );
}

export default App;
