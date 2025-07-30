import React, { createContext, useState, useEffect, useContext } from 'react';
import { getGaleri } from '../ApiFake/mockApi';

const GaleriContext = createContext();
const ITEMS_PER_PAGE = 6;

export const GaleriProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchImages = async (pageNum) => {
    setLoading(true);
    try {
      const response = await getGaleri(pageNum, ITEMS_PER_PAGE);
      // Jika halaman 1, ganti seluruh data. Jika tidak, tambahkan data baru.
      setImages(prev => pageNum === 1 ? response.data : [...prev, ...response.data]);
      setHasMore(response.meta.current_page < response.meta.last_page);
      setPage(pageNum + 1);
    } catch (error) {
      console.error("Gagal mengambil data galeri:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Ambil data pertama kali
  useEffect(() => {
    fetchImages(1);
  }, []);
  
  // Fungsi untuk tombol "See more"
  const loadMore = () => {
    if (hasMore) {
      fetchImages(page);
    }
  };

  // Fungsi untuk tombol "See less"
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