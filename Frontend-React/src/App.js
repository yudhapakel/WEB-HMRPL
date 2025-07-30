import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import TentangPage from './pages/TentangPage';
import KegiatanPage from './pages/KegiatanPage';
import AspirasiPage from './pages/AspirasiPage';
import RekrutmenPage from './pages/RekrutmenPage';
import BeritaPage from './pages/BeritaPage';
import BeritaDetailPage from './pages/BeritaDetailPage';
import { GaleriProvider } from './Context/GaleriContext';

function App() {
  return (
    <Router>
      
      <GaleriProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tentang" element={<TentangPage />} />
              <Route path="/kegiatan" element={<KegiatanPage />} />
              <Route path="/aspirasi" element={<AspirasiPage />} />
              <Route path="/rekrutmen" element={<RekrutmenPage />} />
              <Route path="/berita" element={<BeritaPage />} />
              <Route path="/berita/:slug" element={<BeritaDetailPage />} />
              {/* Tambahkan rute lainnya sesuai kebutuhan */}
              
              
            </Routes>
          </main>
          
          <Footer />
        </div>
      </GaleriProvider>
    </Router>
  );
}

export default App;