import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ...impor komponen dan halaman lain
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';  
import HomePage from './pages/HomePage';
import TentangPage from './pages/TentangPage';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
             <Route path="/tentang" element={<TentangPage />} />
            {/* ... rute halaman lainnya ... */}
          </Routes>
        </main>
        
        <Footer /> {/* <-- Tambahkan di sini */}
      </div>
    </Router>
  );
}

export default App;