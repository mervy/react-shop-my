import axios from 'axios';

const api = axios.create({
    //MODE já existe por default no Vite
   /*baseURL: import.meta.env.MODE === 'production'
        ? import.meta.env.RENDER_BACKEND_URL
        : import.meta.env.VITE_API_URL*/
    baseURL: 'https://my-shops-with-react-backend.onrender.com/api'
});

export default api;
