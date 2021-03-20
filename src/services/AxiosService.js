import axios from 'axios';
import { getToken } from './auth';

const url = 'http://localhost:8080/project-management-backend';

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    // config.headers.Authorization = `${token}`;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
