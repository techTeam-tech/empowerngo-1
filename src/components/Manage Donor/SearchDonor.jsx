import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi"; 

const DonorSearch = () => {
  const initialDonors = [
    { name: "Amit Sharma", panNo: "ABCD1234E", lastName: "Sharma", email: "amit@example.com", mobile: "9876543210" },
    { name: "Neha Gupta", panNo: "EFGH5678I", lastName: "Gupta", email: "neha@example.com", mobile: "8765432109" },
    { name: "Rahul Mehta", panNo: "IJKL9101M", lastName: "Mehta", email: "rahul@example.com", mobile: "7654321098" },
    { name: "Priya Singh", panNo: "MNOP2345Q", lastName: "Singh", email: "priya@example.com", mobile: "6543210987" },
    { name: "Vikas Verma", panNo: "QRST6789U", lastName: "Verma", email: "vikas@example.com", mobile: "5432109876" },
    { name: "Arun Yadav", panNo: "UVWX1111Z", lastName: "Yadav", email: "arun@example.com", mobile: "4321098765" },
    { name: "Suman Rao", panNo: "YZAB2222X", lastName: "Rao", email: "suman@example.com", mobile: "3210987654" },
    { name: "Kunal Patel", panNo: "CDEF3333W", lastName: "Patel", email: "kunal@example.com", mobile: "2109876543" },
    { name: "Anjali Kapoor", panNo: "GHIJ4444V", lastName: "Kapoor", email: "anjali@example.com", mobile: "1098765432" },
    { name: "Rohit Khanna", panNo: "KLMN5555U", lastName: "Khanna", email: "rohit@example.com", mobile: "9876543211" },
    { name: "Pooja Das", panNo: "OPQR6666T", lastName: "Das", email: "pooja@example.com", mobile: "8765432102" },
  ];

  const [donors, setDonors] = useState(initialDonors);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const refreshTable = () => {
    setDonors(initialDonors);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const filteredDonors = donors.filter(donor =>
    donor[filterBy].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const paginatedDonors = filteredDonors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Search Donor</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name">Name</option>
          <option value="panNo">PAN No</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="mobile">Mobile</option>
        </select>

        <button
          onClick={refreshTable}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
          title="Refresh Table"
        >
          <FiRefreshCcw size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              {["Name", "PAN No", "Last Name", "Email", "Mobile"].map((header) => (
                <th key={header} className="border px-4 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedDonors.length > 0 ? (
              paginatedDonors.map((donor, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{donor.name}</td>
                  <td className="border px-4 py-2">{donor.panNo}</td>
                  <td className="border px-4 py-2">{donor.lastName}</td>
                  <td className="border px-4 py-2">{donor.email}</td>
                  <td className="border px-4 py-2">{donor.mobile}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-red-500">No donors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            className={`px-4 py-2 border rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4">{currentPage} / {totalPages}</span>
          <button
            className={`px-4 py-2 border rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-600 text-white"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DonorSearch;
