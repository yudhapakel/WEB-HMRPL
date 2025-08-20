// src/context/RekrutmenContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';

const RekrutmenContext = createContext();

export const RekrutmenProvider = ({ children }) => {
  const [posters, setPosters] = useState([]); // <-- Ganti jadi array kosong
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosters = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/rekrutmen'); // <-- Panggil endpoint baru
        setPosters(response.data); // <-- Simpan seluruh array
      } catch (error) {
        console.error("Gagal mengambil data rekrutmen:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosters();
  }, []);

  const value = { posters, loading }; // <-- Kirim 'posters' (plural)

  return (
    <RekrutmenContext.Provider value={value}>
      {children}
    </RekrutmenContext.Provider>
  );
};

export const useRekrutmen = () => {
  return useContext(RekrutmenContext);
};