import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Impor logo
import LogoHima from '../../assets/LogoHima.png';
import LogoKabinet from '../../assets/LogoKabinet.png';

// Impor ikon dari react-icons
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          {/* Kolom 1: Logo & Social Media */}
          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
            <div className="footer-logo d-flex align-items-center mb-3">
              <img src={LogoHima} alt="Logo HIMA" height="45" className="me-3" />
              <img src={LogoKabinet} alt="Logo Kabinet" height="45" />
            </div>
            <h5>HMRPL 2025</h5>
            <p className="connect-us">Connect With Us</p>
            <div className="social-icons">
              <a href="https://www.instagram.com/hmrpl.telu/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a href="https://www.linkedin.com/company/hmrpl-telkom-university/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>

          {/* Kolom 2: Site Menu */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5>Site Menu</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/tentang">Tentang</Link></li>
              <li><Link to="/berita">Berita</Link></li>
              <li><Link to="/kegiatan">Kegiatan</Link></li>
              <li><Link to="/rekrutmen">Rekrutmen</Link></li>
              <li><Link to="/aspirasi">Aspirasi</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Website */}
          <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <h5>Website</h5>
            <ul className="footer-links list-unstyled">
              <li>
      <a href="https://bse.telkomuniversity.ac.id/" target="_blank" rel="noopener noreferrer">
        Program Studi S1 Rekayasa Perangkat Lunak
      </a>
    </li>
    <li>
      <a href="https://bpa.telkomuniversity.ac.id/" target="_blank" rel="noopener noreferrer">
        Badan Pengembangan Akademik
      </a>
    </li>
            </ul>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="copyright-text text-center">
          Copyright © HMRPL TELKOM UNIVERSITY 2025 | KABINET FRATERNA
        </div>
      </div>
    </footer>
  );
};

export default Footer;