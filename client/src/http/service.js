// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });


import api from "./axios";
export const getCards = () => api.get('/v1/service/card/getAll');
export const getCard = (id) => api.get(`/v1/service/card/get/${id}`);
export const createCard = (data) => api.post('/v1/service/card/add', data);
export const updateCard = (id, formData) =>
  api.put(`/v1/service/card/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteCard = (id) => api.delete(`/v1/service/card/delete/${id}`);

export const getHeads = () => api.get('/v1/service/head-category/getAll');
export const getHead = (id) => api.get(`/v1/service/head-category/get/${id}`);
export const createHead = (data) => api.post('/v1/service/head-category/add', data);
export const updateHead = (id, formData) =>
  api.put(`/v1/service/head-category/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteHead = (id) => api.delete(`/v1/service/head-category/delete/${id}`);


export const getSubs = () => api.get('/v1/service/sub-category/getAll');
export const getSub = (id) => api.get(`/v1/service/sub-category/get/${id}`);
export const createSub = (data) =>
  api.post("/v1/service/sub-category/add", data, {
    headers: { "Content-Type": "application/json" },
  });
export const updateSub = (id, formData) =>
  api.put(`/v1/service/sub-category/update/${id}`, formData, {
    headers: { "Content-Type": "application/json" },
  });
export const deleteSub = (id) => api.delete(`/v1/service/sub-category/delete/${id}`);


  