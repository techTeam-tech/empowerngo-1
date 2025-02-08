/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkedAlt, FaCalendarAlt, FaBuilding, FaBriefcase } from "react-icons/fa";
import Loading from "../LoadingSpinner";

const AddStaff = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    staffName: "",
    staffEmail: "",
    staffId: "",
    designation: "",
    phone: "",
    address: "",
    joiningDate: "",
    ngoName: "XYZ NGO",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Staff member added successfully!");
      setFormData({
        staffName: "",
        staffEmail: "",
        staffId: "",
        designation: "",
        phone: "",
        address: "",
        joiningDate: "",
        ngoName: "XYZ NGO",
      });
    } catch (error) {
      console.error("Error adding staff:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Add New Staff Member</h1>
        {loading && <Loading />}
        <form 
          onSubmit={handleSubmit} 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg"
        >
          {[
            { id: "staffName", type: "text", placeholder: "Staff Name", icon: <FaUser /> },
            { id: "staffEmail", type: "email", placeholder: "Email", icon: <FaEnvelope /> },
            { id: "staffId", type: "text", placeholder: "Staff ID", icon: <FaIdCard /> },
            { id: "designation", type: "text", placeholder: "Designation", icon: <FaBriefcase /> },
            { id: "phone", type: "tel", placeholder: "Phone Number", icon: <FaPhone /> },
          ].map(({ id, type, placeholder, icon }) => (
            <div key={id} className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor={id}>{placeholder}</label>
              <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
                <span className="px-3 text-gray-500">{icon}</span>
                <input
                  id={id}
                  type={type}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="px-4 py-3 w-full focus:outline-none"
                  required
                />
              </div>
            </div>
          ))}

          <div className="relative col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="address">Staff Address</label>
            <div className="flex items-start border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
              <span className="px-3 py-3 text-gray-500"><FaMapMarkedAlt /></span>
              <textarea
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Staff Address"
                className="px-4 py-3 w-full focus:outline-none"
                rows="3"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="joiningDate">Joining Date</label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
              <span className="px-3 text-gray-500"><FaCalendarAlt /></span>
              <input
                id="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
                className="px-4 py-3 w-full focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="ngoName">NGO Name</label>
            <div className="flex items-center border rounded-lg shadow-sm bg-gray-200 text-gray-600 cursor-not-allowed overflow-hidden">
              <span className="px-3 text-gray-500"><FaBuilding /></span>
              <input
                id="ngoName"
                type="text"
                value={formData.ngoName}
                className="px-4 py-3 w-full focus:outline-none bg-gray-200 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className={`w-full px-6 py-3 text-white rounded-lg shadow-lg transform transition duration-300 ease-in-out ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
