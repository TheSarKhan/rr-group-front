// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getAboutMissions = () => api.get('/v1/missions/getAll');
export const getAboutMission = (id) => api.get(`/v1/missions/get/${id}`);
export const createAboutMission = (data) => api.post('/v1/missions/add', data);
export const updateAboutMission = (id, data) => api.put(`/v1/missions/update/${id}`, data);
export const deleteAboutMission = (id) => api.delete(`/v1/missions/delete/${id}`);


  