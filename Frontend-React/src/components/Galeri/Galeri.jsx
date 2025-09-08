import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './Galeri.css';
import { useGaleri } from '../../Context/GaleriContext';

const Galeri = () => {
  const { images, loading } = useGaleri();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleImageClick = (clickedIndex) => {
    setIndex(clickedIndex);
    setOpen(true);
  };

  if (loading && images.length === 0) {
    return <p className="text-center">Memuat galeri...</p>;
  }

  if (!loading && images.length === 0) {
    return <p className="text-center">Belum ada gambar di galeri.</p>;
  }

  return (
    <>
      <section className="galeri-section">
        <div className="container">
          <h2 className="galeri-title">Galeri HMRPL</h2>
          <p className="galeri-subtitle">
            Foto-Foto Kegiatan Himpunan Mahasiswa Rekayasa Perangkat Lunak
          </p>

          <div className="row mt-5">
            {images.map((gambar, idx) => (
              <div key={gambar.id} className="col-lg-4 col-md-6 mb-4">
                <div
                  className="galeri-card"
                  onClick={() => handleImageClick(idx)}
                >
                  <img 
                    src={`${process.env.REACT_APP_API_URL}/storage/${gambar.image_path}`} 
                    alt={gambar.caption || `Galeri HMRPL ${gambar.id}`} 
                    className="galeri-image" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map(img => ({ src: img.imageUrl }))}
        index={index}
      />
    </>
  );
};

export default Galeri;