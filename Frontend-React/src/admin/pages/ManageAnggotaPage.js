import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { FaEdit, FaTrash, FaPlus, FaStar } from 'react-icons/fa';
import './ManageAnggotaPage.css';

const DEPARTEMEN_OPTIONS = [
  { key: 'semua', label: 'Semua' },
  { key: 'inti', label: 'Inti' },
  { key: 'internal', label: 'Internal' },
  { key: 'eksternal', label: 'Eksternal' },
  { key: 'mediakreatif', label: 'Media Kreatif' },
];

const ManageAnggotaPage = () => {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDept, setFilterDept] = useState('semua');

  useEffect(() => {
    const fetchAnggota = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/anggota');
        setAnggota(response.data.data);
      } catch (error) {
        console.error('Gagal mengambil data anggota:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnggota();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
      try {
        await axiosInstance.delete(`/api/admin/anggota/${id}`);
        setAnggota(anggota.filter(item => item.id !== id));
        alert('Anggota berhasil dihapus!');
      } catch (error) {
        console.error('Gagal menghapus anggota:', error);
        alert('Gagal menghapus anggota.');
      }
    }
  };

  const filteredAnggota = filterDept === 'semua'
    ? anggota
    : anggota.filter(a => a.departemen === filterDept);

  if (loading) {
    return <p>Memuat data anggota...</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Kelola Anggota</h1>
        <Link to="/admin/anggota/tambah" className="btn btn-primary">
          <FaPlus className="me-2" />Tambah Anggota
        </Link>
      </div>

      {/* Filter Departemen */}
      <div className="anggota-admin-filter">
        {DEPARTEMEN_OPTIONS.map(opt => (
          <button
            key={opt.key}
            className={`btn btn-outline-secondary ${filterDept === opt.key ? 'active' : ''}`}
            onClick={() => setFilterDept(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filteredAnggota.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Nama</th>
                <th scope="col">Jabatan</th>
                <th scope="col">Departemen</th>
                <th scope="col">Divisi</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnggota.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={`${process.env.REACT_APP_API_URL || ''}/storage/${item.image_path}`}
                      alt={item.nama}
                      className="anggota-admin-thumbnail"
                    />
                  </td>
                  <td>
                    <strong>{item.nama}</strong>
                    {item.is_kepala_departemen && (
                      <span className="kadep-badge ms-2">
                        <FaStar /> Kadep
                      </span>
                    )}
                  </td>
                  <td>{item.jabatan}</td>
                  <td>
                    <span className={`badge-departemen badge-${item.departemen}`}>
                      {DEPARTEMEN_OPTIONS.find(o => o.key === item.departemen)?.label || item.departemen}
                    </span>
                  </td>
                  <td>{item.divisi || '—'}</td>
                  <td>
                    <Link to={`/admin/anggota/edit/${item.id}`} className="btn btn-sm btn-warning me-2">
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
      ) : (
        <p className="text-center text-muted">Belum ada data anggota. Silakan tambahkan anggota baru.</p>
      )}
    </div>
  );
};

export default ManageAnggotaPage;
