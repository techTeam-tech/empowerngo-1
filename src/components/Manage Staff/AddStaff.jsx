import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Real-time validation
    if (e.target.name === "email") {
      setErrors({
        ...errors,
        email: /\S+@\S+\.\S+/.test(e.target.value) ? "" : "Invalid email format",
      });
    }

    if (e.target.name === "password") {
      setErrors({
        ...errors,
        password: e.target.value.length >= 6 ? "" : "Password must be at least 6 characters",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.level || !formData.phone || !formData.username || !formData.password) {
      alert("Please fill all required fields.");
      return;
    }
    console.log("Staff Data:", formData);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-6 pb-20">
      <div className="w-full max-w-5xl bg-white p-12 shadow-2xl rounded-2xl border border-gray-300">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">Add Staff</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-gray-400 text-lg" aria-label="Full Name Icon" />
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:outline-none bg-gray-50 shadow-sm"
              />
            </div>
          </div>

          {/* Level */}
          <div>
            <label htmlFor="level" className="block text-gray-700 font-medium mb-2">
              Level <span className="text-red-500">*</span>
            </label>
            <select
              name="level"
              id="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:outline-none bg-gray-50 shadow-sm"
            >
              <option value="">Select Level</option>
              <option value="Manager">Manager</option>
              <option value="Officer">Officer</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400 text-lg" aria-label="Email Icon" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:outline-none bg-gray-50 shadow-sm"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaPhone className="absolute left-4 top-4 text-gray-400 text-lg" aria-label="Phone Icon" />
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:outline-none bg-gray-50 shadow-sm"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUserShield className="absolute left-4 top-4 text-gray-400 text-lg" aria-label="Username Icon" />
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:outline-none bg-gray-50 shadow-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400 text-lg" aria-label="Password Icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 pr-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:outline-none bg-gray-50 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl hover:shadow-lg transition-all text-lg font-medium disabled:opacity-50"
              disabled={!formData.name || !formData.level || !formData.phone || !formData.username || !formData.password}
            >
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
