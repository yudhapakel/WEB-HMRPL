import React, { useState, useEffect } from 'react';
import './Tentang.css';

// Impor gambar yang sudah Anda siapkan
import ketuaImage from '../../assets/Ketua.jpg';
import wakilImage from '../../assets/WakilKetua.jpg';
import sekre1Image from '../../assets/Sekre1.jpg';
import sekre2Image from '../../assets/Sekre2.jpg';
import bend1Image from '../../assets/Bend1.jpg';
import bend2Image from '../../assets/Bend2.jpg';
import kepalaMnoImage from '../../assets/kepalamno.jpg';
import wakilMnoImage from '../../assets/wakilmno.jpg';
// Contoh gambar untuk kadep
import kadepInternalImage from '../../assets/Ketua.jpg'; 
import kadepEksternalImage from '../../assets/WakilKetua.jpg';


const anggotaData = {
  inti: {
    divisi: [], 
    anggota: [ // Langsung daftar anggota
      { id: 'inti-1', nama: 'Ketua Umum', jabatan: 'Nama Ketua Umum', image: ketuaImage },
      { id: 'inti-2', nama: 'Wakil Ketua Umum', jabatan: 'Nama Wakil Ketua', image: wakilImage },
      { id: 'inti-3', nama: 'Sekretaris I', jabatan: 'Nama Sekretaris I', image: sekre1Image },
      { id: 'inti-4', nama: 'Sekretaris II', jabatan: 'Nama Sekretaris II', image: sekre2Image },
      { id: 'inti-5', nama: 'Bendahara I', jabatan: 'Nama Bendahara I', image: bend1Image },
      { id: 'inti-6', nama: 'Bendahara II', jabatan: 'Nama Bendahara II', image: bend2Image },
      { id: 'inti-7', nama: 'Kepala Manajerial', jabatan: 'Nama Kepala Manajerial', image: kepalaMnoImage },
      { id: 'inti-8', nama: 'Wakil Manajerial', jabatan: 'Nama Wakil Manajerial', image: wakilMnoImage },
    ]
  },
  internal: {
    // PERBAIKAN: Properti diubah menjadi 'kepalaDepartemen' dan berupa objek
    kepalaDepartemen: { 
      id: 'kadep-int', 
      nama: 'Kepala Dept. Internal', 
      jabatan: 'Nama Kadep Internal', 
      image: kadepInternalImage 
    },
    divisi: [
      { id: 'kaderisasi', nama: 'Kaderisasi' },
      { id: 'psdm', nama: 'Pengembangan Sumber Daya Manusia' },
      { id: 'akademik-riset', nama: 'Akademik & Riset'}
    ],
    anggota: {
      kaderisasi: [
        { id: 'int-k-1', nama: 'Anggota Kaderisasi 1', jabatan: 'Jabatan', image: ketuaImage },
      ],
      psdm: [
        { id: 'int-p-1', nama: 'Anggota PSDM 1', jabatan: 'Jabatan', image: wakilImage },
      ],
      'akademik-riset': [
        // data anggota akademik & riset
      ]
    }
  },
  eksternal: {
    kepalaDepartemen: { 
      id: 'kadep-eks', 
      nama: 'Kepala Dept. Eksternal', 
      jabatan: 'Nama Kadep Eksternal', 
      image: kadepEksternalImage 
    },
    divisi: [
      { id: 'relasi-eksternal', nama: 'Relasi Eksternal' },
      { id: 'kerjasama', nama: 'Kerjasama & Kewirausahaan' }
    ],
    anggota: {
      'relasi-eksternal': [
        { id: 'eks-r-1', nama: 'Anggota Relasi 1', jabatan: 'Jabatan', image: ketuaImage },
      ],
      kerjasama: [
        { id: 'eks-k-1', nama: 'Anggota Kerjasama 1', jabatan: 'Jabatan', image: wakilImage },
      ]
    }
  },
  'media-kreatif': {
    kepalaDepartemen:{
        id:'Kadep-eks',
        nama:'kepala Dept. Media',
        jabatan:'Nama kadep media',
        image:kadepEksternalImage
    },

    divisi: [
        {id:'komunikasiInformasi',nama:'Komunikasi & Informasi'}

    ],
    anggota: [
      { id: 'med-1', nama: 'Anggota Medkraf 1', jabatan: 'Jabatan', image: kepalaMnoImage },
    ]
  },
};


const DaftarAnggota = () => {
  const [activeTab, setActiveTab] = useState('inti');
  const [activeSubTab, setActiveSubTab] = useState(null);

  useEffect(() => {
    const currentDivisi = anggotaData[activeTab].divisi;
    if (currentDivisi && currentDivisi.length > 0) {
      setActiveSubTab(currentDivisi[0].id);
    } else {
      setActiveSubTab(null);
    }
  }, [activeTab]);

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
      return <p className="text-center w-100">Tidak ada anggota untuk ditampilkan di kategori ini.</p>;
    }

    return anggotaToShow.map(anggota => (
      <div key={anggota.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div className="anggota-card">
          <img src={anggota.image} alt={anggota.nama} className="anggota-image" />
          <div className="anggota-info">
            <h5 className="anggota-nama">{anggota.nama}</h5>
            <p className="anggota-jabatan">{anggota.jabatan}</p>
          </div>
        </div>
      </div>
    ));
  };

  const currentData = anggotaData[activeTab];

  return (
    <section className="tentang-section bg-light">
      <div className="container">
        {/* Navigasi Tab Utama */}
        <div className="anggota-nav">
          <button className={`anggota-tab ${activeTab === 'inti' ? 'active' : ''}`} onClick={() => setActiveTab('inti')}>INTI</button>
          <button className={`anggota-tab ${activeTab === 'internal' ? 'active' : ''}`} onClick={() => setActiveTab('internal')}>INTERNAL</button>
          <button className={`anggota-tab ${activeTab === 'eksternal' ? 'active' : ''}`} onClick={() => setActiveTab('eksternal')}>EKSTERNAL</button>
          <button className={`anggota-tab ${activeTab === 'media-kreatif' ? 'active' : ''}`} onClick={() => setActiveTab('media-kreatif')}>MEDIA KREATIF</button>
        </div>

        {/* FITUR BARU: Tampilkan Ketua Departemen jika datanya ada */}
        {currentData && currentData.kepalaDepartemen && (
          <div className="row justify-content-center mt-5">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="anggota-card">
                <img src={currentData.kepalaDepartemen.image} alt={currentData.kepalaDepartemen.nama} className="anggota-image" />
                <div className="anggota-info">
                  <h5 className="anggota-nama">{currentData.kepalaDepartemen.nama}</h5>
                  <p className="anggota-jabatan">{currentData.kepalaDepartemen.jabatan}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigasi Sub-Tab (hanya muncul jika ada) */}
        {currentData && currentData.divisi.length > 0 && (
          <div className="sub-anggota-nav mt-4">
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
        )}

        {/* Konten Anggota Sesuai Tab */}
        <div className="row mt-5">
          {renderAnggota()}
        </div>
      </div>
    </section>
  );
};

export default DaftarAnggota;