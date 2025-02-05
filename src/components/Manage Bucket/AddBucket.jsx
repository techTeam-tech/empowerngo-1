/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkedAlt, FaCalendarAlt, FaBuilding, FaBriefcase } from 'react-icons/fa';

const AddBucket = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    // Fetch existing projects for the NGO (Mock API Call)
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Add Donation Purpose</h1>
      <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
        
        {/* Project Selection */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="project">Project</label>
          <select
            id="project"
            className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>

        {/* Purpose */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="purpose">Purpose</label>
          <input
            id="purpose"
            type="text"
            placeholder="Enter Purpose"
            className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* NGO Name (Static) */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="ngoName">NGO Name</label>
          <input
            id="ngoName"
            type="text"
            value="XYZ NGO"
            className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Submit Button */}
        <div className="col-span-full flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition duration-300 ease-in-out"
          >
            Add Purpose
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBucket;