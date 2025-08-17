import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css'; 
import LogoHima from '../../assets/LogoHima.png';
import { FaTachometerAlt, FaEdit, FaPlusSquare, FaEye, FaFileAlt, FaImage, FaSignOutAlt } from 'react-icons/fa';

const AdminSidebar = () => {
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
          <NavLink to="/admin/berita/tambah"><FaPlusSquare /> Tambah Berita</NavLink>
        </li>
        <li>
          <NavLink to="/admin/aspirasi"><FaEye /> Lihat Responden</NavLink>
        </li>
        <li>
          <NavLink to="/admin/galeri/tambah"><FaImage /> Tambah Galeri</NavLink>
        </li>
        <li>
          <NavLink to="/admin/oprec/tambah"><FaFileAlt /> Tambah Oprec</NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
        <NavLink to="/logout"><FaSignOutAlt /> Keluar</NavLink>
      </div>
    </nav>
  );
};

export default AdminSidebar;