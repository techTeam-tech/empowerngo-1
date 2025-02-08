import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaMobile, FaIdCard, FaSpinner } from "react-icons/fa";

const SearchDonor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy donor data for testing
  useEffect(() => {
    const dummyData = [
      {
        donorFName: "Rahul",
        donorLName: "Sharma",
        donorEmail: "rahul.sharma@example.com",
        donorMobile: "9876543210",
        donorCity: "Mumbai",
        donorAddress: "123, Andheri West",
        donorPAN: "ABCDE1234F",
      },
      {
        donorFName: "Sneha",
        donorLName: "Patel",
        donorEmail: "sneha.patel@example.com",
        donorMobile: "9988776655",
        donorCity: "Delhi",
        donorAddress: "456, Connaught Place",
        donorPAN: "XYZAB5678G",
      },
    ];
    setDonors(dummyData);
    setFilteredDonors(dummyData);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const results = donors.filter(
        (donor) =>
          donor.donorFName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.donorLName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.donorMobile.includes(searchTerm)
      );
      setFilteredDonors(results);
      setLoading(false);
    }, 1000); // Simulating API delay
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Search Donor</h1>
      
      <form className="flex items-center gap-4 mb-6" onSubmit={handleSearch}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by Name, Email, or Mobile..."
            className="px-4 py-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        </div>
      ) : filteredDonors.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden border">
            <thead className="bg-blue-600 text-white uppercase text-sm">
              <tr>
                <th className="px-4 py-3 text-left w-1/6">Name</th>
                <th className="px-4 py-3 text-left w-1/6">Email</th>
                <th className="px-4 py-3 text-left w-1/6">Mobile</th>
                <th className="px-4 py-3 text-left w-1/6">City</th>
                <th className="px-4 py-3 text-left w-1/4">Address</th>
                <th className="px-4 py-3 text-left w-1/6">PAN</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map((donor, index) => (
                <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FaUser className="text-gray-500" /> {donor.donorFName} {donor.donorLName}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FaEnvelope className="text-gray-500" /> {donor.donorEmail}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FaMobile className="text-gray-500" /> {donor.donorMobile}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FaCity className="text-gray-500" /> {donor.donorCity}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-500" /> {donor.donorAddress}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FaIdCard className="text-gray-500" /> {donor.donorPAN}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No donors found</p>
      )}
    </div>
  );
};

export default SearchDonor;
