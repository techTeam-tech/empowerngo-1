/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaBuilding } from 'react-icons/fa';

const SearchBucket = () => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      projectName,
      // NGOID will be handled by the API
    };
    
    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => console.log('Project added:', data))
      .catch(error => console.error('Error adding project:', error));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add New Project</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Project Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="projectName">Project Name</label>
          <input
            id="projectName"
            type="text"
            placeholder="Enter Project Name"
            className="px-3 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        {/* NGO Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="ngoName">NGO Name</label>
          <div className="flex items-center border rounded-md shadow-sm px-3 py-2 bg-gray-100">
            <FaBuilding className="text-gray-500 mr-2" />
            <input
              id="ngoName"
              type="text"
              value="XYZ NGO"
              className="bg-transparent w-full focus:outline-none"
              readOnly
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4 col-span-2">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBucket;