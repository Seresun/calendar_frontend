import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_URL || 'https://calendar-backend-wx4e.onrender.com/';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

