import React, { useState, useEffect } from 'react';
import './Awarding.css';

// Nanti, data ini akan datang dari API, bukan ditulis di sini.
import tioImage from '../../assets/StafTerbaik.jpeg'; 
import kemitraanImage from '../../assets/DepartementTerbaik.jpeg';
import internalImage from '../../assets/DivisiTerbaik.jpeg';

const dummyAwards = [
  {
    id: 1,
    title: 'TIO FUNNY',
    subtitle: 'Staf Ahli Relasi Eksternal',
    imageUrl: tioImage,
  },
  {
    id: 2,
    title: 'KEMITRAAN DAN KEWIRAUSAHAAN',
    subtitle: 'Departemen Eksternal',
    imageUrl: kemitraanImage,
  },
  {
    id: 3,
    title: 'DEPARTEMEN INTERNAL',
    subtitle: 'KABINET SYVELTA',
    imageUrl: internalImage,
  },
];
//hanya dummy saja


const Awarding = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- SIMULASI PENGAMBILAN DATA DARI BACKEND ---
    const fetchAwards = () => {
      setLoading(true);
      // setTimeout mensimulasikan delay jaringan (misal: 1 detik)
      setTimeout(() => {
        setAwards(dummyAwards);
        setLoading(false);
      }, 1000);

      // --- NANTI, GANTI SIMULASI DI ATAS DENGAN KODE FETCH ASLI DI BAWAH INI ---
      /*
      fetch('https://alamat-api-.com/api/awards')
        .then(response => response.json())
        .then(data => {
          setAwards(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching awards:", error);
          setLoading(false);
        });
      */
    };

    fetchAwards();
  }, []); // [] berarti useEffect hanya berjalan sekali saat komponen dimuat

  return (
    <section className="awarding-section">
      <div className="container">
        <h2 className="awarding-title">AWARDING</h2>
        <p className="awarding-subtitle">
          Penghargaan untuk mereka yang telah memberikan yang terbaik.
        </p>

        <div className="row mt-5">
          {loading ? (
            // Tampilan saat data sedang dimuat
            <p>Memuat penghargaan...</p>
          ) : (
            // Tampilan setelah data berhasil dimuat
            awards.map(award => (
              <div key={award.id} className="col-lg-4 col-md-6 mb-4">
                <div 
                  className="award-card" 
                  style={{ backgroundImage: `url(${award.imageUrl})` }}
                >
                  <div className="award-card-overlay">
                    <div className="award-card-text">
                      <h3>{award.title}</h3>
                      <p>{award.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Awarding;