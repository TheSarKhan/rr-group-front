

import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 5000,
});


export const getAPiData = async (url, ...config) => {
  return await AxiosInstance.get(url, ...config).then(res => res.data);
};


export const postApiData = async (url, data, ...config) => {
  return await AxiosInstance.post(url, data, ...config).then(res => res.data);
};
