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
