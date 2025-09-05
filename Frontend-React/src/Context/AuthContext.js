import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export const generateSimpleId = () => {
  return Math.random().toString(36).substr(2, 9);
}

export const getOrCreateComputerId = () => {
  let computerId = localStorage.getItem('computerId');
  if (!computerId) {
    computerId = generateSimpleId();
    localStorage.setItem("computerId", computerId);
  }
  return computerId;
}

export const checkAdminLoginStatus = () => {
  const loginInfoString = localStorage.getItem("adminLoginInfo");
  if (loginInfoString) {
    const loginInfo = JSON.parse(loginInfoString);
    const currentComputerId = getOrCreateComputerId();
    if (loginInfo.computerId === currentComputerId && loginInfo.expirationTime > Date.now()) {
      return true;
    }
  }
  // Jika tidak valid, langsung hapus tiketnya
  localStorage.removeItem("adminLoginInfo");
  return false;
}


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/api/logout');
    } catch (error) {
      console.error("Logout gagal di server", error);
    } finally {
      setUser(null);
      localStorage.removeItem('token'); // Hapus token jika masih pakai
      localStorage.removeItem('adminLoginInfo'); // Hapus "tiket"
      navigate('/login');
    }
  }, [navigate]);

  // --- useEffect #1: Mengecek sesi saat aplikasi pertama kali dimuat ---
  useEffect(() => {
    // Cek dulu tiket di sisi klien
    if (checkAdminLoginStatus()) {
      // Jika tiket valid, baru cek ke server
      axiosInstance.get('/api/me')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          // Jika server tidak valid, paksa logout
          console.log("Sesi server tidak valid, paksa logout.");
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Jika tiket klien tidak ada/tidak valid, langsung selesai loading
      setLoading(false);
    }
  }, [logout]);

  // --- useEffect #2: Menjalankan "petugas pengecek tiket" berkala ---
  useEffect(() => {
    const checkSession = () => {
      if (user && !checkAdminLoginStatus()) {
        console.log("Sesi klien kedaluwarsa, logout otomatis.");
        logout();
      }
    };
    // Cek setiap 30 detik
    const timer = setInterval(checkSession, 30000);
    // Hentikan timer saat komponen tidak lagi digunakan
    return () => clearInterval(timer);
  }, [user, logout]);


  const login = (userData) => {
    setUser(userData);
    
    // Buat "tiket" baru saat login
    const computerId = getOrCreateComputerId();
    const expirationTime = Date.now() + 30 * 60 * 1000; // 30 menit dari sekarang
    localStorage.setItem("adminLoginInfo", JSON.stringify({
        computerId,
        expirationTime    
    }));

    navigate('/admin');
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