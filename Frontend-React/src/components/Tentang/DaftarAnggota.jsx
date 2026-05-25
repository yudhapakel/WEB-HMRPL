import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Tentang.css';

// Gambar untuk anggota inti
import ketuaImage from '../../assets/Ketua.jpg';
import wakilImage from '../../assets/WakilKetua.jpg';
import sekre1Image from '../../assets/Sekre1.jpg';
import sekre2Image from '../../assets/Sekre2.jpg';
import bend1Image from '../../assets/Bend1.jpg';
import bend2Image from '../../assets/Bend2.jpg';
import kepalaMnoImage from '../../assets/kepalamno.jpg';
import wakilMnoImage from '../../assets/wakilmno.jpg';
import wakilMnoImage2 from '../../assets/wakilmno2.jpg';
// Gambar untuk internal
import kadepInternalImage from '../../assets/kadeptInternal.jpg';

import kepalakaderisasiImage from '../../assets/kepalakaderisasi.jpg';
import staffKaderisasiImage from '../../assets/staffkaderisasi.jpg';
import staffKaderisasiImage2 from '../../assets/staffkaderisasi2.jpg';
import staffKaderisasiImage3 from '../../assets/staffkaderisasi3.jpg';

import kepalapsdmImage from '../../assets/kepalapsdm.jpg';
import staffpsdmImage from '../../assets/staffpsdm.jpg';
import staff2psdmImage from '../../assets/staffpsdm2.jpg';
import kepalaakademikImage from '../../assets/kepalaakademikriset.jpg';
import staffakademikImage from '../../assets/staffakademikriset.jpg';

// Gambar untuk eksternal
import kadepEksternalImage from '../../assets/kadeptEksternal.jpg';
import kepalarelasiImage from '../../assets/kepalarelasi.jpg';
import staffrelasiImage from '../../assets/staffrelasi.jpg';
import staff2relasiImage from '../../assets/staffrelasi2.jpg'
import kepalaKerjasamaImage from '../../assets/kepalakerjasama.jpg';
import staffKerjasamaImage from '../../assets/staffkerjasama.jpg';

// Gambar untuk media kreatif
import kadepMediaImage from '../../assets/kadeptMedKraf.jpg';
import kepalakominfoImage from '../../assets/kepalakominfo.jpg';
import staffkominfoImage from '../../assets/staffkominfo.jpg';

