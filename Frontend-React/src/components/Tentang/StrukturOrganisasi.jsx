import React from 'react';
import './Tentang.css'; 
import StrukturImage from '../../assets/Organisasi.png'; 

const StrukturOrganisasi = () => {
  return (
    <section className="tentang-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title-dark with-line">Struktur Organisasi BPH HMRPL 2025</h2>
        </div>
        
        <div className="text-center">
          <img src={StrukturImage} alt="Struktur Organisasi HMRPL 2025" className="img-fluid" />
        </div>
      </div>
    </section>
  );
};

export default StrukturOrganisasi;