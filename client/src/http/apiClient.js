import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./tokenService";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/v1/auth`,
  timeout: 5000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

client.interceptors.request.use(
  config => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => Promise.reject(error)
);

client.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return client(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // const res = await axios.post("http://217.18.210.188:8080/api/v1/auth/refresh", {
        //   accessToken: getAccessToken(),
        //   refreshToken: getRefreshToken(),
        // });
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/v1/auth/refresh`,
          {
            accessToken: getAccessToken(),
            refreshToken: getRefreshToken(),
          }
        );

        const { accessToken, refreshToken } = res.data;
        setTokens(accessToken, refreshToken);
        client.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

        processQueue(null, accessToken);
        return client(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens(); // logout user or redirect to login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;
