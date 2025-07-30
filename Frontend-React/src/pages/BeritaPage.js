import React, { useState, useEffect } from 'react';
import BeritaList from '../components/Berita/BeritaList';
import './BeritaPage.css';
// import axiosInstance from '../api/axiosInstance'; // nanti diaktifin kalo api nya udah ada

const BeritaPage = () => {
  const [semuaBerita, setSemuaBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      try {
        const dummyResponse = {
          data: Array.from({ length: 7 }, (v, i) => ({ 
            id: i + 1, 
            slug: `judul-berita-${i + 1}`,
            title: i === 0 ? 'Peluncuran Website Himpunan' : `Judul Berita Lainnya ${i}`, 
            date: '30 September 2025', 
            excerpt: 'Bandung - Ini adalah cuplikan singkat dari berita...', 
            imageUrl: 'https://via.placeholder.com/400x300' 
          })),
          meta: { last_page: 4 }
        };
        setSemuaBerita(dummyResponse.data);
        setTotalPages(dummyResponse.meta.last_page);
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBerita();
  }, [currentPage]);

  return (
    <div className="berita-page-container">
        <h1>INI TES HALAMAN BERITA</h1> 
      <div className="berita-header text-center">
        <h1 className="berita-title">SE-NEWS</h1>
        <p className="berita-subtitle">Berita seputar himpunan mahasiswa rekayasa perangkat lunak</p>
      </div>

      {loading ? (
        <p className="text-center">Memuat berita...</p>
      ) : (
        <BeritaList 
          berita={semuaBerita} 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default BeritaPage;