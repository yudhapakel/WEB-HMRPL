import React from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';
import './AdminHeader.css'; 

const AdminHeader = () => {
  const { user } = useAuth();

  console.log('User di dalam Header:', user);

return (
    <header className="admin-header">
      <button className="sidebar-toggle">
        <FaBars />
      </button>
      <div className="user-info">
        <FaUserCircle size={24} />
        <span>{user ? user.name : 'ADMIN HMRPL'}</span>
      </div>
    </header>
  );
};

export default AdminHeader;