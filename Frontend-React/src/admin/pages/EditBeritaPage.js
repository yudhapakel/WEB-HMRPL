import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axiosInstance from '../../api/axiosInstance';

const EditBeritaPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // State untuk form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // State untuk loading
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  // Ambil data berita yang ada
  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/admin/berita/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
      setImagePreview(`${process.env.REACT_APP_API_URL}/storage/${response.data.image_path}`);
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBerita();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // mengirim data yang sudah diubah
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setStatus('');

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  if (image) {
    formData.append('image', image);
  }


  try {
    const response = await axiosInstance.post(`/api/admin/berita/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    console.log('Update berhasil, response dari server:', response.data);

    setStatus('Berita berhasil diperbarui!');

    setTimeout(() => navigate('/admin/berita'), 2000);

  } catch (error) {
    console.error('Gagal memperbarui berita:', error);
    
    const errorMessage = error.response?.data?.message || 'Gagal memperbarui berita. Coba lagi.';
    setStatus(errorMessage);

  } finally {
    setIsSubmitting(false);
  }
};

  if (loading) return <p>Memuat data...</p>;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h1 className="h3 mb-4">Edit Berita</h1>
      <form onSubmit={handleSubmit}>
        {status && <div className={`alert ${status.includes('Gagal') ? 'alert-danger' : 'alert-success'}`}>{status}</div>}

        <div className="mb-4">
          <label htmlFor="title" className="form-label">Judul Berita</label>
          <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="form-label">Upload gambar headline baru (Opsional)</label>
          <input type="file" id="image" className="form-control" onChange={handleImageChange} />
          {imagePreview && <img src={`${process.env.REACT_APP_API_URL}/storage/${imagePreview.image_path}`} alt="Preview" style={{ maxWidth: '200px', marginTop: '15px' }} />}
        </div>

        <div className="mb-4">
          <label className="form-label">Deskripsi Berita</label>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{ height: 300, menubar: false, }}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
};

export default EditBeritaPage;