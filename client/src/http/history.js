// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getAboutHistory = () => api.get('/v1/history/get');
export const updateAboutHistory = (data) => api.post('/v1/history/edit', data); 



  