// src/context/RekrutmenContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';

const RekrutmenContext = createContext();

export const RekrutmenProvider = ({ children }) => {
  const [posters, setPosters] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosters = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/rekrutmen'); 
        setPosters(response.data);
      } catch (error) {
        console.error("Gagal mengambil data rekrutmen:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosters();
  }, []);

  const value = { posters, loading };

  return (
    <RekrutmenContext.Provider value={value}>
      {children}
    </RekrutmenContext.Provider>
  );
};

export const useRekrutmen = () => {
  return useContext(RekrutmenContext);
};