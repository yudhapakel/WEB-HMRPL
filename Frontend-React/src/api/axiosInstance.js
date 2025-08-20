import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json'
  // },
  withCredentials: true,
});

// MENAMBAHKAN INTERCEPTOR (BAGIAN YANG HILANG)
// Kode ini akan berjalan secara otomatis SETIAP KALI kamu melakukan request
// menggunakan 'axiosInstance'
axiosInstance.interceptors.request.use(
  (config) => {
    // 1. Memberi tahu kita di console bahwa interceptor berjalan
    console.log(
      '%c AXIOS INTERCEPTOR BERJALAN ',
      'background: #1976D2; color: #fff; font-weight: bold;'
    );

    // 2. Mengambil token dari localStorage
    const token = localStorage.getItem('token');
    console.log('Token yang dibaca dari localStorage:', token);

    // 3. Jika token ada, tempelkan ke header Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Header Authorization BERHASIL ditambahkan ke request.');
    } else {
      console.warn('Header Authorization GAGAL ditambahkan karena token tidak ditemukan.');
    }
    
    return config; // Kembalikan config yang sudah dimodifikasi
  },
  (error) => {
    // Lakukan sesuatu jika ada error pada request
    return Promise.reject(error);
  }
);

export default axiosInstance;