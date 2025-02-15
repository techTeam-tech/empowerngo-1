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
    setValue,
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
      toast.success("NGO registered successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      reset();
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        NGO Registration
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {renderInputField(register, errors, "NGO Name *", "ngoName", {
          required: "NGO name is required",
        })}
        {renderInputField(
          register,
          errors,
          "Registration Number *",
          "ngoRegNumber",
          { required: "Registration number is required" }
        )}
        {renderInputField(register, errors, "NGO Address *", "ngoAddress", {
          required: "NGO address is required",
        })}
        {renderInputField(register, errors, "City *", "ngoCity", {
          required: "City is required",
        })}
        {renderInputField(register, errors, "State *", "ngoState", {
          required: "State is required",
        })}
        <div>
          <label className="block font-semibold text-gray-800">Country *</label>
          <select
            {...register("ngoCountry", { required: "Country is required" })}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option
                key={index}
                value={country}
                selected={country === "India"}
              >
                {country}
              </option>
            ))}
          </select>
          {errors.ngoCountry && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ngoCountry.message}
            </p>
          )}
        </div>

        {renderInputField(
          register,
          errors,
          "PIN Code *",
          "ngoPinCode",
          {
            required: "PIN Code is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "PIN Code must be exactly 6 digits",
            },
          },
          "number"
        )}
        {renderInputField(
          register,
          errors,
          "Email *",
          "ngoEmail",
          {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          },
          "email"
        )}
        {renderInputField(
          register,
          errors,
          "Contact *",
          "ngoContact",
          {
            required: "Contact number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Invalid contact number (must be 10 digits)",
            },
          },
          "number"
        )}
        {renderInputField(register, errors, "80G Number *", "ngo80GNumber", {
          required: "80G is required",
        })}
        {renderInputField(register, errors, "12A Number *", "ngo12ANumber", {
          required: "12A is required",
        })}
        {renderInputField(register, errors, "PAN Card *", "ngoPAN", {
          required: "PAN Card is required",
          pattern: {
            value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            message: "Invalid PAN format (e.g., ABCDE1234F)",
          },
        })}
        {renderInputField(
          register,
          errors,
          "Contact Person *",
          "contactPerson",
          { required: "Contact person is required" }
        )}
        {renderInputField(
          register,
          errors,
          "Authorized Person *",
          "authorizedPerson",
          { required: "Authorized person is required" }
        )}

        <div className="col-span-full">
          <label className="block font-semibold text-gray-800">
            NGO Logo *
          </label>
          <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-blue-500 transition-all">
            <input
              type="file"
              {...register("logoURL")}
              className="hidden"
              id="logoURL"
              accept="image/*"
            />
            <label htmlFor="logoURL" className="cursor-pointer text-center">
              {selectedLogo && selectedLogo[0] ? (
                <p className="text-green-600">
                  Selected: {selectedLogo[0].name}
                </p>
              ) : (
                <p className="text-gray-500">Click to upload NGO Logo</p>
              )}
            </label>
          </div>
        </div>

        <div className="col-span-full">
          <label className="block font-semibold text-gray-800">
            NGO Signature Docs <span className="">*</span>
          </label>
          <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-blue-500 transition-all">
            <input
              type="file"
              {...register("signatureURL")}
              className="hidden"
              id="signatureURL"
              accept="image/*,application/pdf"
            />
            <label
              htmlFor="signatureURL"
              className="cursor-pointer text-center"
            >
              {selectedSignature && selectedSignature[0] ? (
                <p className="text-green-600">
                  Selected: {selectedSignature[0].name}
                </p>
              ) : (
                <p className="text-gray-500">Click to upload Signature Docs</p>
              )}
            </label>
          </div>
        </div>
        <div className="col-span-full flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loading className="mr-2" />
                Registering...
              </>
            ) : (
              "Register NGO"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterNGO;

