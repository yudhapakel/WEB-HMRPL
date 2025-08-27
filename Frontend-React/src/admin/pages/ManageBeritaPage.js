import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ManageBeritaPage = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      try {
      // Sesuaikan dengan endpoint admin jika berbeda, atau pakai yg publik
      const response = await axiosInstance.get('/api/berita');
      setBerita(response.data.data); // Ambil dari .data karena ada paginasi
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBerita();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await axiosInstance.delete(`/api/admin/berita/${id}`);
        setBerita(berita.filter(item => item.id !== id));
        alert('Berita berhasil dihapus!');
      } catch (error) {
        console.error('Gagal menghapus berita:', error);
        alert('Gagal menghapus berita.');
      }
    }
  };

  if (loading) {
    return <p>Memuat data berita...</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Kelola Berita</h1>
        <Link to="/admin/berita/tambah" className="btn btn-primary">
          <FaPlus className="me-2" />Tambah Berita Baru
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Judul Berita</th>
              <th scope="col">Tanggal Publikasi</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>
                  <Link to={`/admin/berita/edit/${item.id}`} className="btn btn-sm btn-warning me-2">
                    <FaEdit /> Edit
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">
                    <FaTrash /> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBeritaPage;