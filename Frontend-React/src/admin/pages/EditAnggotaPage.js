import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { FaSave } from 'react-icons/fa';
import './ManageAnggotaPage.css';

const DEPARTEMEN_CONFIG = {
  inti: { label: 'Inti', divisi: [] },
  internal: {
    label: 'Internal',
    divisi: [
      { id: 'kaderisasi', nama: 'Kaderisasi' },
      { id: 'psdm', nama: 'Pengembangan SDM' },
      { id: 'akademik-riset', nama: 'Akademik & Riset' },
    ]
  },
  eksternal: {
    label: 'Eksternal',
    divisi: [
      { id: 'relasi-eksternal', nama: 'Relasi Eksternal' },
      { id: 'kerjasama', nama: 'Kerjasama & Kewirausahaan' },
    ]
  },
  mediakreatif: {
    label: 'Media Kreatif',
    divisi: [
      { id: 'komunikasiInformasi', nama: 'Komunikasi & Informasi' },
    ]
  },
};

const EditAnggotaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [departemen, setDepartemen] = useState('inti');
  const [divisi, setDivisi] = useState('');
  const [isKepalaDepartemen, setIsKepalaDepartemen] = useState(false);
  const [urutan, setUrutan] = useState(1);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  // Fetch existing data
  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const response = await axiosInstance.get(`/api/anggota`);
        const data = response.data.data;
        const anggota = data.find(a => a.id === parseInt(id));

        if (anggota) {
          setNama(anggota.nama);
          setJabatan(anggota.jabatan);
          setDepartemen(anggota.departemen);
          setDivisi(anggota.divisi || '');
          setIsKepalaDepartemen(anggota.is_kepala_departemen);
          setUrutan(anggota.urutan || 1);
          setExistingImage(anggota.image_path);
        } else {
          setStatus('Data anggota tidak ditemukan.');
        }
      } catch (error) {
        console.error('Gagal mengambil data anggota:', error);
        setStatus('Gagal memuat data anggota.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnggota();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDepartemenChange = (e) => {
    const dept = e.target.value;
    setDepartemen(dept);
    setDivisi('');
    setIsKepalaDepartemen(false);
  };

  const currentDivisiOptions = DEPARTEMEN_CONFIG[departemen]?.divisi || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('jabatan', jabatan);
    formData.append('departemen', departemen);
    if (divisi) formData.append('divisi', divisi);
    formData.append('is_kepala_departemen', isKepalaDepartemen ? '1' : '0');
    formData.append('urutan', urutan);
    if (image) formData.append('image', image);

    // Laravel PUT via POST + _method
    formData.append('_method', 'PUT');

    try {
      await axiosInstance.post(`/api/admin/anggota/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('Anggota berhasil diperbarui!');
      setTimeout(() => navigate('/admin/anggota'), 2000);
    } catch (error) {
      console.error('Gagal memperbarui anggota:', error);
      const msg = error.response?.data?.message || 'Gagal memperbarui anggota. Coba lagi.';
      setStatus(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Memuat data anggota...</p>;
  }

  // Tentukan gambar preview: file baru > existing dari server
  const displayImage = preview
    || (existingImage ? `${process.env.REACT_APP_API_URL || ''}/storage/${existingImage}` : null);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h1 className="h3 mb-1">Edit Anggota</h1>
      <p className="text-muted mb-4">Mengubah data anggota HMRPL</p>

      <form onSubmit={handleSubmit}>
        {status && (
          <div className={`alert ${status.includes('Gagal') || status.includes('gagal') || status.includes('tidak') ? 'alert-danger' : 'alert-success'}`}>
            {status}
          </div>
        )}

        {/* Preview Foto */}
        <div className="mb-4 text-center">
          {displayImage ? (
            <img src={displayImage} alt="Preview" className="anggota-form-preview" />
          ) : (
            <div className="anggota-form-preview-placeholder mx-auto">
              <span>Tidak ada foto</span>
            </div>
          )}
        </div>

        {/* Upload Foto (opsional saat edit) */}
        <div className="mb-4">
          <label htmlFor="image" className="form-label fw-bold">Ganti Foto</label>
          <input
            type="file"
            id="image"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          <small className="text-muted">Kosongkan jika tidak ingin mengganti foto</small>
        </div>

        {/* Nama */}
        <div className="mb-4">
          <label htmlFor="nama" className="form-label fw-bold">Nama Lengkap</label>
          <input
            type="text"
            id="nama"
            className="form-control"
            placeholder="Masukkan nama lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        {/* Jabatan */}
        <div className="mb-4">
          <label htmlFor="jabatan" className="form-label fw-bold">Jabatan</label>
          <input
            type="text"
            id="jabatan"
            className="form-control"
            placeholder="Contoh: Ketua Umum, Staff Kaderisasi"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            required
          />
        </div>

        {/* Departemen */}
        <div className="mb-4">
          <label htmlFor="departemen" className="form-label fw-bold">Departemen</label>
          <select
            id="departemen"
            className="form-select"
            value={departemen}
            onChange={handleDepartemenChange}
            required
          >
            {Object.entries(DEPARTEMEN_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>

        {/* Divisi (conditional) */}
        {currentDivisiOptions.length > 0 && (
          <div className="mb-4">
            <label htmlFor="divisi" className="form-label fw-bold">Divisi</label>
            <select
              id="divisi"
              className="form-select"
              value={divisi}
              onChange={(e) => setDivisi(e.target.value)}
            >
              <option value="">— Tidak ada (Kepala Departemen) —</option>
              {currentDivisiOptions.map(d => (
                <option key={d.id} value={d.id}>{d.nama}</option>
              ))}
            </select>
          </div>
        )}

        {/* Kepala Departemen */}
        {departemen !== 'inti' && (
          <div className="mb-4 form-check">
            <input
              type="checkbox"
              id="isKepalaDepartemen"
              className="form-check-input"
              checked={isKepalaDepartemen}
              onChange={(e) => setIsKepalaDepartemen(e.target.checked)}
            />
            <label htmlFor="isKepalaDepartemen" className="form-check-label">
              Kepala Departemen
            </label>
          </div>
        )}

        {/* Urutan */}
        <div className="mb-4">
          <label htmlFor="urutan" className="form-label fw-bold">Urutan Tampil</label>
          <input
            type="number"
            id="urutan"
            className="form-control"
            min="1"
            value={urutan}
            onChange={(e) => setUrutan(parseInt(e.target.value) || 1)}
          />
          <small className="text-muted">Angka kecil akan ditampilkan lebih dulu</small>
        </div>

        <button type="submit" className="btn btn-success mt-3" disabled={isSubmitting}>
          <FaSave className="me-2" />
          {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
};

export default EditAnggotaPage;
