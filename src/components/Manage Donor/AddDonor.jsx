import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaMobileAlt, FaEnvelope, FaAddressCard } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data.map((c) => c.name.common).sort());
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Donor information submitted successfully!");
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Donor Registration</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold text-gray-800">Salutation <span className="text-red-500">*</span></label>
          <select {...register("salutation", { required: "Salutation is required" })} className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Select</option>
            <option>Mr</option>
            <option>Ms</option>
            <option>Dr</option>
          </select>
          {errors.salutation && <p className="text-red-500 text-sm mt-1">{errors.salutation.message}</p>}
        </div>
        
        <div>
          <label className="block font-semibold text-gray-800">Donor Type</label>
          <select {...register("donorType")} className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option>Individual</option>
            <option>Organization</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800">First Name <span className="text-red-500">*</span></label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-500 mr-2" />
            <input {...register("firstName", { required: "First name is required" })} placeholder="Enter first name" className="w-full outline-none bg-transparent" />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">Last Name</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-500 mr-2" />
            <input {...register("lastName")} placeholder="Enter last name" className="w-full outline-none bg-transparent" />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-800">Mobile <span className="text-red-500">*</span></label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
            <FaMobileAlt className="text-gray-500 mr-2" />
            <input type="tel" {...register("mobile", { required: "Mobile number is required", pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit mobile number" } })} placeholder="Enter mobile number" className="w-full outline-none bg-transparent" />
          </div>
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input type="email" {...register("email", { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} placeholder="Enter email" className="w-full outline-none bg-transparent" />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">Address <span className="text-red-500">*</span></label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
            <FaAddressCard className="text-gray-500 mr-2" />
            <input {...register("address", { required: "Address is required" })} placeholder="Enter address" className="w-full outline-none bg-transparent" />
          </div>
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">Country <span className="text-red-500">*</span></label>
          <select {...register("country", { required: "Country is required" })} className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
        </div>

        <div className="col-span-2">
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-white p-3 rounded-lg font-semibold transition">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorForm;
