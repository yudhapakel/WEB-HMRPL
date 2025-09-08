import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './Berita.css';

const BeritaLainnya = ({ berita, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="berita-lainnya-wrapper">
      <h2 className="section-title">Berita Lainnya</h2>
      <div className="row">
        {berita.map(item => (
          <div key={item.id} className="col-lg-4 col-md-6 mb-4">
            <div className="berita-card">
              <img src={`${process.env.REACT_APP_API_URL}/storage/${item.image_path}`} alt={item.title} className="berita-image-lainnya" />
              <div className="berita-card-body">
                <h6>{item.title}</h6>
                <p className="berita-date">{item.date}</p>
                <p className="berita-description-small">{item.excerpt}</p>
                <button className="btn-selengkapnya-small">
                  Selengkapnya <FaChevronRight size={10} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default BeritaLainnya;