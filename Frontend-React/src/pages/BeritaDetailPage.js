import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axiosInstance from '../api/axiosInstance';
import DOMPurify from 'dompurify';
import './BeritaDetailPage.css';

const BeritaDetailPage = () => {
  const { slug } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
         const response = await axiosInstance.get(`/api/berita/${slug}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail artikel:", error);
        setArticle(null);
      } finally {
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

  const cleanHtml = DOMPurify.sanitize(article.content);

  return (
    <div className="article-container">
      <h1 className="article-title">{article.title}</h1>
      <p className="article-meta">
        {new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })} / Admin
      </p>
      {/* --- 4. BANGUN URL GAMBAR LENGKAP --- */}
      <img src={`${process.env.REACT_APP_API_URL}/storage/${article.image_path}`} alt={article.title} className="article-image img-fluid" />
      
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </div>
  );
};

export default BeritaDetailPage;