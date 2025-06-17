import axios from "axios";
import { toast } from "react-toastify";


const api = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        if (config.auth !== false) {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        Promise.reject(error)
    }

);

export default api;
