// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getAboutValues = () => api.get('/v1/values/getAll');
export const getAboutValue = (id) => api.get(`/v1/values/get/${id}`);
export const createAboutValue = (data) => api.post('/v1/values/add', data);
export const updateAboutValue = (id, data) => api.put(`/v1/values/update/${id}`, data);
export const deleteAboutValue = (id) => api.delete(`/v1/values/delete/${id}`);


  