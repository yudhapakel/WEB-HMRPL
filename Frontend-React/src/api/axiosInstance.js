import axios from 'axios';

// Pastikan file .env kamu isinya:
// REACT_APP_API_URL=https://hmrpl-telubdg.com

const axiosInstance = axios.create({
    // baseURL-nya JANGAN pakai '/api'
    // Ini supaya kita bisa manggil /sanctum/csrf-cookie
    baseURL: '/',

    // KUNCI UTAMA untuk login cookie
    withCredentials: true, 
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// HAPUS SEMUA interceptor token (yang 'Authorization: Bearer ...')
// Kita tidak pakai Bearer token untuk setup ini.

// Pastikan export-nya adalah 'axiosInstance'
export default axiosInstance;