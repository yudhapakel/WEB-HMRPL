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
        <div className="berita-utama-card">
          <div className="berita-text">
            <h5>{beritaUtama.title}</h5>
            <p className="berita-date">{beritaUtama.date}</p>
            <p className="berita-description">{beritaUtama.excerpt}</p>
            <Link to={`/berita/${beritaUtama.slug}`} className="btn-selengkapnya">
              Selengkapnya <FaChevronRight size={12} />
            </Link>
          </div>
          <img src={beritaUtama.imageUrl} alt={beritaUtama.title} className="berita-image-utama" />
        </div>
      </div>

      {beritaLainnya.length > 0 && (
        <div className="berita-lainnya-wrapper">
          <h2 className="section-title">Berita Lainnya</h2>
          <div className="row">
            {beritaLainnya.map(item => (
              <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                <div className="berita-card">
                  <img src={item.imageUrl} alt={item.title} className="berita-image-lainnya" />
                  <div className="berita-card-body">
                    <h6>{item.title}</h6>
                    <p className="berita-date">{item.date}</p>
                    <p className="berita-description-small">{item.excerpt}</p>
                    <Link to={`/berita/${item.slug}`} className="btn-selengkapnya-small">
                      Selengkapnya <FaChevronRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <nav className="pagination-nav mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Sebelumnya</button>
          </li>
          {[...Array(totalPages).keys()].map(num => (
            <li key={num + 1} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(num + 1)}>{num + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Selanjutnya</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BeritaList;