import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${token}'
    },
    withCredentials: true,
});

export default api;