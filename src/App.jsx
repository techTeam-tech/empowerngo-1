/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing page components
import SignUp from "./pages/SignUp/signUp";
import SignIn from "./pages/signIn/SignIn";
import Sidebar from "./pages/sidebar/Sidebar";

const App = () => {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        {/* Route for Sign In */}
        <Route path="/signin" element={<SignIn />} />

        {/* Route for Sign Up */}
        <Route path="/signup" element={<SignUp />} />

        {/* Main Route for Sidebar and its nested routes */}
        <Route path="/" element={<Sidebar />} />
      </Routes>
    </Router>
  );
};

export default App;
