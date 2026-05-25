import React from 'react';
import './Tentang.css';
import StrukturImage from '../../assets/Organisasi.png';

const StrukturOrganisasi = () => {
  return (
    <section className="tentang-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title-dark with-line">Struktur Organisasi BPH HMRPL 2026</h2>
        </div>

        <div className="struktur-org-wrapper">
          <img src={StrukturImage} alt="Struktur Organisasi HMRPL 2025" className="struktur-org-image" />
        </div>
        <p className="struktur-hint d-md-none">← Geser untuk melihat selengkapnya →</p>
      </div>
    </section>
  );
};

export default StrukturOrganisasi;