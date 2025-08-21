// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 5000,
// });
import api from "./axios";

export const getCv = () => api.get('v1/vacancy/applicant/getAll');
export const deleteCv = (id) => api.delete(`/v1/vacancy/applicant/delete/${id}`);


  