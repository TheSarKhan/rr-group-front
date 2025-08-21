// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getHomeChoose= () => api.get('/v1/whyChooseUs/getAll');
export const createHomeChoose = (data) => api.post('/v1/whyChooseUs/add', data);
export const updateHomeChoose = (id, formData) =>
  api.put(`/v1/whyChooseUs/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteHomeChoose = (id) => api.delete(`/v1/whyChooseUs/delete/${id}`);





  