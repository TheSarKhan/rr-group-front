// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });

import api from "./axios";

export const getProjects = () => api.get('/v1/projects/getAll');
export const getProject = (id) => api.get(`/v1/projects/get/${id}`);
export const createProject = (data) => api.post('/v1/projects/add', data);
// export const updateProject = (id, data) => api.put(`/v1/projects/update/${id}`, data);
export const updateProject = (id, formData) =>
    api.put(`/v1/projects/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
export const deleteProject = (id) => api.delete(`/v1/projects/delete/${id}`);


  