const anggotaData = {
  inti: {
    label: 'Inti',
    divisi: [],
    anggota: [
      { id: 'inti-1', nama: 'Benaya Giuseppe L.S', jabatan: 'Ketua Umum', image: ketuaImage },
      { id: 'inti-2', nama: 'Tio Funny Tinambunan', jabatan: 'Wakil Ketua', image: wakilImage },
      { id: 'inti-3', nama: 'Putri Afni Azkiya', jabatan: 'Sekretaris I', image: sekre1Image },
      { id: 'inti-4', nama: 'Ade Fatria Nuraeni', jabatan: 'Sekretaris II', image: sekre2Image },
      { id: 'inti-5', nama: 'Avriela Nada Amara Putri', jabatan: 'Bendahara I', image: bend1Image },
      { id: 'inti-6', nama: 'Nashbilla Nurfazza', jabatan: 'Bendahara II', image: bend2Image },
      { id: 'inti-7', nama: 'Khansa Aulia Fauziah', jabatan: 'Kepala Manajerial', image: kepalaMnoImage },
      { id: 'inti-8', nama: 'Raihan Ananda Putra', jabatan: 'Staff Manajerial', image: wakilMnoImage },
      { id: 'inti-9', nama: 'Abizar Tsaqif Abrar', jabatan: 'Staff Manajerial', image: wakilMnoImage2 },
    ]
  },
  internal: {
    label: 'Internal',
    kepalaDepartemen: {
      id: 'kadep-int',
      nama: 'Gusti Agung Raka Darma',
      jabatan: 'Kepala Dept. Internal',
      image: kadepInternalImage
    },
    divisi: [
      { id: 'kaderisasi', nama: 'Kaderisasi' },
      { id: 'psdm', nama: 'Pengembangan SDM' },
      { id: 'akademik-riset', nama: 'Akademik & Riset' }
    ],
    anggota: {
      kaderisasi: [
        { id: 'int-k-1', nama: 'Toni', jabatan: 'Kepala Kaderisasi', image: kepalakaderisasiImage },
        { id: 'int-k-2', nama: 'Anggota Kaderisasi 2', jabatan: 'Anggota Kaderisasi', image: staffKaderisasiImage },
        { id: 'int-k-3', nama: 'Anggota Kaderisasi 3', jabatan: 'Anggota Kaderisasi', image: staffKaderisasiImage2 },
        { id: 'int-k-4', nama: 'Anggota Kaderisasi 4', jabatan: 'Anggota Kaderisasi', image: staffKaderisasiImage3 },
      ],
      psdm: [
        { id: 'int-p-1', nama: 'Anggota PSDM 1', jabatan: 'Jabatan', image: kepalapsdmImage },
        { id: 'int-p-2', nama: 'Anggota PSDM 2', jabatan: 'Jabatan', image: staffpsdmImage },
        { id: 'int-p-3', nama: 'Anggota PSDM 3', jabatan: 'Jabatan', image: staff2psdmImage },
      ],
      'akademik-riset': [
        { id: 'int-ar-1', nama: 'Ahmad Naufal', jabatan: 'Kepala divisi Akademik & Riset', image: kepalaakademikImage },
        { id: 'int-ar-2', nama: 'Muhammad Radhi Haidar Rrafi', jabatan: 'Anggota Akademik & Riset', image: staffakademikImage }
      ]
    }
  },
  eksternal: {
    label: 'Eksternal',
    kepalaDepartemen: {
      id: 'kadep-eks',
      nama: 'Abdul Aziz Saepurohmat',
      jabatan: 'Kepala Dept. Eksternal',
      image: kadepEksternalImage
    },
    divisi: [
      { id: 'relasi-eksternal', nama: 'Relasi Eksternal' },
      { id: 'kerjasama', nama: 'Kerjasama & Kewirausahaan' }
    ],
    anggota: {
      'relasi-eksternal': [
        { id: 'eks-re-1', nama: 'Anggota Relasi 1', jabatan: 'Jabatan', image: kepalarelasiImage },
        { id: 'eks-re-2', nama: 'Anggota Relasi 2', jabatan: 'Jabatan', image: staffrelasiImage },
        { id: 'eks-re-3', nama: 'Anggota Relasi 3', jabatan: 'Jabatan', image: staff2relasiImage }
      ],
      kerjasama: [
        { id: 'eks-k-1', nama: 'Anggota Kerjasama 1', jabatan: 'Jabatan', image: kepalaKerjasamaImage },
        { id: 'eks-k-2', nama: 'Anggota Kerjasama 2', jabatan: 'Jabatan', image: staffKerjasamaImage }
      ]
    }
  },
  mediakreatif: {
    label: 'Media Kreatif',
    kepalaDepartemen: {
      id: 'kadep-medkraf',
      nama: 'Nur Ahmadi Aditya Nanda',
      jabatan: 'Kepala Dept. Media Kreatif',
      image: kadepMediaImage
    },
    divisi: [
      { id: 'komunikasiInformasi', nama: 'Komunikasi & Informasi' }
    ],
    anggota: {
      komunikasiInformasi: [
        { id: 'med-1', nama: 'Anggota Medkraf 1', jabatan: 'Jabatan', image: kepalakominfoImage },
        { id: 'med-2', nama: 'Anggota Medkraf 2', jabatan: 'Jabatan', image: staffkominfoImage }
      ]
    }
  }
};

const tabKeys = ['inti', 'internal', 'eksternal', 'mediakreatif'];

const DaftarAnggota = () => {
  const [activeTab, setActiveTab] = useState('inti');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [selectedAnggota, setSelectedAnggota] = useState(null);

  useEffect(() => {
    const currentDivisi = anggotaData[activeTab].divisi;
    if (currentDivisi && currentDivisi.length > 0) {
      setActiveSubTab(currentDivisi[0].id);
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
    const data = anggotaData[activeTab];
    if (!data) return null;

    let anggotaToShow = [];

    if (data.divisi && data.divisi.length > 0) {
      if (activeSubTab && data.anggota[activeSubTab]) {
        anggotaToShow = data.anggota[activeSubTab];
      }
    } else {
      anggotaToShow = data.anggota;
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

  const currentData = anggotaData[activeTab];

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
                {anggotaData[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Kepala Departemen */}
        {currentData && currentData.kepalaDepartemen && (
          <div className="row justify-content-center mt-4">
            <div className="col-6 col-md-4 col-lg-3">
              {renderAnggotaCard(currentData.kepalaDepartemen, true)}
            </div>
          </div>
        )}

        {/* Sub-divisi tabs */}
        {currentData && currentData.divisi.length > 0 && (
          <div className="sub-nav-scroll mt-4">
            <div className="sub-anggota-nav">
              {currentData.divisi.map(divisi => (
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