import React, { useState } from 'react';
import { FaUpload, FaImage, FaImages } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';
import './AddGaleriPage.css'; 

const AddGaleriPage = () => {
  const [uploadMode, setUploadMode] = useState('single'); // 'single' atau 'multiple'
  const [file, setFile] = useState(null); // File untuk upload single
  const [files, setFiles] = useState([]); // Files untuk upload multiple
  const [caption, setCaption] = useState(''); // Caption untuk upload single
  const [previews, setPreviews] = useState([]); // Preview URLs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleSingleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviews([URL.createObjectURL(selectedFile)]);
    }
  };

  const handleMultipleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleModeChange = (mode) => {
    setUploadMode(mode);
    setFile(null);
    setFiles([]);
    setCaption('');
    setPreviews([]);
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (uploadMode === 'single' && !file) {
      setStatus('Silakan pilih gambar terlebih dahulu.');
      return;
    }
    if (uploadMode === 'multiple' && files.length === 0) {
      setStatus('Silakan pilih beberapa gambar terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData();
    
    if (uploadMode === 'single') {
      formData.append('image', file);
      formData.append('caption', caption);
    } else {
      files.forEach((f) => {
        formData.append('images[]', f); 
      });
      formData.append('caption', caption); // Kirim caption umum ke backend
    }
    
    try {
      await axiosInstance.post('/api/admin/galeri', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setStatus(
        uploadMode === 'single' 
          ? 'Gambar beserta deskripsi berhasil diunggah!' 
          : `${files.length} gambar dengan deskripsi bersama berhasil diunggah!`
      );
      setFile(null);
      setFiles([]);
      setCaption('');
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
      <p className="text-muted mb-4">Menambahkan gambar pada galeri kegiatan website HMRPL</p>

      {/* Tab Pilihan Mode Upload */}
      <div className="d-flex gap-2 mb-4">
        <button 
          type="button"
          onClick={() => handleModeChange('single')}
          className={`btn ${uploadMode === 'single' ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center gap-2`}
        >
          <FaImage /> Upload Tunggal + Deskripsi
        </button>
        <button 
          type="button"
          onClick={() => handleModeChange('multiple')}
          className={`btn ${uploadMode === 'multiple' ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center gap-2`}
        >
          <FaImages /> Upload Sekaligus (Satu Deskripsi)
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {status && (
          <div className={`alert ${status.includes('Gagal') || status.includes('Silakan') ? 'alert-danger' : 'alert-success'}`}>
            {status}
          </div>
        )}

        {/* INPUT MODE TUNGGAL DENGAN DESKRIPSI */}
        {uploadMode === 'single' ? (
          <>
            <div className="mb-3">
              <label htmlFor="gambar-single" className="form-label fw-bold">Pilih Gambar</label>
              <input 
                type="file" 
                id="gambar-single" 
                className="form-control" 
                onChange={handleSingleFileChange}
                accept="image/*"
                required
              />
              <div className="form-text">Format gambar: JPG, JPEG, PNG, WEBP, atau GIF (Maks. 10MB)</div>
            </div>

            <div className="mb-3">
              <label htmlFor="caption" className="form-label fw-bold">Deskripsi Kegiatan / Caption</label>
              <textarea 
                id="caption" 
                className="form-control" 
                rows="4" 
                placeholder="Tuliskan keterangan lengkap mengenai kegiatan pada foto ini..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              ></textarea>
              <div className="form-text">Deskripsi ini akan muncul di samping gambar saat diklik oleh pengunjung.</div>
            </div>
          </>
        ) : (
          /* INPUT MODE BANYAK DENGAN SATU DESKRIPSI BERSAMA (BATCH) */
          <>
            <div className="mb-3">
              <label htmlFor="gambar-multiple" className="form-label fw-bold">Pilih Gambar Sekaligus</label>
              <input 
                type="file" 
                id="gambar-multiple" 
                className="form-control" 
                onChange={handleMultipleFileChange}
                multiple 
                accept="image/*"
                required
              />
              <div className="form-text">Anda bisa memilih banyak gambar sekaligus.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="caption-multiple" className="form-label fw-bold">Deskripsi Kegiatan untuk Semua Gambar (Opsional)</label>
              <textarea 
                id="caption-multiple" 
                className="form-control" 
                rows="4" 
                placeholder="Tuliskan keterangan kegiatan yang akan diterapkan pada seluruh gambar yang Anda pilih di atas..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
              <div className="form-text">Semua gambar yang diunggah bersama-sama ini akan memiliki deskripsi/caption yang sama.</div>
            </div>
          </>
        )}
        
        {/* Tampilkan preview gambar yang dipilih */}
        {previews.length > 0 && (
          <div className="mb-4">
            <label className="form-label fw-bold d-block">Preview Unggahan</label>
            <div className="preview-container">
              {previews.map((src, idx) => (
                <img 
                  key={idx} 
                  src={src} 
                  alt={`Preview ${idx + 1}`} 
                  className="image-preview-multiple" 
                />
              ))}
            </div>
          </div>
        )}
        
        <button type="submit" className="btn btn-success mt-2" disabled={isSubmitting}>
          <FaUpload className="me-2" />
          {isSubmitting ? 'Sedang Mengunggah...' : 'Unggah ke Galeri'}
        </button>
      </form>
    </div>
  );
};

export default AddGaleriPage;