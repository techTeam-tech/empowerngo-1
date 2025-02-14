import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../LoadingSpinner";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    level: "NGO ADMIN",
    role: "",
    email: "",
    phone: "",
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [roleCode, setRoleCode] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.ROLE_CODE) {
      setRoleCode(userData.ROLE_CODE);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "email"
          ? /\S+@\S+\.\S+/.test(value)
            ? ""
            : "Invalid email format"
          : name === "password"
          ? value.length >= 6
            ? ""
            : "Password must be at least 6 characters"
          : prev[name]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, username, password } = formData;

    let finalData = {
      name,
      phone,
      username,
      password,
      level: roleCode === 1 ? formData.level : "",
      role: roleCode === 2 ? formData.role : ""
    };

    if (
      !name ||
      !phone ||
      !username ||
      !password ||
      (roleCode === 2 && !formData.role)
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all required fields!"
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Staff Added",
        text: "Staff member has been successfully added!"
      });
      console.log("Staff Data:", finalData);
    }, 2000);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-6 pb-20">
      <div className="w-full max-w-5xl bg-white p-12 shadow-2xl rounded-2xl border border-gray-300">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">
          Add Staff
        </h2>
        {loading && <Loading />}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 shadow-sm"
              />
            </div>
          </div>
          {roleCode === 1 ? (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.level}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed shadow-sm"
              />
            </div>
          ) : (
            <div>
              <label
                htmlFor="role"
                className="block text-gray-700 font-medium mb-2"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 shadow-sm"
              >
                <option value="">Select Role</option>
                <option value="NgoStaff">NGO STAFF</option>
                <option value="NgoCa">NGO CA</option>
              </select>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 shadow-sm"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 shadow-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUserShield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-2 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 shadow-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 shadow-sm "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all text-lg font-medium shadow-md"
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
