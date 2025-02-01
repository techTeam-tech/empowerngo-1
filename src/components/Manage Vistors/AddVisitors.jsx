// /* eslint-disable no-unused-vars */
// import React from 'react'

// const AddVisitors = () => {
//   return (
//     <div>AddVisitors</div>
//   )
// }

// export default AddVisitors
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaClock, FaComments, FaBuilding } from 'react-icons/fa';

const AddVisitors = () => {
  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Contact Us</h1>
      <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
        
        {/* First Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="firstName">First Name</label>
          <div className="relative">
            <input
              id="firstName"
              type="text"
              placeholder="Enter First Name"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Last Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="lastName">Last Name</label>
          <div className="relative">
            <input
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* NGO Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="ngoName">NGO Name</label>
          <div className="relative">
            <input
              id="ngoName"
              type="text"
              placeholder="Enter NGO Name"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Email ID */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="email">Email ID</label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Enter Email ID"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Contact Number */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="contactNumber">Contact Number</label>
          <div className="relative">
            <input
              id="contactNumber"
              type="tel"
              placeholder="Enter Contact Number"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Preferred Contact Time */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="preferredContactTime">Preferred Contact Time</label>
          <div className="relative">
            <select
              id="preferredContactTime"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            >
              <option value="Morning">Morning</option>
              <option value="Noon">Noon</option>
              <option value="Evening">Evening</option>
            </select>
            <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Conversion Status */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="conversionStatus">Conversion Status</label>
          <div className="relative">
            <select
              id="conversionStatus"
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            >
              <option value="Contacted">Contacted</option>
              <option value="Pending">Pending</option>
              <option value="Converted">Converted</option>
              <option value="Not Interested">Not Interested</option>
            </select>
            <FaComments className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition duration-300 ease-in-out"
          >
            Submit Inquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisitors;