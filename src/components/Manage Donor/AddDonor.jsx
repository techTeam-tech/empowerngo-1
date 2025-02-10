import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaMobileAlt, FaEnvelope, FaAddressCard } from "react-icons/fa";
import axios from "axios";

const DonorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data.map((c) => c.name.common).sort());
    });
  }, []);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Donor Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-700">Salutation <span className="text-red-500">*</span></label>
          <select {...register("salutation", { required: true })} className="mt-1 w-full border p-2 rounded">
            <option value="">Select</option>
            <option>Mr</option>
            <option>Ms</option>
            <option>Dr</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Donor Type</label>
          <select {...register("donorType")} className="mt-1 w-full border p-2 rounded">
            <option>Individual</option>
            <option>Organization</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
          <div className="flex items-center border rounded p-2 mt-1">
            <FaUser className="text-gray-500 mr-2" />
            <input {...register("firstName", { required: true })} placeholder="Enter first name" className="w-full outline-none" />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm">First name is required</p>}
        </div>
        <div>
          <label className="block font-medium text-gray-700">Last Name</label>
          <div className="flex items-center border rounded p-2 mt-1">
            <FaUser className="text-gray-500 mr-2" />
            <input {...register("lastName")} placeholder="Enter last name" className="w-full outline-none" />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Mobile <span className="text-red-500">*</span></label>
          <div className="flex items-center border rounded p-2 mt-1">
            <FaMobileAlt className="text-gray-500 mr-2" />
            <input type="tel" {...register("mobile", { required: true })} placeholder="Enter mobile number" className="w-full outline-none" />
          </div>
          {errors.mobile && <p className="text-red-500 text-sm">Mobile number is required</p>}
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <div className="flex items-center border rounded p-2 mt-1">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input type="email" {...register("email")} placeholder="Enter email" className="w-full outline-none" />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
          <div className="flex items-center border rounded p-2 mt-1">
            <FaAddressCard className="text-gray-500 mr-2" />
            <input {...register("address", { required: true })} placeholder="Enter address" className="w-full outline-none" />
          </div>
          {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
        </div>
        <div>
          <label className="block font-medium text-gray-700">Upload PAN Image</label>
          <input type="file" {...register("panImage")} className="mt-1 w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
          <select {...register("country", { required: true })} className="mt-1 w-full border p-2 rounded">
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm">Country is required</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">State <span className="text-red-500">*</span></label>
          <input
            {...register("state", { required: true })}
            placeholder="Enter state"
            className="mt-1 w-full border p-2 rounded"
          />
          {errors.state && <p className="text-red-500 text-sm">State is required</p>}
        </div>

        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorForm;
