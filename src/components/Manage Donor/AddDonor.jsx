/* eslint-disable no-unused-vars */
import React from 'react';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkedAlt, FaCity,
  FaGlobe, FaFlag, FaBuilding, FaIdCard, FaBriefcase
} from 'react-icons/fa';

const AddUpdateDonor = () => {
  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Add / Update Donor</h1>
      <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
        {/* First Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">First Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter First Name"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        
        {/* Middle Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Middle Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Middle Name"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        
        {/* Last Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Last Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Last Name"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        
        {/* Address */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Address</label>
          <div className="relative">
            <textarea
              placeholder="Enter Address"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>
        </div>

        {/* City */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">City</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter City"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        
        {/* State */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">State</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter State"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Country */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Country</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Country"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Mobile */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Mobile</label>
          <div className="relative">
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter Email"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition duration-300 ease-in-out"
          >
            Save Donor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUpdateDonor;
