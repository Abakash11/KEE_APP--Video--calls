import axios from 'axios';
const baseURL=import.meta.env.MODE === 'development' ? 'http://localhost:5050/api' : '/api';
export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

