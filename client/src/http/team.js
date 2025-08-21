// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getAboutTeams = () => api.get('/v1/team/getAll');
export const getAboutTeam = (id) => api.get(`/v1/team/get/${id}`);
export const createAboutTeam = (data) => api.post('/v1/team/add', data);
export const updateAboutTeam = (id, data) => api.put(`/v1/team/update/${id}`, data);
export const deleteAboutTeam = (id) => api.delete(`/v1/team/delete/${id}`);


  