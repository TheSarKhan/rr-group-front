// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
// import api from "./axios";


// export const getVacancies = () => api.get('/v1/vacancy/getAll');
// export const getVacancy = (id) => api.get(`/v1/vacancy/get/${id}`);
// export const createVacancy = (data) => api.post('/v1/vacancy/add', data);
// export const updateVacancy = (id, formData) =>
//   api.put(`/v1/vacancy/update/${id}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// export const deleteVacancy = (id) => api.delete(`/v1/vacancy/delete/${id}`);
import api from "./axios";
export const getVacancies = () => api.get('/v1/vacancy/getAll');
export const getVacancy = (id) => api.get(`/v1/vacancy/get/${id}`);
export const createVacancy = (data) => api.post('/v1/vacancy/add', data);
export const updateVacancy = (id, data) =>
  api.put(`/v1/vacancy/update/${id}`, data);  // data is JSON object, not FormData

export const deleteVacancy = (id) => api.delete(`/v1/vacancy/delete/${id}`);


  