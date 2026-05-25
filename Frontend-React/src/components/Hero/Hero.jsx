import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import LogoHima from '../../assets/LogoHima.png';
import LogoKabinet from '../../assets/LogoKabinet.png';
import { Link } from 'react-router-dom';

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
};

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center justify-content-center">
      <div className="container">
        {/* Bagian Atas: Himpunan */}
        <div className="row align-items-start text-center text-md-start">
          <motion.div
            className="col-md-4 mb-4 mb-md-0 d-flex justify-content-center"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={LogoHima} alt="Logo HIMARPL" className="img-fluid hero-logo" />
          </motion.div>
          <motion.div
            className="col-md-8"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h1 className="hero-title">
              Himpunan Mahasiswa S1 Rekayasa Perangkat Lunak Universitas Telkom
            </h1>
            <p className="hero-subtitle">
              Himpunan Mahasiswa Rekayasa Perangkat Lunak  Universitas Telkom atau disingkat HMRPL adalah organisasi kemahasiswaan di bawah Program Studi S1 Rekayasa Perangkat Lunak yang bertujuan mewadahi pengembangan potensi, aspirasi, serta kreativitas mahasiswa Rekayasa Perangkat Lunak dalam bidang akademik, teknologi, dan kepemimpinan.
            </p>
          </motion.div>
        </div>

        {/* Bagian Kabinet */}
        <div className="row align-items-center mt-5 pt-md-5 text-center text-md-start">
          <motion.div
            className="col-md-4 mt-4 mt-md-0 text-center order-md-2"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={LogoKabinet} alt="Logo Kabinet" className="img-fluid kabinet-logo" />
          </motion.div>

          <motion.div
            className="col-md-8 order-md-1" 
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 className="kabinet-title">
              <span className="text-danger">KABINET </span>
              <span className="text-warning">FRATERNA</span>
            </h2>
            <p className="kabinet-subtitle">
              Badan Pengurus Himpunan Mahasiswa Rekayasa Perangkat Lunak 2026/2027 </p>
            <Link to="/tentang" className="custom-tentang-btn mt-3">
              Tentang Kami →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
