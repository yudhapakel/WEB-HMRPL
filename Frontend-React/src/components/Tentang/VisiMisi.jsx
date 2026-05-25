import React from 'react';
import './Tentang.css';

const VisiMisi = () => {
  const misiItems = [
    { text: 'Menciptakan lingkungan kolaboratif antar mahasiswa S1 RPL untuk berkembang bersama.', color: 'red' },
    { text: 'Mengembangkan ide dan solusi kreatif yang berdampak bagi kemajuan organisasi dan mahasiswa.', color: 'orange' },
    { text: 'Menanamkan etos kerja, tanggung jawab, dan kompetensi bagi setiap anggota.', color: 'blue' },
    { text: 'Berkolaborasi dengan berbagai pihak untuk memperluas wawasan dan peluang.', color: 'green' },
    { text: 'Menjaga eksistensi dan kontribusi organisasi melalui program yang berkelanjutan.', color: 'red' }
  ];

  return (
    <section className="visimisi-section">
      <div className="container">
        {/* Bagian Visi */}
        <div className="text-center mb-4">
          <h2 className="visimisi-heading">Visi</h2>
        </div>
        <div className="visi-card">
          <p className="visi-card-text">
            Menjadikan HMRPL sebagai wadah bagi Mahasiswa S1 Rekayasa Perangkat Lunak untuk 
            <span className="highlight-blue"> perubahan lebih baik</span> dengan 
            <span className="highlight-blue"> bersinergi.</span>
          </p>
        </div>

        {/* Bagian Misi */}
        <div className="text-center mt-5 mb-4 pt-3">
          <h2 className="visimisi-heading">Misi</h2>
        </div>
        <div className="misi-container">
          {misiItems.map((item, index) => (
            <div key={index} className={`misi-item misi-border-${item.color}`}>
              <span className="misi-number">{index + 1}</span>
              <span className="misi-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;