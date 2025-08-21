// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });

import api from "./axios";

export const getAboutCertificates = () => api.get('/v1/certificates/getAll');
export const getAboutCertificate = (id) => api.get(`/v1/certificates/get/${id}`);
export const createAboutCertificate = (data) => api.post('/v1/certificates/add', data);
export const updateAboutCertificate = (id, data) => api.put(`/v1/certificates/update/${id}`, data);
export const deleteAboutCertificate = (id) => api.delete(`/v1/certificates/delete/${id}`);


  