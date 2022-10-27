import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT || 3002}`,
  validateStatus: (status) => status < 500,
});
