import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaLock, FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";
import Loading from "../LoadingSpinner";
import renderInputField from "../CustomInputField";

const AddStaff = ({ onAddOrUpdateStaff, editStaff, setEditStaff }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [roleCode, setRoleCode] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.ROLE_CODE) {
      setRoleCode(userData.ROLE_CODE);
    }
  }, []);
  useEffect(() => {
    if (editStaff) {
      Object.keys(editStaff).forEach((key) => setValue(key, editStaff[key]));
    } else {
      reset(); 
    }
  }, [editStaff, setValue, reset]);

  const onSubmit = (data) => {
    if (roleCode === 2 && !data.role) {
      Swal.fire({ icon: "error", title: "Missing Fields", text: "Please select a role!" });
      return;
    }

    if (roleCode === 1) {
      data.role = "NGO ADMIN";
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Swal.fire({ icon: "success", title: editStaff ? "Staff Updated" : "Staff Added", text: editStaff ? "Staff details updated successfully!" : "Staff has been successfully added!" });
      onAddOrUpdateStaff(data);
      reset();
      setEditStaff(null); 
    }, 2000);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">{editStaff ? "Edit User" : "Add User"}</h2>
      {loading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInputField(register, errors, "Full Name", "name", { required: "Full name is required" }, "text", "Enter full name", FaUser)}

        <div>
          <label className="block text-gray-700 font-medium mb-2">Role</label>
          {roleCode === 1 ? (
            <input type="text" value="NGO ADMIN" readOnly className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 shadow-sm" />
          ) : (
            <select {...register("role", { required: "Role is required" })} className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="">Select a role</option>
              <option value="NGO STAFF">NGO Staff</option>
              <option value="NGO CA">NGO CA</option>
            </select>
          )}
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>
        {renderInputField(register, errors, "Email Address", "email", { required: "Email is required" }, "email", "Enter email", FaEnvelope)}
        {renderInputField(register, errors, "Phone Number", "phone", { required: "Phone number is required" }, "tel", "Enter phone number", FaPhone)}
        {renderInputField(register, errors, "Username", "username", { required: "Username is required" }, "text", "Enter username", FaUser)}
        {renderInputField(register, errors, "NGO Name", "ngoName", { required: "NGO name is required" }, "text", "Enter NGO Name", FaBuilding)}
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter password"
          />
          <span
            className="absolute right-3 top-11 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">{editStaff ? "Update User" : "Add User"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
