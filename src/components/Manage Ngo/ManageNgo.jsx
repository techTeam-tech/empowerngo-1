import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerNgo } from "../../api/masterApi";
import { uploadToCloudinary } from "../../utils/helper";
import renderInputField from "../../components/CustomInputField";
import Loading from "../../components/LoadingSpinner";

const RegisterNGO = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();

  const [countries, setCountries] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedLogo = watch("logoURL");
  const selectedSignature = watch("signatureURL");
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data.map((c) => c.name.common).sort()))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setUploading(true);

      const logoUrl = selectedLogo?.[0]
        ? await uploadToCloudinary(
            selectedLogo[0],
            "logoURL",
            setValue,
            setUploading
          )
        : null;
      const signatureUrl = selectedSignature?.[0]
        ? await uploadToCloudinary(
            selectedSignature[0],
            "signatureURL",
            setValue,
            setUploading
          )
        : null;

      const formData = new FormData();
      formData.append("reqType", "s");
      formData.append("logoURL", logoUrl || "");
      formData.append("signatureURL", signatureUrl || "");

      Object.keys(data).forEach((key) => {
        if (key !== "logoURL" && key !== "signatureURL") {
          formData.append(key, data[key]);
        }
      });

      await registerNgo(formData);
      toast.success("NGO Registered Successfully!");
      reset();
    } catch (error) {
      console.error("Error registering NGO:", error);
      toast.error("Error registering NGO!");
    } finally {
      setIsSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Register NGO
      </h2>
      {isSubmitting && <Loading />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          {renderInputField(
            register,
            errors,
            "NGO Name",
            "ngoName",
            { required: "NGO name is required" },
            "text",
            "Enter NGO Name"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "Registration Number",
            "ngoRegNumber",
            { required: "registration number is required" },
            "text",
            "Enter registration number"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "NGO Address",
            "ngoAddress",
            { required: "NGO Address is required" },
            "text",
            "Enter NGO Address"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "Ngo City",
            "ngoCity",
            { required: "City is required" },
            "text",
            "Enter City"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "State",
            "ngoState",
            { required: "State is required" },
            "text",
            "Enter State"
          )}
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-medium mb-2">
            Country
          </label>
          <select
            {...register("ngoCountry", {
              required: "Country is required"
            })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "Pin Code",
            "ngoPinCode",
            {
              required: "Pin Code is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Pin Code should be 6 digit number"
              }
            },
            "text",
            "Enter Pin Code"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "Email",
            "ngoEmail",
            {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email"
              }
            },
            "email",
            "Enter your email"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "Contact",
            "ngoContact",
            {
              required: "Contact is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid contact number"
              }
            },
            "text",
            "Enter Contact"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "Authorized Person",
            "authorizedPerson",
            {
              required: "Authorized person is required",
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: "Enter a valid name"
              }
            },
            "text",
            "Enter Authorized Person"
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            NGO Image (Docs)
          </label>
          <input
            type="file"
            {...register("logoURL")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            NGO Signature (Docs)
          </label>
          <input
            type="file"
            {...register("signatureURL")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "Pan Number",
            "ngoPAN",
            {
              required: "Pan Number is required",
              pattern: {
                value: "/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/",
                message: "Invalid PAN format (e.g., ABCDE1234F)"
              }
            },
            "text",
            "Enter Pan Number"
          )}
        </div>

        <div>
          {renderInputField(
            register,
            errors,
            "Contact Person",
            "contactPerson",
            {
              required: "Contact person is required",
              pattern: {
                vaue: "/^[0-9]{10}$/,",
                message: "Invalid contact number (e.g., 1234567890)"
              }
            },
            "text",
            "Enter Contact Person"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "12A Number",
            "ngo12ANumber",
            { required: "12A Number is required" },
            "text",
            "Enter 12A Number"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "Ngo Csr",
            "ngoCSRNumber",
            "text",
            "Enter Ngo CSR Number"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "Ngo FCRA",
            "ngoFCRANumber",
            "text",
            "Enter Ngo FCRA Number"
          )}
        </div>
        <div>
          {renderInputField(
            register,
            errors,
            "80G Number",
            "ngo80GNumber",
            { required: "80G Number is required" },
            "text",
            "Enter 80G Number"
          )}
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Register NGO
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterNGO;
