 
import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/v1/auth`,
});
 

import client from "./apiClient"; // smart one with token refresh

export const register = async ({ username, password }) => {
  try {
    const res = await API.post("/register", { username, password });
    return res.data;
  } catch (err) {
    console.error("REGISTER ERROR:", err.response?.data || err.message);
    throw err;
  }
};

export const login = (data) => API.post("/login", data);
export const resetPassword = (data, config) => API.post("/reset", data, config);
export const verify = (data) => API.post("/verify", data);
export const forgetPassword = (body, config) => API.post("/forgetPassword", body, config);

export const refreshToken = (usernameOrEmail, newEmail) =>
  API.put("/reset/email", { newEmail }, { params: { param: usernameOrEmail } });

// 🔐 Use smart client for protected endpoints:

export const logout = ({ email, refreshToken }) =>
  client.post("/logout", { email, refreshToken });

export const sendVerificationCode = (email) =>
  client.post("/sendVerificationCode", null, { params: { email } });

export const updateEmail = (newEmail) =>
  client.put("/reset/email", null, {
    params: { param: newEmail },
  });
