import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import LogoHima from '../../assets/LogoHima.png';
import LogoKabinet from '../../assets/LogoKabinet.png';

const Navbar = () => {
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link fw-bold active-link' : 'nav-link';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      {/* PERUBAHAN DI SINI: dari container-fluid menjadi container */}
      <div className="container">
        {/* Bagian Logo */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={LogoHima} alt="Logo HIMA" height="40" className="me-2" />
          <div className="divider d-none d-lg-block" />
          <img src={LogoKabinet} alt="Logo Kabinet" height="40" className="ms-2" />
        </NavLink>

        {/* Tombol Toggler (Hamburger Menu) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Wrapper untuk Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/">Beranda</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/tentang">Tentang</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/berita">Berita</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/kegiatan">Kegiatan</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/rekrutmen">Rekrutmen</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/aspirasi">Aspirasi</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;