import { useForm } from "react-hook-form";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaBriefcase,
  FaIdCard
} from "react-icons/fa";
import renderInputField from "../CustomInputField";
import CustomButton from "../CustomButton";

const DonorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Donor Data Submitted:", data);
  };

  return (
    <div className="w-full max-w-8xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-xl border border-gray-200">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center uppercase">
        Donor Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {renderInputField(register, errors, "First Name", "firstName", { required: "First name is required" }, "text", "Enter first name", FaUser)}
          {renderInputField(register, errors, "Middle Name", "middleName", {}, "text", "Enter middle name", FaUser)}
          {renderInputField(register, errors, "Last Name", "lastName", { required: "Last name is required" }, "text", "Enter last name", FaUser)}
          {renderInputField(register, errors, "Address", "address", { required: "Address is required" }, "text", "Enter address", FaMapMarkerAlt)}
          {renderInputField(register, errors, "City", "city", { required: "City is required" }, "text", "Enter city", FaCity)}
          {renderInputField(register, errors, "State", "state", { required: "State is required" }, "text", "Enter state", FaGlobe)}
          {renderInputField(register, errors, "Country", "country", { required: "Country is required" }, "text", "Enter country", FaGlobe)}
          {renderInputField(register, errors, "Pincode", "pincode", { required: "Pincode is required" }, "text", "Enter pincode", FaMapMarkerAlt)}
          {renderInputField(register, errors, "Mobile", "mobile", { required: "Mobile number is required" }, "tel", "Enter mobile number", FaPhone)}
          {renderInputField(register, errors, "Email", "email", { required: "Email is required" }, "email", "Enter email", FaEnvelope)}
          {renderInputField(register, errors, "PAN Number", "panNumber", { required: "PAN number is required" }, "text", "Enter PAN number", FaIdCard)}
          {renderInputField(register, errors, "Profession", "profession", { required: "Profession is required" }, "text", "Enter profession", FaBriefcase)}
        </div>
        <div className="flex justify-center md:justify-end">
          <CustomButton type="submit">Submit</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default DonorForm;
