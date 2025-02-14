import api from "./api";

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



// export const registerNgo = async (formData) => {
//   try {
//     const response = await api.post("/manageNGO", { ...formData, reqType: "s" });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

export const registerNgo = async (formData) => {
  try {
    //formData.append("reqType", "s"); // Required field
    console.log("formData - ",formData);
    const response = await api.post("/manageNGO", formData, {
     // headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("response - ",response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
