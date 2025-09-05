import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json'
  // },
  withCredentials: true,
});

// logic interceptor untuk API
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(
      '%c AXIOS INTERCEPTOR BERJALAN ',
      'background: #1976D2; color: #fff; font-weight: bold;'
    );

    const token = localStorage.getItem('token');
    console.log('Token yang dibaca dari localStorage:', token);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Header Authorization BERHASIL ditambahkan ke request.');
    } else {
      console.warn('Header Authorization GAGAL ditambahkan karena token tidak ditemukan.');
    }
    
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;