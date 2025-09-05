import React from 'react';
import { useRekrutmen } from '../../Context/RekrutmenContext'; 
import './RekrutmenList.css';
// Hapus kalo udah terhubung sama backend
// const DUMMY_POSTER_URL = "https://via.placeholder.com/1200x400.png?text=POSTER+RECRUITMENT";

const RekrutmenList = () => {


   const { posters, loading } = useRekrutmen();

  if (loading) {
    return <p className="text-center">Memuat poster...</p>;
  }

  if (posters.length === 0) {
    return <p className="text-center">Saat ini belum ada rekrutmen yang dibuka.</p>;
  }

  return (
    <div className="rekrutmen-list">
      {posters.map(poster => (
        <div key={poster.id} className="poster-item">
        <img 
          src={`${process.env.REACT_APP_API_URL}${poster.poster_url}`}  
          alt={`Poster Rekrutmen ${poster.id}`} 
          className="img-fluid" 
        />
        </div>
      ))}
    </div>
  );
};

export default RekrutmenList;