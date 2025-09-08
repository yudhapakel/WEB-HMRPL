import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import './Berita.css';

const BeritaList = ({ berita, currentPage, totalPages, onPageChange }) => {
  if (!berita || berita.length === 0) {
    return <p className="text-center">Tidak ada berita untuk ditampilkan.</p>;
  }


  const beritaUtama = berita[0];
  const beritaLainnya = berita.slice(1);

  return (
<>
  <div className="berita-utama-wrapper">
    <h2 className="section-title">Berita Utama</h2>
    <Link to={`/berita/${beritaUtama.slug}`} className="berita-card-link">
      <div className="berita-utama-card">
        <div className="berita-text">
          <h5>{beritaUtama.title}</h5>
          <p className="berita-date">{beritaUtama.date}</p>
          <p className="berita-description">{beritaUtama.excerpt}</p>
          <div className="btn-selengkapnya">
            Selengkapnya <FaChevronRight size={12} />
          </div>
        </div>
        <img src={`${process.env.REACT_APP_API_URL}/storage/${beritaUtama.image_path}`} alt={beritaUtama.title} className="berita-image-utama" />
      </div>
    </Link>
  </div>

  {beritaLainnya.length > 0 && (
    <div className="berita-lainnya-wrapper">
      <h2 className="section-title">Berita Lainnya</h2>
      <div className="row">
        {beritaLainnya.map(item => (
          <Link to={`/berita/${item.slug}`} key={item.id} className="col-lg-4 col-md-6 mb-4 berita-card-link">
            <div className="berita-card">
              <img src={`${process.env.REACT_APP_API_URL}/storage/${item.image_path}`} alt={item.title} className="berita-image-lainnya" />
              <div className="berita-card-body">
                <h6>{item.title}</h6>
                <p className="berita-date">{item.date}</p>
                <p className="berita-description-small">{item.excerpt}</p>
                <div className="btn-selengkapnya-small">
                  Selengkapnya <FaChevronRight size={10} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )}
</>
  );
};

export default BeritaList;