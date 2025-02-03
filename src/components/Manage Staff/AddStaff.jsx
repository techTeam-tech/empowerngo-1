/* eslint-disable no-unused-vars */
import React from 'react';
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkedAlt, FaCalendarAlt, FaBuilding, FaBriefcase } from 'react-icons/fa';

const AddStaff = () => {
  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Add New Staff Member</h1>
      <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
        
        {/* Staff Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="staffName">Staff Name</label>
          <div className="relative">
            <input
              id="staffName"
              type="text"
              placeholder="Enter Staff Name"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Staff Email */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="staffEmail">Staff Email</label>
          <div className="relative">
            <input
              id="staffEmail"
              type="email"
              placeholder="Enter Staff Email"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Staff ID */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="staffId">Staff ID</label>
          <div className="relative">
            <input
              id="staffId"
              type="text"
              placeholder="Enter Staff ID"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Designation */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="designation">Designation</label>
          <div className="relative">
            <input
              id="designation"
              type="text"
              placeholder="Enter Staff Designation"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Phone Number */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="phone">Phone Number</label>
          <div className="relative">
            <input
              id="phone"
              type="tel"
              placeholder="Enter Staff Phone Number"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Address */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="address">Staff Address</label>
          <div className="relative">
            <textarea
              id="address"
              placeholder="Enter Staff Address"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              rows="4"
              required
            />
            <FaMapMarkedAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Joining Date */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="joiningDate">Joining Date</label>
          <div className="relative">
            <input
              id="joiningDate"
              type="date"
              placeholder="Enter Joining Date"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* NGO Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="ngoName">NGO Name</label>
          <div className="relative">
            <input
              id="ngoName"
              type="text"
              value="XYZ NGO" // Static value
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              readOnly
            />
            <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition duration-300 ease-in-out"
          >
            Add Staff
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
