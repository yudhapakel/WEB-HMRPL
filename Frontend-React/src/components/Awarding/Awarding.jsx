import React, { useState, useEffect } from 'react';
import './Awarding.css';
import axiosInstance from '../../api/axiosInstance';

// const dummyAwards = [
//   {
//     id: 1,
//     imageUrl: tioImage,
//   },
//   {
//     id: 2,
//     imageUrl: kemitraanImage,
//   },
//   {
//     id: 3,
//     imageUrl: internalImage,
//   },
// ];
// //hanya dummy saja


const Awarding = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Definisikan fungsi untuk mengambil data
    const fetchAwards = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/awarding');
        
        // Ubah objek dari backend menjadi array yang bisa di-map
        const awardsData = [
          { id: 1, imageUrl: response.data.staff, title: 'Staff Terbaik' },
          { id: 2, imageUrl: response.data.divisi, title: 'Divisi Terbaik' },
          { id: 3, imageUrl: response.data.departemen, title: 'Departemen Terbaik' },
        ].filter(award => award.imageUrl); // Filter yang gambarnya ada saja
        
        setAwards(awardsData);
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
        setLoading(false);
      }
    };

    // PENTING: Panggil fungsinya di sini!
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