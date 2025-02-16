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
    const requestData = { reqType };

    // If reqType is "info", add ngoID to the request
    if (reqType === "info" && ngoId) {
      requestData.ngoID = ngoId;  // Ensure the key matches the backend requirement
    }

    const response = await api.post("/retrieveNGOInfo", requestData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};



// export const retrieveNGOInfo = async (reqType) => {
//   try {
//     const response = await api.post("/retrieveNGOInfo", {reqType});
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

//method wto invoke userSignIn /manageProject
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

//method wto invoke userSignIn /managePurpose
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
