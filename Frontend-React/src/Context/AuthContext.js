import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     axiosInstance.get('/me', {
  //       headers: { 'Authorization': `Bearer ${token}` }
  //     }).then(response => {
  //       setUser(response.data); 
  //     }).catch(() => {
  //       localStorage.removeItem('authToken');
  //     }).finally(() => {
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

    // useEffect ini sekarang akan memeriksa sesi cookie, bukan token
  useEffect(() => {
    axiosInstance.get('/api/me') // Langsung panggil /api/me
      .then(response => {
        setUser(response.data); // Jika berhasil, set user
      })
      .catch(() => {
        // Jika gagal, tidak perlu melakukan apa-apa, user tetap null
        console.log("Tidak ada sesi aktif.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // const login = (userData, token) => {
  //   setUser(userData);
  //   localStorage.setItem('authToken', token);
  //   navigate('/admin'); 
  // };

    // Fungsi login tidak lagi butuh dan tidak akan menerima token
  const login = (userData) => {
    setUser(userData);
    navigate('/admin');
  };

  // const logout = () => {
  //   setUser(null);
  //   localStorage.removeItem('authToken');
  //   navigate('/login');
  // };

    // Logout sekarang juga bisa memanggil endpoint logout di backend
  const logout = async () => {
    try {
      await axiosInstance.post('/api/logout');
    } catch (error) {
      console.error("Logout gagal di server", error);
    } finally {
      setUser(null);
      navigate('/login');
    }
  };

  const value = { user, login, logout, loading };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading Aplikasi...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};