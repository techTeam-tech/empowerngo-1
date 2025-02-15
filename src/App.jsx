import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Layout from "../src/components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import AddStaff from "./components/Manage Staff/AddStaff";
import AddUpdateDonor from "./components/Manage Donor/AddDonor";
import SearchDonor from "./components/Manage Donor/SearchDonor";
import AddNgo from "./components/Manage Ngo/ManageNgo";
import ProjectAndPurpose from "./components/ManageProject/AddProject";
import Managestaff from "./components/Manage Staff/Managestaff";
import { ROLES } from "../src/utils/constants";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setIsAuthenticated(true);
      setUserRole(parsedUser?.ROLE_CODE || ROLES.NGO_CA);
    }
  }, []);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/signin"
          element={
            !isAuthenticated ? (
              <SignIn setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Protected Routes inside Layout */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Super Admin Routes */}
          <Route
            path="addstaff"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]}>
                <AddStaff />
              </ProtectedRoute>
            }
          />
          <Route
            path="registerNgo"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                <AddNgo />
              </ProtectedRoute>
            }
          />

          <Route
            path="addproject"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]}>
                <ProjectAndPurpose />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="adddonor"
            element={
              <ProtectedRoute allowedRoles={[ROLES.NGO_ADMIN]}>
                <AddUpdateDonor />
              </ProtectedRoute>
            }
          />
          <Route
            path="searchDonor"
            element={
              <ProtectedRoute allowedRoles={[ROLES.NGO_ADMIN, ROLES.NGO_STAFF]}>
                <SearchDonor />
              </ProtectedRoute>
            }
          />
          <Route
            path="manageUser"
            element={
              <ProtectedRoute allowedRoles={[ROLES.NGO_ADMIN, ROLES.NGO_STAFF]}>
                <Managestaff />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
