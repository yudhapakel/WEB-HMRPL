import React, { useState, useEffect } from 'react';
import BeritaList from '../components/Berita/BeritaList';
import './BeritaPage.css';
import axiosInstance from '../api/axiosInstance'; // nanti diaktifin kalo api nya udah ada

const BeritaPage = () => {
  const [semuaBerita, setSemuaBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      try {
       const response = await axiosInstance.get(`/api/berita?page=${currentPage}`);
      setSemuaBerita(response.data.data);
      setTotalPages(response.data.meta.last_page);
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