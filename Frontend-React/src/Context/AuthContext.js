import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

async function ensureCsrf() {
  // Ambil cookie XSRF dulu (aman dipanggil berkali-kali)
  await axiosInstance.get('/sanctum/csrf-cookie');
}

async function getMe() {
  return axiosInstance.get('/api/me').then(r => r.data);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // -------- Logout (perbaikan: /logout, bukan /api/logout)
  const logout = useCallback(async () => {
    try {
      await ensureCsrf();
      await axiosInstance.post('/logout');  // <— di web middleware
    } catch (e) {
      console.error('Logout gagal:', e?.response?.data || e.message);
    } finally {
      setUser(null);
      navigate('/login');
    }
  }, [navigate]);

  // -------- Cek sesi saat app load
  useEffect(() => {
    (async () => {
      try {
        await ensureCsrf();
        const me = await getMe();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // -------- Dipanggil dari halaman login
  //   - Lakukan POST /login di halaman login
  //   - Setelah sukses, panggil auth.login() ini agar state sinkron
  const login = useCallback(async () => {
    try {
      await ensureCsrf();
      const me = await getMe();   // sinkronkan user setelah login sukses
      setUser(me);
      navigate('/admin');
    } catch (e) {
      setUser(null);
      throw e; // biar halaman login bisa nampilin error
    }
  }, [navigate]);

  const value = { user, login, logout, loading };

  if (loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
        <p>Loading Aplikasi...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
