import React, { useState} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './Galeri.css';
import { useGaleri } from '../../Context/GaleriContext';

const Galeri = () => {
  const { images, loading } = useGaleri();
  const latestImages = images.slice(0, 3);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);


    //NANTI, ganti dengan fetch yang asli di backedn oke yud jan bilang gabisa gw gedik lu 
    /*
    fetch('https://alamat-api-punyaYudha.com/api/galeri')
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      });
    */

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