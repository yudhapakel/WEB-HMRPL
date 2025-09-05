import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
 import axiosInstance from '../../api/axiosInstance'; 

const AddBeritaPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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
      await axiosInstance.post('/api/admin/berita', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
     });
      setStatus('Berita berhasil ditambahkan!');
      setTimeout(() => navigate('/admin/berita'), 2000);

    } catch (error) {
      console.error('Gagal menambah berita:', error);
      setStatus('Gagal menambah berita. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h1 className="h3 mb-1">Tambah Berita</h1>
      <p className="text-muted mb-4">Menambahkan berita pada halaman berita</p>

      <form onSubmit={handleSubmit}>
        {status && <div className={`alert ${status.includes('Gagal') ? 'alert-danger' : 'alert-success'}`}>{status}</div>}

        <div className="mb-4">
          <label htmlFor="image" className="form-label">Upload gambar headline</label>
          <input 
            type="file" 
            id="image" 
            className="form-control" 
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="form-label">Judul Berita</label>
          <input 
            type="text" 
            id="title" 
            className="form-control" 
            placeholder="Masukkan Judul Berita"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Deskripsi Berita</label>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>
        
        <button type="submit" className="btn btn-success mt-3" disabled={isSubmitting}>
          {isSubmitting ? 'Mengunggah...' : 'Upload Berita'}
        </button>
      </form>
    </div>
  );
};

export default AddBeritaPage;