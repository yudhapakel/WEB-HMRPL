import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';
import './AddGaleriPage.css'; 

const AddGaleriPage = () => {
  const [files, setFiles] = useState([]); 
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setStatus('Silakan pilih gambar terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('images[]', file); 
    });
    
    try {
      await axiosInstance.post('/api/admin/galeri', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Mengirim ${files.length} gambar.`);

      setStatus(`${files.length} gambar berhasil diunggah!`);
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error('Gagal upload gambar:', error);
      setStatus('Gagal upload gambar. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h1 className="h3 mb-1">Tambah Galeri</h1>
      <p className="text-muted mb-4">Menambahkan gambar pada galeri kegiatan pada website himpunan</p>

      <form onSubmit={handleSubmit}>
        {status && <div className={`alert ${status.includes('Gagal') ? 'alert-danger' : 'alert-success'}`}>{status}</div>}

        <div className="mb-4">
          <label htmlFor="gambar" className="form-label fw-bold">Gambar</label>
          <input 
            type="file" 
            id="gambar" 
            className="form-control" 
            onChange={handleFileChange}
            multiple 
            required
          />
        </div>
        
        {/* Tampilkan preview gambar yang dipilih */}
        {previews.length > 0 && (
          <div className="preview-container">
            {previews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} className="image-preview-multiple" />
            ))}
          </div>
        )}
        
        <button type="submit" className="btn btn-success mt-4" disabled={isSubmitting}>
          <FaUpload className="me-2" />
          {isSubmitting ? `Mengunggah ${files.length} Gambar...` : 'Upload Image'}
        </button>
      </form>
    </div>
  );
};

export default AddGaleriPage;