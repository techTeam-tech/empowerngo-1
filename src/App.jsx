import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../src/components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import AddUpdateDonor from "./components/Manage Donor/AddDonor";
import SearchDonor from "./components/Manage Donor/SearchDonor";
import ProjectAndPurpose from "./components/ManageProject/AddProject";
import Managestaff from "./components/Manage Staff/Managestaff";
import { ROLES } from "../src/utils/constants";
import Manage from "./components/Manage Ngo/Manage";
import Loading from "./components/LoadingSpinner";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    setTimeout(() => {
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUserRole(parsedUser?.ROLE_CODE || ROLES.NGO_CA);
      }
      setLoading(false);
    }, 1000); // Simulating a delay for loading
  }, []);

  if (loading) return <Loading />; // Show loading component while authentication is being checked

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
              <ProtectedRoute
                allowedRoles={[ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]}
              >
                <Managestaff />
              </ProtectedRoute>
            }
          />
          <Route
            path="registerNgo"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                <Manage />
              </ProtectedRoute>
            }
          />
          <Route
            path="addproject"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]}
              >
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
            path="/manageUser"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.NGO_ADMIN, ROLES.SUPER_ADMIN]}
              >
                <Managestaff />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-All Redirect */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
