import React, { useState, useEffect } from 'react';
import './GaleriKegiatan.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useGaleri } from '../../Context/GaleriContext';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.25 } }
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

  const handlePrev = (e) => {
    e.stopPropagation();
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      if (e.key === 'ArrowLeft') {
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, images]);

  if (loading && images.length === 0) {
    return (
      <section className="galeri-kegiatan-section">
        <div className="container text-center"><p className="galeri-status-text">Memuat Galeri...</p></div>
      </section>
    );
  }

  if (!loading && images.length === 0) {
    return (
      <section className="galeri-kegiatan-section">
        <div className="container text-center"><p className="galeri-status-text">Belum ada gambar di galeri.</p></div>
      </section>
    );
  }

  const currentImage = images[index];

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
                    <img
                      src={`${process.env.REACT_APP_API_URL}/storage/${image.image_path}`}
                      alt={image.caption || `Galeri ${image.id}`}
                      className="galeri-kegiatan-image"
                      loading="lazy"
                    />
                    <div className="galeri-card-overlay">
                      <div className="galeri-card-info">
                        <span className="galeri-card-tag">HMRPL Gallery</span>
                        <h4 className="galeri-card-caption-preview">
                          {image.caption ? (image.caption.length > 50 ? `${image.caption.substring(0, 50)}...` : image.caption) : "Dokumentasi Kegiatan"}
                        </h4>
                        <span className="galeri-card-action">Lihat Detail ➔</span>
                      </div>
                    </div>
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

      {/* Premium Glassmorphic Modal with Photo + Description Side-by-Side */}
      <AnimatePresence>
        {open && currentImage && (
          <motion.div
            className="galeri-modal-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setOpen(false)}
          >
            <button
              className="galeri-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
            >
              <FaTimes />
            </button>

            <button
              className="galeri-nav-btn prev"
              onClick={handlePrev}
              aria-label="Sebelumnya"
            >
              <FaChevronLeft />
            </button>

            <button
              className="galeri-nav-btn next"
              onClick={handleNext}
              aria-label="Selanjutnya"
            >
              <FaChevronRight />
            </button>

            <motion.div
              className="galeri-modal-content"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="galeri-modal-grid">
                {/* Left Side: Dynamic Animated Image */}
                <div className="galeri-modal-image-wrapper">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage.id}
                      src={`${process.env.REACT_APP_API_URL}/storage/${currentImage.image_path}`}
                      alt={currentImage.caption || `Galeri ${currentImage.id}`}
                      className="galeri-modal-image"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                </div>

                {/* Right Side: Rich Description Panel */}
                <div className="galeri-modal-info-panel">
                  <div className="galeri-info-header">
                    <h3 className="galeri-modal-title">Dokumentasi Himpunan</h3>
                    
                    {currentImage.created_at && (
                      <div className="galeri-modal-date">
                        <span>
                          {new Date(currentImage.created_at).toLocaleDateString('id-ID', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="galeri-modal-description-box">
                    <div className="mb-2">
                      <h5 className="description-title">Deskripsi Kegiatan:</h5>
                    </div>
                    <p className="description-text">
                      {currentImage.caption || 
                        "Dokumentasi kegiatan resmi Himpunan Mahasiswa Rekayasa Perangkat Lunak (HMRPL). Kegiatan ini diselenggarakan untuk memupuk kebersamaan, mengembangkan potensi akademik dan non-akademik anggota, serta menyelaraskan visi misi organisasi demi kemajuan program studi Rekayasa Perangkat Lunak."
                      }
                    </p>
                  </div>

                  <div className="galeri-modal-footer">
                    <div className="galeri-modal-tagline">
                      <span>Website Resmi HMRPL</span>
                      <small className="text-muted">#HMRPL</small>
                    </div>
                    <button className="btn-modal-close" onClick={() => setOpen(false)}>
                      Kembali ke Galeri
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GaleriKegiatan;