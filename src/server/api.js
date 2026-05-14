import axios from "axios";

const api_key = import.meta.env.REACT_APP_COINCAP_API_KEY;

const api = axios.create({
  baseURL: "https://rest.coincap.io/v3",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${api_key}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
