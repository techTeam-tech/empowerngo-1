import api from "./api";

//method wto invoke userSignIn
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/userSignIn", credentials);
    const { token, user } = response.data.payload;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//method wto invoke userSignIn /manageNGO
export const registerNgo = async (formData) => {
  try {
    console.log("formData - ", formData);
    const response = await api.post("/manageNGO", formData);
    console.log("response - ", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const retrieveNGOList = async (reqType, ngoId = null) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Missing authentication token");
    }
    if (!["list", "info"].includes(reqType)) {
      throw new Error("\"reqType\" must be one of [list, info]");
    }
    const requestData = { reqType };
    if (reqType === "info" && !ngoId) {
      throw new Error("ngoID is required when reqType is 'info'");
    }
    if (ngoId) {
      requestData.ngoID = ngoId;
    }
    console.log("Sending Request Data:", requestData);
    console.log("Token Sent:", token);
    const response = await api.post("/retrieveNGOInfo", requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("retrieveNGOList API Error:", error);
    throw error.response?.data || error.message;
  }
};


export const manageProject = async (formData, reqType) => {
  try {
    formData.append("reqType", reqType);
    console.log("manageProject API - Request:", formData);

    const response = await api.post("/manageProject", formData);
    console.log("manageProject API - Response:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const managePurpose = async (formData, reqType) => {
  try {
    formData.append("reqType", reqType);
    console.log("managePurpose API - Request:", formData);

    const response = await api.post("/managePurpose", formData);
    console.log("managePurpose API - Response:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProjects = async (ngoID) => {
  try {
    const response = await api.post("/manageProject", { reqType: "g", ngoID });
    return response.data.payload || [];
    console.log("responce projects - ", response);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPurposes = async (ngoID, projectID) => {
  try {
    const response = await api.post("/managePurpose", {
      reqType: "g",
      ngoID,
      projectID
    });
    return response.data.payload || [];
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const registerUser = async (formData) => {
  try {
    console.log("formData - ", formData);
    const response = await api.post("/manageUserRegistration", formData, {
    });
    console.log("response - ", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//method to get registered user list
export const retrieveUserList = async (reqType) => {
  try {
    const requestData = { reqType };

    //   if (reqType === "list") {
    //   requestData.ngoID = ngoId;  // Ensure the key matches the backend requirement
    // }

    const response = await api.post("/retrieveUsersInfo", requestData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const handleStaffRequest = async (formData) => {
  try {
    const { reqType } = formData;

    if (!["s", "u"].includes(reqType)) {
      throw new Error("Invalid reqType. Must be 's' for staff save or 'u' for staff update.");
    }
    if (reqType === "s") {
      if (formData.roleCode === 1) {
        if (formData.ngoId) {
          throw new Error("NGO ID should not be provided for Super Admin role.");
        }
      } else if ([2, 3, 4].includes(formData.roleCode)) {
        if (!formData.ngoId) {
          throw new Error("NGO ID is required for roles 2, 3, or 4.");
        }
      } else {
        throw new Error("Invalid role code.");
      }
      const response = await api.post("/manageUserRegistration", formData);
      return response.data;
    }
    if (reqType === "u") {
      if ([2, 3, 4].includes(formData.roleCode)) {
        if (!formData.ngoId) {
          throw new Error("NGO ID is required for updating this role.");
        }
      } else if (formData.roleCode === 1) {
        if (formData.ngoId) {
          throw new Error("NGO ID should not be provided for Super Admin role update.");
        }
      } else {
        throw new Error("Invalid role code.");
      }
      const response = await api.post("/manageUserRegistration", formData);
      return response.data;
    }

    throw new Error("Invalid request type.");
  } catch (error) {
    console.error("Error handling staff request:", error);
    throw error.response?.data || error.message;
  }
};


