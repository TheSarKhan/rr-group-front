// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getContacts = () => api.get('/v1/contact/getAll');
export const getContact = (id) => api.get(`/v1/contact/get/${id}`);
export const createContact = (data) => api.post('/v1/contact/add', data);
export const updateContact = (id, formData) =>
  api.put(`/v1/contact/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteContact = (id) => api.delete(`/v1/contact/delete/${id}`);


  