import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const api = axios.create({
  baseURL: isProduction 
    ? 'https://my-shops-with-react-backend.onrender.com' 
    : '/api', // This will use the proxy in development
  withCredentials: true,
});

export default api;
