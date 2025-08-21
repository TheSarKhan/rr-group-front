import api from "./axios";

export const getAboutManagementStructure = () => api.get('/v1/management-structure/get');
export const updateAboutManagementStructure = (data) => api.post('/v1/management-structure/edit', data); 
