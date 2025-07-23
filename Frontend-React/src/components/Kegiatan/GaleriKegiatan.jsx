    import React, { useState } from 'react';
    import Lightbox from 'yet-another-react-lightbox';
    import 'yet-another-react-lightbox/styles.css';
    import './GaleriKegiatan.css';
    import { motion, AnimatePresence } from 'framer-motion';
    import { useGaleri } from '../../Context/GaleriContext';
    


    const ITEMS_PER_LOAD = 6;

    const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const GaleriKegiatan = () => {
    
    const { images: allImages, loading } = useGaleri();

    
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // Logika 'currentImages' dan fungsi handle tidak perlu diubah,
    // karena sekarang mereka akan bekerja dengan 'allImages' dari context
    const currentImages = allImages.slice(0, visibleCount);

    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + ITEMS_PER_LOAD);
    };

    const handleSeeLess = () => {
        setVisibleCount(ITEMS_PER_LOAD);
        // Cek dulu apakah elemen ada sebelum scroll
        const section = document.querySelector('.galeri-kegiatan-section');
        if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const handleImageClick = (clickedIndex) => {
        setIndex(clickedIndex);
        setOpen(true);
    };

    // PERUBAHAN 3: Tambahkan tampilan saat loading
    if (loading) {
        return (
        <section className="galeri-kegiatan-section">
            <div className="container text-center">
            <p>Memuat Galeri...</p>
            </div>
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
                {currentImages.map((image, idx) => (
                    <motion.div
                    key={image.id}
                    className="col-lg-4 col-md-6 mb-4"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, delay: idx % ITEMS_PER_LOAD * 0.1 }}
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
                {visibleCount > ITEMS_PER_LOAD && (
                <button className="btn-galeri" onClick={handleSeeLess}>See less</button>
                )}
                {visibleCount < allImages.length && (
                <button className="btn-galeri" onClick={handleSeeMore}>See more</button>
                )}
            </div>
            </div>
        </section>

        <Lightbox open={open} close={() => setOpen(false)} slides={allImages} index={index}/>
        </>
    );
    };

    export default GaleriKegiatan;