import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './GaleriKegiatan.css';
import { motion, AnimatePresence } from 'framer-motion';


import { useGaleri } from '../../Context/GaleriContext';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const GaleriKegiatan = () => {

  const { 
    images, 
    loading, 
    hasMore, 
    loadMore, 
    resetAndReload 
  } = useGaleri();

 
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleImageClick = (clickedIndex) => {
    setIndex(clickedIndex);
    setOpen(true);
  };

 
  if (loading && images.length === 0) {
    return (
      <section className="galeri-kegiatan-section">
        <div className="container text-center"><p>Memuat Galeri...</p></div>
      </section>
    );
  }

  return (
    <>
      <section className="galeri-kegiatan-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title-dark">Galeri HMRPL</h2>
            <p className="text-muted">Foto-Foto Kegiatan Himpunan Mahasiswa Rekayasa Perangkat Lunak</p>
          </div>

          <motion.div layout className="row">
            <AnimatePresence>
              {images.map((image, idx) => (
                <motion.div
                  key={image.id}
                  className="col-lg-4 col-md-6 mb-4"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.5, delay: idx % 6 * 0.1 }}
                  layout
                >
                  <div className="galeri-kegiatan-card" onClick={() => handleImageClick(idx)}>
                    <img src={image.src} alt={image.title} className="galeri-kegiatan-image" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-4 d-flex justify-content-center gap-3">
            {images.length > 6 && (
              <button className="btn-galeri" onClick={resetAndReload}>See less</button>
            )}
            {hasMore && (
              <button className="btn-galeri" onClick={loadMore}>See more</button>
            )}
          </div>
        </div>
      </section>

      <Lightbox open={open} close={() => setOpen(false)} slides={images} index={index}/>
    </>
  );
};

export default GaleriKegiatan;  