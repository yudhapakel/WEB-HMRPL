import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import LogoHima from '../../assets/LogoHima.png';
import LogoKabinet from '../../assets/LogoKabinet.png';
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Beranda', icon: '🏠' },
  { to: '/tentang', label: 'Tentang', icon: '📖' },
  { to: '/berita', label: 'Berita', icon: '📰' },
  { to: '/kegiatan', label: 'Kegiatan', icon: '🎯' },
  { to: '/rekrutmen', label: 'Rekrutmen', icon: '👥' },
  { to: '/aspirasi', label: 'Aspirasi', icon: '💬' },
];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active-link' : 'nav-link';
  };

  const getMobileNavClass = ({ isActive }) => {
    return `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`;
  };

  // Sidebar animation variants
  const sidebarVariants = {
    closed: { x: '100%', transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' } },
    open: { x: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' } },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <>
      <nav className="navbar sticky-top">
        <div className="container">
          {/* Logo */}
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={LogoHima} alt="Logo HIMA" className="nav-logo" />
            <div className="divider d-none d-lg-block" />
            <img src={LogoKabinet} alt="Logo Kabinet" className="nav-logo ms-2" />
          </NavLink>

          {/* Desktop nav links */}
          {!isMobile && (
            <ul className="desktop-nav">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink className={getNavLinkClass} to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          )}

          {/* Mobile hamburger button */}
          {isMobile && (
            <button
              className={`hamburger-btn ${isSidebarOpen ? 'is-active' : ''}`}
              onClick={toggleSidebar}
              aria-label="Toggle navigation"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar Overlay + Panel */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="sidebar-overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={toggleSidebar}
            />

            {/* Sidebar panel */}
            <motion.aside
              className="sidebar"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Sidebar header */}
              <div className="sidebar-header">
                <div className="sidebar-logo-group">
                  <img src={LogoHima} alt="Logo HIMA" height="36" />
                  <img src={LogoKabinet} alt="Logo Kabinet" height="36" />
                </div>
                <button className="sidebar-close" onClick={toggleSidebar} aria-label="Close menu">
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <nav className="sidebar-nav">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.to}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <NavLink className={getMobileNavClass} to={item.to}>
                      <span className="sidebar-icon">{item.icon}</span>
                      <span className="sidebar-label">{item.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Sidebar footer */}
              <div className="sidebar-footer">
                <p className="sidebar-footer-title">Connect With Us</p>
                <div className="sidebar-socials">
                  <a href="https://www.instagram.com/hmrpl.telu/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                  <a href="https://www.linkedin.com/company/hmrpl-telkom-university/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
                <p className="sidebar-copyright">© HMRPL 2025</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;