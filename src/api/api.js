import axios from 'axios';

const API_BASE_URL = "https://kayrseuphg.execute-api.ap-south-1.amazonaws.com/Stage";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error); 
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.error("API Error:", error.response?.data || error.message); 
    return Promise.reject(error); 
  }
);

export default api;
