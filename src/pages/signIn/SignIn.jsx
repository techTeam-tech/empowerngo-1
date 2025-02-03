/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LeftSide from "../../components/LeftSide";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import { toast } from "react-toastify"; // Make sure this is imported
import LoadingSpinner from "../../components/LoadingSpinner"; // Import your Loading Spinner

function SignIn() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  const handleForgotPasswordSuccess = (email) => {
    console.log(`Forgot password email sent to: ${email}`);
    setShowForgotPassword(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault(); 

    toast.success("Sign In Successful!"); 

    setTimeout(() => {
      setLoading(true); 
    }, 500);

    setTimeout(() => {
      setLoading(false); 
    }, 3000);
  };

  return (
    <div className="flex h-screen w-screen relative">
      {/* Left side */}
      <LeftSide />

      {/* Right side (Sign In form) */}
      <div className="flex-grow bg-white flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mb-6">
            Sign In
          </h2>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 lg:text-lg"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 lg:text-lg"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSuccess={handleForgotPasswordSuccess}
      />

      {/* Show loading spinner if loading state is true */}
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default SignIn;
