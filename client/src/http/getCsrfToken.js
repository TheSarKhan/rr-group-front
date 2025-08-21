// src/http/getCsrfToken.js
import api from "./axios";

export const getCsrfToken = async () => {
  const res = await api.get("/v1/auth/csrf-token");
  return res.data.csrfToken; // Adjust based on backend response shape
};
