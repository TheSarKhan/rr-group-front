// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";


export const getSocials = () => api.get('/v1/social/getAll');
export const getSocial = (id) => api.get(`/v1/social/get/${id}`);
export const createSocial = (data) => api.post('/v1/social/add', data);
export const updateSocial = (id, formData) =>
  api.put(`/v1/social/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteSocial = (id) => api.delete(`/v1/social/delete/${id}`);


  