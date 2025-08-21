// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getForeigns = () => api.get('v1/foreign/getAll');
export const getForeign = (id) => api.get(`/v1/foreign/get/${id}`);
export const createForeign = (data) => api.post('/v1/foreign/add', data);
export const updateForeign = (id, formData) =>
  api.put(`/v1/foreign/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteForeign = (id) => api.delete(`/v1/foreign/delete/${id}`);


  