import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // ngarah  ke halaman login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Jika sudah login, nampil halaman admin
  return <Outlet />;
};

export default ProtectedRoute;