import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../src/components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import AddStaff from "./components/Manage Staff/AddStaff";
import AddUpdateDonor from "./components/Manage Donor/AddDonor";
import SearchDonor from "./components/Manage Donor/SearchDonor";

// Define role codes
const ROLES = {
  SUPER_ADMIN: 1,
  NGO_ADMIN: 2,
  NGO_STAFF: 3,
  NGO_CA: 4,
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setIsAuthenticated(true);
      setUserRole(parsedUser.ROLE_CODE); // Extract ROLE_CODE
    }
  }, []);

  // Role-based route protection function
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" />; // Redirect unauthorized users
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={!isAuthenticated ? <SignIn setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Layout setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/signin" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Super Admin Only Routes */}
          <Route
            path="/addstaff"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                <AddStaff />
              </ProtectedRoute>
            }
          />

          {/* Admin & Super Admin Routes */}
          <Route
            path="/adddonor"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]}>
                <AddUpdateDonor />
              </ProtectedRoute>
            }
          />

          {/* Staff & Admin Access */}
          <Route
            path="/searchDonor"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.NGO_STAFF]}>
                <SearchDonor />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} />
      </Routes>
    </Router>
  );
}

export default App;
