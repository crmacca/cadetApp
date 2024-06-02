import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'http://localhost:4550/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
