import React, { useState, useEffect } from 'react';
import './Awarding.css';
import tioImage from '../../assets/StafTerbaik.jpeg'; 
import kemitraanImage from '../../assets/DepartementTerbaik.jpeg';
import internalImage from '../../assets/DivisiTerbaik.jpeg';

const dummyAwards = [
  {
    id: 1,
    imageUrl: tioImage,
  },
  {
    id: 2,
    imageUrl: kemitraanImage,
  },
  {
    id: 3,
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
  }, []); 

  return (
    <section className="awarding-section">
      <div className="container">
        <h2 className="awarding-title">AWARDING</h2>
        <p className="awarding-subtitle">
          Penghargaan untuk mereka yang telah memberikan yang terbaik.
        </p>

        <div className="row mt-5">
          {loading ? (
            
            <p>Memuat penghargaan...</p>
          ) : (
           
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