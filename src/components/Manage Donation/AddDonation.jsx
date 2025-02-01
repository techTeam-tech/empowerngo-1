/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaDollarSign, FaBuilding, FaUser, FaIdCard, FaRegFileAlt, FaClipboardList, FaRegCalendarAlt, FaHandHoldingUsd } from 'react-icons/fa';

const AddDonation = () => {
  const [formData, setFormData] = useState({
    donorId: '',
    ngoId: '',
    amount: '',
    bank: '',
    type: 'Cash',
    transactionId: '',
    purpose: '',
    project: '',
    donationDate: '',
    note: '',
    receiptNumber: '',
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
    console.log('Donation submitted:', formData);
  };

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Add Donation</h1>
      <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2" onSubmit={handleSubmit}>
        
        {/* Donor ID */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donorId">Donor ID</label>
          <div className="relative">
            <input
              id="donorId"
              type="number"
              placeholder="Enter Donor ID"
              value={formData.donorId}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* NGO ID */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="ngoId">NGO ID</label>
          <div className="relative">
            <input
              id="ngoId"
              type="number"
              placeholder="Enter NGO ID"
              value={formData.ngoId}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donation Amount */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="amount">Donation Amount</label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter Donation Amount"
              value={formData.amount}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Bank Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="bank">Bank Name</label>
          <div className="relative">
            <input
              id="bank"
              type="text"
              placeholder="Enter Bank Name"
              value={formData.bank}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
            <FaHandHoldingUsd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Payment Type */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="type">Payment Type</label>
          <div className="relative">
            <select
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            >
              <option value="Cash">Cash</option>
              <option value="NEFT">NEFT</option>
              <option value="PhonePe">PhonePe</option>
              <option value="InKind">In-Kind</option>
            </select>
            <FaClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Transaction ID */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="transactionId">Transaction ID</label>
          <div className="relative">
            <input
              id="transactionId"
              type="text"
              placeholder="Enter Transaction ID (Optional)"
              value={formData.transactionId}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
            />
            <FaRegFileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donation Purpose */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="purpose">Purpose</label>
          <div className="relative">
            <textarea
              id="purpose"
              placeholder="Enter Donation Purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              rows="4"
              required
            />
            <FaClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Associated Project */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="project">Project</label>
          <div className="relative">
            <input
              id="project"
              type="text"
              placeholder="Enter Associated Project (Optional)"
              value={formData.project}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
            />
            <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donation Date */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="donationDate">Donation Date</label>
          <div className="relative">
            <input
              id="donationDate"
              type="date"
              placeholder="Enter Donation Date"
              value={formData.donationDate}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="note">Additional Note</label>
          <div className="relative">
            <textarea
              id="note"
              placeholder="Enter Additional Notes (Optional)"
              value={formData.note}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              rows="4"
            />
          </div>
        </div>

        {/* Receipt Number */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="receiptNumber">Receipt Number</label>
          <div className="relative">
            <input
              id="receiptNumber"
              type="text"
              placeholder="Enter Receipt Number"
              value={formData.receiptNumber}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition duration-300 ease-in-out"
          >
            Submit Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonation;