import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axiosInstance from '../api/axiosInstance';
import './BeritaDetailPage.css';

const BeritaDetailPage = () => {
  const { slug } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // memanggil API untuk satu artikel menggunakan slug
        setTimeout(() => {
          setArticle({
            title: 'Peluncuran Website Himpunan Rekayasa Perangkat Lunak Universitas Telkom',
            date: '30 September 2025',
            author: 'AdminHMRPL',
            imageUrl: 'https://via.placeholder.com/1200x500',
            content: `<p>Dalam rangka meningkatkan keterbukaan informasi dan pelayanan digital kepada mahasiswa, Himpunan Mahasiswa Rekayasa Perangkat Lunak (HMRPL) Universitas Telkom resmi meluncurkan website resmi mereka pada tanggal 30 September 2025.</p><p>Website ini dirancang sebagai pusat informasi yang memuat berbagai kegiatan, program kerja, berita terkini, rekrutmen, hingga wadah aspirasi dari mahasiswa RPL.</p><p>Melalui platform ini, HMRPL berharap dapat mempererat komunikasi antara pengurus dan seluruh mahasiswa program studi S1 Rekayasa Perangkat Lunak, sekaligus menjadi etalase digital dari karya dan kontribusi yang telah dilakukan himpunan.</p>`
          });
          setLoading(false);
        }, 500);
       

      } catch (error) {
        console.error("Gagal mengambil detail artikel:", error);
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [slug]); 

  if (loading) {
    return <div className="container text-center p-5">Memuat artikel...</div>;
  }

  if (!article) {
    return <div className="container text-center p-5">Artikel tidak ditemukan.</div>;
  }

  return (
    <div className="article-container">
      <h1 className="article-title">{article.title}</h1>
      <p className="article-meta">{article.date} / {article.author}</p>
      <img src={article.imageUrl} alt={article.title} className="article-image img-fluid" />
      
    
      <div 
        className="article-content" 
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
    </div>
  );
};

export default BeritaDetailPage;