// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getSetems = () => api.get('v1/setem/getAll');
export const getSetem = (id) => api.get(`/v1/setem/get/${id}`);
export const createSetem = (data) => api.post('/v1/setem/add', data);
export const updateSetem = (id, formData) =>
  api.put(`/v1/setem/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteSetem = (id) => api.delete(`/v1/setem/delete/${id}`);


  