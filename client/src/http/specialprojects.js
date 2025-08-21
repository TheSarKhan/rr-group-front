// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getSpecialProjects = () => api.get('v1/specials/getAll');
export const getSpecialProject = (id) => api.get(`/v1/specials/get/${id}`);
export const createSpecialProject = (data) => api.post('/v1/specials/add', data);
export const updateSpecialProject = (id, formData) =>
  api.put(`/v1/specials/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteSpecialProject = (id) => api.delete(`/v1/specials/delete/${id}`);


  