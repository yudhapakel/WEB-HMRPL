

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance'; 

const OprecSection = () => {
  const [posterUrl, setPosterUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPoster = async () => {
      try {
        const response = await axiosInstance.get('/api/rekrutmen');
        setPosterUrl(response.data.poster_url);
      } catch (err) {
        console.log('Info: Tidak ada poster rekrutmen saat ini.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestPoster();
  }, []);

  if (isLoading || !posterUrl) {
    return null;
  }

  return (
    <section style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <h2>Open Recruitment</h2>
      <img src={posterUrl} alt="Poster Open Recruitment" style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '8px' }} />
    </section>
  );
};

export default OprecSection;