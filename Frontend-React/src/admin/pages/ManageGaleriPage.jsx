// src/admin/pages/ManageGaleriPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { FaTrash, FaPlus } from 'react-icons/fa';


const ManageGaleriPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil semua data gambar dari backend
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/galeri?limit=all');
        setImages(response.data.data); 
      } catch (error) {
        console.error("Gagal mengambil data galeri:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
      try {
        await axiosInstance.delete(`/api/admin/galeri/${id}`);
        setImages(images.filter(item => item.id !== id));
        alert('Gambar berhasil dihapus!');
      } catch (error) {
        console.error('Gagal menghapus gambar:', error);
        alert('Gagal menghapus gambar.');
      }
    }
  };

  if (loading) {
    return <p className="text-center">Memuat data galeri...</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Kelola Galeri</h1>
        <Link to="/admin/galeri/tambah" className="btn btn-primary">
          <FaPlus className="me-2" />Tambah Gambar Baru
        </Link>
      </div>

      {images.length > 0 ? (
        <div className="row">
          {images.map((image) => (
            <div key={image.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <img src={`${process.env.REACT_APP_API_URL}/storage/${image.image_path}`} className="card-img-top" alt={`Galeri ${image.id}`} style={{ height: '180px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <button onClick={() => handleDelete(image.id)} className="btn btn-sm btn-danger">
                    <FaTrash className="me-1" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Belum ada gambar di galeri. Silakan tambahkan gambar baru.</p>
      )}
    </div>
  );
};

export default ManageGaleriPage;