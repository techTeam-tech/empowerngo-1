/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle, FaClipboardList } from 'react-icons/fa';

const PendingStaff = () => {
  const [staffData, setStaffData] = useState([]);

  // Simulate fetching pending staff data
  useEffect(() => {
    // In a real scenario, you would fetch data from an API here
    const fetchData = async () => {
      const data = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', designation: 'Manager', status: 'pending', applicationDate: '2024-10-01' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '234-567-8901', designation: 'Developer', status: 'pending', applicationDate: '2024-10-02' },
        { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '345-678-9012', designation: 'HR', status: 'pending', applicationDate: '2024-10-03' },
        { id: 4, name: 'Bob Lee', email: 'bob.lee@example.com', phone: '456-789-0123', designation: 'Intern', status: 'pending', applicationDate: '2024-10-04' },
        { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '567-890-1234', designation: 'Team Lead', status: 'pending', applicationDate: '2024-10-05' }
      ];
      setStaffData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Pending Staff List</h1>
      
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left border-b text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left border-b text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left border-b text-sm font-medium">Phone Number</th>
              <th className="px-6 py-3 text-left border-b text-sm font-medium">Designation</th>
              <th className="px-6 py-3 text-left border-b text-sm font-medium">Application Date</th>
              <th className="px-6 py-3 text-left border-b text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map(staff => (
              <tr key={staff.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-left flex items-center">
                  <FaUser className="mr-3 text-gray-500" />
                  {staff.name}
                </td>
                <td className="px-6 py-4 text-left flex items-center">
                  <FaEnvelope className="mr-3 text-gray-500" />
                  {staff.email}
                </td>
                <td className="px-6 py-4 text-left flex items-center">
                  <FaPhone className="mr-3 text-gray-500" />
                  {staff.phone}
                </td>
                <td className="px-6 py-4 text-left flex items-center">
                  <FaClipboardList className="mr-3 text-gray-500" />
                  {staff.designation}
                </td>
                <td className="px-6 py-4 text-left">{staff.applicationDate}</td>
                <td className="px-6 py-4 text-left flex items-center">
                  <span
                    className={`inline-flex items-center text-sm font-medium ${
                      staff.status === 'pending' ? 'text-orange-500' : 'text-green-500'
                    }`}
                  >
                    {staff.status === 'pending' ? (
                      <FaTimesCircle className="mr-2" />
                    ) : (
                      <FaCheckCircle className="mr-2" />
                    )}
                    {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingStaff;
