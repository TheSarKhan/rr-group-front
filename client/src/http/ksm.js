// import axios from "axios";

import api from "./axios";

// const AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });


export const getKsms = () => api.get('/v1/ksm/getAll');
export const getKsm = (id) => api.get(`/v1/ksm/get/${id}`);
export const createKsm = (data) => api.post('/v1/ksm/add', data);
export const updateKsm = (id, formData) =>
  api.put(`/v1/ksm/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteKsm = (id) => api.delete(`/v1/ksm/delete/${id}`);


  