/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LeftSide from "../../components/LeftSide";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import { toast } from "react-toastify"; 
import LoadingSpinner from "../../components/LoadingSpinner"; 
import bgRight from "../../assets/bgRight.svg"

function SignIn() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false); 

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
    <div className="flex h-screen w-screen relative ">
      <LeftSide />
      <div
        className="flex-grow bg-white flex items-center justify-center px-4 md:px-8 lg:px-16"
        style={{
          backgroundImage:`url(${bgRight})` ,
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-600 text-center mb-6 lg:mb-8">
            Sign In
          </h2>
          <form className="space-y-4 lg:space-y-6" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm md:text-base lg:text-lg text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base lg:text-lg"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm md:text-base lg:text-lg text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base lg:text-lg"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm lg:text-base text-blue-600 hover:underline"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 lg:py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-base lg:text-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSuccess={handleForgotPasswordSuccess}
      />
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default SignIn;
