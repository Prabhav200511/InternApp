import axios from 'axios';

// Get the base URL from your .env file
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${baseURL}/api`, // We can add /api here to shorten other calls
  withCredentials: true,
});

export default api;