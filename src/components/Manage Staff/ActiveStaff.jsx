/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaCheckCircle, FaTimesCircle, FaCalendar } from 'react-icons/fa';

const PendingStaff = () => {
  const [staffData, setStaffData] = useState([]);

  // Simulate fetching pending staff data
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'pending', joinDate: '2024-01-01' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'pending', joinDate: '2024-02-15' },
        { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', status: 'pending', joinDate: '2024-03-12' },
        { id: 4, name: 'Bob Lee', email: 'bob.lee@example.com', status: 'pending', joinDate: '2024-04-10' },
        { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', status: 'pending', joinDate: '2024-05-22' }
      ];
      setStaffData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Pending Staff List</h1>
      
      <table className="w-full table-auto border-collapse shadow-lg rounded-lg">
        <thead>
          <tr className="bg-yellow-600 text-white">
            <th className="px-6 py-3 text-left border-b">Name</th>
            <th className="px-6 py-3 text-left border-b">Email</th>
            <th className="px-6 py-3 text-left border-b">Status</th>
            <th className="px-6 py-3 text-left border-b">Join Date</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map(staff => (
            <tr key={staff.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-3 text-left flex items-center">
                <FaUser className="mr-3 text-gray-500" />
                {staff.name}
              </td>
              <td className="px-6 py-3 text-left">
                <FaEnvelope className="mr-3 text-gray-500" />
                {staff.email}
              </td>
              <td className="px-6 py-3 text-left">
                <span
                  className={`inline-flex items-center text-sm font-medium ${
                    staff.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                  }`}
                >
                  <FaTimesCircle className="mr-2" />
                  {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-3 text-left">
                <FaCalendar className="mr-3 text-gray-500" />
                {staff.joinDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2">Previous</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Next</button>
      </div>
    </div>
  );
};

export default PendingStaff;
