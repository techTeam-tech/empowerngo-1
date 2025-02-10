import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaLock } from "react-icons/fa";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Staff Data:", formData);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 pb-20">
      <div className="w-full max-w-4xl bg-white p-10 shadow-2xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Add Staff</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <FaUser className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Level <span className="text-red-500">*</span></label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Level</option>
                <option value="Manager">Manager</option>
                <option value="Officer">Officer</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username <span className="text-red-500">*</span></label>
              <div className="relative">
                <FaUserShield className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <FaLock className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
          >
            Add Staff
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
