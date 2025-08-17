import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
// import axiosInstance from '../../api/axiosInstance';
import './EditAwardingPage.css';

const EditAwardingPage = () => {
  // State untuk menyimpan file diupload
  const [files, setFiles] = useState({
    staff: null,
    divisi: null,
    departemen: null,
  });
  
  // State untuk menyimpan URL gambara (dari backend)
  const [previews, setPreviews] = useState({
    staff: '',
    divisi: '',
    departemen: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  // Ambil data gambar yang sekarang saat halaman dimuat
  useEffect(() => {
    const fetchCurrentAwards = async () => {
      // simulasi aja ini
      setPreviews({
        staff: 'https://via.placeholder.com/400x200.png?text=Current+Staff+Award',
        divisi: 'https://via.placeholder.com/400x200.png?text=Current+Divisi+Award',
        departemen: 'https://via.placeholder.com/400x200.png?text=Current+Departemen+Award',
      });

      // kode buat nanti backend
      // const response = await axiosInstance.get('/awarding');
      // setPreviews(response.data);
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

    const formData = new FormData();
    if (files.staff) formData.append('staff_image', files.staff);
    if (files.divisi) formData.append('divisi_image', files.divisi);
    if (files.departemen) formData.append('departemen_image', files.departemen);

    // Ngecek kalo file nya udah di upload
    if (formData.entries().next().done) {
      setStatus('Tidak ada gambar baru yang dipilih untuk diunggah.');
      setIsSubmitting(false);
      return;
    }

    try {
      // kode buat nanti backend
      // await axiosInstance.post('/awarding', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Data gambar dikirim!');

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