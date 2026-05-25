// src/components/Awarding/Awarding.jsx

import React, { useState, useEffect } from 'react';
import './Awarding.css';
import axiosInstance from '../../api/axiosInstance';

const Awarding = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/awarding');

        const awardsData = [
          { id: 1, image_path: response.data.staff_image_path, title: 'Staff Terbaik' },
          { id: 2, image_path: response.data.divisi_image_path, title: 'Divisi Terbaik' },
          { id: 3, image_path: response.data.departemen_image_path, title: 'Departemen Terbaik' },
        ].filter(award => award.image_path);

        setAwards(awardsData);
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
        setLoading(false);
      }
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
        <div className="row mt-5 justify-content-center">
          {loading ? (
            <p>Memuat penghargaan...</p>
          ) : (
            awards.map(award => (
              <div key={award.id} className="col-lg-4 col-md-6 col-sm-6 col-10 mb-4">
                <div
                  className="award-card"
                  // SEKARANG KITA BANGUN URL-NYA SECARA MANUAL 👇
                  style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/storage/${award.image_path})` }}
                >
                  <div className="award-card-overlay">
                    <div className="award-card-text">
                      <h3>{award.title}</h3>
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