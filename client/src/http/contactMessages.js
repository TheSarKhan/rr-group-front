// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getContactsMessages = () => api.get('v1/contact/getAll/contactMessages');
export const deleteContactMessages = (id) => api.delete(`/v1/contact/delete/contactMessages/${id}`);


  