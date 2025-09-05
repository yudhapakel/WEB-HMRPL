import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './admin/layouts/AdminLayout';

// Providers
import { GaleriProvider } from './Context/GaleriContext';
import { AuthProvider } from './Context/AuthContext';

// Halaman Publik
import HomePage from './pages/HomePage';
import TentangPage from './pages/TentangPage';
import KegiatanPage from './pages/KegiatanPage';
import AspirasiPage from './pages/AspirasiPage';
import RekrutmenPage from './pages/RekrutmenPage';
import { RekrutmenProvider } from './Context/RekrutmenContext';
import BeritaPage from './pages/BeritaPage';
import BeritaDetailPage from './pages/BeritaDetailPage';


// Halaman Login
import LoginPage from './pages/LoginPage';

// Halaman Admin & Komponen Keamanan
import DashboardPage from './admin/pages/DashboardPage'; 
import ProtectedRoute from './components/ProtectedRoute';
import AddBeritaPage from './admin/pages/AddBeritaPage'; 
import ManageBeritaPage from './admin/pages/ManageBeritaPage';
import EditBeritaPage from './admin/pages/EditBeritaPage';
import EditAwardingPage from './admin/pages/EditAwardingPage';
import LihatRespondenPage from './admin/pages/LihatRespondenPage';
import AddGaleriPage from './admin/pages/AddGaleriPage';
import AddOprecPage from './admin/pages/AddOprecPage';
import ManageGaleriPage from './admin/pages/ManageGaleriPage';


function App() {
  return (
    <Router>
      <AuthProvider>
        <GaleriProvider>
          <Routes>
            {/* Rute Publik */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/tentang" element={<TentangPage />} />
              <Route path="/kegiatan" element={
                 <GaleriProvider>
                  <KegiatanPage />
                  </GaleriProvider>
               }
              />
              <Route path="/aspirasi" element={<AspirasiPage />} />
              <Route 
              path="/rekrutmen" 
              element={
                <RekrutmenProvider>
                  <RekrutmenPage />
                </RekrutmenProvider>
              } 
            />
              <Route path="/berita" element={<BeritaPage />} />
              <Route path="/berita/:slug" element={<BeritaDetailPage />} />
            </Route>

            {/* Rute Admin  */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="berita" element={<ManageBeritaPage />} />
                <Route path="berita/tambah" element={<AddBeritaPage />} />
                <Route path="berita/edit/:id" element={<EditBeritaPage />} />
                <Route path="awarding" element={<EditAwardingPage />} />
                <Route path="aspirasi" element={<LihatRespondenPage />} />
                <Route path="galeri" element={<ManageGaleriPage />} />
                <Route path="galeri/tambah" element={<AddGaleriPage />} />
                <Route path="oprec/tambah" element={<AddOprecPage />} />
              </Route>
            </Route>
            
            <Route path="/login" element={<LoginPage />} />

          </Routes>
        </GaleriProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
