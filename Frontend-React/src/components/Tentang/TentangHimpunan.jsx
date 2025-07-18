import React from 'react';
import './Tentang.css';
import LogoHima from '../../assets/LogoHima.png';

const TentangHimpunan = () => {
  return (
    <section className="tentang-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 text-center">
            <img src={LogoHima} alt="Logo Himpunan" className="img-fluid himpunan-logo" />
          </div>
          <div className="col-lg-7">
            <h2 className="section-heading">Himpunan Mahasiswa S1 Rekayasa Perangkat Lunak Universitas Telkom</h2>
            <p className="text-muted">
              Himpunan Mahasiswa Rekayasa Perangkat Lunak Universitas Telkom atau disingkat sebagai HMRPL adalah organisasi kemahasiswaan di bawah Program Studi S1 Rekayasa Perangkat Lunak yang didirikan pada tanggal 7 Desember 2021 yang bertujuan mewadahi pengembangan potensi, aspirasi, serta kreativitas mahasiswa Rekayasa Perangkat Lunak dalam bidang akademik, teknologi, dan kepemimpinan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangHimpunan;