// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });

import api from "./axios";
export const getNews = () => api.get('/v1/news/getAll');
export const getNew = (id) => api.get(`/v1/news/get/${id}`);
export const createNew = (data) => api.post('/v1/news/add', data);
export const updateNew = (id, formData) =>
  api.put(`/v1/news/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteNew = (id) => api.delete(`/v1/news/delete/${id}`);


  