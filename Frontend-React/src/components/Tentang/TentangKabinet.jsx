import React from 'react';
import './Tentang.css';
import LogoKabinet from '../../assets/LogoKabinet.png';

const TentangKabinet = () => {
  return (
    <section className="tentang-section bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title-dark">Kabinet Berjalan</h2>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-5 text-center">
            <img src={LogoKabinet} alt="Logo Kabinet" className="img-fluid kabinet-logo-tentang" />
          </div>
          <div className="col-lg-7">
            <h3 className="section-heading-purple">KABINET FRATERNA</h3>
            <p className="text-muted">
              <b>Fraterna</b> menjunjung tinggi <b>kebersamaan, solidaritas</b> dan rasa <b>saling memiliki</b>dalam setiap langkah organisasi. Melalui <b> semangat kolaborasi</b> dan <b>komunikasi yang sehat</b>,Kabinet Fraterna dapat menjadi wadah untuk bertumbuh dan <b>mencapai tujuan bersama</b>.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangKabinet;