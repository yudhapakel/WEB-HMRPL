import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Berita.css';

const BeritaUtama = ({ berita }) => {
  if (!berita) return null;

  return (
    <div className="berita-utama-wrapper">
      <h2 className="section-title">Berita Utama</h2>
      <div className="berita-utama-card">
        <div className="berita-text">
          <div>
            <h5>{berita.title}</h5>
            <p className="berita-date">{berita.date}</p>
            <p className="berita-description">{berita.excerpt}</p>
          </div>
          <Link to={`/berita/${berita.slug}`} className="btn-selengkapnya">
            Selengkapnya <FaChevronRight size={12} />
          </Link>
        </div>
        <img src={`${process.env.REACT_APP_API_URL}/storage/${berita.image_path}`} alt={berita.title} className="berita-image-utama" />
      </div>    
    </div>
  );
};

export default BeritaUtama;