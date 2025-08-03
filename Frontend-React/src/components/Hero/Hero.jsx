import React from 'react';
import './Hero.css';
import LogoHima from '../../assets/LogoHima.png';
import LogoKabinet from '../../assets/LogoKabinet.png';

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          {/* Kiri: Logo HIMARPL */}
          <div className="col-md-4 mb-4 mb-md-0">
            <img src={LogoHima} alt="Logo HIMARPL" className="img-fluid hero-logo" />
          </div>

          {/* Kanan: Judul & Deskripsi */}
          <div className="col-md-8">
            <h1 className="hero-title">
              Himpunan Mahasiswa S1 Rekayasa Perangkat Lunak Universitas Telkom
            </h1>
            <p className="hero-subtitle">
              Himpunan Mahasiswa Rekayasa Perangkat Lunak  Universitas Telkom atau disingkat HMRPL adalah organisasi kemahasiswaan di bawah Program Studi S1 Rekayasa Perangkat Lunak yang bertujuan mewadahi pengembangan potensi, aspirasi, serta kreativitas mahasiswa Rekayasa Perangkat Lunak dalam bidang akademik, teknologi, dan kepemimpinan. 
            </p>
          </div>
        </div>

        <div className="row align-items-center mt-5 text-center text-md-start">
          {/* Kiri: Judul kabinet dan deskripsi */}
          <div className="col-md-8">
            <h2 className="kabinet-title">
              <span className="text-danger">KABINET </span>
              <span className="text-warning">SYVELTA</span>
            </h2>
            <p className="kabinet-subtitle">
              Badan Pengurus Himpunan Mahasiswa Rekayasa Perangkat Lunak 2024/2025
            </p>
            <a href="#tentang" className="custom-tentang-btn mt-2">
            Tentang Kami
            </a>

          </div>

          {/* Kanan: Logo Kabinet */}
          <div className="col-md-4 mt-4 mt-md-0 text-md-end">
            <img src={LogoKabinet} alt="Logo Kabinet" className="img-fluid kabinet-logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
