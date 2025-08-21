// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";


export const getAboutVision = () => api.get('/v1/vision/get');
export const updateAboutVision = (data) => api.post('/v1/vision/edit', data); 



  