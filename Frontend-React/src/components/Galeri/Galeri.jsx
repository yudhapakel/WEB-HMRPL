import React, { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './Galeri.css';

// -gambar dummy
import galeri1 from '../../assets/Galeri1.JPG'; 
import galeri2 from '../../assets/Galeri2.JPG';
import galeri3 from '../../assets/Galeri3.png';

const dummyImages = [
  { id: 1, src: galeri1, title: 'Rapat Kerja Awal Periode' },
  { id: 2, src: galeri2, title: 'Makrab HMRPL 2024' },
  { id: 3, src: galeri3, title: 'Studi Banding Himpunan' },
  // Tambahkan gambar kalo perlu doang ini cman dummy dan bakal dihapus kalo udah ada backend
];


const Galeri = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Pengambilan data
    setLoading(true);
    setTimeout(() => {
      setImages(dummyImages);
      setLoading(false);
    }, 1000);

    //NANTI, ganti dengan fetch yang asli di backedn oke yud jan bilang gabisa gw gedik lu 
    /*
    fetch('https://alamat-api-punyaYudha.com/api/galeri')
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      });
    */
  }, []);

  const handleImageClick = (clickedIndex) => {
    setIndex(clickedIndex);
    setOpen(true);
  };

  return (
    <>
      <section className="galeri-section">
        <div className="container">
          <h2 className="galeri-title">Galeri HMRPL</h2>
          <p className="galeri-subtitle">
            Foto-Foto Kegiatan Himpunan Mahasiswa Rekayasa Perangkat Lunak
          </p>

          <div className="row mt-5">
            {loading ? (
              <p>Memuat galeri...</p>
            ) : (
              images.map((image, idx) => (
                <div key={image.id} className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="galeri-card"
                    onClick={() => handleImageClick(idx)}
                  >
                    <img src={image.src} alt={image.title} className="galeri-image" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={index}
      />
    </>
  );
};

export default Galeri;