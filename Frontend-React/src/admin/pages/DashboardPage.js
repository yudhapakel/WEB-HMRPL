import React from 'react';


import LogoHima from '../../assets/LogoHima.png';
import LogoKabinet from '../../assets/LogoKabinet.png';

const DashboardPage = () => {
  return (
    <div className="dashboard-container p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-center align-items-center gap-5 mb-4">
        <img src={LogoHima} alt="Logo Himpunan" style={{ maxWidth: '150px' }}/>
        <img src={LogoKabinet} alt="Logo Kabinet" style={{ maxWidth: '150px' }}/>
      </div>
      
      <div className="text-center">
        <h1 style={{ fontWeight: 700 }}>Selamat Datang, Admin HMRPL</h1>
        <p className="lead text-muted">
          Selamat datang di website Himpunan Mahasiswa Rekayasa Perangkat Lunak Versi Admin
        </p>

        <div className="mt-4 text-start d-inline-block">
          <p>Anda dapat mengatur beberapa fitur website diantaranya :</p>
          <ol>
            <li>Awarding Bulanan</li>
            <li>Menambahkan Berita</li>
            <li>Melihat hasil responden dari form apresiasi</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;