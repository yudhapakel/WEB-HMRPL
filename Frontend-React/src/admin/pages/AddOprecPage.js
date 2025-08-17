import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
// import axiosInstance from '../../api/axiosInstance';
import './AddOprecPage.css'; 

const AddOprecPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus('Silakan pilih poster terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData();
    formData.append('poster', file);
    
    try {
      // kode buat backend
      // await axiosInstance.post('/rekrutmen', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Poster dikirim:', file.name);

      setStatus('Poster rekrutmen berhasil diunggah!');
      setFile(null);
      setPreview('');
    } catch (error) {
      console.error('Gagal upload poster:', error);
      setStatus('Gagal upload poster. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h1 className="h3 mb-1">Tambah Oprec</h1>
      <p className="text-muted mb-4">Menambahkan Poster Open Recruitmen pada halaman rekrutasi</p>

      <form onSubmit={handleSubmit}>
        {status && <div className={`alert ${status.includes('Gagal') ? 'alert-danger' : 'alert-success'}`}>{status}</div>}

        <div className="mb-4">
          <label htmlFor="gambar" className="form-label fw-bold">Gambar</label>
          <input 
            type="file" 
            id="gambar" 
            className="form-control" 
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp" 
            required
          />
        </div>
        
        {preview && (
          <div className="mb-4">
            <p className="form-label fw-bold">Preview:</p>
            <img src={preview} alt="Preview Poster" className="image-preview-oprec" />
          </div>
        )}
        
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          <FaUpload className="me-2" />
          {isSubmitting ? 'Mengunggah...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
};

export default AddOprecPage;