// // import axios from 'axios';

// // const api = axios.create({
// //   baseURL: import.meta.env.VITE_API_BASE_URL,
// //   withCredentials: true,
// // });

// // export const fetchCsrfToken = async () => {
// //   const { data } = await api.get('/auth/csrf-token');
// //   return data.token; 
// // };

// // export default api;
// // http/auth.js
// import axios from "axios";

// const AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true, // Important for CSRF cookie
// });

// export const getCsrfToken = () => AxiosInstance.get("/v1/auth/csrf-token");

// export const login = (credentials) =>
//   AxiosInstance.post("/v1/auth/login", credentials); // { email, password }
// export const logout = () =>
//   AxiosInstance.post("/v1/auth/logout");
// export const register = (userData) =>
//   AxiosInstance.post("/v1/auth/register", userData);
// export const verify = (data) =>
//   AxiosInstance.post("/v1/auth/verify", data);

// export const resetPassword = (data) =>
//   AxiosInstance.post("/v1/auth/reset", data);

// export const forgetPassword = (data) =>
//   AxiosInstance.post("/v1/auth/forgetPassword", data);

// src/http/axios.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   withCredentials: true, 
// });

// export default api;

import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "@/http/auth/token";
import { refreshToken } from "@/http/auth"; // assumes your refresh logic is in here

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // for cookies if needed
});

// ✅ Attach accessToken to every request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔁 Auto-refresh access token if expired
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshed = await refreshToken({
          accessToken: getAccessToken(),
          refreshToken: getRefreshToken(),
        });

        setTokens(refreshed.data);

        originalRequest.headers.Authorization = `Bearer ${refreshed.data.accessToken}`;
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;

