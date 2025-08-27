import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance'; // Pastikan path ini benar

const GaleriContext = createContext();
const ITEMS_PER_PAGE = 6;

export const GaleriProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchImages = async (pageNum) => {
    // Set loading yang sesuai: loading utama untuk halaman 1, loadingMore untuk sisanya
    if (pageNum === 1) setLoading(true);

    try {
      const response = await axiosInstance.get(`/api/galeri?page=${pageNum}&limit=${ITEMS_PER_PAGE}`);
      console.log('Data mentah dari Backend:', response.data);
      // Jika halaman 1, ganti seluruh data. Jika tidak, tambahkan data baru.
      setImages(prev => pageNum === 1 ? response.data.data : [...prev, ...response.data.data]);
      setHasMore(response.data.current_page < response.data.last_page);
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
    fetchImages(1); // Ambil kembali hanya data halaman pertama
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