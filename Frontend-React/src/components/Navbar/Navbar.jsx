import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import LogoHima from '../../assets/LogoHima.png';
import LogoKabinet from '../../assets/LogoKabinet.png';
import { FaHome, FaUsers, FaNewspaper, FaCalendarAlt, FaUserPlus, FaCommentDots } from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Beranda', icon: FaHome },
  { to: '/tentang', label: 'Tentang', icon: FaUsers },
  { to: '/berita', label: 'Berita', icon: FaNewspaper },
  { to: '/kegiatan', label: 'Kegiatan', icon: FaCalendarAlt },
  { to: '/rekrutmen', label: 'Rekrutmen', icon: FaUserPlus },
  { to: '/aspirasi', label: 'Aspirasi', icon: FaCommentDots },
];

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active-link' : 'nav-link';
  };

  const getBottomNavClass = ({ isActive }) => {
    return `bottom-nav-item ${isActive ? 'bottom-nav-active' : ''}`;
  };

  return (
    <>
      {/* Top Navbar — Desktop: full links, Mobile: logo only */}
      <nav className="navbar sticky-top">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={LogoHima} alt="Logo HIMA" className="nav-logo" />
            <div className="divider d-none d-lg-block" />
            <img src={LogoKabinet} alt="Logo Kabinet" className="nav-logo ms-2" />
          </NavLink>

          {!isMobile && (
            <ul className="desktop-nav">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink className={getNavLinkClass} to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      {/* Bottom Navigation Bar — Mobile only */}
      {isMobile && (
        <nav className="bottom-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} className={getBottomNavClass} to={item.to} end={item.to === '/'}>
                <Icon className="bottom-nav-icon" />
                <span className="bottom-nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      )}
    </>
  );
};

export default Navbar;