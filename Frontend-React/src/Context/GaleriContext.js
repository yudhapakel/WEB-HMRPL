import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance'; 

const GaleriContext = createContext();
const ITEMS_PER_PAGE = 6;

export const GaleriProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchImages = async (pageNum) => {
    if (pageNum === 1) setLoading(true);

    try {
      const response = await axiosInstance.get(`/api/galeri?page=${pageNum}&limit=${ITEMS_PER_PAGE}`);
      console.log('Data mentah dari Backend:', response.data);
      setImages(prev => pageNum === 1 ? response.data.data : [...prev, ...response.data.data]);
      setHasMore(response.data.current_page < response.data.last_page);
      setPage(pageNum + 1);
    } catch (error) {
      console.error("Gagal mengambil data galeri:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchImages(1);
  }, []);
  
  const loadMore = () => {
    if (hasMore) {
      fetchImages(page);
    }
  };

  const resetAndReload = () => {
    const section = document.querySelector('.galeri-kegiatan-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    fetchImages(1);
  };

  const value = { images, loading, hasMore, loadMore, resetAndReload };

  return (
    <GaleriContext.Provider value={value}>
      {children}
    </GaleriContext.Provider>
  );
};

export const useGaleri = () => {
  return useContext(GaleriContext);
};