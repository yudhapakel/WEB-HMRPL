import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';
import './EditAwardingPage.css';

const EditAwardingPage = () => {
  const [files, setFiles] = useState({ staff: null, divisi: null, departemen: null });
  const [previews, setPreviews] = useState({ staff: '', divisi: '', departemen: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  // Ambil data gambar yang sekarang saat halaman dimuat
  useEffect(() => {
    const fetchCurrentAwards = async () => {
      try {
        const response = await axiosInstance.get('/api/awarding');
        setPreviews(response.data);
         setPreviews({
          staff: response.data.staff_image_path ? `${process.env.REACT_APP_API_URL}/storage/${response.data.staff_image_path}` : '',
          divisi: response.data.divisi_image_path ? `${process.env.REACT_APP_API_URL}/storage/${response.data.divisi_image_path}` : '',
          departemen: response.data.departemen_image_path ? `${process.env.REACT_APP_API_URL}/storage/${response.data.departemen_image_path}` : ''
        });
      } catch (error) {
        console.error("Gagal mengambil data awarding:", error);
      }
    };
    fetchCurrentAwards();
  }, []);

  const handleFileChange = (e, category) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [category]: file }));
      setPreviews(prev => ({ ...prev, [category]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    if (!files.staff && !files.divisi && !files.departemen) {
      setStatus('Tidak ada gambar baru yang dipilih untuk diunggah.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    if (files.staff) formData.append('staff_image', files.staff);
    if (files.divisi) formData.append('divisi_image', files.divisi);
    if (files.departemen) formData.append('departemen_image', files.departemen);

    try {
      await axiosInstance.post('/api/admin/awarding', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('Gambar awarding berhasil diperbarui!');
    } catch (error) {
      console.error('Gagal upload gambar:', error);
      setStatus('Gagal upload gambar. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h1 className="h3 mb-1">Edit Awarding</h1>
      <p className="text-muted mb-4">Merubah tampilan gambar awarding setiap bulannya</p>
      <form onSubmit={handleSubmit}>
        {status && <div className={`alert ${status.includes('Gagal') ? 'alert-danger' : 'alert-success'}`}>{status}</div>}

        {/* Staff of the month */}
        <div className="mb-4">
          <label htmlFor="staff" className="form-label fw-bold">Staff of the month</label>
          <input type="file" id="staff" className="form-control" onChange={(e) => handleFileChange(e, 'staff')} />
          {previews.staff && <img src={previews.staff} alt="Preview Staff" className="image-preview" />}
        </div>

        {/* Divisi of the month */}
        <div className="mb-4">
          <label htmlFor="divisi" className="form-label fw-bold">Divisi of the month</label>
          <input type="file" id="divisi" className="form-control" onChange={(e) => handleFileChange(e, 'divisi')} />
          {previews.divisi && <img src={previews.divisi} alt="Preview Divisi" className="image-preview" />}
        </div>

        {/* Departement of the month */}
        <div className="mb-4">
          <label htmlFor="departemen" className="form-label fw-bold">Departement of the month</label>
          <input type="file" id="departemen" className="form-control" onChange={(e) => handleFileChange(e, 'departemen')} />
          {previews.departemen && <img src={previews.departemen} alt="Preview Departemen" className="image-preview" />}
        </div>
        
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          <FaUpload className="me-2" />
          {isSubmitting ? 'Mengunggah...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
};

export default EditAwardingPage;