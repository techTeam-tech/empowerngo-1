import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkedAlt, FaCalendarAlt, FaBuilding, FaBriefcase } from 'react-icons/fa';

const AddDonor = () => {
  const [formData, setFormData] = useState({
    donorFName: '',
    donorMName: '',
    donorLName: '',
    donorAddress: '',
    donorCity: '',
    donorState: '',
    donorCountry: '',
    donorPincode: '',
    donorMobile: '',
    donorEmail: '',
    donorPan: '',
    donorProfession: '',
    donorNgoId: 'XYZ NGO',  // Static value
    donorType: 'Individual', // Default value
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission to your backend
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Add New Donor</h1>
      <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2" onSubmit={handleSubmit}>
        
        {/* Donor First Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorFName">First Name</label>
          <div className="relative">
            <input
              id="donorFName"
              type="text"
              placeholder="Enter First Name"
              value={formData.donorFName}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donor Middle Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorMName">Middle Name</label>
          <div className="relative">
            <input
              id="donorMName"
              type="text"
              placeholder="Enter Middle Name (Optional)"
              value={formData.donorMName}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
            />
          </div>
        </div>

        {/* Donor Last Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorLName">Last Name</label>
          <div className="relative">
            <input
              id="donorLName"
              type="text"
              placeholder="Enter Last Name"
              value={formData.donorLName}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donor Address */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorAddress">Address</label>
          <div className="relative">
            <textarea
              id="donorAddress"
              placeholder="Enter Address"
              value={formData.donorAddress}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              rows="4"
              required
            />
            <FaMapMarkedAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donor City */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorCity">City</label>
          <div className="relative">
            <input
              id="donorCity"
              type="text"
              placeholder="Enter City"
              value={formData.donorCity}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
          </div>
        </div>

        {/* Donor State */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorState">State</label>
          <div className="relative">
            <input
              id="donorState"
              type="text"
              placeholder="Enter State"
              value={formData.donorState}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
          </div>
        </div>

        {/* Donor Country */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorCountry">Country</label>
          <div className="relative">
            <input
              id="donorCountry"
              type="text"
              placeholder="Enter Country"
              value={formData.donorCountry}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
          </div>
        </div>

        {/* Donor Pin Code */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorPincode">Pin Code</label>
          <div className="relative">
            <input
              id="donorPincode"
              type="text"
              placeholder="Enter Pin Code"
              value={formData.donorPincode}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
          </div>
        </div>

        {/* Donor Mobile */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorMobile">Mobile</label>
          <div className="relative">
            <input
              id="donorMobile"
              type="tel"
              placeholder="Enter Mobile Number"
              value={formData.donorMobile}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donor Email */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorEmail">Email</label>
          <div className="relative">
            <input
              id="donorEmail"
              type="email"
              placeholder="Enter Email"
              value={formData.donorEmail}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donor PAN */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorPan">PAN</label>
          <div className="relative">
            <input
              id="donorPan"
              type="text"
              placeholder="Enter PAN"
              value={formData.donorPan}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
          </div>
        </div>

        {/* Donor Profession */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorProfession">Profession</label>
          <div className="relative">
            <input
              id="donorProfession"
              type="text"
              placeholder="Enter Profession (Optional)"
              value={formData.donorProfession}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
            />
            <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donor Type */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorType">Donor Type</label>
          <div className="relative">
            <select
              id="donorType"
              value={formData.donorType}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
            >
              <option value="Individual">Individual</option>
              <option value="Corporate">Corporate</option>
              <option value="Group">Group</option>
              <option value="NGO">NGO</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition duration-300 ease-in-out"
          >
            Add Donor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonor;