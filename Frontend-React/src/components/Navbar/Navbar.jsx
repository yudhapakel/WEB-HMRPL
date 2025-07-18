import React from 'react';
// 1. Impor NavLink dari react-router-dom
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import LogoHima from '../../assets/LogoHima.png';
import LogoKabinet from '../../assets/LogoKabinet.png';


const Navbar = () => {
  // Fungsi untuk menentukan style link yang aktif
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link fw-bold active-link' : 'nav-link';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-4">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={LogoHima} alt="Logo HIMA" height="40" className="me-2" />
          <img src={LogoKabinet} alt="Logo Kabinet" height="40" />
        </div>
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
    </nav>
  );
};

export default Navbar;