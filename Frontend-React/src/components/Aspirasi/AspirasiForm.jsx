import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance'; // Gunakan jembatan API
import './AspirasiForm.css';
import { FaPaperPlane } from 'react-icons/fa';

const AspirasiForm = () => {
  const initialFormData = {
    nama: '',
    nim: '',
    kategori: 'Kritik',
    pesan: '',
    isAnonim: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' atau 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      isAnonim: isChecked,
      nama: isChecked ? '' : prev.nama, // Kosongkan nama jika anonim
      nim: isChecked ? '' : prev.nim,   // Kosongkan NIM jika anonim
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pesan) {
      alert('Pesan tidak boleh kosong!');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await axiosInstance.post('/api/aspirasi', formData);
      setSubmitStatus({ type: 'success', message: 'Aspirasi Anda berhasil terkirim. Terima kasih!' });
      setFormData(initialFormData); // Reset form setelah berhasil
    } catch (error) {
      console.error("Gagal mengirim aspirasi:", error);
      setSubmitStatus({ type: 'error', message: 'Gagal mengirim aspirasi. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="aspirasi-form" onSubmit={handleSubmit}>
      {submitStatus && (
        <div className={`alert alert-${submitStatus.type === 'success' ? 'success' : 'danger'}`}>
          {submitStatus.message}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="nama" className="form-label">Nama Lengkap (Optional)</label>
        <input
          type="text"
          className="form-control"
          id="nama"
          name="nama"
          placeholder="Masukkan Nama (Bersifat Optional)"
          value={formData.nama}
          onChange={handleChange}
          disabled={formData.isAnonim}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="nim" className="form-label">Nomor Induk Mahasiswa (Optional)</label>
        <input
          type="text"
          className="form-control"
          id="nim"
          name="nim"
          placeholder="Masukkan NIM (Bersifat Optional)"
          value={formData.nim}
          onChange={handleChange}
          disabled={formData.isAnonim}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="kategori" className="form-label">Kategori Aspirasi</label>
        <select
          className="form-select"
          id="kategori"
          name="kategori"
          value={formData.kategori}
          onChange={handleChange}
        >
          <option value="Kritik">Kritik</option>
          <option value="Saran">Saran</option>
          <option value="Apresiasi">Apresiasi</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="pesan" className="form-label">Pesan</label>
        <textarea
          className="form-control"
          id="pesan"
          name="pesan"
          rows="6"
          placeholder="Masukkan Pesan Anda"
          value={formData.pesan}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="isAnonim"
            name="isAnonim"
            checked={formData.isAnonim}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="isAnonim">
            Kirimkan Sebagai Anonim
          </label>
        </div>
        <button type="submit" className="btn btn-kirim" disabled={isSubmitting}>
          {isSubmitting ? 'Mengirim...' : 'Kirim'} <FaPaperPlane />
        </button>
      </div>
    </form>
  );
};

export default AspirasiForm;