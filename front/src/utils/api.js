import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, formData);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};

export const registerUser = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/register`, formData);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Signup failed";
  }
};
