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
            <h3 className="section-heading-purple">KABINET SYVELTA</h3>
            <p className="text-muted">
              <b>SYVELTA</b> berasal dari gabungan kata <b>Synergie</b> (bahasa Prancis) yang berarti sinergi, dan <b>Velta</b> (bahasa Islandia) yang berarti perubahan menuju lebih baik. Nama ini merepresentasikan semangat kolaboratif dalam menciptakan perubahan yang progresif dan berdampak. Dengan mengusung tagline <b>"Sync for Change!"</b>, Kabinet SYVELTA hadir sebagai wujud gerakan bersama yang selaras untuk mewujudkan transformasi nyata
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangKabinet;