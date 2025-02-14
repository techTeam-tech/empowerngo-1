import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerNgo } from "../../api/masterApi";

const CLOUDINARY_CLOUD_NAME = "djb14fucx"; // Replace with your Cloudinary Cloud Name
const CLOUDINARY_UPLOAD_PRESET = "empngo-upload"; // Replace with your Cloudinary Upload Preset

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
  const selectedLogo = watch("logoURL");
  const selectedSignature = watch("signatureURL");

  const uploadToCloudinary = async (file, fieldName) => {
    if (!file) return null;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      console.log(`Uploading ${fieldName} to Cloudinary...`); // ✅ Log when upload starts

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(`Cloudinary Response for ${fieldName}:`, data); // ✅ Log full response

      if (data.secure_url) {
        console.log(`Uploaded ${fieldName} URL:`, data.secure_url); // ✅ Log secure URL
        setValue(fieldName, data.secure_url); // ✅ Save in form
        toast.success(`${fieldName} uploaded successfully!`);
        return data.secure_url;
      } else {
        console.error(`Error: Cloudinary response did not contain secure_url for ${fieldName}`);
        throw new Error("File uploaded but no URL returned.");
      }
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
      toast.error(`Error uploading ${fieldName}: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data.map((c) => c.name.common).sort()))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      // Upload files to Cloudinary and get URLs
      const logoUrl = selectedLogo?.[0] ? await uploadToCloudinary(selectedLogo[0], "logoURL") : null;
      const signatureUrl = selectedSignature?.[0] ? await uploadToCloudinary(selectedSignature[0], "signatureURL") : null;

      console.log("logoUrl - ", logoUrl);
      console.log("signatureUrl - ", signatureUrl);

      // Prepare data for API
      const formData = new FormData();
      formData.append("reqType", "s");
      formData.append("logoURL", logoUrl || "");
      formData.append("signatureURL", signatureUrl || "");

      Object.keys(data).forEach((key) => {
        if (key !== "logoURL" && key !== "signatureURL") {
          formData.append(key, data[key]);
        }
        console.log("formData - ", formData.key);
      });

      await registerNgo(formData);
      toast.success("NGO registered successfully!");
      reset();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">NGO Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div>
          <label className="block font-semibold text-gray-800">NGO Name *</label>
          <input {...register("ngoName", { required: "NGO name is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngoName && <p className="text-red-500 text-sm">{errors.ngoName.message}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">Registration Number *</label>
          <input {...register("ngoRegNumber", { required: "Registration number is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngoRegNumber && <p className="text-red-500 text-sm">{errors.ngoRegNumber.message}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">NGO Address *</label>
          <input {...register("ngoAddress", { required: "NGO address is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngoAddress && <p className="text-red-500 text-sm">{errors.ngoAddress.message}</p>}
        </div>

        {/* Column 2 */}
        <div>
          <label className="block font-semibold text-gray-800">City *</label>
          <input {...register("ngoCity", { required: "City is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngoCity && <p className="text-red-500 text-sm">{errors.ngoCity.message}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">State *</label>
          <input {...register("ngoState", { required: "State is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngoState && <p className="text-red-500 text-sm">{errors.ngoState.message}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">Country *</label>
          <select {...register("ngoCountry", { required: "Country is required" })} className="w-full border p-2 rounded-lg">
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country} selected={country === "India"}>{country}</option>
            ))}
          </select>
          {errors.ngoCountry && <p className="text-red-500 text-sm">{errors.ngoCountry.message}</p>}
        </div>

        {/* Column 3 */}
        {/* <div>
          <label className="block font-semibold text-gray-800">PIN Code *</label>
          <input {...register("ngoPinCode", { required: "PIN Code is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngoPinCode && <p className="text-red-500 text-sm">{errors.ngoPinCode.message}</p>}
        </div> */}

        <div>
          <label className="block font-semibold text-gray-800">PIN Code *</label>
          <input
            type="number"
            maxLength="6" // Prevents user from typing more than 6 digits
            {...register("ngoPinCode", {
              required: "PIN Code is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "PIN Code must be exactly 6 digits",
              },
            })}
            placeholder="Enter PIN code"
            className="w-full border p-2 rounded-lg"
          />
          {errors.ngoPinCode && <p className="text-red-500 text-sm">{errors.ngoPinCode.message}</p>}
        </div>



        {/* <div>
          <label className="block font-semibold text-gray-800">Email *</label>
          <input type="email" {...register("ngoEmail", { required: "Email is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngoEmail && <p className="text-red-500 text-sm">{errors.ngoEmail.message}</p>}
        </div> */}

        <div>
          <label className="block font-semibold text-gray-800">Email *</label>
          <input
            type="email"
            {...register("ngoEmail", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter email"
            className="w-full border p-2 rounded-lg"
          />
          {errors.ngoEmail && <p className="text-red-500 text-sm">{errors.ngoEmail.message}</p>}
        </div>

        {/* <div>
          <label className="block font-semibold text-gray-800">Contact *</label>
          <input type="tel" {...register("ngoContact", { required: "Contact number is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngoContact && <p className="text-red-500 text-sm">{errors.ngoContact.message}</p>}
        </div> */}

        <div>
          <label className="block font-semibold text-gray-800">Contact *</label>
          <input
            type="number"
            {...register("ngoContact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid contact number (must be 10 digits)",
              },
            })}
            placeholder="Enter contact number"
            className="w-full border p-2 rounded-lg"
          />
          {errors.ngoContact && <p className="text-red-500 text-sm">{errors.ngoContact.message}</p>}
        </div>


        {/* Additional Fields */}
        <div>
          <label className="block font-semibold text-gray-800">80G Number *</label>
          <input {...register("ngo80GNumber", { required: "80G is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngo80GNumber && <p className="text-red-500 text-sm">{errors.ngo80GNumber.message}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">12A Number *</label>
          <input {...register("ngo12ANumber", { required: "12A is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngo12ANumber && <p className="text-red-500 text-sm">{errors.ngo12ANumber.message}</p>}
        </div>

        {/* <div>
          <label className="block font-semibold text-gray-800">PAN Card *</label>
          <input {...register("ngoPAN", { required: "PAN Card is required" })} className="w-full border p-2 rounded-lg" />
          {errors.ngoPAN && <p className="text-red-500 text-sm">{errors.ngoPAN.message}</p>}
        </div> */}

        <div>
          <label className="block font-semibold text-gray-800">PAN Card *</label>
          <input
            {...register("ngoPAN", {
              required: "PAN Card is required",
              pattern: {
                value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                message: "Invalid PAN format (e.g., ABCDE1234F)",
              },
            })}
            placeholder="Enter PAN card number"
            className="w-full border p-2 rounded-lg"
          />
          {errors.ngoPAN && <p className="text-red-500 text-sm">{errors.ngoPAN.message}</p>}
        </div>


        <div>
          <label className="block font-semibold text-gray-800">Contact Person *</label>
          <input {...register("contactPerson", { required: "Contact person is required" })} placeholder="Enter Contact Person name" className="w-full border p-2 rounded-lg" />
          {errors.contactPerson && <p className="text-red-500 text-sm">{errors.contactPerson.message}</p>}
        </div>

        {/* Upload Fields */}
        {/* <div>
          <label className="block font-semibold text-gray-800">NGO Logo (Optional)</label>
          <input type="file" {...register("logoURL")} className="w-full border p-2 rounded-lg" />
        </div>

        <div>
          <label className="block font-semibold text-gray-800">Signature (Optional)</label>
          <input type="file" {...register("signatureURL")} className="w-full border p-2 rounded-lg" />
        </div> */}


        {/* NGO Logo Upload */}
        <div>
          <label className="block font-semibold text-gray-800">NGO Logo *</label>
          <input type="file" {...register("logoURL")} className="w-full border p-2 rounded-lg" accept="image/*" />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {selectedLogo && selectedLogo[0] && (
            <p className="text-green-600 text-sm mt-1">Selected: {selectedLogo[0].name}</p>
          )}
        </div>

        {/* Signature Upload */}
        <div>
          <label className="block font-semibold text-gray-800">Signature *</label>
          <input type="file" {...register("signatureURL")} className="w-full border p-2 rounded-lg" accept="image/*" />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {selectedSignature && selectedSignature[0] && (
            <p className="text-green-600 text-sm mt-1">Selected: {selectedSignature[0].name}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-800">Authorized Person *</label>
          <input {...register("authorizedPerson", { required: "Authorized person is required" })} className="w-full border p-2 rounded-lg" />
          {errors.authorizedPerson && <p className="text-red-500 text-sm">{errors.authorizedPerson.message}</p>}
        </div>

        {/* Submit Button
        <div className="col-span-3">
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold transition hover:opacity-90">
            Submit
          </button>
        </div> */}

        {/* Submit Button */}
        <div className="col-span-3">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold transition hover:opacity-90"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterNGO;
