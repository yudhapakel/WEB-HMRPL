import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import './Tentang.css';

// Konfigurasi departemen & divisi (statis — jarang berubah)
const DEPARTEMEN_CONFIG = {
  inti: { label: 'Inti', divisi: [] },
  internal: {
    label: 'Internal',
    divisi: [
      { id: 'kaderisasi', nama: 'Kaderisasi' },
      { id: 'psdm', nama: 'Pengembangan SDM' },
      { id: 'akademik-riset', nama: 'Akademik & Riset' },
    ]
  },
  eksternal: {
    label: 'Eksternal',
    divisi: [
      { id: 'relasi-eksternal', nama: 'Relasi Eksternal' },
      { id: 'kerjasama', nama: 'Kerjasama & Kewirausahaan' },
    ]
  },
  mediakreatif: {
    label: 'Media Kreatif',
    divisi: [
      { id: 'komunikasiInformasi', nama: 'Komunikasi & Informasi' },
    ]
  },
};

const tabKeys = Object.keys(DEPARTEMEN_CONFIG);

const DaftarAnggota = () => {
  const [activeTab, setActiveTab] = useState('inti');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [selectedAnggota, setSelectedAnggota] = useState(null);
  const [anggotaByDept, setAnggotaByDept] = useState({});
  const [kepalaDeptMap, setKepalaDeptMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data anggota dari API
  useEffect(() => {
    const fetchAnggota = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/api/anggota');
        const data = response.data.data;

        // Group anggota berdasarkan departemen & divisi
        const grouped = {};
        const kadepMap = {};

        // Inisialisasi semua departemen
        for (const deptKey of tabKeys) {
          const config = DEPARTEMEN_CONFIG[deptKey];
          if (config.divisi.length > 0) {
            grouped[deptKey] = {};
            config.divisi.forEach(div => {
              grouped[deptKey][div.id] = [];
            });
          } else {
            grouped[deptKey] = [];
          }
          kadepMap[deptKey] = null;
        }

        // Distribusi anggota ke grup yang sesuai
        data.forEach(anggota => {
          const dept = anggota.departemen;
          const imageUrl = anggota.image_path
            ? `${process.env.REACT_APP_API_URL || ''}/storage/${anggota.image_path}`
            : null;
          
          const anggotaFormatted = {
            id: anggota.id,
            nama: anggota.nama,
            jabatan: anggota.jabatan,
            image: imageUrl,
          };

          // Cek apakah kadep
          if (anggota.is_kepala_departemen && dept !== 'inti') {
            kadepMap[dept] = anggotaFormatted;
            return;
          }

          // Masukkan ke grup
          if (DEPARTEMEN_CONFIG[dept]?.divisi.length > 0) {
            const divKey = anggota.divisi;
            if (divKey && grouped[dept]?.[divKey]) {
              grouped[dept][divKey].push(anggotaFormatted);
            }
          } else {
            if (Array.isArray(grouped[dept])) {
              grouped[dept].push(anggotaFormatted);
            }
          }
        });

        // Sort by urutan (API sudah bisa sort, tapi jaga-jaga)
        for (const deptKey of tabKeys) {
          if (Array.isArray(grouped[deptKey])) {
            grouped[deptKey].sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
          } else {
            for (const divKey of Object.keys(grouped[deptKey])) {
              grouped[deptKey][divKey].sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
            }
          }
        }

        setAnggotaByDept(grouped);
        setKepalaDeptMap(kadepMap);
      } catch (err) {
        console.error('Gagal mengambil data anggota:', err);
        setError('Gagal memuat data anggota.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnggota();
  }, []);

  // Set sub-tab pertama saat tab departemen berubah
  useEffect(() => {
    const config = DEPARTEMEN_CONFIG[activeTab];
    if (config.divisi.length > 0) {
      setActiveSubTab(config.divisi[0].id);
    } else {
      setActiveSubTab(null);
    }
  }, [activeTab]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAnggota) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedAnggota]);

  const openModal = useCallback((anggota) => {
    setSelectedAnggota(anggota);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedAnggota(null);
  }, []);

  const renderAnggotaCard = (anggota, isLeader = false) => (
    <div className={`anggota-card ${isLeader ? 'anggota-card-leader' : ''}`} onClick={() => openModal(anggota)}>
      <img src={anggota.image} alt={anggota.nama} className="anggota-image" />
      <div className="anggota-info">
        <h5 className="anggota-nama">{anggota.nama}</h5>
        <p className="anggota-jabatan">{anggota.jabatan}</p>
      </div>
    </div>
  );

  const renderAnggota = () => {
    const deptData = anggotaByDept[activeTab];
    if (!deptData) return null;

    let anggotaToShow = [];

    if (Array.isArray(deptData)) {
      // Departemen tanpa divisi (inti)
      anggotaToShow = deptData;
    } else {
      // Departemen dengan divisi
      if (activeSubTab && deptData[activeSubTab]) {
        anggotaToShow = deptData[activeSubTab];
      }
    }

    if (!anggotaToShow || anggotaToShow.length === 0) {
      return <p className="text-center w-100 text-muted">Tidak ada anggota untuk ditampilkan.</p>;
    }

    return anggotaToShow.map(anggota => (
      <div key={anggota.id} className="col-6 col-md-4 col-lg-3 mb-4">
        {renderAnggotaCard(anggota)}
      </div>
    ));
  };

  const currentConfig = DEPARTEMEN_CONFIG[activeTab];
  const currentKadep = kepalaDeptMap[activeTab];

  if (loading) {
    return (
      <section className="tentang-section bg-light">
        <div className="container text-center">
          <p className="text-muted">Memuat data anggota...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="tentang-section bg-light">
        <div className="container text-center">
          <p className="text-danger">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="tentang-section bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="section-title-dark with-line">Anggota Kami</h2>
        </div>

        {/* Scrollable main tabs */}
        <div className="anggota-nav-scroll">
          <div className="anggota-nav">
            {tabKeys.map(key => (
              <button
                key={key}
                className={`anggota-tab ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {DEPARTEMEN_CONFIG[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Kepala Departemen */}
        {currentKadep && (
          <div className="row justify-content-center mt-4">
            <div className="col-6 col-md-4 col-lg-3">
              {renderAnggotaCard(currentKadep, true)}
            </div>
          </div>
        )}

        {/* Sub-divisi tabs */}
        {currentConfig.divisi.length > 0 && (
          <div className="sub-nav-scroll mt-4">
            <div className="sub-anggota-nav">
              {currentConfig.divisi.map(divisi => (
                <button
                  key={divisi.id}
                  className={`sub-anggota-tab ${activeSubTab === divisi.id ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(divisi.id)}
                >
                  {divisi.nama}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Member cards grid */}
        <div className="row mt-4 justify-content-center">
          {renderAnggota()}
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {selectedAnggota && (
          <motion.div
            className="anggota-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
          >
            <motion.div
              className="anggota-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="anggota-modal-close" onClick={closeModal}>✕</button>
              <img src={selectedAnggota.image} alt={selectedAnggota.nama} className="anggota-modal-image" />
              <div className="anggota-modal-info">
                <h3>{selectedAnggota.nama}</h3>
                <p>{selectedAnggota.jabatan}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DaftarAnggota;