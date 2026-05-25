import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css'; 
import LogoHima from '../../assets/LogoHima.png';
import { useAuth } from '../../Context/AuthContext'; 
import { FaTachometerAlt, FaEdit, FaNewspaper, FaEye, FaFileAlt, FaImage, FaSignOutAlt, FaUsers } from 'react-icons/fa';

const AdminSidebar = () => {
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault(); 
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      logout();
    }
  };
  return (
    <nav className="admin-sidebar">
      <div className="sidebar-header">
        <img src={LogoHima} alt="Logo HIMA" height="40" />
        <span>HMRPL</span>
      </div>
      <ul className="list-unstyled components">
        <p>HMRPL</p>
        <li>
          <NavLink to="/admin" end><FaTachometerAlt /> Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/awarding"><FaEdit /> Edit Awarding</NavLink>
        </li>
        <li>
          <NavLink to="/admin/berita"><FaNewspaper /> Kelola Berita</NavLink>
        </li>
        <li>
          <NavLink to="/admin/anggota"><FaUsers /> Kelola Anggota</NavLink>
        </li>
        <li>
          <NavLink to="/admin/aspirasi"><FaEye /> Lihat Responden</NavLink>
        </li>
        <li>
          <NavLink to="/admin/galeri"><FaImage /> Kelola Galeri</NavLink>
        </li>
        <li>
          <NavLink to="/admin/oprec/tambah"><FaFileAlt /> Tambah Oprec</NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
       <a href="/logout" onClick={handleLogout} className="logout-link">
          <FaSignOutAlt /> Keluar
        </a>
      </div>
    </nav>
  );
};

export default AdminSidebar;