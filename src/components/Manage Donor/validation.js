export const validateField = (name) => {
    const validations = {
      donorFName: { required: "First name is required" },
      donorLName: { required: "Last name is required" },
      donorAddress: { required: "Address is required" },
      donorCity: { required: "City is required" },
      donorState: { required: "State is required" },
      donorCountry: { required: "Country is required" },
      donorPinCode: { required: "Pincode is required" },
      donorMobile: { 
        required: "Mobile number is required", 
        pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number" } 
      },
      donorEmail: { 
        required: "Email is required", 
        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address" } 
      },
      donorPAN: { 
        required: "PAN number is required", 
        pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: "Invalid PAN number" } 
      },
      donorProfession: { required: "Profession is required" },
      donorType: { required: "Donor Type is required" }
    };
    return validations[name] || {};
  };
  