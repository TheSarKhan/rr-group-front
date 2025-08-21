// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });

import api from "./axios";
export const getHomeAbout= () => api.get('/v1/home/about/get');
export const createAboutMission = (data) => api.post('/v1/home/about/add', data);
export const updateHomeAbout = (id, formData) =>
  api.put(`/v1/home/about/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteHomeAbout = (id) => api.delete(`/v1/home/about/delete/${id}`);





  